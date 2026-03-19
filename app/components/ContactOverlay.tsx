"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { sendEmail } from "../actions";
import { IoCloseOutline, IoWarningOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { LuFingerprint, LuSend, LuTerminal } from "react-icons/lu";
import { TbActivity } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";

interface ContactOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactOverlay({ isOpen, onClose }: ContactOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const [userData, setUserData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const showToast = status === "success" || status === "error";

    useGSAP(() => {
        if (isOpen) {
            const tl = gsap.timeline();

            tl.to(overlayRef.current, {
                display: "flex",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            })
                .fromTo(cardRef.current,
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
                    "-=0.2"
                );

            document.body.style.overflow = "hidden";
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                display: "none",
                duration: 0.3,
                onComplete: () => { document.body.style.overflow = "auto"; }
            });
        }
    }, { dependencies: [isOpen] });

    async function sendData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        console.log(userData)
        const result = await sendEmail(userData);

        if (result.success) {
            setStatus("success");
            setUserData({ name: "", email: "", message: "" });
            setTimeout(() => {
                setStatus("idle");
                onClose();
            }, 2500);
        } else {
            setStatus("error");
            setTimeout(() => {
                setStatus("idle");
            }, 3000);
        }
    }

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-10000 hidden items-center justify-center bg-slate-900/40 dark:bg-zinc-950/70 backdrop-blur-3xl opacity-0"
        >
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className={`fixed top-10 left-1/2 -translate-x-1/2 z-99999 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showToast
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
                    }`}
            >
                <div className={`flex items-center gap-3 px-6 py-4 rounded-full backdrop-blur-xl border shadow-2xl ${status === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 shadow-rose-500/10"
                    }`}>
                    {status === "success" ? (
                        <FaCheck className="w-5 h-5" />
                    ) : (
                        <IoWarningOutline className="w-5 h-5" />
                    )}
                    <span className="text-sm font-mono font-bold tracking-wide">
                        {status === "success" ? "Message Sent" : "Send Failed"}
                    </span>
                </div>
            </div>


            <div
                ref={cardRef}
                className="relative w-full max-w-5xl mx-6 bg-white dark:bg-[#090A0F] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 transition-colors duration-500"
            >
                <div className="md:col-span-4 bg-slate-50 dark:bg-[#0D0E14] p-10 border-r border-slate-200 dark:border-white/5 flex flex-col justify-between relative overflow-hidden transition-colors duration-500">
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-600/10 dark:bg-indigo-600/20 blur-[60px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <LuTerminal className="w-12 h-12 text-indigo-600 dark:text-indigo-500 mb-6" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mb-2 transition-colors">System Access</h2>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Direct Node // Syed Naveed Abbas</p>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-slate-200 dark:bg-white/5 transition-colors"><LuFingerprint className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /></div>
                            <div>
                                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Identity</div>
                                <div className="text-xs text-slate-900 dark:text-white font-mono transition-colors">SOLO_ARCHITECT</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-slate-200 dark:bg-white/5 transition-colors"><TbActivity className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /></div>
                            <div>
                                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Status</div>
                                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono transition-colors">ONLINE_READY</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-8 p-10 md:p-14 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:text-slate-600 dark:hover:text-white transition-colors"
                    >
                        <IoCloseOutline className="w-6 h-6 cursor-pointer" />
                    </button>

                    <form className="space-y-8" onSubmit={sendData}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Payload.Name</label>
                                <input
                                    required
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    placeholder="ENTER_NAME"
                                    className="w-full bg-transparent border-b border-slate-300 dark:border-white/10 py-3 text-slate-900 dark:text-white text-sm font-mono focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Payload.Return_Mail</label>
                                <input
                                    required
                                    type="email"
                                    value={userData.email}
                                    placeholder="ENTER_EMAIL"
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-slate-300 dark:border-white/10 py-3 text-slate-900 dark:text-white text-sm font-mono focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Payload.Message</label>
                            <textarea
                                required
                                value={userData.message}
                                placeholder="DESCRIBE_YOUR_VISION"
                                rows={4}
                                onChange={(e) => setUserData({ ...userData, message: e.target.value })}
                                className="w-full bg-transparent border-b border-slate-300 dark:border-white/10 py-3 text-slate-900 dark:text-white text-sm font-mono focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-800"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-8 pt-4">
                            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 dark:text-slate-600 uppercase tracking-widest">
                                <GoShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-500" /> Secure Protocol 2.0.4
                            </div>
                            <button
                                disabled={status === "sending"}
                                className="group px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-xl transition-all flex items-center gap-4 shadow-[0_0_30px_rgba(79,70,229,0.3)] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span>{status === "sending" ? "TRANSMITTING..." : "Transmit"}</span>
                                <LuSend className={`w-4 h-4 transition-transform ${status === "sending" ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}