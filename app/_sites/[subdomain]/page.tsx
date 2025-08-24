export default function PaginaDePrueba({ params }: { params: { subdomain: string } }) {
  return (
    <div style={{
      display: 'grid',
      placeContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      fontSize: '2rem',
      backgroundColor: '#d1fae5',
      textAlign: 'center'
    }}>
      <h1>✅ PROYECTO DE PRUEBA FUNCIONANDO</h1>
      <p>Subdominio recibido:</p>
      <p style={{
        fontWeight: 'bold',
        color: '#065f46',
        border: '2px solid #065f46',
        padding: '1rem',
        marginTop: '1rem'
      }}>
        {params.subdomain}
      </p>
    </div>
  );
}