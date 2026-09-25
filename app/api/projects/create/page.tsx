import React from "react";
import Link from 'next/link';
import { createProject } from "@/app/lib/action";

export default function CreateProjectPage(){
    return (
        <main className="max-w-xl mx-auto py-8 px-8 animate-fade-in">
            <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                    Add New Project Asset
                </h1>

                <form action={createProject} className="space-y-5">
                    <div>
                        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Project Title </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., E-Commerce Gateway API"
                        />

                        <div>
          <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            placeholder="Provide a detailed architectural description of the application summary (minimum 10 characters)..."
          />
        </div>

        <div>
          <label htmlFor="technologies" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Technologies (Comma-Separated)</label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., Next.js, TypeScript, Tailwind, Neon PostgreSQL"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Deployment / Repository Link (Optional)</label>
          <input
            id="link"
            name="link"
            type="url"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            placeholder="https://github.com..."
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
            className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            Save Project
          </button>
                    </div>
                </form>
            </div>
        </main>
    )
}