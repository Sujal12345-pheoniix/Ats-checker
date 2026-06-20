// Polyfill DOM globals needed by pdf-parse on the Node.js server runtime
if (typeof globalThis !== 'undefined') {
  if (!(globalThis as any).DOMMatrix) {
    (globalThis as any).DOMMatrix = class DOMMatrix {};
  }
  if (!(globalThis as any).ImageData) {
    (globalThis as any).ImageData = class ImageData {};
  }
  if (!(globalThis as any).Path2D) {
    (globalThis as any).Path2D = class Path2D {};
  }
}

import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
// Require the core parser directly to bypass unit testing code that causes build errors
const pdf = require('pdf-parse/lib/pdf-parse.js');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    let text = '';
    
    if (file.name.endsWith('.pdf')) {
      const data = await pdf(buffer);
      text = data.text;
    } else if (file.name.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (file.name.endsWith('.txt')) {
      text = buffer.toString('utf-8');
    } else {
      return NextResponse.json({ error: 'Unsupported file format. Please upload PDF, DOCX, or TXT.' }, { status: 400 });
    }

    // Clean up carriage returns and duplicate whitespaces
    const cleanedText = text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    return NextResponse.json({ text: cleanedText });
  } catch (error: any) {
    console.error('File parsing error:', error);
    return NextResponse.json({ error: 'Error parsing file: ' + (error.message || 'unknown error') }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
