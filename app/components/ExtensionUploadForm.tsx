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
    <div className="max-w-2xl mx-auto rounded-lg border border-[#232838] bg-[#0B0E14] shadow-2xl shadow-black/40 overflow-hidden">
      {/* TERMINAL WINDOW CHROME */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#12161F] border-b border-[#232838]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF77]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5EEAD4]/70" />
        <span className="ml-3 font-mono text-xs text-[#7C8494] tracking-wide">
          vextor — publish extension
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#E4E7EC] mb-1">Publish extension</h2>
        <p className="text-sm text-[#7C8494] mb-5">
          Upload a package to run it through the security scanner before it goes live.
        </p>

        <form onSubmit={handleUpload} className="space-y-4">
          <label
            htmlFor="extension-file"
            className="group relative block cursor-pointer rounded-md border border-dashed border-[#2E3444] bg-[#0E1219] px-6 py-10 text-center transition-colors hover:border-[#5EEAD4]/60"
          >
            {loading && (
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#5EEAD4]/10 to-transparent animate-[scan_1.4s_linear_infinite]" />
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
              className="mx-auto mb-3 h-7 w-7 text-[#3A4256] group-hover:text-[#5EEAD4]/70 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 16V4m0 0L7 9m5-5l5 5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {file ? (
              <p className="font-mono text-sm text-[#5EEAD4]">{file.name}</p>
            ) : (
              <>
                <p className="text-sm text-[#B5BAC6]">Drop a .zip or .vsix, or click to browse</p>
                <p className="mt-1 text-xs text-[#5C6478]">Scanned automatically on upload</p>
              </>
            )}
          </label>

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-3 rounded-md bg-[#5EEAD4] text-[#0B0E14] font-semibold text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-[#0B0E14] animate-pulse" />
                Scanning code…
              </>
            ) : (
              "Upload & scan extension"
            )}
          </button>
        </form>

        {/* SUCCESS MESSAGE */}
        {status === "SUCCESS" && (
          <div className="mt-6 rounded-md border border-[#34D399]/30 bg-[#34D399]/[0.07] px-4 py-3">
            <p className="text-sm font-medium text-[#34D399]">{message}</p>
          </div>
        )}

        {/* SECURITY VIOLATIONS UI */}
        {status === "ERROR" && (
          <div className="mt-6 rounded-md border border-[#FB7185]/30 bg-[#FB7185]/[0.06] px-4 py-3">
            <p className="text-sm font-medium text-[#FB7185] mb-1">{message}</p>

            {violations.length > 0 && (
              <div className="mt-3 space-y-3 max-h-64 overflow-y-auto pr-1">
                {violations.map((v, idx) => (
                  <div key={idx} className="rounded-md bg-black/30 border border-[#232838] p-3">
                    <p className="font-mono text-xs text-[#B5BAC6] mb-2 pb-1.5 border-b border-[#232838]">
                      {v.file}
                    </p>
                    <ul className="space-y-1">
                      {v.issues.map((issue, i) => (
                        <li key={i} className="flex gap-2 text-xs text-[#FB7185]/90 font-mono">
                          <span className="text-[#FB7185]/50">•</span>
                          {issue}
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