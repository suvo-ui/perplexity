import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (event) => event.preventDefault();

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
                Start exploring
              </p>
              <h1 className="text-4xl font-bold leading-tight">
                A clearer path from question to answer.
              </h1>
              <p className="mt-5 leading-7 text-white/70">
                Join a focused workspace for research, discovery, and the ideas
                worth keeping.
              </p>
            </div>

            <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-white/80">
                Build on what you learn, one great question at a time.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#d97757]">
                Your thinking space
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
                Get started
              </span>
            </div>

            <header>
              <h1 className="text-3xl font-bold tracking-tight">
                Create an account
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Start exploring with a free Perplexity account.
              </p>
            </header>

            <form className="mt-9 space-y-6" onSubmit={handleSubmit}>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Full name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className="input input-bordered h-12 w-full border-white/15 bg-[#1c1f22] text-white placeholder:text-white/35 focus:border-[#d97757] focus:outline-[#d97757]"
                />
              </label>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Email address</span>
                <input
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength="8"
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
                <span className="text-xs text-white/55">
                  Use at least 8 characters.
                </span>
              </label>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Confirm password</span>
                <div className="relative">
                  <input
                    type={showConfirmation ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength="8"
                    required
                    className="input input-bordered h-12 w-full border-white/15 bg-[#1c1f22] pr-12 text-white placeholder:text-white/35 focus:border-[#d97757] focus:outline-[#d97757]"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost absolute right-0 top-0 h-12 min-h-0 w-12 rounded-l-none px-0 text-white/60 hover:bg-transparent hover:text-[#d97757]"
                    onClick={() => setShowConfirmation((current) => !current)}
                    aria-label={
                      showConfirmation ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmation ? (
                      <EyeOff className="size-5" aria-hidden="true" />
                    ) : (
                      <Eye className="size-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-5">
                <input
                  type="checkbox"
                  required
                  className="checkbox checkbox-sm mt-0.5 border-white/30 checked:border-[#d97757] checked:bg-[#d97757]"
                />
                <span>
                  I agree to the{" "}
                  <a
                    href="#terms"
                    className="font-medium text-[#b45d3f] underline-offset-4 hover:text-[#d97757]"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="font-medium text-[#b45d3f] underline-offset-4 hover:text-[#d97757]"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              <button
                type="submit"
                className="btn h-12 w-full border-0 bg-[#d97757] text-white hover:bg-[#bd6246]"
              >
                Create account{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#b45d3f] underline-offset-4 hover:text-[#d97757]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
