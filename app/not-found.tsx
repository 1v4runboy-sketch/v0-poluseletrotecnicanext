export default function NotFound(){
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <p className="opacity-70">A página que você procura não existe.</p>
      <a href="/" className="mt-2 px-3 py-1 rounded border">Voltar ao início</a>
    </main>
  );
}
