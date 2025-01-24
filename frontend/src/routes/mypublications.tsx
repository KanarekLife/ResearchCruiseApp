import { client } from '@core/helpers/api';
import { AppButton } from '@core/components/AppButton';
import { AppModal } from '@core/components/AppModal';
import { Publication, Role } from '@core/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { UserPublicationTable } from 'src/features/mypublications/compontents/UserPublicationTable';
import Papa from 'papaparse';
import { allowOnly } from '@core/helpers';

export const Route = createFileRoute('/mypublications')({
  component: MyPublications,
  beforeLoad: allowOnly.withRoles(
    Role.Administrator,
    Role.CruiseManager,
    Role.Shipowner
  ),
});

function MyPublications() {
  const queryClient = useQueryClient();
  const ownPublicationsQuery = useQuery({
    queryKey: ['ownPublications'],
    queryFn: () => {
      return client.get('api/cruiseApplications/ownPublications');
    },
  });

  const deleteOwnPublicationMutation = useMutation({
    mutationFn: (id: string) => {
      return client.delete(`api/cruiseApplications/ownPublications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownPublications'] });
    },
  });

  const deleteAllOwnPublicationsMutation = useMutation({
    mutationFn: () => {
      return client.delete('api/cruiseApplications/ownPublications');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownPublications'] });
    },
  });

  const uploadPublicationsMutation = useMutation({
    mutationFn: (publications: Publication[]) => {
      return client.post(
        'api/cruiseApplications/ownPublications',
        publications
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownPublications'] });
    },
  });

  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  function handleFileChange() {
    const file = fileUploadRef.current?.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const decoder = new TextDecoder('windows-1250');
      const csvText = decoder.decode(event.target?.result as ArrayBuffer);

      Papa.parse(csvText, {
        delimiter: ';',
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: Record<string, string>[] }) => {
          const publications = results.data.map(parseRow);
          uploadPublicationsMutation.mutate(publications as Publication[]);
        },
      });
    };
    reader.readAsArrayBuffer(file);

    fileUploadRef.current.value = '';
  }

  return (
    <>
      {isDeleteAllModalOpen && (
        <AppModal
          isOpen={isDeleteAllModalOpen}
          onClose={() => setIsDeleteAllModalOpen(false)}
          title="Czy na pewno chcesz usunąć wszystkie publikacje?"
        >
          Usunięcie publikacji jest nieodwracalne.
          <div className="flex flex-row gap-4 mt-4">
            <AppButton
              variant="red"
              className="basis-2/3"
              onClick={() => {
                deleteAllOwnPublicationsMutation.mutate();
                setIsDeleteAllModalOpen(false);
              }}
            >
              Usuń wszystkie publikacje
            </AppButton>
            <AppButton
              variant="blueOutline"
              className="basis-1/3"
              onClick={() => {
                setIsDeleteAllModalOpen(false);
              }}
            >
              Anuluj
            </AppButton>
          </div>
        </AppModal>
      )}

      <div className="p-4 w-full min-h-screen backdrop-blur-md relative">
        <div className="max-w-screen-2xl mx-auto px-4 py-8 bg-gray-50 rounded-xl">
          <header className="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-center mb-2 basis-3/4">
              Moje publikacje
            </h1>
            <div className="flex flex-col gap-1 text-sm">
              <AppButton
                variant="blue"
                onClick={() => fileUploadRef.current?.click()}
              >
                Import publikacji z pliku CSV
              </AppButton>
              <AppButton
                link="external"
                variant="blueOutline"
                to="https://repozytorium.bg.ug.edu.pl/search.seam"
              >
                Przejdź do repozytorium BG
              </AppButton>
              <AppButton
                variant="red"
                onClick={() => setIsDeleteAllModalOpen(true)}
              >
                Usuń wszystkie publikacje
              </AppButton>
            </div>
          </header>

          {ownPublicationsQuery.data?.data.length === 0 && (
            <div className="text-center text-gray-500">Brak publikacji</div>
          )}

          {ownPublicationsQuery.data?.data.length > 0 && (
            <UserPublicationTable
              userPublications={ownPublicationsQuery.data?.data}
              handleDeletePublication={(id) =>
                deleteOwnPublicationMutation.mutate(id)
              }
            />
          )}
        </div>
      </div>

      <input
        className="hidden"
        ref={fileUploadRef}
        type="file"
        onChange={() => handleFileChange()}
      />
    </>
  );
}

const parseRow = (row: Record<string, string>) => ({
  category: 'subject',
  doi: row['Numer DOI'] !== '' ? row['Numer DOI'] : '-',
  authors: row['Autorzy'] !== '' ? row['Autorzy'] : '-',
  title: row['Tytuł publikacji'] !== '' ? row['Tytuł publikacji'] : '-',
  magazine: row['Nazwa czasopisma'] !== '' ? row['Nazwa czasopisma'] : '-',
  year: row['Rok'] !== '' ? row['Rok'] : '-',
  ministerialPoints: row['Punkty'] !== '' ? row['Punkty'] : '-',
});
