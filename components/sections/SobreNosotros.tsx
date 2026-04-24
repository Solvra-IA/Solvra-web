import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/lib/site-config';

export function SobreNosotros() {
  return (
    <section id="nosotros" className="bg-slate-50 py-20 md:py-28">
      <Container as="div">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Tecnología con contexto de negocio
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              {siteConfig.name} nace como joint venture con{' '}
              <strong className="font-semibold text-slate-900">
                {siteConfig.partner.name}
              </strong>
              , una gestoría con décadas de experiencia acompañando a PYMEs desde{' '}
              {siteConfig.partner.location}.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Combinamos conocimiento técnico de IA con comprensión real de cómo funciona
              una pequeña o mediana empresa española: su fiscalidad, sus ritmos, sus
              obligaciones y sus límites.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              'Sin humo ni buzzwords',
              'Precios cerrados, sin sorpresas',
              'Cumplimiento RGPD de serie',
              'Soporte en español',
              'Integración con tus herramientas',
              'Acompañamiento real',
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
