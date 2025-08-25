// app/actions.ts
'use server'; // <-- ¡ESTA LÍNEA ES LA MÁS IMPORTANTE!

import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

// El resto de tu código...
export async function createStoreAction(formData: FormData) {
  const slug = formData.get('slug') as string;

  // 1. Validar el slug
  if (!slug || !/^[a-z0-9\-]+$/.test(slug)) {
    throw new Error('Slug inválido.');
  }

  // 2. Conectar a Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 3. Verificar si el slug ya existe
  const { data: existingStore } = await supabase
    .from('Store')
    .select('slug')
    .eq('slug', slug)
    .single();

  if (existingStore) {
    console.error(`El slug "${slug}" ya está en uso.`);
    // En el futuro, aquí retornarás un error para mostrarlo en la UI
    return;
  }

  // 4. Insertar la nueva tienda
  const { error } = await supabase.from('Store').insert({
    slug: slug,
    name: `Tienda de ${slug}`,
    status: 'BUILT',
    heroTitle: 'Bienvenido a mi tienda',
    heroDescription: 'Aquí encontrarás productos increíbles.',
    primaryColor: '#0070f3',
    template: 'default'
  });

  if (error) {
    console.error('Error al crear la tienda:', error);
    // Aquí también deberías manejar el error en la UI
    return;
  }

  // 5. Redirigir al nuevo subdominio
  const domain = process.env.NODE_ENV === 'production' 
    ? 'tudominio.com' // Reemplaza con tu dominio real
    : 'localhost:3000';
  
  redirect(`http://${slug}.${domain}`);
}