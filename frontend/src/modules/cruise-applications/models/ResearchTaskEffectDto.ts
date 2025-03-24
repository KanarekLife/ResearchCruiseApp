import { ResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type TaskEffect = {
  done: boolean;
  managerConditionMet: boolean;
  deputyConditionMet: boolean;
};
export type ResearchTaskEffectDto = ResearchTaskDto & TaskEffect;
