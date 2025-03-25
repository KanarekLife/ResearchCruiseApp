import { ResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type TaskEffect = {
  done: string;
  managerConditionMet: string;
  deputyConditionMet: string;
};
export type ResearchTaskEffectDto = ResearchTaskDto & TaskEffect;
