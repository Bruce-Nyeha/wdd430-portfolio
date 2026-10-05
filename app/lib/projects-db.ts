import {sql} from '@vercel/postgres';

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    type: 'opensource' | 'school';
    technologies: string [];
    link?: string;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
    if (type){
        const {rows} = await sql<Project>`
        SELECT * FROM projects WHERE type = ${type} ORDER BY id`;
        return rows;
    }

    const {rows} = await sql<Project>`
    SELECT * FROM projects ORDER BY id`;
    return rows;
}

export async function getProjectById(id: string): Promise<Project | null>{
    const {rows} = await sql<Project>`
    SELECT * FROM projects WHERE id= ${id}`;
    return rows[0] ?? null;
}

export async function getUserByEmail(email: string) {
  try {
    
    const result = await sql`
      SELECT id, name, email, password, role 
      FROM users 
      WHERE email = ${email.toLowerCase()} 
      LIMIT 1
    `;
    
    
    if (!result.rows || result.rows.length === 0) {
      return null;
    }
    
    const user = result.rows[0];
   
    return {
      id: String(user.id),
      name: user.name,
      email: user.email,
      passwordHash: user.password, 
      role: user.role,
    };
  } catch (error) {
    console.error('Database exception failure inside get user by email module:', error);
    throw new Error('Failed to fetch user credentials record profile.');
  }
}