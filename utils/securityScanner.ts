import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

export function scanExtensionCode(sourceCode: string, manifestPermissions: string[]): string[] {
  const violations: string[] = [];

  try {
    // 1. Convert the raw JS into a readable tree structure
    const ast = acorn.parse(sourceCode, { ecmaVersion: 'latest', sourceType: 'module' });

    // 2. Walk through every single command in the code
    walk.simple(ast, {
      
      CallExpression(node: any) {
        if (node.callee.type === 'Identifier') {
          
          // BANNED: Dynamic Code Execution
          if (node.callee.name === 'eval') {
            violations.push("Critical: Usage of eval() is strictly banned.");
          }
          if (node.callee.name === 'setTimeout' && node.arguments[0]?.type === 'Literal') {
            violations.push("Critical: String execution via setTimeout is banned.");
          }
          
          // NATIVE MODULE CHECKS: Only allow if permissions are granted
          if (node.callee.name === 'require' && node.arguments[0]?.type === 'Literal') {
            const importName = node.arguments[0].value as string;
            
            // Absolutely Banned Modules (Can crash the OS or IDE)
            const bannedNatives: string[] = ['child_process', 'cluster', 'dgram', 'net'];
            if (bannedNatives.includes(importName)) {
              violations.push(`Critical: Native module '${importName}' is permanently banned.`);
            }

            // Conditionally Banned Modules (Requires Manifest Permission)
            if (['http', 'https', 'fs'].includes(importName)) {
               const requiredPermission = `use-${importName === 'https' ? 'http' : importName}`;
               if (!manifestPermissions.includes(requiredPermission)) {
                 violations.push(`Permission Denied: Module '${importName}' requires '${requiredPermission}' in vextor-manifest.json.`);
               }
            }
          }
        }
      },

      // BANNED: Hidden Execution Blocks
      NewExpression(node: any) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'Function') {
          violations.push("Critical: Usage of 'new Function()' is strictly banned.");
        }
      },

      // BANNED: Prototype Poisoning (Prevents crashing other extensions)
      AssignmentExpression(node: any) {
        if (node.left.type === 'MemberExpression') {
          const propertyName = node.left.property.name || node.left.property.value;
          if (propertyName === 'prototype' || propertyName === '__proto__') {
            violations.push("Critical: Modifying global prototypes is banned.");
          }
        }
      }
    });

  } catch (error) {
    // If the parser fails, the code is either broken or heavily obfuscated/encrypted
    violations.push("Parse Error: Code contains invalid syntax or is obfuscated.");
  }

  return violations;
}