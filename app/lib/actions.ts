// app/lib/actions.ts
'use server';

import { auth } from '@/auth';
import { sql } from '@vercel/postgres'; 
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth'; 
import { AuthError } from 'next-auth';

/**
 * Security Guard Helper: Validates a live owner session before database interaction
 */
async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Not authenticated');
  }
  return session;
}

/**
 * Create a Brand New Project Record
 */
export async function createProject(formData: FormData) {
  await requireOwnerSession();

  // Extract clean string primitive variables out of the untyped FormData object matrix
  const title = (formData.get('title') || '') as string;
  const description = (formData.get('description') || '') as string;
  const imageUrl = (formData.get('imageUrl') || '') as string;

  // Execute parameter injection query securely using your active database driver [1.11]
  await sql`
    INSERT INTO projects (title, description, imageUrl) 
    VALUES (${title}, ${description}, ${imageUrl})
  `;

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

/**
 * Update an Existing Project Record
 */
export async function updateProject(id: string, formData: FormData) {
  await requireOwnerSession();

  const title = (formData.get('title') || '') as string;
  const description = (formData.get('description') || '') as string;
  const imageUrl = (formData.get('imageUrl') || '') as string;


  await sql`
    UPDATE projects 
    SET title = ${title}, description = ${description}, imageUrl = ${imageUrl} 
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}


export async function deleteProject(id: string) {
  await requireOwnerSession();

  // Execute database record row removal query [1.11]
  await sql`
    DELETE FROM projects 
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/projects');
}

export async function authenticate(
  prevState: string | undefined, 
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid business email or system password configuration.';
        default:
          return 'Something went wrong. Access clearance denied.';
      }
    }

    throw error;
  }
}