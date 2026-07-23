import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

// ============================================================================
// TYPES
// ============================================================================

/** How serious a finding is. "critical" blocks publishing. "warning" doesn't
 *  block it, but is surfaced to the uploader so they know what a reviewer
 *  might flag by hand. */
export type ViolationSeverity = 'critical' | 'warning';

export interface ScanViolation {
  severity: ViolationSeverity;
  rule: string;        // short machine-readable id, e.g. "eval-usage"
  message: string;      // human-readable explanation shown to the uploader
  line?: number;
  column?: number;
}

export interface FileScanResult {
  file: string;
  violations: ScanViolation[];
}

export interface ScanSummary {
  passed: boolean;               // false if ANY critical violation exists anywhere
  criticalCount: number;
  warningCount: number;
  results: FileScanResult[];
}

// Restricted / permissioned Node built-ins. Callers can use either "fs" or
// the "node:fs" prefixed form (Node's newer alias syntax) — both are checked.
const ALWAYS_BANNED = new Set([
  'child_process', 'cluster', 'dgram', 'net', 'vm', 'worker_threads',
  'inspector', 'repl', 'v8', 'trace_events', 'perf_hooks',
]);

const PERMISSIONED: Record<string, string> = {
  fs: 'use-fs',
  http: 'use-http',
  https: 'use-http',
  dns: 'use-net',
  tls: 'use-net',
  os: 'use-os',
};

const RESTRICTED_GLOBALS = new Set([
  'process', 'global', 'globalThis', '__dirname', '__filename', 'require',
]);

const MAX_SOURCE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB per file — guards the parser against huge/bomb files

function normalizeModuleName(name: string): string {
  return name.startsWith('node:') ? name.slice(5) : name;
}

function evalSimpleStringExpr(node: any): string | null {
  // Literal string
  if (node.type === 'Literal' && typeof node.value === 'string') return node.value;
  // Template literal with no interpolation, e.g. `require`
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0]?.value?.cooked ?? null;
  }
  // Simple 'a' + 'b' + 'c' concatenation of literals — a common obfuscation trick
  if (node.type === 'BinaryExpression' && node.operator === '+') {
    const left = evalSimpleStringExpr(node.left);
    const right = evalSimpleStringExpr(node.right);
    if (left !== null && right !== null) return left + right;
  }
  return null;
}

function stringValueOfKey(node: any): string | null {
  // Handles obj.prop, obj['prop'], obj[`prop`], and obj['pr'+'op']
  if (!node.computed) return node.property?.name ?? null;
  return evalSimpleStringExpr(node.property);
}

function isEvalLikeCallee(callee: any): boolean {
  // Direct: eval(...)
  if (callee.type === 'Identifier' && callee.name === 'eval') return true;
  // Indirect: (0, eval)(...), window.eval(...), globalThis.eval(...), this.eval(...)
  if (callee.type === 'SequenceExpression') {
    const last = callee.expressions[callee.expressions.length - 1];
    return last?.type === 'Identifier' && last.name === 'eval';
  }
  if (callee.type === 'MemberExpression') {
    return stringValueOfKey(callee) === 'eval';
  }
  return false;
}

function looksLikeBase64Blob(value: string): boolean {
  return value.length >= 200 && /^[A-Za-z0-9+/=]+$/.test(value);
}

function loc(node: any): { line?: number; column?: number } {
  return node.loc ? { line: node.loc.start.line, column: node.loc.start.column } : {};
}

// ============================================================================
// SCANNER
// ============================================================================

