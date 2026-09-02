import { useState } from "react";
import { Link } from "react-router";

const PasswordVisibilityIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
    {visible ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.8 10.8 0 0 1 12 4c5.5 0 9.3 4.3 10 8-.2 1.1-.7 2.2-1.4 3.1M6.2 6.2C4.4 7.7 3.2 9.9 2 12c.9 4 4.5 8 10 8 1.4 0 2.8-.3 4-.8" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (event) => event.preventDefault();

  return (
    <main className="min-h-screen bg-base-200 px-4 py-8 sm:p-10 lg:grid lg:place-items-center">
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-base-100 shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden overflow-hidden bg-neutral p-12 text-neutral-content lg:block">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">P</span>
              perplexity
            </div>

            <div className="my-auto max-w-sm">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Start exploring</p>
              <h1 className="text-4xl font-bold leading-tight">A clearer path from question to answer.</h1>
              <p className="mt-5 leading-7 text-neutral-content/70">Join a focused workspace for research, discovery, and the ideas worth keeping.</p>
            </div>

            <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-neutral-content/80">Build on what you learn, one great question at a time.</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">Your thinking space</p>
            </div>
          </div>
        </aside>

        <div className="p-8 sm:p-14">
          <div className="mx-auto max-w-sm">
            <div className="mb-10 flex items-center justify-between lg:hidden">
              <span className="flex items-center gap-2 text-lg font-bold tracking-tight"><span className="grid size-8 place-items-center rounded-lg bg-primary text-sm text-primary-content">P</span>perplexity</span>
              <span className="badge badge-primary badge-outline">Get started</span>
            </div>

            <header>
              <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
              <p className="mt-2 text-sm text-base-content/60">Start exploring with a free Perplexity account.</p>
            </header>

            <form className="mt-9 space-y-6" onSubmit={handleSubmit}>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Full name</span>
                <input type="text" name="name" placeholder="Your name" autoComplete="name" required className="input input-bordered h-12 w-full focus:input-primary" />
              </label>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Email address</span>
                <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required className="input input-bordered h-12 w-full focus:input-primary" />
              </label>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Password</span>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a password" autoComplete="new-password" minLength="8" required className="input input-bordered h-12 w-full pr-12 focus:input-primary" />
                  <button type="button" className="btn btn-ghost absolute right-0 top-0 h-12 min-h-0 w-12 rounded-l-none px-0 text-base-content/60 hover:bg-transparent hover:text-primary" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}><PasswordVisibilityIcon visible={showPassword} /></button>
                </div>
                <span className="text-xs text-base-content/55">Use at least 8 characters.</span>
              </label>
              <label className="grid w-full gap-2">
                <span className="text-sm font-semibold">Confirm password</span>
                <div className="relative">
                  <input type={showConfirmation ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" autoComplete="new-password" minLength="8" required className="input input-bordered h-12 w-full pr-12 focus:input-primary" />
                  <button type="button" className="btn btn-ghost absolute right-0 top-0 h-12 min-h-0 w-12 rounded-l-none px-0 text-base-content/60 hover:bg-transparent hover:text-primary" onClick={() => setShowConfirmation((current) => !current)} aria-label={showConfirmation ? "Hide password" : "Show password"}><PasswordVisibilityIcon visible={showConfirmation} /></button>
                </div>
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-5">
                <input type="checkbox" required className="checkbox checkbox-primary checkbox-sm mt-0.5" />
                <span>I agree to the <a href="#terms" className="link link-primary font-medium">Terms of Service</a> and <a href="#privacy" className="link link-primary font-medium">Privacy Policy</a>.</span>
              </label>
              <button type="submit" className="btn btn-primary h-12 w-full">Create account <span aria-hidden="true">→</span></button>
            </form>

            <div className="divider my-8 text-xs text-base-content/45">OR CONTINUE WITH</div>
            <button type="button" className="btn btn-outline h-12 w-full gap-3"><span className="text-lg font-bold text-[#4285f4]">G</span> Google</button>
            <p className="mt-9 text-center text-sm text-base-content/60">Already have an account? <Link to="/login" className="link link-primary font-semibold">Sign in</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
