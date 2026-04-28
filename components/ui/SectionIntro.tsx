import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SectionBadge } from '@/components/ui/SectionBadge';

type Tone = 'light' | 'inverse';
type Align = 'center' | 'left';
type Size = 'lg' | 'xl';

type Props = {
  badge: string;
  /** Acepta JSX para que puedas envolver palabras clave en text-gradient-brand */
  title: ReactNode;
  description?: ReactNode;
  align?: Align;
  tone?: Tone;
  /** xl = display-xl (cabeceras de sección estándar). lg = display-lg (cabeceras en grids 2-col) */
  size?: Size;
  className?: string;
};

const titleColor: Record<Tone, string> = {
  light: 'text-foreground',
  inverse: 'text-background',
};

const descriptionColor: Record<Tone, string> = {
  light: 'text-muted-foreground',
  inverse: 'text-white/75',
};

const titleSize: Record<Size, string> = {
  xl: 'text-display-xl',
  lg: 'text-display-lg',
};

export function SectionIntro({
  badge,
  title,
  description,
  align = 'center',
  tone = 'light',
  size = 'xl',
  className,
}: Props) {
  const isCenter = align === 'center';
  return (
    <div
      className={cn(
        'reveal',
        isCenter && 'mx-auto max-w-3xl text-center',
        className,
      )}
    >
      <SectionBadge tone={tone}>{badge}</SectionBadge>
      <h2
        className={cn(
          'mt-6 text-balance',
          titleSize[size],
          titleColor[tone],
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-6 text-pretty text-lg leading-relaxed md:text-xl',
            descriptionColor[tone],
            isCenter && 'mx-auto max-w-xl',
            !isCenter && 'md:leading-[1.5]',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
