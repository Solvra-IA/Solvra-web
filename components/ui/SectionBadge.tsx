import { cn } from '@/lib/utils';

type Tone = 'light' | 'inverse';

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
};

const tones: Record<Tone, { wrap: string; dot: string; text: string }> = {
  light: {
    wrap: 'border-accent/30 bg-accent/5',
    dot: 'bg-accent',
    text: 'text-accent',
  },
  inverse: {
    wrap: 'border-white/20 bg-white/5',
    dot: 'bg-accent-secondary',
    text: 'text-white/85',
  },
};

export function SectionBadge({ children, tone = 'light', className }: Props) {
  const t = tones[tone];
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-pill border px-5 py-2',
        t.wrap,
        className,
      )}
    >
      <span className={cn('h-2 w-2 rounded-full animate-pulse-dot', t.dot)} />
      <span
        className={cn(
          'font-mono text-[11px] uppercase tracking-[0.18em]',
          t.text,
        )}
      >
        {children}
      </span>
    </div>
  );
}
