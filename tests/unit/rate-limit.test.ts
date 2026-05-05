import { describe, it, expect } from 'vitest';
import { check, getClientIp } from '@/lib/rate-limit';

describe('rate-limit check()', () => {
  it('allows up to the limit, then blocks with retryAfter', () => {
    const key = `test:${Math.random()}`;
    const opts = { limit: 3, windowMs: 60_000 };
    expect(check(key, opts).ok).toBe(true);
    expect(check(key, opts).ok).toBe(true);
    expect(check(key, opts).ok).toBe(true);
    const blocked = check(key, opts);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });
});

describe('getClientIp()', () => {
  it('returns the first ip from x-forwarded-for', () => {
    const h = new Headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' });
    expect(getClientIp(h)).toBe('1.2.3.4');
  });

  it('falls back to x-real-ip when x-forwarded-for is missing', () => {
    const h = new Headers({ 'x-real-ip': '5.6.7.8' });
    expect(getClientIp(h)).toBe('5.6.7.8');
  });

  it('returns "unknown" when neither header is set', () => {
    expect(getClientIp(new Headers())).toBe('unknown');
  });
});
