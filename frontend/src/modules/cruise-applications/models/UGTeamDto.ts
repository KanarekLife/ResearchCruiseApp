import { z } from 'zod';

export type UGTeamDto = {
  ugUnitId: string;
  noOfEmployees: string;
  noOfStudents: string;
};

export const UGTeamDtoValidationSchema = z.object({
  ugUnitId: z.string().uuid(),
  noOfEmployees: z.string().refine((val) => {
    const parsed = parseInt(val, 10);
    return !isNaN(parsed) && parsed >= 0;
  }, 'noOfEmployees must an integer'),
  noOfStudents: z.string().refine((val) => {
    const parsed = parseInt(val, 10);
    return !isNaN(parsed) && parsed >= 0;
  }, 'noOfStudents must an integer'),
});
