# Tech Titans
## Group enroll

### Technologies:
- *Back-end:* Java / Spring Boot
- *Front-end:* React
- *Database:* PostgreSQL
TT-2
Tested integration

### Running the application
- from group-enroll directory run:
`docker-compose up`

- if you want to rebuild the docker images
`docker-compose up --build` or just `docker-compose build`

- if you want to run just one container
`docker-compose up --no-deps <container-name>`

- to remove containers
`docker-compose down`

## Używanie aplikacji
### Home page
Po wejściu na localhost:3000 wita nas główna strona naszej aplikacji. W lewym górym rogu znajduje się logo, które po naciśnięciu przenosi do tego widoku. Obok niego zawsze znajdują się wszystkie dostępne aktualnie zakładki (zależnie od posiadanych uprawnień). W prawym górnym rogu znajduje się koło zębate, które umożliwia logowanie oraz rejestrację.
![HomePage](/readme_images/HomePage.png)

### Logowanie/Rejestracja
Po wciśnięciu koła zębatego można wybrać opcję zalogowania się bądź rejestracji. W aktualnym stanie aplikacji istnieje jedno konto z loginem "admin" i hasłem "test" i uprawnieniami nauczyciela. Zarządzanie uprawnieniami dostępne jest jedynie za pomocą API.

![Logowanie](/readme_images/Logowanie.png)
![Logowanie2](/readme_images/Logowanie2.png)

### Tworzenie formularza
W celu stworzenia ankiety należy zalogować się na konto z uprawnieniami nauczyciela. Wtedy w zakładkach pojawiają się "FORM-CREATOR" odzpowiedzialne właśnie za to oraz "RESULTS", które później będzie wyświetlało wyniki ankiety.

![TworzenieFormularza](/readme_images/TworzenieFormularza.png)

W tym miejscu można dodawać terminy. Należy podać godziny rozpoczęcia i zakończenia zajęć oraz dzień tygodnia w jakim mają się odbywać.

![TworzenieFormularza2](/readme_images/TworzenieFormularza2.png)

Po dodaniu terminów można je edytować lub usunąć w razie pomyłek. Po dodaniu przynajmniej dwóch terminów można je przesłać do bazy. Wysyłanie terminów wielokrotnie jest mocno odradzane, ponieważ mogą się dodać niepoprawnie i potencjalnie uniemożliwić poprawne działanie reszty aplikacji (wtedy najlepiej ją zrestartować i dodać wszystko od zera).

![TworzenieFormularza3](/readme_images/TworzenieFormularza3.png)

### Ankieta
Po przesłaniu terminów generowany jest specjalny link do ankiety dla studentów.

![LinkAnkiety](/readme_images/LinkAnkiety.png)

W ankiecie znajdują się dwa formularze. Pierwszy odpowiada za dane studenta, natomiast drugi za jego głosy w ankiecie dostępności. Istnieje zabezpieczenie wymuszające wysyłanie obu formularzy w odpowiedniej kolejności oraz blokujące próby wielokrotnego wysłania jednego formularza z rzędu. Mimo to należy pamiętać, aby po wysłaniu pierwszego formularza wysłać także drugi. W przeciwnym przypadku do bazy dodawani są studenci, do których nie zostają dodane głosy, co uniemożliwia późniejsze generowanie grup.

![AnkietaZDanymi](/readme_images/AnkietaZDanymi.png)

W drugim formularzu student wybiera odpowiadające mu terminy i przesyła do bazy.

![AnkietaMożliwości](/readme_images/AnkietaMożliwości.png)

### Podsumowanie ankiety
W ostatnim widoku, w zakładce "Results" wyświetlane jest podsumowanie ankiety dostępności studentów. Kolumny odpowiadają każdemu zaproponowanemu przez nauczyciela terminowi i dzielą się na listy studentów, którym dany termin pasuje i którym dany termin nie pasuje.

![PodsumowanieAnkiety](/readme_images/PodsumowanieAnkiety.png)

### Generowanie grup i eksport
Pod podsumowaniem, jeżeli wszystkie dane dotychczas zostały wprowadzone poprawnie, widnieje formularz z wybraną liczbą grup zajęciowych do generowania. Po przesłaniu, niżej wyświetlają się wygenerowane grupy w formacie podobnym do podsumowania ankiet. Tym razem jednak w każdej z kolumn widnieją jedynie studenci przypisani do odpowiendiej grupy, wraz z informacją, czy podział taki im odpowiada.

W celu zapisania lokalnie wygenerowanych grup można je pobrać przyciskiem na dole. Plik pobiera się w formacie csv.

![GenerowanieGrup](/readme_images/GenerowanieGrup.png)

### Algorytm
Algorytm działa bardzo sprawnie. Dla 50 studentów z losowymi preferencjami i dostępnością na poziomie około 60% oraz generowaniem 3 grup zajęciowych spośród 10 możliwych terminów, przeciętnie 48/50 studentów jest zadowolonych. Przy większej dostępności studentów jest to zazwyczaj 50/50.

Jeżeli wygenerowane grupy są niesatysfakcjonujące, ponowne naciśnięcie przycisku generującego zwraca nowy podział prawie natychmiast, więc można je "przerzucać" do osiągnięcia satysfakcjonującego wyniku.

### Postman
Ponieważ formularze są wrażliwe na wypełnianie ich w złej kolejności, co grozi uniemożliwieniem generowania grup, do testowania dobrze działa Postman, do którego można wgrać przygotowaną kolekcję, znajdującą się w katalogu "postman".

Aby wygenerować grupy należy kolejno stworzyć możliwe grupy zajęciowe (metoda 5terms), stworzyć studentów (10students) i wysłać ich głosy w ankiecie (50votes). Ostatnia metoda (3groups) służy do generowania grup, jednak jeżeli wszystko zostało przesłane poprawnie, generowanie grup z zakładki "Results" w aplikacji powinno działać równie dobrze (plus tam jest czytelny widok).

![Postman](/readme_images/Postman.png)

### Czego brakuje lub co można ulepszyć
Pomimo różnych blokad przed niepoprawnym wysyłaniem formularzy, istnieje kilka słabych punktów w naszej aplikacji, które mogą skutecznie powstrzymać nauczyciela przed możliwością generowania grup. Dobrym pomysłem byłoby zarówno wprowadzenie większej liczby zabezpieczeń, jak i więcej opcji edycji zawartości bazy danych z poziomu aplikacji.

Nie udało nam się wprowadzić wszystkich planowanych zabezpieczeń. Brakuje nam route guarda, przez co znając link do zakładek nauczyciela można się do nich dostać bez jego uprawnień.

Dodatkowo, warto by rozwinąć działanie kont i sterowanie uprawnieniami. Nauczyciel mógłby mieć dostęp do szczegółów studentów, a studenci wgląd we wprowadzone przez nich dane/głosy i potencjalną możliwość ich edycji. Konta nie są też w żaden sposób weryfikowane, przez co istnieje możliwość podszywania się pod kogoś/tworzenia bliźniaczych kont i wysyłania głosów z danymi studenta o innym koncie.