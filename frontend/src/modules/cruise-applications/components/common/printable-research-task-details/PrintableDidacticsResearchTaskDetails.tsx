import { DidacticsResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  data: DidacticsResearchTaskDto;
};
export function PrintableDidacticsResearchTaskDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <span>Opis zajęcia dydaktycznego:</span>
      <span>{data.description}</span>
    </div>
  );
}
