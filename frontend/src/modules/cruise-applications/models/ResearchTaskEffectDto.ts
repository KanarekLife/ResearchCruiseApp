import { ResearchTaskDto } from './ResearchTaskDto';

export type ResearchTaskEffectDto = {
  id: string;
  userId: string;
  effect: ResearchTaskDto & {
    done: boolean;
    managerConditionMet: boolean;
    deputyConditionMet: boolean;
  };
  points: string;
  cruiseApplicationId: string;
};
