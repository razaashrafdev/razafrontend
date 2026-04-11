import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/sonner";
import ThemeToggle from "@/components/ThemeToggle";
import { requestOtp, verifyOtp } from "@/lib/api";
import { setAuthToken } from "@/lib/authToken";

type Phase = "email" | "otp";

/** Har digit alag box — dark bg par border clearly visible */
const otpBox =
  "h-9 w-9 min-w-[2.25rem] !rounded-md border-2 !border-border/90 bg-background/85 text-center text-sm font-mono font-semibold tabular-nums tracking-widest text-foreground dark:!border-white/45 dark:bg-secondary/40";

function formatSeconds(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

const Login = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [emailLoading, setEmailLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const canVerify = useMemo(() => phase === "otp" && otp.trim().length === 6 && !otpLoading, [phase, otp, otpLoading]);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = window.setInterval(() => {
      const diffMs = expiresAt - Date.now();
      const diffSeconds = Math.ceil(diffMs / 1000);

      if (diffSeconds <= 0) {
        window.clearInterval(interval);
        setExpiresAt(null);
        setOtp("");
        setPhase("email");
        toast.error("OTP expired. Please enter email again.");
        navigate("/login", { replace: true });
      } else {
        setRemainingSeconds(diffSeconds);
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, [expiresAt, navigate]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);

    try {
      const res = await requestOtp(email);
      toast.success("OTP sent to your email.");
      setPhase("otp");
      const ttlSeconds = res.expiresIn || 60;
      setExpiresAt(Date.now() + ttlSeconds * 1000);
      setRemainingSeconds(ttlSeconds);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (err && typeof err === "object" && "message" in err) ? String((err as Record<string, unknown>).message) : "Failed to send OTP";
      if (String(msg).toLowerCase().includes("email is wrong")) {
        toast.error("Email is wrong");
      } else {
        toast.error(msg);
      }
      setPhase("email");
      setOtp("");
      setExpiresAt(null);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canVerify) return;

    setOtpLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      setAuthToken(res.token);
      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (err && typeof err === "object" && "message" in err) ? String((err as Record<string, unknown>).message) : "Authentication failed";
      if (String(msg).toLowerCase().includes("otp")) {
        toast.error("OTP is wrong");
      } else {
        toast.error(msg);
      }
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
      <ThemeToggle className="absolute top-4 right-4 z-10 border border-border/80 bg-card/40 backdrop-blur-sm dark:border-white/25" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage your portfolio</p>
        </div>

        {phase === "email" && (
          <form
            onSubmit={handleRequestOtp}
            className="space-y-5 p-6 sm:p-8 rounded-xl border-2 border-border/80 card-gradient shadow-sm dark:border-white/30"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/80 border-2 border-border/85 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary/70 transition-colors dark:border-white/40"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={emailLoading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {emailLoading ? "Please wait..." : "Send OTP"}
            </button>
          </form>
        )}

        {phase === "otp" && (
          <form
            onSubmit={handleVerifyOtp}
            className="space-y-5 p-6 sm:p-7 rounded-xl border border-border/70 card-gradient shadow-sm dark:border-white/22"
          >
            <div className="text-sm text-muted-foreground text-center leading-relaxed">
              OTP sent to <span className="font-medium text-foreground break-all">{email}</span>
            </div>

            <div className="flex justify-center px-1">
              <InputOTP
                value={otp}
                onChange={(val) => setOtp(val)}
                maxLength={6}
                containerClassName="flex justify-center"
              >
                <InputOTPGroup className="flex flex-wrap items-center justify-center gap-2">
                  <InputOTPSlot index={0} className={otpBox} />
                  <InputOTPSlot index={1} className={otpBox} />
                  <InputOTPSlot index={2} className={otpBox} />
                  <span
                    className="select-none px-0.5 text-base font-light leading-none text-muted-foreground sm:text-lg"
                    aria-hidden
                  >
                    -
                  </span>
                  <InputOTPSlot index={3} className={otpBox} />
                  <InputOTPSlot index={4} className={otpBox} />
                  <InputOTPSlot index={5} className={otpBox} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
              <span>
                Expires in{" "}
                <span className="font-mono tabular-nums text-foreground">{formatSeconds(remainingSeconds)}</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={!canVerify}
              className="w-full py-2.5 text-sm sm:text-base bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {otpLoading ? "Please wait..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => {
                setPhase("email");
                setOtp("");
                setExpiresAt(null);
                toast("Please enter your email again.");
              }}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
