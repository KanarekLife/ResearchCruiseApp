import { z } from 'zod';

export type ResearchAreaDescriptionDto = {
  name: string;
  info: string;
};

export const ResearchAreaDescriptionDtoValidationSchema = z.object({
  name: z.string().nonempty('Nazwa rejonu nie może być pusta'),
  info: z.string(),
});
