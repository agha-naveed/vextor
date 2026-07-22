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
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900 text-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Publish Vextor Extension</h2>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="border-2 border-dashed border-zinc-600 p-8 text-center rounded-lg hover:border-purple-500 transition-colors">
          <input
            type="file"
            accept=".zip,.vsix"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
        </div>

        <button
          type="submit"
          disabled={!file || loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 font-bold rounded-lg transition-all"
        >
          {loading ? "Scanning Code..." : "Upload & Scan Extension"}
        </button>
      </form>

      {/* SUCCESS MESSAGE */}
      {status === "SUCCESS" && (
        <div className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500 rounded-lg text-emerald-400">
          <p className="font-bold">✅ {message}</p>
        </div>
      )}

      {/* SECURITY VIOLATIONS UI */}
      {status === "ERROR" && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="font-bold text-red-400 mb-2">🚨 {message}</p>
          
          {violations.length > 0 && (
            <div className="mt-4 space-y-4 max-h-64 overflow-y-auto custom-scroll pr-2">
              {violations.map((v, idx) => (
                <div key={idx} className="bg-black/40 p-3 rounded-md">
                  <p className="font-mono text-sm text-zinc-300 mb-2 border-b border-zinc-800 pb-1">
                    📄 {v.file}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {v.issues.map((issue, i) => (
                      <li key={i} className="text-xs text-red-300">{issue}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}