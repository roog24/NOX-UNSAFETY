import { ReactNode } from 'react';

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-24 px-6 md:px-12 w-full max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12 border-l-4 border-zinc-500 pl-6">
      <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mt-3 text-zinc-400 font-mono text-sm uppercase tracking-widest">{subtitle}</p>}
    </div>
  );
}
