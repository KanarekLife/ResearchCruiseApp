import { ThesisResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  data: ThesisResearchTaskDto;
};
export function PrintableThesisResearchTaskDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <span>Autor: </span>
      <span>{data.author}</span>
      <span>Tytuł:</span>
      <span>{data.title}</span>
    </div>
  );
}
