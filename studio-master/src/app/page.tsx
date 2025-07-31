import { Dashboard } from '@/components/dashboard';
import { Logo } from '@/components/icons/logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-7xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-2xl md:text-3xl font-headline tracking-wider bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            QuantumProxy AI-X
          </h1>
        </div>
      </header>
      <main className="w-full max-w-7xl">
        <Dashboard />
      </main>
      <footer className="w-full max-w-7xl mt-8 text-center text-muted-foreground text-sm">
        <p>QuantumProxy AI-X Ultimate. Secure. Fast. Intelligent.</p>
      </footer>
    </div>
  );
}
