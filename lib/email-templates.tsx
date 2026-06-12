import type { ContactInput } from './validations';
import { siteConfig } from './site-config';

export function ContactEmail({ data }: { data: ContactInput }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#0b1020', lineHeight: 1.5 }}>
      <h2 style={{ margin: '0 0 16px' }}>Nuevo contacto desde nexus-ia.es</h2>
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

export function ContactAutoresponderEmail({ name }: { name: string }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#0b1020', lineHeight: 1.6 }}>
      <h2 style={{ margin: '0 0 16px' }}>Hemos recibido tu solicitud</h2>
      <p>Hola {name},</p>
      <p>
        Gracias por contactar con {siteConfig.name}. Hemos recibido tu mensaje y te
        responderemos en menos de 24 horas laborables.
      </p>
      <p>
        Si tu consulta es urgente, puedes escribirnos directamente a{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <p style={{ marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
        — Equipo {siteConfig.name}
      </p>
    </div>
  );
}
