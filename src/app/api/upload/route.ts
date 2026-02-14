import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        // 1. Intenta Cargar en Supabase (Nube)
        if (supabase) {
            const filePath = `uploads/${fileName}`;
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, buffer, {
                    contentType: file.type || 'image/jpeg',
                    upsert: true
                });

            if (uploadError) {
                console.error("Error Supabase:", uploadError);
                return NextResponse.json({ error: `Error Supabase: ${uploadError.message}` }, { status: 500 });
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            return NextResponse.json({ url: publicUrl });
        }

        // 2. Fallback para Desarrollo Local (Solo si no hay Supabase)
        if (process.env.NODE_ENV === 'development') {
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePathLocal = path.join(uploadDir, fileName);
            fs.writeFileSync(filePathLocal, buffer);

            const fileUrl = `/uploads/${fileName}`;
            return NextResponse.json({ url: fileUrl });
        }

        return NextResponse.json({ error: 'Configuración de almacenamiento (Supabase) ausente o inválida.' }, { status: 500 });

    } catch (error: any) {
        console.error("Error general en la carga:", error);
        return NextResponse.json({ error: `Error interno: ${error.message}` }, { status: 500 });
    }
}
