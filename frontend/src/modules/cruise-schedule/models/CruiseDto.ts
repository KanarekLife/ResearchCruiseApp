import { CruiseApplicationShortInfoDto } from '@/cruise-schedule/models/CruiseApplicationShortInfoDto';

export type CruiseDto = {
  id: string;
  number: string;
  startDate: string;
  endDate: string;
  mainCruiseManagerId: string;
  mainCruiseManagerFirstName: string;
  mainCruiseManagerLastName: string;
  mainDeputyManagerId: string;
  cruiseApplicationsShortInfo: CruiseApplicationShortInfoDto[];
  status: string;
};
