// app/_stores/[slug]/page.tsx
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

// Forzar renderizado dinámico para que se ejecute por cada petición
export const revalidate = 0;

async function getStoreData(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: store, error } = await supabase
    .from('Store')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !store) {
    return null;
  }

  return store;
}

export default async function StorePage({ params }: { params: { slug: string } }) {
  const store = await getStoreData(params.slug);

  if (!store) {
    notFound(); // Muestra una página 404 si la tienda no existe
  }

  return (
    <div style={{ 
        fontFamily: 'sans-serif',
        '--primary-color': store.primaryColor || '#000'
      } as React.CSSProperties}
    >
      <header style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <h1>{store.heroTitle}</h1>
        <p>{store.heroDescription}</p>
        <small>Estás viendo la tienda: <b>{store.name}</b></small>
      </header>

      <main style={{ padding: '20px' }}>
        {/* 👇 LA LÍNEA CORREGIDA ESTÁ AQUÍ 👇 */}
        <h2>Contenido de la tienda para el slug: &quot;{params.slug}&quot;</h2>
        <p>Aquí irían tus productos y demás información.</p>
      </main>
    </div>
  );
}