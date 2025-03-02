import { DidacticsResearchTaskDetails } from '@/cruise-applications/components/application-details/research-task-details/DidacticsResearchTaskDetails';
import { OtherResearchTaskDetails } from '@/cruise-applications/components/application-details/research-task-details/OtherResearchTaskDetails';
import { OwnResearchTaskDetails } from '@/cruise-applications/components/application-details/research-task-details/OwnResearchTaskDetails';
import { ProjectPreparationResearchTaskDetails } from '@/cruise-applications/components/application-details/research-task-details/ProjectPreparationResearchTaskDetails';
import { ProjectResearchTaskDetails } from '@/cruise-applications/components/application-details/research-task-details/ProjectResearchTaskDetails';
import { ThesisResearchTaskDetails } from '@/cruise-applications/components/application-details/research-task-details/ThesisResearchTaskDetails';
import {
  DidacticsResearchTaskDto,
  OtherResearchTaskDto,
  OwnResearchTaskDto,
  ProjectPreparationResearchTaskDto,
  ProjectResearchTaskDto,
  ResearchTaskDto,
  ResearchTaskType,
  ThesisResearchTaskDto,
} from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  data: ResearchTaskDto;
};
export function ResearchTaskDetails({ data }: Props) {
  switch (data.type) {
    case ResearchTaskType.BachelorThesis:
    case ResearchTaskType.MasterThesis:
    case ResearchTaskType.DoctoralThesis:
      return (
        <ThesisResearchTaskDetails
          data={data as ThesisResearchTaskDto}
        />
      );
    case ResearchTaskType.ProjectPreparation:
      return (
        <ProjectPreparationResearchTaskDetails
          data={data as ProjectPreparationResearchTaskDto}
        />
      );
    case ResearchTaskType.DomesticProject:
    case ResearchTaskType.ForeignProject:
    case ResearchTaskType.InternalUgProject:
    case ResearchTaskType.OtherProject:
    case ResearchTaskType.CommercialProject:
      return (
        <ProjectResearchTaskDetails
          data={data as ProjectResearchTaskDto}
        />
      );
    case ResearchTaskType.Didactics:
      return (
        <DidacticsResearchTaskDetails
          data={data as DidacticsResearchTaskDto}
        />
      );
    case ResearchTaskType.OwnResearchTask:
      return (
        <OwnResearchTaskDetails
          data={data as OwnResearchTaskDto}
        />
      );
    case ResearchTaskType.OtherResearchTask:
      return (
        <OtherResearchTaskDetails
          data={data as OtherResearchTaskDto}
        />
      );
    default:
      throw new Error(`Unknown research task type`);
  }
}
