import { FileDto } from '@/cruise-applications/models/FileDto';

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
