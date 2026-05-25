"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();

  const score = Number(searchParams.get("score")) || 0;
  const total = Number(searchParams.get("total")) || 0;

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-xl border rounded-xl p-8">
             <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">
             Quiz Completed
           </h1>

           <p className="text-2xl font-semibold mb-8">
             Score: {score} / {total}
           </p>
         </div>

         <div className="space-y-4 mb-8">
           <div className="flex justify-between border p-3 rounded">
             <span>Percentage</span>
             <span>{percentage}%</span>
           </div>

           <div className="flex justify-between border p-3 rounded">             
            <span>Correct Answers</span>
            <span>{score}</span>
           </div>

           <div className="flex justify-between border p-3 rounded">
             <span>Incorrect Answers</span>
             <span>{total - score}</span>
           </div>
         </div>

         <div className="flex gap-4">
           <Link
             href="/"
             className="flex-1 text-center border rounded p-3 hover:bg-zinc-800 transition"
           >
             Back To Home
           </Link>

           <button
             onClick={() => window.history.back()}
             className="flex-1 border rounded p-3 hover:bg-zinc-800 transition"
           >
             Try Again
           </button>
         </div>
       </div>
     </main>
  );
}

