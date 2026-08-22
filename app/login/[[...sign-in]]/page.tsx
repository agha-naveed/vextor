"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs/legacy";
import { RiEyeCloseLine } from "react-icons/ri";
import { PiEye } from "react-icons/pi";
import { useAuth } from "@clerk/nextjs";

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

  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();

  // const redirectUrl = getSafeRedirectUrl(searchParams.get("redirect_url")) || "/dashboard";
  const rawRedirect = searchParams.get("redirect") || searchParams.get("redirect_url");
  const redirectUrl = getSafeRedirectUrl(rawRedirect) || "/dashboard";

  const completeAuthRedirect = () => {
    if (redirectUrl.startsWith("vextor://")) {
      window.location.href = redirectUrl;
    } else {
      // 🚀 Pass the final destination to the DB sync page!
      router.push(`/auth-success?origin=${encodeURIComponent(redirectUrl)}`);
    }
  };

  useEffect(() => {
    if (isAuthLoaded && isSignedIn) {
      completeAuthRedirect();
    }
  }, [isAuthLoaded, isSignedIn, redirectUrl]);

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
    <main className={`relative min-h-screen overflow-hidden bg-neutral-50 dark:bg-[#06070a] transition-all duration-700 ease-out flex items-center justify-center ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      
      {/* Neutral Ambient Glow Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] bg-neutral-400/10 dark:bg-white/[0.02] blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Technical Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10" style={{ backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`, backgroundSize: "40px 40px", color: "inherit" }} />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 py-12 flex justify-center">
        <section className="w-full max-w-[420px]">
          
          <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#06070a]/80 p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-black/5 dark:shadow-none">
            
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight transition-all duration-300">
              {pendingVerification ? "Verify Your Email" : isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 transition-all duration-300">
              {pendingVerification ? `We sent a 6-digit code to ${email}. Enter it below to finish creating your account.` : isSignup ? "Create your Vextor AI account." : "Sign in to continue building with Vextor AI."}
            </p>

            <form onSubmit={handleFormSubmit} noValidate className="mt-8 space-y-5">
              {!pendingVerification && (
                <>
                  <button
                    type="button"
                    onClick={() => signIn && signIn.authenticateWithRedirect({ strategy: "oauth_google", redirectUrl: "/sso-callback", redirectUrlComplete: `/auth-success?origin=${encodeURIComponent(redirectUrl)}` })}
                    className="flex h-12 cursor-pointer w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 hover:bg-neutral-100 dark:bg-white/5 dark:hover:bg-white/10 text-sm font-medium text-neutral-900 dark:text-white transition-all duration-200"
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
                    <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">OR</span>
                    <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
                  </div>

                  {isSignup && (
                    <div className="overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                      <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</label>
                      <input value={name} onChange={(e) => { setName(e.target.value); clearFieldError("name"); }} placeholder="John Doe" className={`h-12 w-full rounded-xl border bg-transparent px-4 text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-2 ${fieldErrors.name ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-neutral-200 dark:border-white/10 focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900/10 dark:focus:ring-white/10"}`} />
                      {fieldErrors.name && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{fieldErrors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }} placeholder="you@example.com" className={`h-12 w-full rounded-xl border bg-transparent px-4 text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-2 ${fieldErrors.email ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-neutral-200 dark:border-white/10 focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900/10 dark:focus:ring-white/10"}`} />
                    {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                      {!isSignup && <button type="button" className="text-xs text-neutral-900 dark:text-white font-medium hover:underline">Forgot?</button>}
                    </div>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }} className={`h-12 w-full rounded-xl border bg-transparent px-4 pr-12 text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-2 ${fieldErrors.password ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-neutral-200 dark:border-white/10 focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900/10 dark:focus:ring-white/10"}`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white" title={showPassword ? "Hide Password" : "Show Password"}>{showPassword ? <RiEyeCloseLine /> : <PiEye />}</button>
                    </div>
                    {fieldErrors.password && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{fieldErrors.password}</p>}
                    {isSignup && !fieldErrors.password && <p className="mt-1.5 text-xs text-neutral-500">At least 8 characters, one uppercase & one number.</p>}
                  </div>

                  {isSignup && (
                    <div className="overflow-hidden transition-all duration-300">
                      <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirm Password</label>
                      <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }} placeholder="••••••••" className={`h-12 w-full rounded-xl border bg-transparent px-4 pr-12 text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-2 ${fieldErrors.confirmPassword ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-neutral-200 dark:border-white/10 focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900/10 dark:focus:ring-white/10"}`} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white" title={showConfirmPassword ? "Hide Password" : "Show Password"}>{showConfirmPassword ? <RiEyeCloseLine /> : <PiEye />}</button>
                      </div>
                      {fieldErrors.confirmPassword && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{fieldErrors.confirmPassword}</p>}
                    </div>
                  )}

                  {!isSignup && (
                    <label className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
                      <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-neutral-300 dark:border-white/20 bg-transparent text-neutral-900 dark:text-white focus:ring-neutral-900/20 cursor-pointer" />
                      Remember me
                    </label>
                  )}
                </>
              )}


              <div id="clerk-captcha"></div>
              {pendingVerification && (
                <div className="overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                  <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Verification Code</label>
                  <input value={code} onChange={(e) => { setCode(e.target.value); clearFieldError("code"); }} placeholder="123456" inputMode="numeric" maxLength={6} className={`h-12 w-full rounded-xl border bg-transparent px-4 text-neutral-900 dark:text-white tracking-[0.4em] outline-none transition focus:ring-2 ${fieldErrors.code ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-neutral-200 dark:border-white/10 focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900/10 dark:focus:ring-white/10"}`} />
                  {fieldErrors.code && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{fieldErrors.code}</p>}
                  <button type="button" onClick={handleResendCode} className="mt-2 text-xs text-neutral-900 dark:text-white hover:underline transition font-medium">Resend code</button>
                </div>
              )}

              {error && <div className="rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">{error}</div>}

              <button disabled={loading} className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-white font-medium text-white dark:text-neutral-900 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-neutral-800 dark:hover:bg-neutral-200 cursor-pointer shadow-md">
                {loading ? pendingVerification ? "Verifying..." : isSignup ? "Creating Account..." : "Signing In..." : pendingVerification ? "Verify Email" : isSignup ? "Create Account" : "Continue"}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              {!pendingVerification && (
                <p className="pt-3 text-center text-sm text-neutral-600 dark:text-neutral-400">
                  {isSignup ? "Already have an account?" : "Don't have an account?"}
                  <button type="button" onClick={() => { setIsSignup(!isSignup); resetAuthState(); }} className="ml-2 font-bold text-neutral-900 dark:text-white hover:underline transition cursor-pointer">
                    {isSignup ? "Sign In" : "Create Account"}
                  </button>
                </p>
              )}

              {pendingVerification && (
                <p className="pt-3 text-center text-sm text-neutral-600 dark:text-neutral-400">
                  Entered the wrong email?
                  <button type="button" onClick={() => resetAuthState()} className="ml-2 font-bold text-neutral-900 dark:text-white hover:underline transition cursor-pointer">Go back</button>
                </p>
              )}
            </form>

          </div>
        </section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50 dark:bg-[#06070a]" />}>
      <LoginContent />
    </Suspense>
  );
}