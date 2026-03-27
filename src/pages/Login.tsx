import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/sonner";
import ThemeToggle from "@/components/ThemeToggle";
import { requestOtp, verifyOtp } from "@/lib/api";
import { setAuthToken } from "@/lib/authToken";

type Phase = "email" | "otp";

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
        // Redirect to login page (email view)
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
    } catch (err: any) {
      const msg = err?.message || "Failed to send OTP";
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
    } catch (err: any) {
      const msg = err?.message || "Authentication failed";
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
      <ThemeToggle className="absolute top-4 right-4 z-10 border border-border/60 bg-card/40 backdrop-blur-sm" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage your portfolio</p>
        </div>

        {phase === "email" && (
          <form onSubmit={handleRequestOtp} className="space-y-5 p-8 rounded-lg border border-border card-gradient">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={emailLoading}
              className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {emailLoading ? "Please wait..." : "Send OTP"}
            </button>
          </form>
        )}

        {phase === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-5 p-8 rounded-lg border border-border card-gradient">
            <div className="text-sm text-muted-foreground text-center">
              OTP sent to <span className="font-medium text-foreground">{email}</span>
            </div>

            <div className="flex items-center justify-center">
              <InputOTP
                value={otp}
                onChange={(val) => setOtp(val)}
                maxLength={6}
                containerClassName="justify-center gap-3"
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              Expires in <span className="font-mono text-foreground">{formatSeconds(remainingSeconds)}</span>
            </div>

            <button
              type="submit"
              disabled={!canVerify}
              className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
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
