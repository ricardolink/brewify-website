import Link from "next/link";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier } = await params;
  const tierKey = tier.toLowerCase();
  const tierLabel = tierKey === "reserve" ? "Reserve Access" : "Curator Member";

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="text-xs uppercase tracking-[0.22em] text-brew-warm-gray">
          Checkout
        </p>
        <h1 className="text-2xl md:text-3xl font-medium">
          Coming soon — you&apos;re on the list
        </h1>
        <p className="text-sm text-brew-warm-gray">
          We&apos;re opening {tierLabel} soon. You&apos;ll hear from us.
        </p>
        <Link
          href="/membership"
          className="inline-block text-xs uppercase tracking-[0.18em] text-brew-warm-gray hover:text-brew-ivory transition-colors underline underline-offset-2"
        >
          Back to membership
        </Link>
      </div>
    </main>
  );
}
