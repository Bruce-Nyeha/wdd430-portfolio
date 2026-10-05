import React from 'react';
import { getProjectById } from '../../lib/projects-db'; 

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default async function ProjectPage({ params }: PageProps) {
  // Unpack your dynamic routing coordinates parameter cleanly first
  const resolvedParams = await params;
  const project = await getProjectById(String(resolvedParams.id));
  // Fallback safety layer: if a user inputs an ID that doesn't exist, display a clean alert notice
  if (!project) {
    return (
      <div className="text-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500">
        Requested Portfolio Project Resource Not Found
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto py-10 px-4 space-y-4">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase border-b border-gray-200 pb-2">
        {project.title}
      </h1>
      <p className="text-gray-700 text-sm leading-relaxed">
        {project.description}
      </p>
      {project.imageUrl && (
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden p-2 bg-white">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}
    </article>
  );
}
