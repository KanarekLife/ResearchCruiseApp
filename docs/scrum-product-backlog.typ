#import "template.typ": template
#show: template.with("Scrum: Backlog produktu", "1.0.1", datetime(day: 05, month: 4, year: 2025))

= 1. O projekcie i produkcie
- Projekt: System zarządzania rejsami statku biura Armatora Uniwersytetu Gdańskiego.
- Produkt: Aplikacja webowa do zarządzania rejsami statku biura Armatora Uniwersytetu Gdańskiego. Produkt skierowany jest do studentów i pracowników uczelni, którzy chcą zarezerwować rejs statkiem. Aplikacja umożliwia przeglądanie dostępnych rejsów, rejestrację na nie oraz zarządzanie swoimi rezerwacjami. 

= 2. Persony użytkowników
/* 
 * TODO Doprecyzować opis person użytkowników
 */ 

- Persona 1: Student X - student Uniwersytetu Gdańskiego, który chce zarezerwować rejs statkiem.
- Persona 2: Pracownik Y - pracownik Uniwersytetu Gdańskiego, który chce zarezerwować rejs statkiem dla grupy studentów.
- Persona 3: Administrator - pracownik biura Armatora Uniwersytetu Gdańskiego, który zarządza rejsami statku i chce mieć możliwość dodawania nowych rejsów oraz edytowania istniejących.

= 3. Scenariusz użycia produktu
/* 
 * TODO Dokładniejszy scenariusz użycia produktu
 */

- Scenariusz 1. Rezerwacja
- Scenariusz 2. Zarządzanie rezerwacjami
- Scenariusz 3. Dodawanie rejsu

= 4. Backlog produktu
/* TODO 
 * lista elementów backlogu
 */
Lista elementów backlogu produktu:

= 5. Kryteria akceptacji
/* TODO 
 * kryteria akceptacji elementów backlogu na podstawie backlogu produktu
 */
Kryteria akceptacji dla wybranych elementów backlogu:

= 6. Definicja ukończenia
1. Frontend został poddany restrukturyzacji mającej na celu m.in poprawę czytelności.
2. Wdrożona zostałą wersja testowa w środowisku stagingowy w celach prezentacyjnych.
2. Funcjonalność została zaprezentowana interesariuszom i przez nich zaakceptowana.
3. Obecne zgłoszone błędy zostały naprawiane.
4. Napisane zostały testy jednostkowe i integracyjnie.
5. Dokumentacja została przygotowana i udostępniona użytkownikom.
6. Produkt został wdrożony w środowisku produkcyjnym. 