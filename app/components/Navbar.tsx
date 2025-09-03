"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/images/logo.png"

export default function Navbar() {
    return (
        <nav className="fixed top-0 text-white flex justify-between w-full px-10 py-8">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Image src={logo} alt="Vextor AI Logo" className="w-[150px]" />
                </div>
                <ul className="flex gap-10">
                    <li>
                        <Link href="/">Docs</Link>
                    </li>
                    <li>
                        <Link href="/">Updates</Link>
                    </li>
                    <li>
                        <Link href="/">Blog</Link>
                    </li>
                    <li>
                        <Link href="/">FAQ</Link>
                    </li>
                </ul>
                <div className="relative inline-block z-10 group">
                    <div style={{transition: "0.2s linear"}} className="absolute inset-0 z-[-1] rounded-md blur-xl bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] opacity-0 group-hover:opacity-50"></div>

                    <button className="bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] py-[7px] px-[18px] rounded-md bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500 cursor-pointer text-white">
                        Download
                    </button>
                </div>
            </div>
        </nav>
    )
}