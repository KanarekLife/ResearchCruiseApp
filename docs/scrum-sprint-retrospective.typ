#import "template.typ": template
#show: template.with("Retrospektywa sprintu", "1.0.0", datetime(day: 12, month: 5, year: 2025))

= 1. O projekcie i produkcie
- *Projekt*: System zarządzania rejsami statku RV Oceanograf biura Armatora Uniwersytetu Gdańskiego.
- *Produkt*: Aplikacja webowa do zarządzania rejsami statku biura Armatora Uniwersytetu Gdańskiego. 
Produkt skierowany jest do Biura Armatora oraz pracowników uczelni, którzy chcą zorganizować badawczy rejs statkiem. Aplikacja umożliwia im wypełnienie wymaganych formularzy oraz zarządzanie terminami rejsów.

= 2. Wybrana technika retrospektywy
Gra retro na tablicy online
Czas trwania: 10-20min
Każdy z uczestników sprintu wkleja na tablicy online mema który najlepiej opisuje ostatni sprint.
Po zamieszczeniu przez każdego użytkownika mema, uczestnicy po kolei wyjaśniają go innym członkom zespołu.

Spotkania naszego zespołu odbywają się tylko i wyłącznie zdalnie zatem forma spotkania przy tablicy online i 
przy użyciu komunikatora (w naszym przypadku komunikator Discord). Cechą projektu jest brak jasno określonych wymagań przez klienta.
Dodatkowowo z uwagi na to, że każdy każdy z deweloperów nie pracuje na pełen etat i w nienormowanych godzinach pracy, synchronizacja pracy
następuje jedynie na wspólnych spotkaniach. Deweloperzy mają różny poziom doświadczenia w pracy z Scrumem.
Jedyni (Stanisław Nieradko, Krzysztof Nasuta) pracują od kilku lat inni dopiero od początku tego projektu (Paweł Pstrągowski, Filip Dawidowski, Bartłomiej Krawisz).
#show link: it => underline(text(fill: blue)[#it])
- Link do wirtualnej tablicy retrospektywy #link("https://miro.com/app/board/uXjVIx2pFCQ=/")[https://miro.com/uXjVIx2pFCQ]

= 3. Przebieg i wyniki retrospektywy
Retrospektywa odbyła się zdalnie ostatniego dnia sprintu czyli w piątek 09.05.2025, trwała godzinę.
Udział w niej brał cały zespół deweloperski (5 osób).
Rolę scrumową pełnił Stanisław Nieradko.
Moderatorem retrospektywy został Krzysztof Nasuta, a notującym Paweł Pstrągowski.
Spotkanie odbywało się na kanale głosowym Discord, a wirtualna tablica z serwisu Miro. 
Każdy uczestnik dostaje kilka minut na wybranie/zrobienie mema który najlepiej opisuje obecny sprint.
Gdy wszyscy wrzucili do tablicy wybrane memy, zespół po kolei je przedyskutował.

== Główne problemy dotyczyły:
    === Udane aspekty projektu:
        - Szybkie tempo developmentu pomimo poświęcenia stosunkowo niewielkiej ilości czasu.
        - Dobra komunikacja w zespole, szczególnie podczas spotkań.
        - Efektywne rozwiązywanie problemów technicznych na bieżąco.
    === Nieudane aspekty projektu:
        - Brak jasnych wymagań od klienta powoduje trudności implementacji.
        - Trudności w synchronizacji pracy ze względu na nienormowany czas pracy każdego z deweloperów.
        - Problemy z dostępem do środowiska stagingowego dla nowych członków zespołu.
    === Propozycje poprawy sytuacji:
        - Regularne spotkania z klientem w celu doprecyzowania wymagań.
        - Ustalenie stałych godzin pracy dla każdego z deweloperów (nawet częściowo).
        - Ograniczenie dostępu do środowiska stagingowego dla niewdrożonych członków zespołu lub/i 
          utrudnienie możliwości skasowania konta użytkownika przez jego samego.
    === Emocje:
        - Frustracja spowodowana niejasnymi wymaganiami i brakiem odzewu od klienta.
        - Oczekiwanie na opiekuna projektu aby móc ustalić dogodny termin spotkania. 
    === Oceny:
        Ogólna ocena sprintu: 7/10 (głównie przez problemy z wymaganiami i ).

    === Żale:
        - Brak czasu na dokładniejsze testowanie przed wdrożeniem.
        - Paweł Pstrągowski za mało czasu poświecił na zapoznanie się z środowiskiem stagingowym i frontendem.

    === Podziękowania:
        - Podziękowania dla Bartłomieja Krawisza za przygotowanie testów na czas.
        - Podziękowania dla Stanisława Nieradko za sprawne zarządzanie i organizowanie pracy zespołu.
        - Podziękowania dla Krzysztofa Nasuty za moderowanie spotkań i utrzymywanie dobrej atmosfery.

    === Inne zagadnienia:
        - Dyskutowano o potrzebie wprowadzenia narzędzia do automatycznego testowania i udoskonalenia CI/CD.
        - Zaproponowano częstsze code review.

= 4. Zadania do wykonania - action items
    - === Ograniczenie środowiska stagingowego dla niewdrożonych członków zespołu deweloperskiego:
        Zdecydowano, że dostęp do środowiska stagingowego będzie przyznawany tylko po przejściu 
        przez proces wdrożenia i zapoznania się z funkcjonalnością.
        Powinno to zapobiec przypadkowym błędom i konfliktom.
    - === Ustalenie regularnych spotkań z klientem:
        Zespół uznał, że kluczowe jest częstsze kontaktowanie się z klientem w celu doprecyzowani wymagań. 
        Ustalono, że spotkania będą odbywać się co dwa dni. 
        Wybrano tę opcję, aby zminimalizować niejasności i uniknąć częstych zmian w specyfikacji.
    - === Wprowadzenie narzędzia do automatycznego testowania: 
        Zdecydowano o poszukiwaniu narzędzia do automatyzacji testów, 
        które pomoże w szybszym i dokładniejszym testowaniu kodu przed wdrożeniem. 
        Wybrano to zadanie, aby poprawić jakość kodu i uniknąć błędów na produkcji.

= 5. Wnioski
  Technika z memami okazała się łatwa w użyciu - 
  każdy z uczestników szybko znalazł lub stworzył mema oddającego charakter sprintu. 
  Technika była skuteczna w identyfikowaniu problemów i wyrażaniu emocji w przystępny sposób. 
  Uczestnicy wyrazili satysfakcję z tej formy retrospektywy, ale jako że większość członków nie próbowała innych metod,
  trudno porównać i zarówno subiektywnie, jak i obiektywnie ocenić jej skuteczność na tle innych.
  - Link do tablicy Kanban: #link("https://dev.azure.com/kanareklife/ResearchCruiseApp/_boards/board/t/ResearchCruiseApp%20Team/Issues")[`https://dev.azure.com/kanareklife/ResearchCruiseApp`]\
