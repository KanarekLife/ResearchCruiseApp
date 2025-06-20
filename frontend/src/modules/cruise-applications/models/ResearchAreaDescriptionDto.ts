import { z } from 'zod';

export type ResearchAreaDescriptionDto = {
  id: string;
  alternativeName: string | null;
  info: string;
};

export const ResearchAreaDescriptionDtoValidationSchema = z.object({
  id: z.string().nonempty('Id jest wymagane'),
  alternativeName: z.string().nonempty().nullable(),
  info: z.string(),
});
