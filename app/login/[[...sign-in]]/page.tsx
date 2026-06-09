"use client"
import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    setIsReady(true)
  }, [])

  return (
    <div className={`flex justify-center my-[10vh] ${isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} duration-600 transition-all`}>
        <SignIn forceRedirectUrl="/auth-success" /> 
    </div>
  );
}