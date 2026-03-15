"use client"
import Link from "next/link"
import logoLight from "@/images/light-logo.png"
import Image from "next/image"

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-5">
            <div>
                <Image src={logoLight} alt="Logo" className="w-40" />
            </div>
            <ul className="flex gap-5">
                <li>
                    <Link href={""}>Features</Link>
                </li>
                <li>
                    <Link href={""}>Docs</Link>
                </li>
            </ul>
        </nav>
    )
}

{/* <div>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div> */ }