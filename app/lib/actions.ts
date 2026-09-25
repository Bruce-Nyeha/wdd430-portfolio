'use server';
import { string, z } from 'zod';
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { title } from 'process';

// connect to my database
const sql = neon(process.env.DATABASE_URL!);

// Schema Validation: Protects my database against sql injections

const ProjectFormSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    technologies: z.string().min(2)
});

export async function createProject(formdata: FormData){
    const raw = {
        title: formdata.get('title'),
        description: formdata.get('description'),
        technologies: formdata.get('technologies'),
    };

    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success){
        throw new Error('Invalid project input.');
    }

    const {title, description, technologies} = parsed.data;

    await sql `INSERT INTO projects (title, description, technologies)
    VALUES (${title}, ${description}, ${technologies})`;

    revalidatePath('/projects');
    redirect('/projects');
}

//Update an existing project record by Id
 
export async function updateProject(id: number, formdata: FormData){
    const raw = {
        title: formdata.get('title'),
        description: formdata.get('description'),
        technologies: formdata.get('technologies')
    };
    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success){
        throw new Error('Invalid project patch details')
    }

    const {title, description, technologies} = parsed.data;

    await sql `UPDATE projects 
    SET title = ${title}, description = ${description}, technologies = ${technologies}
    WHERE id = ${id}`;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: number){
    await sql`DELETE FROM projects WHERE id = ${id}`;

    revalidatePath('/projects');
}