import type { ReactNode } from 'react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/shadcn/accordion';

export function FaqsSection() {
	return (
		<div className="mx-auto w-full max-w-3xl space-y-7 px-6">
			<div className="space-y-3 text-center">
				<h2 className="text-3xl font-[510] tracking-[-0.012em] md:text-4xl lg:text-5xl">
					Preguntas frecuentes
				</h2>
				<p className="text-storm-cloud max-w-2xl mx-auto md:text-lg">
					Lo que más nos preguntan antes de empezar a trabajar juntos. Si tu duda no
					está aquí, escríbenos.
				</p>
			</div>
			<Accordion
				type="single"
				collapsible
				className="bg-deep-slate w-full -space-y-px rounded-md ring-1 ring-charcoal-grey"
				defaultValue="item-1"
			>
				{questions.map((item) => (
					<AccordionItem
						value={item.id}
						key={item.id}
						className="relative border-x border-charcoal-grey first:rounded-t-md first:border-t last:rounded-b-md last:border-b"
					>
						<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 text-porcelain hover:no-underline">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="text-storm-cloud pb-4 px-4">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<p className="text-storm-cloud text-center">
				¿No encuentras tu respuesta?{' '}
				<a href="#contacto" className="text-aether-blue hover:underline">
					Escríbenos directamente
				</a>
				.
			</p>
		</div>
	);
}

type Question = {
	id: string;
	title: string;
	content: ReactNode;
};

const questions: Question[] = [
	{
		id: 'item-1',
		title: '¿Cuánto tarda en verse resultado?',
		content:
			'La mayoría de proyectos entregan impacto medible en 4–8 semanas. Los diagnósticos se cierran en una o dos sesiones.',
	},
	{
		id: 'item-2',
		title: '¿Qué hace Nexus diferente de otras agencias de IA?',
		content: (
			<div className="space-y-4">
				<p className="font-medium text-foreground">No somos:</p>
				<ul className="space-y-2">
					<li className="flex gap-2">
						<span aria-hidden="true">❌</span>
						<span>
							Una consultoría estratégica que te entrega PowerPoints y desaparece.
						</span>
					</li>
					<li className="flex gap-2">
						<span aria-hidden="true">❌</span>
						<span>
							Un reseller de herramientas SaaS genéricas como Zapier o Make.
						</span>
					</li>
					<li className="flex gap-2">
						<span aria-hidden="true">❌</span>
						<span>
							Un proveedor que hace proyectos puntuales sin mantenimiento posterior.
						</span>
					</li>
				</ul>
				<p>
					Somos tu{' '}
					<span className="text-foreground font-medium">partner de operaciones IA</span>:
					diseñamos, implementamos y mantenemos agentes que trabajan 24/7 para tu
					negocio, con soporte local y evolución continua.
				</p>
			</div>
		),
	},
	{
		id: 'item-3',
		title: '¿Qué tipo de empresas son ideales para Nexus?',
		content: (
			<div className="space-y-4">
				<p>
					Trabajamos con PYMEs españolas que tienen:
				</p>
				<ul className="list-disc space-y-2 pl-5">
					<li>
						Sobrecarga administrativa repetitiva (facturas, emails, documentación).
					</li>
					<li>Pérdida de oportunidades por falta de atención 24/7.</li>
					<li>Falta de control real del negocio en tiempo real.</li>
				</ul>
				<p>
					Nos especializamos en tres sectores:{' '}
					<span className="text-foreground font-medium">inmobiliarias</span>,{' '}
					<span className="text-foreground font-medium">
						clínicas (dentales, fisio, estéticas)
					</span>{' '}
					y{' '}
					<span className="text-foreground font-medium">
						servicios profesionales
					</span>{' '}
					(gestorías, despachos, consultoras pequeñas). Si tu sector no aparece,
					pregúntanos.
				</p>
			</div>
		),
	},
	{
		id: 'item-4',
		title: '¿Qué pasa con la protección de datos?',
		content:
			'Cumplimos RGPD de serie. Revisamos qué datos salen del entorno de tu empresa, firmamos los acuerdos necesarios y priorizamos soluciones que mantienen los datos sensibles bajo tu control.',
	},
	{
		id: 'item-5',
		title: '¿Trabajáis solo en Cataluña?',
		content:
			'Estamos en Vilanova i la Geltrú, pero trabajamos con empresas de toda España en remoto. Para proyectos grandes, nos desplazamos.',
	},
	{
		id: 'item-6',
		title: '¿Quién mantiene la solución después de implementarla?',
		content:
			'Te entregamos documentación, formación y un periodo de acompañamiento. Después puedes mantenerlo tú o seguir con nosotros como soporte continuado. Sin lock-in.',
	},
];
