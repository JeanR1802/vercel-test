// app/actions.ts
'use server';

import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function createStoreAction(formData: FormData) {
  const slug = formData.get('slug') as string;
  console.log('🚀 Acción createStoreAction iniciada. Slug recibido:', slug);

  if (!slug || !/^[a-z0-9\-]+$/.test(slug)) {
    console.error('❌ ERROR: El slug es inválido o está vacío.');
    // Simplemente lanzamos un error o retornamos, pero sin devolver un objeto
    return;
  }
  console.log('✅ Slug es válido.');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  console.log('🔍 Verificando si el slug ya existe en Supabase...');
  const { data: existingStore } = await supabase
    .from('Store')
    .select('slug')
    .eq('slug', slug)
    .single();

  console.log('📝 Resultado de la verificación (si es null, está libre):', existingStore);

  if (existingStore) {
    console.error('❌ ERROR: El slug ya está en uso. Deteniendo la acción.');
    // CORRECCIÓN: No devolvemos un objeto, solo paramos la ejecución.
    return; 
  }

  console.log('➕ Intentando insertar nueva tienda en Supabase...');
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
    console.error('❌ ERROR de Supabase al insertar:', error);
    // CORRECCIÓN: No devolvemos un objeto.
    return;
  }

  const domain = process.env.NODE_ENV === 'production' 
    ? 'tudominio.com'
    : 'localhost:3000';
  
  const newUrl = `http://${slug}.${domain}`;
  console.log(`✅ Tienda creada con éxito. Redirigiendo a: ${newUrl}`);
  
  redirect(newUrl);
}