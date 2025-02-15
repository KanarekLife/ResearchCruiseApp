import { z } from 'zod';

import { FileDto, FileDtoValidationSchema } from '@/cruise-applications/models/FileDto';

export type ContractDto = {
  category: 'domestic' | 'international';
  institutionName: string;
  institutionUnit: string;
  institutionLocalization: string;
  description: string;
  scan: FileDto;
};

export function getContractCategoryName(category: ContractDto['category']): string {
  return category === 'domestic' ? 'Krajowa' : 'Międzynarodowa';
}

export const ContractDtoValidationSchema = z.object({
  category: z.enum(['domestic', 'international']),
  institutionName: z.string(),
  institutionUnit: z.string(),
  institutionLocalization: z.string(),
  description: z.string(),
  scan: FileDtoValidationSchema,
});
