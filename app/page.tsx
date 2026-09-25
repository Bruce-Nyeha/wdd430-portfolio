// app/page.tsx
import Link from 'next/link';
import ProjectList from '@/components/ProjectList';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-8 animate-fade-in">
      
      {/* Portfolio Intro Header Text Grid */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight sm:text-5xl uppercase">
          My Portfolio
        </h1>
        <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          I'm a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>

      {/* ➕ NEW ADD PROJECT ACTION CONTROLLER ROW */}
      <section className="flex justify-end pt-2 no-print">
        <Link
          href="/projects/create"
          className="inline-flex items-center justify-center py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          ➕ Add New Project
        </Link>
      </section>

      {/* Your Live Data Grid Row List Layout Component */}
      <section>
        <ProjectList />
      </section>

    </main>
  );
}
