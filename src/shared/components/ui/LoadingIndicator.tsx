import { Skeleton } from "./skeleton"

export default function LoadingIndicator() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">{[1, 2, 3, 4].map(i => <div key={i} className="flex items-center"><Skeleton className="w-8 h-8 rounded-full" />{i < 4 && <Skeleton className="w-6 h-0.5 mx-1" />}</div>)}</div>
          <Skeleton className="w-16 h-4" />
        </div>
      </header>
      <main className="flex-1 px-4 py-4 max-w-lg mx-auto w-full space-y-3">{[1, 2, 3, 4].map(i => <div key={i} className="border rounded-lg p-4 space-y-2"><Skeleton className="h-5 w-40" /><Skeleton className="h-4 w-24" /></div>)}</main>
    </div>
  )
}
