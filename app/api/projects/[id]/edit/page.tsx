// app/projects/[id]/edit/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateProject } from '@/app/lib/actions';
import { getProjectById } from '@/app/lib/projects-db'; 

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const numericId = parseInt(resolvedParams.id, 10);

  if (isNaN(numericId)) {
    notFound();
  }

  
  const project = await getProjectById(String(numericId));

  if (!project) {
    notFound();
  }

  
  const boundUpdateAction = updateProject.bind(null, String(project.id));

  return (
    <main className="max-w-xl mx-auto py-8 px-4 animate-fade-in">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Modify Project Matrix</h1>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Editing Record Identity: #{project.id}</p>
      </div>

      <form action={boundUpdateAction} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Project Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={project.title}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={project.description}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="technologies" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Technologies (Comma-Separated)</label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            defaultValue={project.technologies.join(', ')}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Deployment Link (Optional)</label>
          <input
            id="link"
            name="link"
            type="url"
            defaultValue={project.link || ''}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/projects"
            className="py-2 px-4 rounded-xl border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-700 bg-white hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            Apply Changes
          </button>
        </div>
      </form>
    </main>
  );
}
