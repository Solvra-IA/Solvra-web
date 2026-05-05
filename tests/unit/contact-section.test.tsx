import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '@/components/ui/contact-section';

vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));

describe('<ContactSection />', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
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
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    const alerts = await screen.findAllByRole('alert');
    expect(alerts.length).toBeGreaterThanOrEqual(2);
  });

  it('shows the success state after a valid submission', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/nombre/i), 'Marta Ribas');
    await user.type(screen.getByLabelText(/email/i), 'marta@example.com');
    await user.type(
      screen.getByLabelText(/podemos ayudarte/i),
      'Queremos automatizar la cualificación de leads.',
    );
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/mensaje enviado/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});
