"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs/legacy";
import { RiEyeCloseLine } from "react-icons/ri";
import { PiEye } from "react-icons/pi";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_REDIRECT = "/auth-success";

function getSafeRedirectUrl(raw: string | null): string {
  if (!raw) return DEFAULT_REDIRECT;
  if (raw.startsWith("vextor://")) return raw;
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return DEFAULT_REDIRECT;
}

function LoginContent() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isLoaded: isSignInLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();

  const redirectUrl = getSafeRedirectUrl(searchParams.get("redirect_url"));

  const completeAuthRedirect = () => {
    if (redirectUrl.startsWith("vextor://")) {
      window.location.href = redirectUrl;
    } else {
      router.push(redirectUrl);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const resetAuthState = () => {
    setError("");
    setFieldErrors({});
    setPendingVerification(false);
    setCode("");
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateLogin = () => {
    const errors: FieldErrors = {};
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignup = () => {
    const errors: FieldErrors = {};
    if (!name.trim()) {
      errors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Include at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Include at least one number.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password && confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCode = () => {
    const errors: FieldErrors = {};
    if (!code.trim()) {
      errors.code = "Enter the verification code.";
    } else if (!/^\d{6}$/.test(code.trim())) {
      errors.code = "Code should be 6 digits.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignInLoaded || !signIn) return;
    setError("");
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });
      if (result?.status === "complete") {
        await setActiveSignIn({ session: result.createdSessionId });
        completeAuthRedirect();
      } else {
        setError("Additional verification is required to sign in.");
      }
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        "Login failed. Please check your email and password."
      );
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignUpLoaded || !signUp) return;
    setError("");
    if (!validateSignup()) return;
    setLoading(true);
    try {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || undefined;

      await signUp.create({
        firstName,
        lastName,
        emailAddress: email.trim(),
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      const clerkError = err.errors?.[0];
      const message = clerkError?.longMessage || clerkError?.message || "Sign up failed. Please try again.";

      if (clerkError?.code === "form_password_pwned" || clerkError?.meta?.paramName === "password") {
        setFieldErrors((prev) => ({ ...prev, password: message }));
      } else if (clerkError?.code === "form_identifier_exists" || clerkError?.meta?.paramName === "email_address") {
        setFieldErrors((prev) => ({ ...prev, email: message }));
      } else {
        setError(message);
      }
    }
    setLoading(false);
  };

  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignUpLoaded || !signUp) return;
    setError("");
    if (!validateCode()) return;
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: code.trim() });
      if (result?.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        completeAuthRedirect();
      } else {
        setError("Verification could not be completed. Please try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Invalid or expired verification code.");
    }
    setLoading(false);
  };

  const handleResendCode = async () => {
    if (!isSignUpLoaded || !signUp) return;
    setError("");
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Could not resend the code. Please try again.");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isSignup) return handleLogin(e);
    if (pendingVerification) return handleVerifyEmail(e);
    return handleSignup(e);
  };

  return (
    <main className={`relative min-h-screen overflow-hidden bg-[#0B0F17] transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="absolute left-20 top-24 h-40 w-40 animate-pulse rounded-full bg-blue-500/20 blur-[80px]" />
      <div className="absolute bottom-32 right-32 h-52 w-52 animate-pulse rounded-full bg-violet-500/20 blur-[120px]" style={{ animationDuration: "5s" }} />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 animate-pulse rounded-full bg-cyan-400/20 blur-[90px]" style={{ animationDuration: "8s" }} />
      
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center py-20 px-8 lg:px-16">
        <section className="mx-auto w-full max-w-md lg:mx-0">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.15)]">
            <h2 className="text-3xl font-bold text-white transition-all duration-300">
              {pendingVerification ? "Verify Your Email" : isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="mt-2 text-gray-400 transition-all duration-300">
              {pendingVerification ? `We sent a 6-digit code to ${email}. Enter it below to finish creating your account.` : isSignup ? "Create your Vextor AI account." : "Sign in to continue building with Vextor AI."}
            </p>

            <form onSubmit={handleFormSubmit} noValidate className="mt-8 space-y-5">
              {!pendingVerification && (
                <>
                  <button
                    type="button"
                    onClick={() => signIn && signIn.authenticateWithRedirect({ strategy: "oauth_google", redirectUrl: "/sso-callback", redirectUrlComplete: redirectUrl })}
                    className="flex h-12 cursor-pointer w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.6 20H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z" />
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.3 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 35.7 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.5 39.5 16.2 44 24 44z" />
                      <path fill="#1976D2" d="M43.6 20H42V20H24v8h11.3c-1.1 3.2-3.4 5.7-6.6 7.2l6.3 5.2C39.6 36.8 44 31 44 24c0-1.3-.1-2.7-.4-4z" />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs uppercase tracking-widest text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {isSignup && (
                    <div className="overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                      <label className="mb-2 block text-sm text-gray-300">Full Name</label>
                      <input value={name} onChange={(e) => { setName(e.target.value); clearFieldError("name"); }} placeholder="John Doe" className={`h-12 w-full rounded-xl border bg-white/5 px-4 text-white outline-none transition focus:ring-2 ${fieldErrors.name ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}`} />
                      {fieldErrors.name && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">Email</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }} placeholder="you@example.com" className={`h-12 w-full rounded-xl border bg-white/5 px-4 text-white outline-none placeholder:text-gray-500 transition focus:ring-2 ${fieldErrors.email ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}`} />
                    {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between">
                      <label className="text-sm text-gray-300">Password</label>
                      {!isSignup && <button type="button" className="text-xs text-blue-400">Forgot?</button>}
                    </div>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }} className={`h-12 w-full rounded-xl border bg-white/5 px-4 pr-12 text-white outline-none placeholder:text-gray-500 transition focus:ring-2 ${fieldErrors.password ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-white" title={showPassword ? "Hide Password" : "Show Password"}>{showPassword ? <RiEyeCloseLine /> : <PiEye />}</button>
                    </div>
                    {fieldErrors.password && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.password}</p>}
                    {isSignup && !fieldErrors.password && <p className="mt-1.5 text-xs text-gray-500">At least 8 characters, one uppercase letter and one number.</p>}
                  </div>

                  {isSignup && (
                    <div className="overflow-hidden transition-all duration-300">
                      <label className="mb-2 block text-sm text-gray-300">Confirm Password</label>
                      <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }} placeholder="••••••••" className={`h-12 w-full rounded-xl border bg-white/5 px-4 pr-12 text-white outline-none transition focus:ring-2 ${fieldErrors.confirmPassword ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}`} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-white" title={showConfirmPassword ? "Hide Password" : "Show Password"}>{showConfirmPassword ? <RiEyeCloseLine /> : <PiEye />}</button>
                      </div>
                      {fieldErrors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.confirmPassword}</p>}
                    </div>
                  )}

                  {!isSignup && (
                    <label className="flex items-center gap-3 text-sm text-gray-400">
                      <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/10" />
                      Remember me
                    </label>
                  )}
                </>
              )}

              {pendingVerification && (
                <div className="overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                  <label className="mb-2 block text-sm text-gray-300">Verification Code</label>
                  <input value={code} onChange={(e) => { setCode(e.target.value); clearFieldError("code"); }} placeholder="123456" inputMode="numeric" maxLength={6} className={`h-12 w-full rounded-xl border bg-white/5 px-4 text-white tracking-[0.4em] outline-none transition focus:ring-2 ${fieldErrors.code ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}`} />
                  {fieldErrors.code && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.code}</p>}
                  <button type="button" onClick={handleResendCode} className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition">Resend code</button>
                </div>
              )}

              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}

              <button disabled={loading} className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30">
                {loading ? pendingVerification ? "Verifying..." : isSignup ? "Creating Account..." : "Signing In..." : pendingVerification ? "Verify Email" : isSignup ? "Create Account" : "Continue"}
                <span className="transition group-hover:translate-x-1">→</span>
              </button>

              {!pendingVerification && (
                <p className="pt-3 text-center text-sm text-gray-500">
                  {isSignup ? "Already have an account?" : "Don't have an account?"}
                  <button type="button" onClick={() => { setIsSignup(!isSignup); resetAuthState(); }} className="ml-2 font-medium text-blue-400 hover:text-blue-300 transition">
                    {isSignup ? "Sign In" : "Create Account"}
                  </button>
                </p>
              )}

              {pendingVerification && (
                <p className="pt-3 text-center text-sm text-gray-500">
                  Entered the wrong email?
                  <button type="button" onClick={() => resetAuthState()} className="ml-2 font-medium text-blue-400 hover:text-blue-300 transition">Go back</button>
                </p>
              )}
            </form>

            {/* 🔥 MOVED: Clerk Smart CAPTCHA mount point is now unconditionally rendered outside the form logic */}
            <div id="clerk-captcha" />
          </div>
        </section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0F17]" />}>
      <LoginContent />
    </Suspense>
  );
}