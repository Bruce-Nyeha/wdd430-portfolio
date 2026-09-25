'use client'
import Link from 'next/link';
import React from 'react';
import { deleteProject } from '@/app/lib/actions'; 

interface ProjectCardProps {
    id: number; 
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export default function ProjectCard({ id, title, description, technologies, link }: ProjectCardProps) {
    return (
        <article className="p-5 border-l-4 border-blue-600 bg-gray-50 rounded-xl shadow-xs flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{description}</p>
                <p className="text-xs text-gray-600 font-medium">
                    <strong className="text-gray-800 uppercase tracking-wider text-[10px]">Technologies:</strong> {technologies.join(", ")}
                </p>
                {link && (
                    <p className="mt-3">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                        >
                            View Project Link →
                        </a>
                    </p>
                )}
            </div>

            {/*CRUD INTERACTION CONTROLLER ROWS */}
            <div className="flex items-center gap-2 border-t border-gray-200/60 pt-4 mt-5 no-print">
                {/* Edit Button */}
                <Link
                    href={`/projects/${id}/edit`}
                    className="py-1.5 px-3 rounded-lg border border-gray-300 bg-white text-[11px] font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-100 shadow-2xs transition-all cursor-pointer"
                >
                    Edit
                </Link>

                {/* Delete Button Form */}
                <form action={deleteProject.bind(null, id)} className="inline">
                    <button
                        type="submit"
                        onClick={(e) => {
                            if (!confirm("Are you absolutely certain you want to purge this record listing asset log?")) {
                                e.preventDefault();
                            }
                        }}
                        className="py-1.5 px-3 rounded-lg bg-rose-50 border border-rose-200 text-[11px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-100 shadow-2xs transition-all cursor-pointer"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </article>
    );
}
