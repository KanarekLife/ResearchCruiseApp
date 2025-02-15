import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { DidacticsResearchTaskDetails } from '@/cruise-applications/components/research-task-details/DidacticsResearchTaskDetails';
import { OtherResearchTaskDetails } from '@/cruise-applications/components/research-task-details/OtherResearchTaskDetails';
import { OwnResearchTaskDetails } from '@/cruise-applications/components/research-task-details/OwnResearchTaskDetails';
import { ProjectPreparationResearchTaskDetails } from '@/cruise-applications/components/research-task-details/ProjectPreparationResearchTaskDetails';
import { ProjectResearchTaskDetails } from '@/cruise-applications/components/research-task-details/ProjectResearchTaskDetails';
import { ThesisResearchTaskDetails } from '@/cruise-applications/components/research-task-details/ThesisResearchTaskDetails';
import { FormADto } from '@/cruise-applications/models/FormADto';
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
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<ResearchTaskDto>;
  disabled?: boolean;
};
export function ResearchTaskDetails({ form, row, disabled }: Props) {
  switch (row.original.type) {
    case ResearchTaskType.BachelorThesis:
    case ResearchTaskType.MasterThesis:
    case ResearchTaskType.DoctoralThesis:
      return <ThesisResearchTaskDetails form={form} row={row as Row<ThesisResearchTaskDto>} disabled={disabled} />;
    case ResearchTaskType.ProjectPreparation:
      return (
        <ProjectPreparationResearchTaskDetails
          form={form}
          row={row as Row<ProjectPreparationResearchTaskDto>}
          disabled={disabled}
        />
      );
    case ResearchTaskType.DomesticProject:
    case ResearchTaskType.ForeignProject:
    case ResearchTaskType.InternalUgProject:
    case ResearchTaskType.OtherProject:
    case ResearchTaskType.CommercialProject:
      return <ProjectResearchTaskDetails form={form} row={row as Row<ProjectResearchTaskDto>} disabled={disabled} />;
    case ResearchTaskType.Didactics:
      return (
        <DidacticsResearchTaskDetails form={form} row={row as Row<DidacticsResearchTaskDto>} disabled={disabled} />
      );
    case ResearchTaskType.OwnResearchTask:
      return <OwnResearchTaskDetails form={form} row={row as Row<OwnResearchTaskDto>} disabled={disabled} />;
    case ResearchTaskType.OtherResearchTask:
      return <OtherResearchTaskDetails form={form} row={row as Row<OtherResearchTaskDto>} disabled={disabled} />;
    default:
      throw new Error(`Unknown research task type`);
  }
}
