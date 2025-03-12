import { ResearchTaskDto } from './ResearchTaskDto';

type TaskEffect = {
  done: boolean;
  managerConditionMet: boolean;
  deputyConditionMet: boolean;
};

export type UserEffectDto = {
  id: string;
  userId: string;
  effect: ResearchTaskDto & TaskEffect;
  points: string;
  cruiseApplicationId: string;
};
