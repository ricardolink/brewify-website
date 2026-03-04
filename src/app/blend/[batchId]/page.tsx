import Link from "next/link";

export default async function BlendPage({
  params,
}: {
  params: Promise<{ batchId: string }>;
}) {
  const { batchId } = await params;

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.22em] text-brew-warm-gray">
          Blend {batchId}
        </p>
        <h1 className="text-2xl md:text-3xl font-medium">
          Order this blend
        </h1>
        <p className="text-sm text-brew-warm-gray">
          Checkout for pre-designed blends is coming soon.
        </p>
        <Link
          href="/feed"
          className="inline-block text-xs uppercase tracking-[0.18em] text-brew-warm-gray hover:text-brew-ivory transition-colors"
        >
          Back to feed
        </Link>
      </div>
    </main>
  );
}
