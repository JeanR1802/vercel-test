// app/_stores/[slug]/page.tsx
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

export const revalidate = 0;

async function getStoreData(slug: string) {
  // LOG: Muestra qué slug está buscando en la base de datos
  console.log(`🔍 Buscando datos en Supabase para el slug: "${slug}"`);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: store, error } = await supabase
    .from('Store')
    .select('*')
    .eq('slug', slug)
    .single();

  // LOG: Muestra qué datos y/o error devolvió Supabase
  console.log('📝 Datos recibidos de Supabase:', { store, error });

  if (error && error.code !== 'PGRST116') { // PGRST116 es el error "no rows found", que es esperado.
      console.error("❌ ERROR de Supabase al buscar tienda:", error);
  }

  return store;
}

export default async function StorePage({ params }: { params: { slug: string } }) {
  // LOG: Un separador para cada vez que se carga esta página
  console.log(`- - - - - - - - - -`);
  console.log(`🚀 Cargando página para el slug: "${params.slug}"`);

  const store = await getStoreData(params.slug);

  if (!store) {
    // LOG: Confirma si no encontró la tienda
    console.log('🤷‍♂️ Tienda no encontrada. Mostrando 404.');
    notFound();
  }
  
  // LOG: Confirma que encontró la tienda y va a renderizar
  console.log('✅ Tienda encontrada. Renderizando la página con estos datos:', store);

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
        <h2>Contenido de la tienda para el slug: &quot;{params.slug}&quot;</h2>
        <p>Aquí irían tus productos y demás información.</p>
      </main>
    </div>
  );
}