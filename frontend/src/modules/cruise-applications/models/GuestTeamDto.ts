import { z } from 'zod';

export type GuestTeamDto = {
  name: string;
  noOfPersons: string;
};

export const GuestTeamDtoValidationSchema = z.object({
  name: z.string(),
  noOfPersons: z.string().refine((val) => {
    const parsed = parseInt(val, 10);
    return !isNaN(parsed) && parsed > 0;
  }, 'noOfPersons must an integer'),
});
