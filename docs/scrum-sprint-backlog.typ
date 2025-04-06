#import "template.typ": template
#show: template.with("Scrum: Backlog sprintu", "1.0.0", datetime(day: 06, month: 4, year: 2025))

= 1. O projekcie i produkcie
- *Projekt*: System zarządzania rejsami statku RV Oceanograf biura Armatora Uniwersytetu Gdańskiego.
- *Produkt*: Aplikacja webowa do zarządzania rejsami statku biura Armatora Uniwersytetu Gdańskiego. Produkt skierowany jest do Biura Armatora oraz pracowników uczelni, którzy chcą zorganizować badawczy rejs statkiem. Aplikacja umożliwia im wypełnienie wymaganych formularzy oraz zarządzanie terminami rejsów.

= 2. Oszacowanie rozmiaru backlogu produktu

= 3. Założenia i dobór zakresu sprintu

= 4. Cel sprintu

= 5. Backlog sprintu

= 6. Kryteria akceptacji

= 7. Definicja ukończenia

Aby uznać element backlogu za ukończony, muszą zostać spełnione następujące warunki:
- Kod źródłowy powstały w wyniku realizacji zadania został umieszczony w repozytorium projektu.
- Jeśli możliwe, zostały napisane testy jednostkowe dla nowego kodu źródłowego.
- Uruchomiono wszystkie skonfigurowane w projekcie narzędzia odpowiedzialne za formatowanie oraz sprawdzanie poprawności kodu źródłowego (np. prettier, eslint).
- Wszystkie poprzednio utworzone testy jednostkowe oraz testy integracyjne zakończyły się sukcesem.
- Kod został przejrzany oraz zaakceptowany przez przynajmniej dwóch członków zespołu.
- Dokumentacja została zaktualizowana o zmiany wprowadzone w kodzie źródłowym.
