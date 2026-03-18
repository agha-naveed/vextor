"use client";

import { useRef, useState } from "react";
import { X, Send, ShieldCheck, Terminal, Fingerprint, Activity } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { sendEmail } from "../actions";

interface ContactOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactOverlay({ isOpen, onClose }: ContactOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState({ name: "", email: "", message: "" })
    const [status, setStatus] = useState("");
    useGSAP(() => {
        if (isOpen) {
            const tl = gsap.timeline();

            // 1. Darken and blur the entire website
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
        console.log(result)
        if (result.success) {
            setStatus("success");
        } else {
            alert("System Error: Transmission Failed.");
            setStatus("idle");
        }
    }
    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-10000 hidden items-center justify-center bg-zinc-950/70 backdrop-blur-3xl opacity-0"
        >
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={onClose} />

            <div
                ref={cardRef}
                className="relative w-full max-w-5xl mx-6 bg-[#090A0F] border border-white/10 rounded-4xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12"
            >
                {/* LEFT PANEL: SYSTEM ID (4 Columns) */}
                <div className="md:col-span-4 bg-[#0D0E14] p-10 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-600/20 blur-[60px] rounded-full" />

                    <div>
                        <Terminal className="w-10 h-10 text-indigo-500 mb-6" />
                        <h2 className="text-2xl font-bold text-white tracking-tighter mb-2">System Access</h2>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Direct Node // Syed Naveed Abbas</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-white/5"><Fingerprint className="w-4 h-4 text-indigo-400" /></div>
                            <div>
                                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Identity</div>
                                <div className="text-xs text-white font-mono">SOLO_ARCHITECT</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-white/5"><Activity className="w-4 h-4 text-emerald-500" /></div>
                            <div>
                                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Status</div>
                                <div className="text-xs text-emerald-400 font-mono">ONLINE_READY</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: THE INPUTS (8 Columns) */}
                <div className="md:col-span-8 p-10 md:p-14 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-slate-600 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <form className="space-y-8" onSubmit={sendData}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Payload.Name</label>
                                <input
                                    required
                                    type="text"
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    placeholder="ENTER_NAME"
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm font-mono focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Payload.Return_Mail</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="ENTER_EMAIL"
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm font-mono focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Payload.Message</label>
                            <textarea
                                required
                                placeholder="DESCRIBE_YOUR_VISION"
                                rows={4}
                                onChange={(e) => setUserData({ ...userData, message: e.target.value })}
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm font-mono focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-800"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-8 pt-4">
                            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4 text-indigo-500" /> Secure Protocol 2.0.4
                            </div>
                            <button className="group px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-xl transition-all flex items-center gap-4 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                                <span>Transmit</span>
                                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}