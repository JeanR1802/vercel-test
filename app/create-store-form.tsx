'use client'; // Esto le dice a Next.js que es un componente interactivo

import { createStoreAction } from './actions';

export function CreateStoreForm() {
  return (
    <form action={createStoreAction} style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
      <input 
        type="text" 
        name="slug"
        placeholder="ej: mi-tienda-increible"
        required
        pattern="[a-z0-9\-]+" // Solo letras minúsculas, números y guiones
        style={{ padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button 
        type="submit"
        style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Crear Tienda
      </button>
    </form>
  );
}