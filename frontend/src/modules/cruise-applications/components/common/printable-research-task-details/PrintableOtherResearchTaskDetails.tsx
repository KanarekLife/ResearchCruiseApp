import { OtherResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  data: OtherResearchTaskDto;
};
export function PrintableOtherResearchTaskDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <span>Opis zadania:</span>
      <span>{data.description}</span>
    </div>
  );
}
