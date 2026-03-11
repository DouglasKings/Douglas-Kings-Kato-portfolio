/**
 * app/projects/loading.tsx
 *
 * Next.js automatically shows this component while app/projects/[id]/page.tsx
 * is loading. The user sees a skeleton immediately on click instead of a
 * blank white screen, making the load FEEL instant even if it takes 1-2s.
 */

export default function ProjectLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-pulse">
      {/* Sticky nav skeleton */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="h-9 w-36 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="w-[120px]" />
        </div>
      </nav>

      {/* Hero skeleton */}
      <div className="bg-white dark:bg-slate-900 py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-5">
          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"
              />
            ))}
          </div>
          {/* Title */}
          <div className="h-14 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-2xl mx-auto" />
          <div className="h-10 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-2xl mx-auto" />
          {/* Tagline */}
          <div className="h-6 w-64 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto" />
        </div>
      </div>

      {/* Content skeletons */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-16">
        {/* Challenge / Solution cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-52 bg-red-100 dark:bg-red-950/20 rounded-3xl" />
          <div className="h-52 bg-emerald-100 dark:bg-emerald-950/20 rounded-3xl" />
        </div>

        {/* Architecture diagram */}
        <div className="space-y-4">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-3xl" />
        </div>

        {/* Key implementations */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl"
              />
            ))}
          </div>
        </div>

        {/* Impact section */}
        <div className="h-48 bg-indigo-200 dark:bg-indigo-900/30 rounded-3xl" />
      </div>
    </main>
  );
}
