import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Generate unique filename using built-in crypto (no extra package needed)
    const ext = path.extname(file.name) || '.jpg';
    const filename = `${crypto.randomUUID()}${ext}`;

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Write the file
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(path.join(uploadDir, filename), Buffer.from(arrayBuffer));

    // Return the public URL
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
