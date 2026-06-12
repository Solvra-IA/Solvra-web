import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '@/components/ui/contact-section';

const pushMock = vi.fn();

vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock('@/lib/analytics', () => ({
  pushGenerateLead: vi.fn(),
}));

describe('<ContactSection />', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    pushMock.mockClear();
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('shows per-field errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/nombre/i), 'A');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/podemos ayudarte/i), 'corto');
    const form = screen.getByRole('form', { name: /formulario de contacto/i });
    await user.click(within(form).getByRole('button', { name: /enviar formulario/i }));

    const alerts = await screen.findAllByRole('alert');
    expect(alerts.length).toBeGreaterThanOrEqual(2);
  });

  it('redirects to /gracias after a valid submission', async () => {
    const user = userEvent.setup();
    const { pushGenerateLead } = await import('@/lib/analytics');
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/nombre/i), 'Marta Ribas');
    await user.type(screen.getByLabelText(/email/i), 'marta@example.com');
    await user.type(
      screen.getByLabelText(/podemos ayudarte/i),
      'Queremos automatizar la cualificación de leads.',
    );
    const form = screen.getByRole('form', { name: /formulario de contacto/i });
    await user.click(within(form).getByRole('button', { name: /enviar formulario/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(pushGenerateLead).toHaveBeenCalledWith('contacto_footer');
    expect(pushMock).toHaveBeenCalledWith('/gracias');
  });
});
