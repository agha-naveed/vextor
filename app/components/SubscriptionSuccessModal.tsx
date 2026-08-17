import { HiOutlineCheckCircle } from "react-icons/hi2";
import { FiArrowRightCircle } from "react-icons/fi";
import { GoZap } from "react-icons/go";

export default function SubscriptionSuccessModal({ onClose, onLaunchApp }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/20 bg-zinc-950 p-6 shadow-2xl text-zinc-100 text-center">
        
        {/* Glow Badge */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
          <GoZap className="h-7 w-7 fill-emerald-400/20 text-emerald-400" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-white mb-2">
          Subscription Activated!
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-zinc-400 mb-6">
          You are now on <span className="font-semibold text-emerald-400">Vextor Pro</span>. Your AI limits and multi-file refactoring capabilities are live.
        </p>

        {/* Feature Unlocked List */}
        <div className="space-y-2.5 rounded-xl bg-zinc-900/60 p-4 border border-zinc-800/80 text-left text-xs mb-6">
          <div className="flex items-center gap-2 text-zinc-300">
            <HiOutlineCheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>500 Fast Premium AI Requests per month</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <HiOutlineCheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Multi-file agentic code generation & refactoring</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <HiOutlineCheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Full repository semantic indexing</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onLaunchApp || onClose}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/20"
        >
          <span>Launch Vextor IDE</span>
          <FiArrowRightCircle className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}