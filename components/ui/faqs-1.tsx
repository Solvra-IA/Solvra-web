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
				<h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
					Preguntas frecuentes
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto md:text-lg">
					Lo que más nos preguntan antes de empezar a trabajar juntos. Si tu duda no
					está aquí, escríbenos.
				</p>
			</div>
			<Accordion
				type="single"
				collapsible
				className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
				defaultValue="item-1"
			>
				{questions.map((item) => (
					<AccordionItem
						value={item.id}
						key={item.id}
						className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
					>
						<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground pb-4 px-4">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<p className="text-muted-foreground text-center">
				¿No encuentras tu respuesta?{' '}
				<a href="#contacto" className="text-primary hover:underline">
					Escríbenos directamente
				</a>
				.
			</p>
		</div>
	);
}

const questions = [
	{
		id: 'item-1',
		title: '¿Cuánto cuesta un proyecto con Solvra?',
		content:
			'Depende del alcance. Ofrecemos un diagnóstico inicial gratuito y, tras esa sesión, enviamos un presupuesto cerrado con entregables y plazos. Trabajamos con PYMEs, así que ajustamos el alcance a presupuestos realistas.',
	},
	{
		id: 'item-2',
		title: '¿Tengo que cambiar mis herramientas actuales?',
		content:
			'No. Integramos la IA con tu CRM, ERP, correo o agenda actuales. Solo proponemos cambios si una herramienta está bloqueando el resultado.',
	},
	{
		id: 'item-3',
		title: '¿Qué pasa con la protección de datos?',
		content:
			'Cumplimos RGPD de serie. Revisamos qué datos salen del entorno de tu empresa, firmamos los acuerdos necesarios y priorizamos soluciones que mantienen los datos sensibles bajo tu control.',
	},
	{
		id: 'item-4',
		title: '¿Cuánto tarda en verse resultado?',
		content:
			'La mayoría de proyectos entregan impacto medible en 4–8 semanas. Los diagnósticos se cierran en una o dos sesiones.',
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
	{
		id: 'item-7',
		title: '¿Qué tipo de empresas son vuestros clientes?',
		content:
			'PYMEs españolas en tres sectores: inmobiliarias, clínicas (dentales, fisio, estéticas) y servicios profesionales (gestorías, despachos, consultoras pequeñas). Si tu sector no aparece, pregúntanos.',
	},
];
