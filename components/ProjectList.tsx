// components/ProjectList.tsx
import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

interface ProjectListProps {
    projects?: Project[]; // Marked as optional to protect against undefined errors
}

export default function ProjectList({ projects = [] }: ProjectListProps) {
    // 🚀 FIXED: Defaulting 'projects' to an empty array ([]) prevents '.map()' from reading undefined
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {projects && projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))
            ) : (
                <div className="col-span-2 text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 uppercase tracking-wider font-semibold">
                    No Project Assets Loaded Inside Database Tables
                </div>
            )}
        </section>
    );
}
