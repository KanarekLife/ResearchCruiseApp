import { FileDto } from '@/cruise-applications/models/FileDto';

export type PermissionDto = {
  description: string;
  executive: string;
  scan: FileDto | undefined;
};
