import { Hero } from '@/components/sections/Hero';
import { Servicios } from '@/components/sections/Servicios';
import { Segmentos } from '@/components/sections/Segmentos';
import { ComoTrabajamos } from '@/components/sections/ComoTrabajamos';
import { SobreNosotros } from '@/components/sections/SobreNosotros';
import { FAQ } from '@/components/sections/FAQ';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Servicios />
      <Segmentos />
      <ComoTrabajamos />
      <SobreNosotros />
      <FAQ />
      <ContactCTA />
    </>
  );
}
