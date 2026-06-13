import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Introduce tu nombre').max(100),
  email: z.string().trim().email('Email no válido').max(200),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Cuéntanos un poco más').max(4000),
  // Honeypot: debe venir vacío. Si trae valor, es bot.
  website: z.string().max(0).optional().or(z.literal('')),
  turnstileToken: z.string().min(1, 'Completa la verificación de seguridad').optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
