export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="p-10 rounded-4xl md:w-1/2 max-w-md border border-white/10">
        <div className="mx-auto">
          <h1 className="text-xl font-bold mb-4 text-center">
            エラーが発生しました
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            認証処理中にエラーが発生しました。
          </p>
        </div>
      </div>
    </main>
  )
}
