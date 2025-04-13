#import "template.typ": template
#show: template.with("Scrum: Backlog sprintu", "1.0.1", datetime(day: 06, month: 4, year: 2025))

= 1. O projekcie i produkcie
- *Projekt*: System zarządzania rejsami statku RV Oceanograf biura Armatora Uniwersytetu Gdańskiego.
- *Produkt*: Aplikacja webowa do zarządzania rejsami statku biura Armatora Uniwersytetu Gdańskiego. 
Produkt skierowany jest do Biura Armatora oraz pracowników uczelni, którzy chcą zorganizować badawczy rejs statkiem. Aplikacja umożliwia im wypełnienie wymaganych formularzy oraz zarządzanie terminami rejsów.

= 2. Oszacowanie rozmiaru backlogu produktu
Backlog produktu został oszacowany podczas sesji Poker Planning z udziałem Zespołu Deweloperskiego i Product Ownera, 
którego rolę pełni jedna osoba z Zespołu Deweloperskiego (Stanisław Nieradko).
Rozmiar backlogu produktu szacujemy na ~20 elementów.
Dokumentacja Planning Poker: Zespół omawiał każde User Story, zadawał pytania wyjaśniające Product Ownerowi, 
a następnie każdy członek zespołu wybierał kartę odpowiadającą jego ocenie złożoności. 
Po jednoczesnym odkryciu kart, w przypadku rozbieżności, osoby z skrajnymi wartościami uzasadniały swój wybór, 
co prowadziło do dyskusji i ponownego głosowania, aż do osiągnięcia konsensusu.

= 3. Założenia i dobór zakresu sprintu
 - *Nazwa Sprintu*: "Sprint 1 - "Implementacja Formularza C"
 - *Długość Sprintu*: 2 tygodnie (14 dni, 10 dni roboczych)
 - *Data Rozpoczęcia*: 7.04.2025
 - *Data Zakończenia*: 18.04.2025
 - *Zespół Deweloperski*: 5 osób
 - *Pojemność Zespołu*: 5 osób \* średnio 5h/tydzień \* 2 tygodnie = 50h
 - *Rezerwa na inne prace*: Zakładamy ~30% rezerwy na spotkania Scumowe (Planowanie, Weekly Scrum, Review, Retrospektywa)
 - *Zakładana średnia szybkość zespołu*: Zakładamy, że średnia szybkość zespołu wyniesie 20 SP.
 - *Wybór elementów do Sprintu*: 
 // TODO elementy do sprintu, dodać w tablicy backlogu
 //1.
 //2. 
 //3. 
 //4.
 //5. 
= 4. Cel sprintu
Celem sprintu jest zaimplementowanie formularza C.

= 5-6. Backlog sprintu i kryteria akceptacji
Link do backlogu: #link("https://dev.azure.com/kanareklife/ResearchCruiseApp/_workitems/recentlyupdated/")[`https://dev.azure.com/kanareklife/ResearchCruiseApp`]\
Skala priorytetów: 1 najwyższy, 5 najniższy. \
Lista elementów backlogu produktu:
// TODO wstawić screenshoty elementów sprintu 
//#image("scrum-sprint-backlog/1.png", width: 80%)
//#image("scrum-sprint-backlog/2.png", width: 80%)
//#image("scrum-sprint-backlog/3.png", width: 80%)
//#image("scrum-sprint-backlog/4.png", width: 80%)

Posortowana lista:
//#image("scrum-sprint-backlog/5.png", width: 80%)


= 7. Definicja ukończenia

Aby uznać element backlogu za ukończony, muszą zostać spełnione następujące warunki:
- Kod źródłowy powstały w wyniku realizacji zadania został umieszczony w repozytorium projektu.
- Jeśli możliwe, zostały napisane testy jednostkowe dla nowego kodu źródłowego.
- Uruchomiono wszystkie skonfigurowane w projekcie narzędzia odpowiedzialne za formatowanie oraz sprawdzanie poprawności kodu źródłowego (np. prettier, eslint).
- Wszystkie poprzednio utworzone testy jednostkowe oraz testy integracyjne zakończyły się sukcesem.
- Kod został przejrzany oraz zaakceptowany przez przynajmniej dwóch członków zespołu.
- Dokumentacja została zaktualizowana o zmiany wprowadzone w kodzie źródłowym.
