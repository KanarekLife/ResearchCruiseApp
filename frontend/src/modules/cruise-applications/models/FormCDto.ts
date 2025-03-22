import { CollectedSampleDto } from '@/cruise-applications/models/CollectedSampleDto';
import { ContractDto } from '@/cruise-applications/models/ContractDto';
import { CruiseDayDetailsDto } from '@/cruise-applications/models/CruiseDayDetailsDto';
import { FileDto } from '@/cruise-applications/models/FileDto';
import { GuestTeamDto } from '@/cruise-applications/models/GuestTeamDto';
import { LongResearchEquipmentDto } from '@/cruise-applications/models/LongResearchEquipmentDto';
import { PermissionDto } from '@/cruise-applications/models/PermissionDto';
import { PortDto } from '@/cruise-applications/models/PortDto';
import { ResearchEquipmentDto } from '@/cruise-applications/models/ResearchEquipmentDto';
import { ResearchTaskEffectDto } from '@/cruise-applications/models/ResearchTaskEffectDto';
import { ShortResearchEquipmentDto } from '@/cruise-applications/models/ShortResearchEquipmentDto';
import { SpubTaskDto } from '@/cruise-applications/models/SpubTaskDto';
import { UGTeamDto } from '@/cruise-applications/models/UGTeamDto';

export type FormCDto = {
  shipUsage: string; // Max length 1
  permissions: PermissionDto[];
  researchAreaId: string;
  ugTeams: UGTeamDto[];
  guestTeams: GuestTeamDto[];
  researchTasksEffects: ResearchTaskEffectDto[];
  contracts: ContractDto[];
  spubTasks: SpubTaskDto[];
  shortResearchEquipments: ShortResearchEquipmentDto[];
  longResearchEquipments: LongResearchEquipmentDto[];
  ports: PortDto[];
  cruiseDaysDetails: CruiseDayDetailsDto[];
  researchEquipments: ResearchEquipmentDto[];
  shipEquipmentsIds: string[];
  collectedSamples: CollectedSampleDto[];
  spubReportData?: string; // Max length 1024
  additionalDescription?: string; // Max length 1024
  photos: FileDto[];
};
