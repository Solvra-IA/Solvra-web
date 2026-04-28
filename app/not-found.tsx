import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Puede que el enlace esté roto o que la página haya cambiado de sitio.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
