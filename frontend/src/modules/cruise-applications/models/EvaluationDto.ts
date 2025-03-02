import { ContractDto } from '@/cruise-applications/models/ContractDto';
import { EvaluationUGTeamDto } from "@/cruise-applications/models/EvaluationUGTeamDto";
import { GuestTeamDto } from "@/cruise-applications/models/GuestTeamDto";
import { PublicationDto } from "@/cruise-applications/models/PublicationDto";
import { ResearchTaskDto } from "@/cruise-applications/models/ResearchTaskDto";
import { SpubTaskDto } from "@/cruise-applications/models/SpubTaskDto";

export type EvaluationDto = {
  formAResearchTasks: FormAResearchTask[];
  formAContracts: FormAContract[];
  ugTeams: EvaluationUGTeamDto[];
  guestTeams: GuestTeamDto[];
  ugUnitsPoints: string;
  formAPublications: FormAPublication[];
  formASpubTasks: FormASpubTask[];
  effectsPoints: string;
};

export type FormAResearchTask = {
  id: string;
  researchTask: ResearchTaskDto;
  points: string;
};

export type FormAContract = {
  id: string;
  contract: ContractDto;
  points: string;
};

export type FormAPublication = {
  id: string;
  publication: PublicationDto;
  points: string;
};

export type FormASpubTask = {
  id: string;
  spubTask: SpubTaskDto;
  points: string;
};
