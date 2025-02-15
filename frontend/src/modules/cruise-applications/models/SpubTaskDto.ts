import { z } from 'zod';

export type SpubTaskDto = {
  name: string;
  yearFrom: string;
  yearTo: string;
};

export const SpubTaskDtoValidationSchema = z.object({
  name: z.string(),
  yearFrom: z.string().length(4),
  yearTo: z.string().length(4),
});
