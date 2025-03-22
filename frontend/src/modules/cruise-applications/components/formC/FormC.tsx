import { FormCContextType, FormCProvider } from '@/cruise-applications/contexts/FormCContext';

type Props = {
  context: FormCContextType & {
    onSubmit: () => void;
    onSaveDraft: () => void;
  };
};
export function FormC({ context }: Props) {
  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    context.onSubmit();
  }

  return (
    <FormCProvider value={context}>
      <form className="space-y-8" onSubmit={onSubmit}></form>
    </FormCProvider>
  );
}
