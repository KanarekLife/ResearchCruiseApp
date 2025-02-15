import { z } from 'zod';

export type PublicationDto = {
  id: string;
  category: 'subject' | 'postscript';
  doi: string;
  authors: string;
  title: string;
  magazine: string;
  year: string;
  ministerialPoints: string;
};

export const PublicationDtoValidationSchema = z.object({
  id: z.string().uuid(),
  category: z.enum(['subject', 'postscript']),
  doi: z.string(),
  authors: z.string(),
  title: z.string(),
  magazine: z.string(),
  year: z.string().length(4),
  ministerialPoints: z.string().refine((val) => {
    const parsed = parseInt(val, 10);
    return !isNaN(parsed) && parsed >= 0;
  }, 'ministerialPoints must an integer'),
});
