"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/images/logo.png"

export default function Navbar() {
    return (
        <nav className="fixed top-0 text-white flex justify-between w-full px-10 py-8">
            <div className="container mx-auto flex justify-between">
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
            </div>
        </nav>
    )
}