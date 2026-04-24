import type { ContactInput } from './validations';

export function ContactEmail({ data }: { data: ContactInput }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#0b1020', lineHeight: 1.5 }}>
      <h2 style={{ margin: '0 0 16px' }}>Nuevo contacto desde solvra.es</h2>
      <p>
        <strong>Nombre:</strong> {data.name}
        <br />
        <strong>Email:</strong> {data.email}
        {data.company ? (
          <>
            <br />
            <strong>Empresa:</strong> {data.company}
          </>
        ) : null}
        {data.phone ? (
          <>
            <br />
            <strong>Teléfono:</strong> {data.phone}
          </>
        ) : null}
      </p>
      <p>
        <strong>Mensaje:</strong>
      </p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{data.message}</p>
    </div>
  );
}
