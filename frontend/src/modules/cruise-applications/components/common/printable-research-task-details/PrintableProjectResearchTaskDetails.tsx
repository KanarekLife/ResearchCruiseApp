import dayjs from 'dayjs';

import { ProjectResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  data: ProjectResearchTaskDto;
};
export function PrintableProjectResearchTaskDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <span>Tytuł: </span>
      <span>{data.title}</span>
      <span>Data rozpoczęcia: </span>
      <span>{dayjs(data.startDate).format('DD.MM.YYYY')}</span>
      <span>Data zakończenia: </span>
      <span>{dayjs(data.endDate).format('DD.MM.YYYY')}</span>
      <span>Kwota finansowania: </span>
      <span>{parseFloat(data.financingAmount).toFixed(2)} zł</span>
      <span>Środki zabezpieczone na realizację rejsu: </span>
      <span>{parseFloat(data.securedAmount).toFixed(2)} zł</span>
    </div>
  );
}
