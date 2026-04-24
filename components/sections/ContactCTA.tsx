import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/forms/ContactForm';

export function ContactCTA() {
  return (
    <section id="contacto" className="bg-slate-50 py-20 md:py-28">
      <Container as="div">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Cuéntanos tu caso
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Una sesión inicial de 30 minutos, gratuita y sin compromiso. Te diremos si
              podemos ayudarte y cómo.
            </p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>• Respuesta en menos de 24 horas laborables</li>
              <li>• Sin comerciales insistentes</li>
              <li>• En español, claro y directo</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
