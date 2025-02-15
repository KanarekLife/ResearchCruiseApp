import { FormAResearchTask } from '@/cruise-applications/lib/types';

type Props = {
  task: FormAResearchTask;
};
export function FormAResearchTaskThumbnail({ task }: Props) {
  if (['0', '1', '2'].includes(task.type)) {
    return (
      <div>
        Autor: {task.author!} Tytuł: {task.title!}
      </div>
    );
  }
  if (['3', '10'].includes(task.type)) {
    return (
      <div>
        Tytuł: {task.title!} Data: {new Date(task.date!).toLocaleDateString('pl-PL')}
      </div>
    );
  }
  if (['4', '5', '6', '7', '8'].includes(task.type)) {
    return (
      <div>
        Tytuł: {task.title!} Od:{' '}
        {new Date(task.startDate!).toLocaleDateString('pl-PL', { month: '2-digit', year: 'numeric' })} Do:{' '}
        {new Date(task.endDate!).toLocaleDateString('pl-PL', { month: '2-digit', year: 'numeric' })} Kwota:{' '}
        {parseFloat(task.securedAmount!).toFixed(2)} zł
      </div>
    );
  }
  if (['9', '11'].includes(task.type)) {
    return <div>Opis: {task.description!}</div>;
  }
  throw new Error(`Unknown task type: ${task.type}`);
}
