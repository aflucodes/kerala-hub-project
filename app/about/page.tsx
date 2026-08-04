export default function Page() {
  return (
    <main className="min-h-screen w-full bg-background py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-card/70 p-10 shadow-xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-foreground">About Us</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Kerala Campus Hub connects student founders, IEDC chapters and the wider KSUM ecosystem. We surface local hackathons, grants and paid micro-projects to help students build real products.
          </p>
        </div>
      </div>
    </main>
  )
}
