import { z } from 'zod';

export type FileDto = {
  name: string;
  content: string;
};

export const FileDtoValidationSchema = z.object({
  name: z.string(),
  content: z.string(),
});