export function scanExtensionCode(sourceCode: string, manifestPermissions: string[]): ScanViolation[] {
  const violations: ScanViolation[] = [];

  const push = (severity: ViolationSeverity, rule: string, message: string, node?: any) => {
    violations.push({ severity, rule, message, ...(node ? loc(node) : {}) });
  };

  if (Buffer.byteLength(sourceCode, 'utf8') > MAX_SOURCE_SIZE_BYTES) {
    push('critical', 'file-too-large', 'File exceeds the 2MB scan limit — split it up or contact support if this is legitimate.');
    return violations;
  }

  let ast: any;
  try {
    ast = acorn.parse(sourceCode, { ecmaVersion: 'latest', sourceType: 'module', locations: true });
  } catch (error) {
    push('critical', 'parse-error', 'Code contains invalid syntax, or is obfuscated/minified in a way we can\'t safely analyze. Please submit readable, unminified source.');
    return violations;
  }

  const checkModuleAccess = (importName: string, node: any) => {
    const name = normalizeModuleName(importName);
    if (ALWAYS_BANNED.has(name)) {
      push('critical', 'banned-native-module', `Module '${importName}' is permanently banned (process/network/VM control modules are never allowed in extensions).`, node);
      return;
    }
    if (name in PERMISSIONED) {
      const requiredPermission = PERMISSIONED[name];
      if (!manifestPermissions.includes(requiredPermission)) {
        push('critical', 'missing-permission', `Module '${importName}' requires '${requiredPermission}' to be declared in vextor-manifest.json.`, node);
      }
    }
  };

  walk.ancestor(ast, {
    // ------------------------------------------------------------------
    // import 'x'; import y from 'x'; import { z } from 'x';
    // ------------------------------------------------------------------
    ImportDeclaration(node: any) {
      if (typeof node.source?.value === 'string') {
        checkModuleAccess(node.source.value, node);
      }
    },

    // ------------------------------------------------------------------
    // dynamic import('x')
    // ------------------------------------------------------------------
    ImportExpression(node: any) {
      if (node.source?.type === 'Literal' && typeof node.source.value === 'string') {
        checkModuleAccess(node.source.value, node);
      } else {
        push('critical', 'dynamic-import-expression', 'Dynamic import() with a non-literal (computed) specifier is banned — module names must be statically analyzable.', node);
      }
    },

    // ------------------------------------------------------------------
    // Anything that's a function call
    // ------------------------------------------------------------------
    CallExpression(node: any) {
      const callee = node.callee;

      // eval(), and indirect/aliased forms
      if (isEvalLikeCallee(callee)) {
        push('critical', 'eval-usage', "Usage of eval() (including indirect forms like (0,eval)() or globalThis.eval()) is strictly banned.", node);
      }

      // Function(...) called without `new` — same capability as `new Function`
      if (callee.type === 'Identifier' && callee.name === 'Function') {
        push('critical', 'function-constructor', "Calling Function(...) — with or without 'new' — to compile code from a string is banned.", node);
      }

      // require('x') — only meaningful with a literal argument
      if (callee.type === 'Identifier' && callee.name === 'require') {
        const arg = node.arguments[0];
        if (arg?.type === 'Literal' && typeof arg.value === 'string') {
          checkModuleAccess(arg.value, node);
        } else {
          push('critical', 'dynamic-require', 'require() with a non-literal (computed/concatenated) argument is banned — module names must be statically analyzable.', node);
        }
      }

      // Bracket-notation access to eval/require, e.g. globalThis['re'+'quire']('fs')
      if (callee.type === 'MemberExpression' && callee.computed) {
        const key = stringValueOfKey(callee);
        if (key === 'require' || key === 'eval') {
          push('critical', 'obfuscated-global-access', `Computed access to '${key}' via bracket notation is banned — this is a common obfuscation technique to dodge static scanning.`, node);
        }
      }

      // someFn.constructor(...) / someFn.constructor.constructor(...) — the
      // classic vm-sandbox escape used to reach the Function constructor
      // through an object that isn't itself named "Function".
      if (
        callee.type === 'MemberExpression' &&
        !callee.computed &&
        callee.property.name === 'constructor'
      ) {
        push('critical', 'constructor-chain-access', "Calling .constructor(...) is banned — this pattern is used to escape sandboxes by reaching the Function constructor indirectly.", node);
      }

      // setTimeout/setInterval with a string body instead of a function
      if (
        callee.type === 'Identifier' &&
        (callee.name === 'setTimeout' || callee.name === 'setInterval') &&
        node.arguments[0]?.type === 'Literal'
      ) {
        push('critical', 'string-timer-execution', `String execution via ${callee.name}() is banned — pass a function instead.`, node);
      }

      // Object.setPrototypeOf(...) / Reflect.setPrototypeOf(...)
      if (
        callee.type === 'MemberExpression' &&
        !callee.computed &&
        (callee.object.name === 'Object' || callee.object.name === 'Reflect') &&
        callee.property.name === 'setPrototypeOf'
      ) {
        push('critical', 'prototype-pollution', `${callee.object.name}.setPrototypeOf(...) is banned — it can alter behavior for other extensions or the host.`, node);
      }

      // Object.assign(Object.prototype, ...) / Object.assign(Array.prototype, ...)
      if (
        callee.type === 'MemberExpression' &&
        !callee.computed &&
        callee.object.name === 'Object' &&
        callee.property.name === 'assign'
      ) {
        const target = node.arguments[0];
        if (
          target?.type === 'MemberExpression' &&
          !target.computed &&
          target.property.name === 'prototype'
        ) {
          push('critical', 'prototype-pollution', 'Object.assign() targeting a shared prototype is banned.', node);
        }
      }

      // WebAssembly requires an explicit permission — it's an easy way to run
      // native-speed code the JS-level scanner can't meaningfully inspect.
      if (
        callee.type === 'MemberExpression' &&
        !callee.computed &&
        callee.object.name === 'WebAssembly'
      ) {
        if (!manifestPermissions.includes('use-wasm')) {
          push('critical', 'missing-permission', "WebAssembly usage requires 'use-wasm' in vextor-manifest.json.", node);
        } else {
          push('warning', 'wasm-usage', 'This extension loads WebAssembly. Compiled binaries cannot be statically scanned — manual review recommended.', node);
        }
      }

      // Buffer.from(x, 'base64'|'hex') — common first step in decode-then-execute obfuscation
      if (
        callee.type === 'MemberExpression' &&
        !callee.computed &&
        callee.object.name === 'Buffer' &&
        callee.property.name === 'from'
      ) {
        const encodingArg = node.arguments[1];
        if (encodingArg?.type === 'Literal' && ['base64', 'hex'].includes(encodingArg.value)) {
          push('warning', 'encoded-payload', "Buffer.from(..., 'base64'/'hex') detected. This is commonly used to hide payloads from static scanners — manual review recommended.", node);
        }
      }
    },

    // ------------------------------------------------------------------
    // new Function(...) — kept for the explicit `new` form too
    // ------------------------------------------------------------------
    NewExpression(node: any) {
      if (node.callee.type === 'Identifier' && node.callee.name === 'Function') {
        push('critical', 'function-constructor', "Usage of 'new Function()' is strictly banned.", node);
      }
    },

    // ------------------------------------------------------------------
    // Assignments: prototype/proto tampering, and re-pointing eval/require
    // ------------------------------------------------------------------
    AssignmentExpression(node: any) {
      if (node.left.type === 'MemberExpression') {
        const key = stringValueOfKey(node.left);
        if (key === 'prototype' || key === '__proto__') {
          push('critical', 'prototype-pollution', `Modifying '${key}' is banned — this can corrupt behavior for other extensions or the host app.`, node);
        }
      }
      // globalThis.require = somethingElse; etc.
      if (node.left.type === 'Identifier' && RESTRICTED_GLOBALS.has(node.left.name)) {
        push('critical', 'restricted-global-reassignment', `Reassigning '${node.left.name}' is banned.`, node);
      }
    },

    // ------------------------------------------------------------------
    // const e = eval;  const r = require;  — aliasing to dodge name checks
    // ------------------------------------------------------------------
    VariableDeclarator(node: any) {
      if (node.init?.type === 'Identifier' && (node.init.name === 'eval' || node.init.name === 'require')) {
        push('critical', 'restricted-alias', `Aliasing '${node.init.name}' to a new name is banned — this is a common trick to dodge name-based scanning.`, node);
      }
    },

    // ------------------------------------------------------------------
    // Bare references to process/global/globalThis/__dirname/__filename.
    // Extensions are never given these in the sandbox; code that reaches
    // for them anyway is either broken or probing for an escape.
    // ------------------------------------------------------------------
    Identifier(node: any, state: any, ancestors: any[]) {
      if (!RESTRICTED_GLOBALS.has(node.name) || node.name === 'require') return; // require handled above w/ more context
      const parent = ancestors[ancestors.length - 2];
      // Skip cases where this identifier is a property name (obj.process) or a declaration itself
      if (parent?.type === 'MemberExpression' && parent.property === node && !parent.computed) return;
      if (parent?.type === 'Property' && parent.key === node) return;
      push('warning', 'restricted-global-reference', `Reference to restricted global '${node.name}' found. This isn't provided by the extension sandbox — if this isn't dead code, it may be probing for a sandbox escape.`, node);
    },

    // ------------------------------------------------------------------
    // Suspiciously long base64-looking string literals — cheap obfuscation heuristic
    // ------------------------------------------------------------------
    Literal(node: any) {
      if (typeof node.value === 'string' && looksLikeBase64Blob(node.value)) {
        push('warning', 'suspicious-encoded-literal', 'A large base64-like string literal was found. If this decodes to executable code, manual review is recommended.', node);
      }
    },
  });

  return violations;
}

// ============================================================================
// Convenience wrapper used by the upload route — scans every file and
// produces one summary object ready to send back to the uploader.
// ============================================================================
export function scanExtensionFiles(files: { name: string; code: string }[], manifestPermissions: string[]): ScanSummary {
  const results: FileScanResult[] = files.map(({ name, code }) => ({
    file: name,
    violations: scanExtensionCode(code, manifestPermissions),
  }));

  const criticalCount = results.reduce((n, r) => n + r.violations.filter(v => v.severity === 'critical').length, 0);
  const warningCount = results.reduce((n, r) => n + r.violations.filter(v => v.severity === 'warning').length, 0);

  return {
    passed: criticalCount === 0,
    criticalCount,
    warningCount,
    results: results.filter(r => r.violations.length > 0),
  };
}