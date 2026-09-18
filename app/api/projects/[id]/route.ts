import { NextResponse, NextRequest } from "next/server";
import { getProjectById } from "@/app/lib/projects-db";

// Wrapped params inside a Promise type contract to allow safe 'await' execution
export async function GET(
    request: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    
    const resolvedParams = await context.params;
    const id = Number(resolvedParams.id);
    
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }
    
    const project = await getProjectById(id);
    if (!project) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
}
