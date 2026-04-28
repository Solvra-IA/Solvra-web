import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 select-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-brand text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg active:translate-y-0 active:scale-[0.98] active:brightness-100',
  outline:
    'border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:bg-muted hover:border-accent/30 hover:shadow-sm active:translate-y-0 active:scale-[0.98]',
  ghost:
    'bg-transparent text-muted-foreground hover:text-foreground',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-12 px-6 text-[15px]',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export function LinkButton({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}

/**
 * Flecha con animación translate-x al hover del botón padre.
 * Úsala dentro de Button/LinkButton para CTAs con flujo direccional.
 */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn(
        'transition-transform duration-200 group-hover:translate-x-1',
        className,
      )}
    >
      <path
        d="M3.5 8h9m0 0L9 4.5M12.5 8L9 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
