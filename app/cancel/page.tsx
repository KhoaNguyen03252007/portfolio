import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#0a0a0f] text-white">
      <div className="max-w-md w-full text-center bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-400">
          <XCircle size={36} />
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          The transaction was cancelled. No charges were made.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Return to Portfolio
        </Link>
      </div>
    </main>
  );
}
