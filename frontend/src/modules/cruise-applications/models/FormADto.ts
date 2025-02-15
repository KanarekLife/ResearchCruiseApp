import { z } from 'zod';

import { ContractDto } from '@/cruise-applications/models/ContractDto';
import { GuestTeamDto } from '@/cruise-applications/models/GuestTeamDto';
import { PermissionDto } from '@/cruise-applications/models/PermissionDto';
import { PublicationDto } from '@/cruise-applications/models/PublicationDto';
import { ResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';
import { SpubTaskDto } from '@/cruise-applications/models/SpubTaskDto';
import { UGTeamDto } from '@/cruise-applications/models/UGTeamDto';

export type FormADto = {
  id?: string | undefined;
  cruiseManagerId: string;
  deputyManagerId: string;
  year: string;
  acceptablePeriod: CruisePeriodType;
  optimalPeriod: CruisePeriodType;
  cruiseHours: string;
  periodNotes: string;
  shipUsage?: string;
  differentUsage: string;
  permissions: PermissionDto[];
  researchAreaId: string | '';
  researchAreaInfo: string | '';
  cruiseGoal: CruiseGoal | '';
  cruiseGoalDescription: string;
  researchTasks: ResearchTaskDto[];
  contracts: ContractDto[];
  ugTeams: UGTeamDto[];
  guestTeams: GuestTeamDto[];
  publications: PublicationDto[];
  spubTasks: SpubTaskDto[];
  supervisorEmail: string;
  note?: string | '';
};

export const emptyFormADto: FormADto = {
  id: undefined,
  cruiseManagerId: '',
  deputyManagerId: '',
  year: '',
  acceptablePeriod: [],
  optimalPeriod: [],
  cruiseHours: '0',
  periodNotes: '',
  shipUsage: '',
  differentUsage: '',
  permissions: [],
  researchAreaId: '',
  researchAreaInfo: '',
  cruiseGoal: '',
  cruiseGoalDescription: '',
  researchTasks: [],
  contracts: [],
  ugTeams: [],
  guestTeams: [],
  publications: [],
  spubTasks: [],
  supervisorEmail: '',
  note: '',
};

/**
 * Represents a Fortnight (first half of January for 0, second half of January for 1, etc.)
 */
export type FortnightType = z.infer<typeof FortnightValidationSchema>;
export const FortnightValidationSchema = z.enum([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
]);

/**
 * Represents a Cruise Period
 * @example ['0', '1'] // represents the period from first half of January to second half of January
 */
export type CruisePeriodType = z.infer<typeof CruisePeriodValidationSchema>;
export const CruisePeriodValidationSchema = z.union([
  z.tuple([FortnightValidationSchema, FortnightValidationSchema]),
  z.array(z.never()).length(0),
]);

export enum CruiseGoal {
  Research = '0',
  Commercial = '1',
  Educational = '2',
}
