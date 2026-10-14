"use client"
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-[var(--text)]">
      <p className="text-[var(--error)]">Something went wrong</p>
      <button onClick={() => reset()} className="rounded-full bg-[var(--primary)] text-[var(--primary-ink)] px-4 py-2">Try again</button>
    </div>
  )
}
