import dayjs from 'dayjs';

import { OwnResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  data: OwnResearchTaskDto;
};
export function PrintableOwnResearchTaskDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <span>Roboczy tytuł projektu: </span>
      <span>{data.title}</span>
      <span>Przewidywany termin składania: </span>
      <span>{dayjs(data.date).format('DD.MM.YYYY')}</span>
      <span>Czasopismo: </span>
      <span>{data.magazine}</span>
      <span>Przewidywane punkty ministerialne: </span>
      <span>{data.ministerialPoints}</span>
    </div>
  );
}
