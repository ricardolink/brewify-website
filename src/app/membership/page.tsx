import fs from "fs";
import path from "path";
import Link from "next/link";
import type { FoundingMember } from "@/types/founding";

function getSpotsRemaining(): number {
  try {
    const dataPath = path.join(process.cwd(), "data", "founding-members.json");
    if (!fs.existsSync(dataPath)) return 100;
    const raw = fs.readFileSync(dataPath, "utf-8");
    const list = JSON.parse(raw) as FoundingMember[];
    return Math.max(0, 100 - list.length);
  } catch {
    return 100;
  }
}

export default function MembershipPage() {
  const spotsRemaining = getSpotsRemaining();

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-brew-warm-gray">
            Membership
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            Two ways in.
          </h1>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="border border-zinc-800/80 rounded-lg p-6 md:p-8 flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-brew-warm-gray mb-2">
              One-time
            </p>
            <h2 className="text-xl md:text-2xl font-medium mb-1">
              Reserve Access
            </h2>
            <p className="text-2xl md:text-3xl font-medium text-brew-ivory mb-6">
              $49{" "}
              <span className="text-sm font-normal text-brew-warm-gray">
                Founding Member — only 100 spots
              </span>
            </p>
            <ul className="text-sm text-brew-ivory/85 space-y-2 mb-8 flex-1">
              <li>Lifetime access to Brewify</li>
              <li>Assigned a permanent number in The 100</li>
              <li>Your blend featured on the homepage forever</li>
              <li>Earn points every time your blend is ordered</li>
              <li>5 invite tokens; friends get 50% off their first blend</li>
            </ul>
            <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray mb-4">
              {spotsRemaining} spots remaining
            </p>
            <Link
              href="/checkout/reserve"
              className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-3 text-xs uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
            >
              Coming soon — you&apos;re on the list
            </Link>
          </div>

          <div className="border border-zinc-800/80 rounded-lg p-6 md:p-8 flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-brew-warm-gray mb-2">
              Monthly
            </p>
            <h2 className="text-xl md:text-2xl font-medium mb-1">
              Curator Member
            </h2>
            <p className="text-2xl md:text-3xl font-medium text-brew-ivory mb-6">
              $29 <span className="text-sm font-normal text-brew-warm-gray">/ month</span>
            </p>
            <ul className="text-sm text-brew-ivory/85 space-y-2 mb-8 flex-1">
              <li>1 blend per month</li>
              <li>10 invite tokens</li>
              <li>Name in the public feed</li>
            </ul>
            <Link
              href="/checkout/curator"
              className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-3 text-xs uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
            >
              Coming soon — you&apos;re on the list
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
