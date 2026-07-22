import { useState, useEffect } from "react";
import { FiDownload, FiCheck, FiBox, FiTrash2 } from "react-icons/fi";

export default function Marketplace() {
  const [extensions, setExtensions] = useState([]);
  const [installedIds, setInstalledIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // Define your Vercel URL (use localhost for testing)
  const API_URL = process.env.NODE_ENV === "development" 
    ? "http://localhost:3000/api/extensions" 
    : "https://vextor.vercel.app/api/extensions";

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  const fetchMarketplaceData = async () => {
    setLoading(true);
    try {
      // 1. Get available extensions from Vercel
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.extensions) setExtensions(data.extensions);

      // 2. Ask Electron which extensions are already installed locally
      // This uses the getInstalledExtensions handler in preload.js
      const installed = await window.api.getInstalledExtensions();
      setInstalledIds(installed || []);
    } catch (error) {
      console.error("Failed to load marketplace:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInstall = async (extension) => {
    setInstallingId(extension.name);
    try {
      // 🚀 Triggers the IPC handler in electron.js to download & unzip
      // Passing the Cloudinary URL and the Extension ID
      const result = await window.api.installExtension({
        url: extension.downloadUrl,
        id: extension.name
      });

      if (result.success) {
        // Update local UI state to show it is installed
        setInstalledIds((prev) => [...prev, extension.name]);
      }
    } catch (error) {
      alert(`Installation failed: ${error.message}`);
    } finally {
      setInstallingId(null);
    }
  };

    // 🚀 THE NEW UNINSTALL HANDLER
    const handleUninstall = async (extensionId) => {
        const confirm = window.confirm(`Are you sure you want to uninstall ${extensionId}?`);
        if (!confirm) return;

        setProcessingId(extensionId);
        try {
            // Calls the pre-existing handler in your electron.js
            const result = await window.api.uninstallExtension(extensionId);
            
            if (result.success) {
            setInstalledIds((prev) => prev.filter(id => id !== extensionId));
            }
        } catch (error) {
            alert(`Uninstall failed: ${error.message}`);
        } finally {
            setProcessingId(null);
        }
    };

  if (loading) {
    return <div className="p-8 text-center text-zinc-400">Loading extensions...</div>;
  }

  return (
    <div className="p-6 h-full overflow-y-auto custom-scroll bg-[var(--theme-ui-bg)] text-[var(--theme-text)]">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiBox className="text-purple-500" />
        Extension Marketplace
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {extensions.map((ext) => {
          const isInstalled = installedIds.includes(ext.name);
          const isInstalling = installingId === ext.name;

          return (
            <div 
              key={ext._id} 
              className="border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4 rounded-xl shadow-sm hover:border-purple-500/50 transition-colors flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg truncate pr-2">{ext.name}</h3>
                <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                  v{ext.version}
                </span>
              </div>
              
              <p className="text-sm opacity-60 mb-4 line-clamp-2 flex-1">
                Permissions: {ext.permissions.length > 0 ? ext.permissions.join(', ') : 'None'}
              </p>

              {/* 🚀 SMART BUTTON LOGIC */}
              {isInstalled ? (
                <button
                  onClick={() => handleUninstall(ext.name)}
                  disabled={isProcessing}
                  className={`w-full py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-bold transition-all bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50
                    ${isProcessing ? "opacity-50 cursor-wait" : ""}
                  `}
                >
                  {isProcessing ? "Uninstalling..." : <><FiTrash2 /> Uninstall</>}
                </button>
              ) : (
                <button
                  onClick={() => handleInstall(ext)}
                  disabled={isProcessing}
                  className={`w-full py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-bold transition-all bg-purple-600 hover:bg-purple-500 text-white shadow-md
                    ${isProcessing ? "opacity-50 cursor-wait" : ""}
                  `}
                >
                  {isProcessing ? "Installing..." : <><FiDownload /> Install</>}
                </button>
              )}
            </div>
          );
        })}

        {extensions.length === 0 && (
          <div className="col-span-full text-center py-10 opacity-50">
            No extensions available yet.
          </div>
        )}
      </div>
    </div>
  );
}