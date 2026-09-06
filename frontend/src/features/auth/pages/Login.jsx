import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      await handleLogin(payload);
    } catch (error) {
      console.error("Login failed:", error);
      return; // Exit the function if login fails
    }
    navigate("/"); // Redirect to the home page after successful login
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-[#0b0c0d] px-4 py-8 text-white sm:p-10 lg:grid lg:place-items-center">
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-[#141618] shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden overflow-hidden bg-[#080909] p-12 text-white lg:block">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d97757]/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-[#f3e8e0]/20 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <span className="grid size-10 place-items-center rounded-xl bg-[#d97757] text-white">
                P
              </span>
              perplexity
            </div>
            <div className="my-auto max-w-sm">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#d97757]">
                Welcome back
              </p>
              <h1 className="text-4xl font-bold leading-tight">
                Pick up where your curiosity left off.
              </h1>
              <p className="mt-5 leading-7 text-white/70">
                Search, discover, and keep every great idea in one focused
                workspace.
              </p>
            </div>
            <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-white/80">
                “The best place to turn a question into a clear next step.”
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#d97757]">
                — Perplexity community
              </p>
            </div>
          </div>
        </aside>

        <div className="p-8 sm:p-14">
          <div className="mx-auto max-w-sm">
            <div className="mb-10 flex items-center justify-between lg:hidden">
              <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
                <span className="grid size-8 place-items-center rounded-lg bg-[#d97757] text-sm text-white">
                  P
                </span>
                perplexity
              </span>
              <span className="badge border-[#d97757] text-[#b45d3f]">
                Welcome back
              </span>
            </div>
            <header>
              <h2 className="text-3xl font-bold tracking-tight">Sign in</h2>
              <p className="mt-2 text-sm text-white/60">
                Enter your details to access your account.
              </p>
            </header>

            <form className="mt-9 space-y-6" onSubmit={handleSubmit}>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Email address</span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="input input-bordered h-12 w-full border-white/15 bg-[#1c1f22] text-white placeholder:text-white/35 focus:border-[#d97757] focus:outline-[#d97757]"
                />
              </label>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Password</span>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="input input-bordered h-12 w-full border-white/15 bg-[#1c1f22] pr-12 text-white placeholder:text-white/35 focus:border-[#d97757] focus:outline-[#d97757]"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost absolute right-0 top-0 h-12 min-h-0 w-12 rounded-l-none px-0 text-white/60 hover:bg-transparent hover:text-[#d97757]"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" aria-hidden="true" />
                    ) : (
                      <Eye className="size-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </label>
              <div className="flex items-center justify-between gap-4 pt-1 text-sm">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border-white/30 checked:border-[#d97757] checked:bg-[#d97757]"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#forgot-password"
                  className="font-medium text-[#b45d3f] underline-offset-4 hover:text-[#d97757]"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="btn h-12 w-full border-0 bg-[#d97757] text-white hover:bg-[#bd6246]"
              >
                Sign in <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </form>

            <div className="divider my-8 text-xs text-white/45">
              OR CONTINUE WITH
            </div>
            <button
              type="button"
              className="btn h-12 w-full gap-3 border-white/15 bg-[#1c1f22] text-white hover:border-white/30 hover:bg-[#24272a]"
            >
              <span className="text-lg font-bold text-[#4285f4]">G</span> Google
            </button>
            <p className="mt-9 text-center text-sm text-white/60">
              New to Perplexity?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#b45d3f] underline-offset-4 hover:text-[#d97757]"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
