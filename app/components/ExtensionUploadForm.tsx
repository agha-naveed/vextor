"use client";
import { useState } from "react";

export default function ExtensionUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [message, setMessage] = useState("");
  const [violations, setViolations] = useState<{ file: string; issues: string[] }[]>([]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setStatus("IDLE");
    setViolations([]);

    const formData = new FormData();
    formData.append("extension", file);

    try {
      const response = await fetch("/api/extensions/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("ERROR");
        setMessage(data.message || "Upload failed.");
        if (data.violations) setViolations(data.violations);
      } else {
        setStatus("SUCCESS");
        setMessage(`Success! ${data.manifest.name} v${data.manifest.version} published.`);
      }
    } catch (error) {
      setStatus("ERROR");
      setMessage("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#06070a]/80 shadow-xl shadow-black/5 dark:shadow-none overflow-hidden backdrop-blur-2xl transition-colors duration-300 w-full mt-8">
      
      {/* MONOCHROME TERMINAL WINDOW CHROME */}
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3.5 bg-neutral-50/80 dark:bg-white/[0.02] border-b border-neutral-200 dark:border-white/10 transition-colors">
        <span className="h-2.5 w-2.5 rounded-full border border-neutral-300 dark:border-white/20 bg-transparent" />
        <span className="h-2.5 w-2.5 rounded-full border border-neutral-300 dark:border-white/20 bg-transparent" />
        <span className="h-2.5 w-2.5 rounded-full border border-neutral-300 dark:border-white/20 bg-transparent" />
        <span className="ml-3 font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-wide">
          vextor — publish extension
        </span>
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight transition-colors">Publish extension</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 transition-colors">
          Upload a package to run it through the security scanner before it goes live.
        </p>

        <form onSubmit={handleUpload} className="space-y-6">
          <label
            htmlFor="extension-file"
            className="group relative block cursor-pointer rounded-2xl border border-dashed border-neutral-300 dark:border-white/20 bg-transparent px-6 py-12 text-center transition-all hover:border-neutral-900 dark:hover:border-white"
          >
            {loading && (
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-neutral-900/5 dark:via-white/10 to-transparent animate-[scan_1.4s_linear_infinite]" />
              </span>
            )}

            <input
              id="extension-file"
              type="file"
              accept=".zip,.vsix"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="sr-only"
            />

            <svg
              className="mx-auto mb-4 h-8 w-8 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 16V4m0 0L7 9m5-5l5 5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {file ? (
              <p className="font-mono text-sm font-medium text-neutral-900 dark:text-white transition-colors">{file.name}</p>
            ) : (
              <>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors">Drop a .zip or .vsix, or click to browse</p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500 transition-colors">Scanned automatically on upload</p>
              </>
            )}
          </label>

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md"
          >
            {loading ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-neutral-900 animate-pulse" />
                Scanning code…
              </>
            ) : (
              "Upload & scan extension"
            )}
          </button>
        </form>

        {/* SUCCESS MESSAGE */}
        {status === "SUCCESS" && (
          <div className="mt-6 rounded-xl border border-green-500/20 bg-green-50 dark:bg-green-500/10 px-4 py-3 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">{message}</p>
          </div>
        )}

        {/* SECURITY VIOLATIONS UI */}
        {status === "ERROR" && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-500/10 p-4 sm:p-5 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">{message}</p>

            {violations.length > 0 && (
              <div className="mt-4 space-y-3 max-h-64 overflow-y-auto pr-1">
                {violations.map((v, idx) => (
                  <div key={idx} className="rounded-xl bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 p-3 sm:p-4">
                    <p className="font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 pb-2 border-b border-neutral-200 dark:border-white/10">
                      {v.file}
                    </p>
                    <ul className="space-y-1.5">
                      {v.issues.map((issue, i) => (
                        <li key={i} className="flex gap-2 text-xs text-red-600 dark:text-red-400 font-mono">
                          <span className="text-red-600/50 dark:text-red-400/50 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}