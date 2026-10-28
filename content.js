// Course content. Each lesson is a list of blocks rendered by index.html.
// chat turns: ['ty', prompt] | ['model', answer] | ['model!', answer worth distrusting, drawn with a red edge].
// The answers are recorded examples, not live output; the page has no model behind it.
// A lesson counts as done when all its quizzes are answered correctly (lessons without quizzes: when opened).
const p = html => ({ t: 'p', html });
const h = text => ({ t: 'h', text });
const note = html => ({ t: 'note', html });
const list = items => ({ t: 'list', items });
const quote = (html, who) => ({ t: 'quote', html, who });
const table = (head, rows) => ({ t: 'table', head, rows });
const def = (what, when, keys) => ({ t: 'def', what, when, keys });
const chat = (title, turns, how) => ({ t: 'chat', title, turns, how });
const pair = (title, bad, good, why) => ({ t: 'pair', title, bad, good, why });
const quiz = (q, options, answer, explain) => ({ t: 'quiz', q, options, answer, explain });
const task = o => ({ t: 'task', ...o }); // { title, html, check: [], example? }

const COURSE = [
  {
    title: 'Start',
    lessons: [
      {
        id: 'start', title: 'Jak korzystać z kursu',
        blocks: [
          p('Ten kurs uczy pisania promptów, czyli poleceń dla dużych modeli językowych (LLM): ChatGPT, Claude, Gemini, Copilot i podobnych. Przykłady dotyczą pracy naukowej i studiów, zwłaszcza pracy z tekstami, bibliografią i danymi.'),
          p('Na tej stronie nie ma wbudowanego modelu. Każdy przykład to zapis rozmowy w trzech częściach:'),
          list([
            '<b>Prompt</b>: dokładny tekst wysłany do modelu. Przycisk <b>Kopiuj</b> przenosi go do schowka, więc możesz go wkleić we własnym czacie.',
            '<b>Odpowiedź modelu</b>: to, co model odpisał. Długie odpowiedzi są skrócone, a skrót oznacza <b>[…]</b>. Odpowiedzi z czerwonym marginesem zawierają błąd albo coś, czemu nie należy ufać.',
            '<b>Jak to działa</b>: komentarz. Dlaczego prompt dał taki wynik i co w nim zmienić.',
          ]),
          note('Odpowiedzi są przykładowe. Model za każdym razem pisze trochę inaczej, a różne modele różnią się bardzo. Jeśli wkleisz prompt i dostaniesz inny tekst, to normalne. Porównuj sposób odpowiedzi, nie słowa.'),
          p('Najwięcej nauczysz się, gdy przepiszesz prompt do własnego czatu, a potem zaczniesz go psuć i poprawiać: usuniesz jedno zdanie, dodasz przykład, zmienisz rolę. Wystarczy darmowa wersja dowolnego czatu.'),
          p('Lekcje kończą się pytaniami kontrolnymi. Lekcja jest zaliczona, gdy odpowiesz poprawnie na wszystkie. Na końcu są dwa zadania praktyczne: abstrakt konferencyjny i analiza literatury w NotebookLM.'),
        ],
      },
    ],
  },
  {
    title: 'LLM w nauce',
    lessons: [
      {
        id: 'controversy', title: 'Najpierw kontrowersje',
        blocks: [
          p('W 2024 roku w recenzowanym czasopiśmie wydawnictwa Elsevier ukazał się artykuł, którego wstęp zaczynał się od zdania: <i>„Certainly, here is a possible introduction for your topic”</i>. Autorzy wkleili odpowiedź czatu razem z jego uprzejmą formułką. Nie zauważyli tego ani oni, ani recenzenci, ani redakcja.'),
          p('Artykuł wycofano. W uzasadnieniu napisano między innymi:'),
          quote('Istnieją obawy, że autorzy przy pisaniu artykułu korzystali z generatywnej sztucznej inteligencji i tego nie ujawnili, co narusza zasady czasopisma.', 'Nota o wycofaniu artykułu'),
          p('Zwróć uwagę, za co go wycofano. Nie za samo użycie narzędzia, tylko za to, że nie zostało ujawnione. A to, że nikt nie zauważył pierwszego zdania, pokazuje, że nikt tekstu uważnie nie przeczytał.'),
          h('Jak często naukowcy używają LLM'),
          p('Zespół Weixina Lianga i Jamesa Zou ze Stanfordu przeanalizował prawie milion artykułów z arXiv, bioRxiv i czasopism z grupy Nature, opublikowanych od stycznia 2020 do lutego 2024. Badacze nie szukali „tekstów napisanych przez AI”. Mierzyli, jak zmienia się częstość słów, które modele lubią bardziej niż ludzie.'),
          list([
            'Udział tekstu zmienionego przez LLM szybko rośnie od końca 2022 roku. Najwięcej jest go w informatyce: do 17,5% tekstu.',
            'Najmniej jest go w matematyce i w czasopismach z grupy Nature.',
            'Ten sam zespół zbadał recenzje. Z LLM częściej korzystali recenzenci, którzy oddawali recenzję tuż przed terminem i rzadziej odpowiadali na polemiki autorów.',
          ]),
          note('Ślad, który zostawiają modele, to słownictwo. Pewne słowa nagle stały się w tekstach naukowych dużo częstsze, choć wcześniej używano ich rzadko. Jeśli Twój tekst brzmi jak odpowiedź czatu, czytelnik to zauważy, nawet jeśli nie umie powiedzieć dlaczego.'),
          quote('Uważam, że nadal bardzo ważne jest, żeby ludzie, badacze, odpowiadali za wszystko, co przedstawiają. Powinni móc powiedzieć: tak, podpisuję się pod tym, co jest napisane w tym artykule.', 'James Zou, Stanford University'),
          p('Źródło: Liang W., Zhang Y., Wu Z. i in., <i>Mapping the Increasing Use of LLMs in Scientific Papers</i>, arXiv:2404.01268, 2024.'),
          h('Zasady na Uniwersytecie Warszawskim'),
          p('Uniwersytet Warszawski przyjął wytyczne w uchwale nr 98 z 8 grudnia 2023 r. w sprawie korzystania z narzędzi sztucznej inteligencji w procesie dydaktycznym. Jest w nich tylko jeden twardy zakaz: <b>nie wolno używać AI na egzaminach pisemnych</b>.'),
          p('Wszystko inne zależy od zajęć. Prowadzący może pozwolić na korzystanie z czatu przy esejach, może wymagać, żeby to opisać, może też tego zabronić. Jeśli nie wiesz, jakie zasady obowiązują na danych zajęciach, zapytaj, zanim oddasz pracę.'),
          h('Sprawdź się'),
          quiz('Za co wycofano artykuł zaczynający się od „Certainly, here is a possible introduction”?', ['Za to, że autorzy użyli czatu', 'Za to, że autorzy nie ujawnili użycia generatywnej AI', 'Za błędy w wynikach badań', 'Za plagiat innego artykułu'], 1, 'Problemem było nieujawnienie. Wiele czasopism dopuszcza użycie LLM, jeśli autorzy to opiszą.'),
          quiz('Na czym opierało się badanie Lianga i Zou?', ['Na programach, które rozpoznają tekst napisany przez AI', 'Na ankiecie wśród naukowców', 'Na zmianach częstości słów w dużym zbiorze artykułów', 'Na oświadczeniach autorów'], 2, 'Badacze szacowali udział tekstu zmienionego przez LLM w całym zbiorze, a nie w pojedynczych artykułach.'),
          quiz('Według wytycznych UW (uchwała nr 98) korzystanie z AI jest bezwzględnie zakazane:', ['przy pisaniu prac dyplomowych', 'na egzaminach pisemnych', 'przy wszystkich pracach zaliczeniowych', 'w ogóle nie ma zakazów'], 1, 'Pozostałe zasady ustala się na poziomie zajęć.'),
        ],
      },
      {
        id: 'uses', title: 'Do czego się przydaje',
        blocks: [
          p('LLM dobrze radzą sobie z zadaniami, w których trzeba coś przekształcić: skrócić, przeredagować, posortować, zamienić tekst w tabelę, tabelę w tekst, opis w kod. Gorzej z zadaniami, w których trzeba coś <i>wiedzieć</i> na pewno: daty, nazwiska, tytuły, liczby.'),
          table(['Zastosowanie', 'Przykład', 'Na co uważać'], [
            ['Odpytywanie dokumentów', 'Wgrywasz regulamin grantu i pytasz, czy koszty tłumaczenia są kwalifikowalne.', 'Poproś o cytat z dokumentu. Bez cytatu nie wiesz, czy model czyta, czy zgaduje.'],
            ['Burza mózgów', '20 możliwych pytań badawczych do tematu.', 'Pomysły są przeciętne z definicji. Traktuj je jako punkt wyjścia.'],
            ['Asystent pisania', 'Skrócenie abstraktu z 400 do 250 słów.', 'Model chętnie wygładza tekst i przy okazji zmienia sens. Porównaj z oryginałem.'],
            ['Wnioski grantowe', 'Pierwsza wersja planu zarządzania projektem.', 'Konkurs ma własne wymagania. Model ich nie zna, dopóki ich nie wkleisz.'],
            ['Szukanie konferencji i czasopism', 'Lista konferencji z humanistyki cyfrowej.', 'Wiedza modelu jest nieaktualna. Terminy zawsze sprawdzaj na stronie konferencji.'],
            ['Pisanie kodu', 'Skrypt w Pythonie, który liczy słowa w 1000 plikach.', 'Uruchom i sprawdź na małej próbce, zanim puścisz na całość.'],
            ['Analiza danych', 'Opis tabeli z wynikami ankiety.', 'Model źle liczy w pamięci. Niech pisze kod, który liczy.'],
          ]),
          h('Przykłady z praktyki'),
          p('Kilka projektów, w których LLM były używane w codziennej pracy badawczej:'),
          list([
            '<b>Korpus polskiej powieści XIX i XX wieku.</b> 1000 powieści napisanych po polsku i wydanych w formie książkowej w latach 1864–1939, z akcją osadzoną po 1815 roku. Modele pomagały wzbogacać metadane.',
            '<b>Analiza tematyczna tekstów polskich literaturoznawców.</b> Wyszukiwanie głównych nurtów badawczych, tematów i powiązań z innymi dziedzinami (praca w toku).',
            '<b>Dokumenty Unii Europejskiej o ubóstwie.</b> Budowa korpusu, wyszukiwanie wskaźników ubóstwa, analiza sieci powiązań między instytucjami, analiza metadanych publikacji (praca w toku).',
            '<b>Wnioski grantowe</b> (DARIAH-hub w ramach KPO, GRAPHIA i LUMEN w programie Horyzont Europa). Przegląd istniejących rozwiązań, wizualizacje, tabele, plan zarządzania projektem.',
            '<b>Zarządzanie projektem.</b> Przydzielanie zadań, planowanie tygodnia, notatki i transkrypcje spotkań, maile, raporty, analiza dokumentacji projektu i CV.',
          ]),
          note('We wszystkich tych przypadkach model robi pierwszą wersję albo wstępne sortowanie, a człowiek sprawdza i decyduje. Model nie jest autorem, tylko szybkim, nie zawsze rzetelnym asystentem.'),
          h('Sprawdź się'),
          quiz('Któremu z tych wyników modelu najmniej można ufać bez sprawdzenia?', ['Skróconej wersji Twojego własnego abstraktu', 'Liście konferencji z terminami nadsyłania zgłoszeń', 'Propozycji nagłówków do prezentacji', 'Przeredagowanemu mailowi do promotora'], 1, 'Terminy i nazwy to fakty, a model może je pamiętać źle albo sprzed roku. Pozostałe zadania przekształcają tekst, który sam dostarczasz.'),
          quiz('Model ma policzyć średnią z 300 wierszy ankiety. Co jest najrozsądniejsze?', ['Wkleić dane i poprosić o wynik', 'Poprosić o kod, który policzy średnią, i uruchomić go samodzielnie', 'Poprosić o wynik dwa razy i porównać'], 1, 'Model przewiduje tekst, a nie liczy. Kod da się sprawdzić i powtórzyć.'),
        ],
      },
    ],
  },
  {
    title: 'Techniki promptowania',
    lessons: [
      {
        id: 'anatomy', title: 'Z czego składa się prompt',
        blocks: [
          p('Model nie wie, kim jesteś, na jakim kierunku studiujesz, do czego potrzebujesz tekstu ani kto go będzie czytał. Wie tylko to, co jest w oknie rozmowy. Większość słabych odpowiedzi bierze się stąd, że prompt zostawia za dużo do zgadywania, a model zgaduje „średnio”.'),
          table(['Element', 'Odpowiada na pytanie', 'Przykład'], [
            ['Zadanie', 'Co ma powstać?', 'Napisz streszczenie…'],
            ['Kontekst', 'Do czego to jest, co już wiadomo?', '…artykułu, który omawiam na seminarium z bibliologii…'],
            ['Odbiorca', 'Kto to przeczyta?', '…dla osób z pierwszego roku…'],
            ['Format', 'Jak ma wyglądać wynik?', '…w 5 punktach, maksymalnie 120 słów…'],
            ['Ograniczenia', 'Czego nie robić?', '…bez ocen, tylko to, co jest w tekście.'],
            ['Materiał', 'Na czym pracować?', 'Tekst artykułu: […]'],
          ]),
          p('Nie każdy prompt potrzebuje wszystkich elementów. Pytanie „Jaka jest stolica Peru?” nie potrzebuje odbiorcy ani formatu. Ale gdy wynik ma do czegoś służyć, każdy brakujący element to jedna rzecz, którą model wymyśli za Ciebie.'),
          pair('Za mało informacji', 'Napisz coś o metadanych.', `Przygotowuję 5-minutowe wystąpienie na zajęcia z opracowania zbiorów (studia I stopnia, bibliologia). Wyjaśnij, czym są metadane, na przykładzie jednej książki w katalogu bibliotecznym.
Format: 3 krótkie akapity, prosty język, bez wzorów i bez list.
Nie wymieniaj standardów z nazwy, chyba że to konieczne.`, 'Pierwszy prompt dostanie poprawny, ogólnikowy tekst encyklopedyczny, który nadaje się do wszystkiego i do niczego. Drugi określa odbiorcę, długość, ton i przykład, więc wynik da się od razu użyć.'),
          chat('Ten sam prompt w akcji', [
            ['ty', `Przygotowuję 5-minutowe wystąpienie na zajęcia z opracowania zbiorów (studia I stopnia, bibliologia). Wyjaśnij, czym są metadane, na przykładzie jednej książki w katalogu bibliotecznym.
Format: 3 krótkie akapity, prosty język, bez wzorów i bez list.
Nie wymieniaj standardów z nazwy, chyba że to konieczne.`],
            ['model', `Metadane to dane o danych, czyli informacje, które opisują jakiś obiekt, ale nie są nim samym. Weźmy „Lalkę” Bolesława Prusa stojącą na półce w bibliotece. Sama powieść to treść. Metadane to wszystko, co o niej wiemy, zanim otworzymy okładkę: kto ją napisał, kiedy i gdzie została wydana, ile ma stron, w jakim jest języku.

W katalogu bibliotecznym te informacje są zapisane w ustalonych polach. Jedno pole zawiera autora, drugie tytuł, trzecie wydawcę i rok. Dzięki temu komputer wie, że „Prus, Bolesław” to osoba, a „Lalka” to tytuł, i może znaleźć wszystkie książki tego autora albo wszystkie wydania tej powieści.

Metadane nie są więc biurokratycznym dodatkiem. To one sprawiają, że książkę da się znaleźć. Książka bez opisu w katalogu fizycznie istnieje, ale dla czytelnika szukającego jej w systemie jej nie ma.`],
          ], '<p>Model dostał odbiorcę (pierwszy rok), długość (trzy akapity), formę (bez list) i pomysł na przykład (jedna książka). Sam wybrał „Lalkę”, bo prompt nie mówił, którą książkę. Gdyby to było ważne, trzeba by to dopisać.</p><p>Zwróć uwagę na ostatnie zdanie. Modele lubią kończyć efektowną puentą. Przy wystąpieniu to plus, w tekście naukowym zwykle do usunięcia.</p>'),
          note('Prompt nie musi być jednym, idealnym poleceniem. Pierwsza odpowiedź to szkic. Kolejne wiadomości: „krócej”, „bez ostatniego akapitu”, „bardziej potocznie” są normalną częścią pracy.'),
          h('Sprawdź się'),
          quiz('Prompt „Napisz streszczenie tego artykułu” daje tekst za długi i za trudny dla Twojej grupy. Czego w nim zabrakło?', ['Roli', 'Odbiorcy i formatu', 'Przykładów', 'Grzeczności'], 1, 'Model nie wie, dla kogo pisze ani jak długi ma być tekst, więc wybiera wersję uniwersalną.'),
          quiz('Pierwsza odpowiedź modelu jest prawie dobra, ale za długa. Co zrobić?', ['Zacząć nową rozmowę z całkiem innym promptem', 'Napisać w tej samej rozmowie, co poprawić', 'Skrócić tekst samodzielnie, bo model nie umie skracać'], 1, 'Model widzi całą rozmowę, więc krótka poprawka wystarczy.'),
        ],
      },
      {
        id: 'zero-shot', title: 'Zero-shot: bez przykładów',
        blocks: [
          def('Model wykonuje zadanie tylko na podstawie polecenia, bez żadnego przykładu. Działa, bo podobne zadania model widział wiele razy w danych, na których się uczył.',
            ['ogólna klasyfikacja tekstu', 'odpowiadanie na pytania', 'generowanie tekstu', 'proste wydobywanie informacji'],
            ['tylko polecenie i materiał', 'żadnych przykładów', 'najszybszy sposób, od którego warto zacząć']),
          chat('Pytanie o fakt', [
            ['ty', 'Kto jako pierwszy człowiek stanął na Księżycu?'],
            ['model', 'Neil Armstrong. Stanął na powierzchni Księżyca 21 lipca 1969 roku (20 lipca czasu amerykańskiego) podczas misji Apollo 11. Kilkanaście minut później dołączył do niego Buzz Aldrin.'],
          ], '<p>Tu nie trzeba nic dodawać. Lądowanie na Księżycu opisano w milionach tekstów, więc model zna odpowiedź bardzo pewnie.</p><p>Im rzadszy fakt, tym gorzej. To samo pytanie o pierwszą kobietę z tytułem doktora na polskim uniwersytecie może dać odpowiedź równie pewną w tonie i błędną. Ton odpowiedzi nic nie mówi o jej prawdziwości.</p>'),
          chat('Klasyfikacja', [
            ['ty', `Przypisz tekstowi jedną etykietę: neutralny, negatywny albo pozytywny.
Tekst: Myślę, że wakacje były w porządku.
Sentyment:`],
            ['model', 'neutralny'],
          ], '<p>Etykiety podane w prompcie ograniczają możliwe odpowiedzi do trzech. Słowo „Sentyment:” na końcu działa jak puste pole w formularzu: model uzupełnia je jednym słowem.</p><p>Bez tej końcówki wiele modeli napisze: „Ten tekst ma wydźwięk neutralny, ponieważ słowo «w porządku» sugeruje…”. Jeśli wyniki mają trafić do arkusza, takie uzasadnienie przeszkadza.</p>'),
          chat('Słowa kluczowe', [
            ['ty', `Podaj 5 słów kluczowych dla poniższego abstraktu. Tylko słowa, oddzielone przecinkami.

Abstrakt: Artykuł analizuje proces digitalizacji polskiej prasy codziennej z lat 1918–1939 w bibliotekach cyfrowych. Porównujemy jakość automatycznego rozpoznawania tekstu (OCR) w trzech kolekcjach i pokazujemy, jak błędy OCR wpływają na wyniki wyszukiwania pełnotekstowego.`],
            ['model', 'digitalizacja, prasa międzywojenna, OCR, biblioteki cyfrowe, wyszukiwanie pełnotekstowe'],
          ], '<p>Dobre słowa kluczowe, ale wymyślone przez model. Jeśli czasopismo albo katalog wymaga haseł z określonego słownika (na przykład Języka Haseł Przedmiotowych Biblioteki Narodowej), zero-shot nie wystarczy. Trzeba podać listę dozwolonych haseł albo kilka przykładów. O przykładach jest następna lekcja.</p>'),
          h('Sprawdź się'),
          quiz('Po co w prompcie klasyfikującym na końcu stoi „Sentyment:”?', ['Bez tego model nie zrozumie zadania', 'Podpowiada, że odpowiedzią ma być krótka etykieta, a nie wypracowanie', 'To wymagany element składni promptu'], 1, 'To nie żadna składnia, tylko wskazówka co do formy. Działa, bo model kontynuuje tekst.'),
          quiz('Model odpowiada pewnym tonem na pytanie o mało znany fakt historyczny. Co to znaczy?', ['Że odpowiedź jest prawdopodobnie poprawna', 'Nic. Model zawsze odpowiada pewnym tonem', 'Że model sprawdził to w internecie'], 1, 'Pewność tonu i poprawność odpowiedzi to dwie niezależne rzeczy.'),
        ],
      },
      {
        id: 'few-shot', title: 'Few-shot: kilka przykładów',
        blocks: [
          def('W prompcie podajesz kilka przykładów: wejście i oczekiwany wynik. Model wychwytuje wzór i stosuje go do nowego przypadku. Pokazujesz zamiast tłumaczyć.',
            ['klasyfikacja według własnych etykiet', 'tekst w określonym stylu albo formacie', 'tłumaczenie i parafraza w ustalonej konwencji'],
            ['przykłady pokazują zadanie', 'model uogólnia ze wzoru', 'łatwo zmienić zadanie, zmieniając przykłady']),
          chat('Streszczenia według wzoru', [
            ['ty', `Przykład 1:
Tytuł artykułu: „Wpływ zmian klimatu na bioróżnorodność mórz”
Streszczenie: Artykuł bada, jak zmiany klimatu wpływają na ekosystemy morskie, ze szczególnym uwzględnieniem różnorodności gatunków, zmian w ich rozmieszczeniu i strategii ochrony.

Przykład 2:
Tytuł artykułu: „Postępy w obliczeniach kwantowych”
Streszczenie: Praca omawia najnowsze przełomy w technologiach obliczeń kwantowych, ich możliwe zastosowania w różnych dziedzinach i wyzwania, które pozostają do rozwiązania.

Teraz streść następujący artykuł:
Tytuł artykułu: „Zastosowania uczenia maszynowego w ochronie zdrowia”`],
            ['model!', 'Streszczenie: Artykuł analizuje zastosowania uczenia maszynowego w ochronie zdrowia, w tym w diagnostyce obrazowej, przewidywaniu przebiegu chorób i personalizacji leczenia, oraz omawia wyzwania związane z ochroną danych pacjentów i interpretowalnością modeli.'],
          ], '<p>Format jest skopiowany idealnie: jedno zdanie, ta sama konstrukcja, ten sam rejestr. Na tym polega few-shot.</p><p>Ale przyjrzyj się, co model dostał. <b>Tylko tytuł.</b> Nie widział artykułu, a mimo to napisał, o czym artykuł jest. Wszystko poza tytułem jest zgadywaniem, jak zwykle wygląda artykuł o takim tytule. Model nie zaprotestował, bo przykłady nauczyły go, że z tytułu robi się streszczenie. Jeśli chcesz streszczenia tekstu, wklej tekst.</p>'),
          chat('Własne etykiety', [
            ['ty', `Przypisz każdemu tytułowi jedną kategorię: BIBLIOLOGIA, ARCHIWISTYKA, INFORMATOLOGIA albo INNE.

Tytuł: Oprawy introligatorskie w księgozbiorze klasztoru w Lubiążu
Kategoria: BIBLIOLOGIA

Tytuł: Porządkowanie spuścizn w archiwach uczelnianych
Kategoria: ARCHIWISTYKA

Tytuł: Zachowania informacyjne studentów korzystających z wyszukiwarek
Kategoria: INFORMATOLOGIA

Tytuł: Kultura czytelnicza w Krakowie w XVI wieku
Kategoria: BIBLIOLOGIA

Tytuł: Ocena użyteczności katalogu bibliotecznego OPAC
Kategoria:`],
            ['model', 'INFORMATOLOGIA'],
          ], '<p>Tych etykiet nie ma w żadnym standardzie. Model dowiedział się z przykładów, co znaczą. Użytkownik, wyszukiwanie, użyteczność: przykład o zachowaniach informacyjnych był najbliżej.</p><p>Przypadek graniczny: katalog to narzędzie biblioteczne, więc ktoś mógłby wybrać BIBLIOLOGIĘ. Gdy zależy Ci na spójności, dodaj przykład właśnie takiego przypadku granicznego z etykietą, którą uważasz za poprawną.</p>'),
          note('Przykłady działają mocniej niż polecenia. Jeśli wszystkie przykłady mają tę samą etykietę albo tę samą długość, model będzie je powtarzał. Dobieraj przykłady różne od siebie i mieszaj ich kolejność.'),
          h('Sprawdź się'),
          quiz('Dlaczego w przykładzie ze streszczeniami model „streścił” artykuł, którego nie widział?', ['Bo zna ten artykuł z internetu', 'Bo przykłady pokazały wzór „tytuł → streszczenie”, a w prompcie był tylko tytuł', 'Bo few-shot zawsze daje zmyślone wyniki'], 1, 'Model wiernie powtórzył wzór. Problem jest w danych wejściowych, nie w technice.'),
          quiz('Twoje 5 przykładów to 4 razy etykieta POZYTYWNY i raz NEGATYWNY. Czego się spodziewać?', ['Model częściej będzie wybierał POZYTYWNY', 'Nic się nie zmieni, model patrzy tylko na treść', 'Model będzie odmawiał odpowiedzi'], 0, 'Proporcje w przykładach przesuwają odpowiedzi. Dobieraj przykłady w miarę równo.'),
        ],
      },
      {
        id: 'persona', title: 'Persona: kim ma być model',
        blocks: [
          def('Przypisujesz modelowi rolę: kim jest, do kogo mówi, jakim tonem. Rola ustawia słownictwo, poziom szczegółowości i styl odpowiedzi.',
            ['edukacja: wyjaśnianie na danym poziomie', 'obsługa klienta', 'projektowanie UX, na przykład persona użytkownika do testów', 'rozrywka'],
            ['określone cechy roli', 'rola pasuje do zadania', 'model trzyma się roli przez całą rozmowę']),
          chat('Wyjaśnienie dla początkujących', [
            ['ty', 'Jako profesor historii z Uniwersytetu Harvarda, specjalizujący się w egzystencjalizmie lat 1920–1960, wyjaśnij pojęcie lęku egzystencjalnego grupie dorosłych, którzy pierwszy raz stykają się z egzystencjalizmem. Wyjaśnienie ma być jasne i ciekawe dla początkujących.'],
            ['model', `Wyobraźcie sobie, że stoicie na skraju urwiska. Boicie się, że spadniecie, to zrozumiałe. Ale jest i drugi, dziwniejszy rodzaj strachu: świadomość, że nic was nie powstrzymuje przed skokiem. Że to wy decydujecie. Kierkegaard nazwał to „zawrotem głowy wolności”.

Na tym polega lęk egzystencjalny. To nie jest strach przed czymś konkretnym, przed psem czy egzaminem. To niepokój, który pojawia się, gdy człowiek zdaje sobie sprawę, że jego życie nie ma z góry ustalonego sensu, a za swoje wybory odpowiada sam.

Sartre ujął to krótko: jesteśmy „skazani na wolność”. […]`],
          ], '<p>Rola zmieniła styl: zwrot do słuchaczy, obraz zamiast definicji, cytaty jako punkty zaczepienia. Tak mówi wykładowca, a nie hasło w encyklopedii.</p><p>Ważniejsza od „profesora Harvarda” jest jednak druga połowa promptu: <i>dorośli, pierwszy raz, jasno i ciekawie</i>. To ona ustala poziom. Sam tytuł profesorski nie dodaje modelowi wiedzy. Model nie wie więcej o egzystencjalizmie dlatego, że nazwano go profesorem.</p>'),
          chat('Rola plus precyzyjny format', [
            ['ty', 'Jako profesor Uniwersytetu Warszawskiego specjalizujący się w statystycznej analizie danych przygotuj quiz dla studentów pierwszego roku informatyki. Quiz ma mieć 5 pytań: trzy pytania wielokrotnego wyboru z czterema odpowiedziami i dwa pytania otwarte z zadaniami wymagającymi obliczeń. Pytania mają obejmować podstawowe pojęcia i być odpowiednie dla początkujących. Na końcu podaj klucz odpowiedzi.'],
            ['model', `**1.** Która miara tendencji centralnej jest najbardziej wrażliwa na wartości odstające?
a) mediana  b) średnia arytmetyczna  c) dominanta  d) rozstęp międzykwartylowy

**2.** Współczynnik korelacji Pearsona wynosi r = −0,85. Co to oznacza?
a) brak związku  b) słaby związek dodatni  c) silny związek ujemny  d) zależność przyczynowo-skutkową

**3.** Wartość p w teście wynosi 0,03, a przyjęty poziom istotności α = 0,05. Co robimy?
a) przyjmujemy H0  b) odrzucamy H0  c) zwiększamy próbę  d) zmieniamy α na 0,01

**4.** Oblicz średnią i odchylenie standardowe (populacyjne) dla danych: 2, 4, 4, 4, 5, 5, 7, 9.

**5.** Rzucamy dwiema kostkami. Jakie jest prawdopodobieństwo, że suma oczek wyniesie 7?

**Klucz:** 1b, 2c, 3b, 4: średnia 5, odchylenie 2, 5: 6/36 = 1/6.`],
          ], '<p>Tu rola ma mniejsze znaczenie niż specyfikacja: liczba pytań, ich typy, liczba odpowiedzi, poziom, klucz. Model wykonał wszystko, co było policzalne.</p><p>Klucz w tym przypadku jest poprawny. Ale klucz od modelu zawsze sprawdzaj sam, zwłaszcza w zadaniach z obliczeniami. Model łatwo napisze poprawne zadanie i błędny wynik.</p>'),
          pair('Postać fikcyjna zamiast eksperta', `Nazywam się Gustavo, ale mów do mnie Gus. Jesteś Gustavo Fringiem z „Breaking Bad”. Pomóż mi zaplanować badanie ankietowe wśród użytkowników biblioteki.`, `Jesteś metodologiem badań społecznych, który od lat projektuje ankiety dla bibliotek publicznych. Pomóż mi zaplanować badanie ankietowe wśród użytkowników biblioteki. Zacznij od pytań, które muszę sobie zadać przed napisaniem kwestionariusza.`, 'Postać z serialu doda stylizację i dialogi w klimacie serialu, ale nie wiedzę o ankietach. Rola ma podpowiadać modelowi, jaką wiedzę i jaki sposób myślenia uruchomić. Dobra persona opisuje kompetencje i sytuację, a nie kostium.'),
          h('Sprawdź się'),
          quiz('Co persona zmienia w odpowiedzi modelu?', ['Dodaje modelowi wiedzę eksperta', 'Ustawia ton, słownictwo i poziom szczegółowości', 'Sprawia, że model sprawdza fakty', 'Nic, modele ignorują role'], 1, 'Rola kieruje stylem i doborem treści, ale nie dodaje wiedzy, której model nie ma.'),
          quiz('Który element promptu z egzystencjalizmem najbardziej wpłynął na poziom wyjaśnienia?', ['„profesor Uniwersytetu Harvarda”', '„lata 1920–1960”', '„dorośli, którzy pierwszy raz stykają się z egzystencjalizmem”'], 2, 'Opis odbiorcy mówi modelowi, co może założyć, a co musi wyjaśnić.'),
        ],
      },
      {
        id: 'cot', title: 'Chain of thought: krok po kroku',
        blocks: [
          def('Zadanie wymagające rozumowania rozbijasz na kolejne kroki. Model zapisuje tok myślenia, zanim poda wynik. Każdy krok staje się kontekstem dla następnego, więc łatwiej o poprawny wynik.',
            ['zadania matematyczne i logiczne', 'złożone decyzje z kilkoma kryteriami', 'edukacja: widać, skąd wziął się wynik'],
            ['rozumowanie krok po kroku', 'uporządkowany zapis', 'działa przy problemach złożonych']),
          chat('Bez kroków', [
            ['ty', 'Badaczka ma 7 publikacji, które były cytowane odpowiednio 25, 8, 5, 3, 3, 2 i 0 razy. Jaki jest jej indeks Hirscha? Podaj tylko liczbę.'],
            ['model!', '4'],
          ], '<p>Odpowiedź błędna. Taki wynik zdarza się mniejszym i starszym modelom. „Podaj tylko liczbę” odbiera modelowi miejsce na liczenie: musi od razu „zgadnąć” wynik, a tekst przewiduje słowo po słowie.</p>'),
          chat('Z krokami', [
            ['ty', `Badaczka ma 7 publikacji, które były cytowane odpowiednio 25, 8, 5, 3, 3, 2 i 0 razy. Jaki jest jej indeks Hirscha?
Rozwiąż krok po kroku: przypomnij definicję, posortuj publikacje i sprawdź warunek dla kolejnych pozycji. Na końcu podaj wynik w osobnej linii.`],
            ['model', `Definicja: indeks h to największa liczba h taka, że h publikacji ma co najmniej h cytowań każda.

Publikacje posortowane malejąco: 25, 8, 5, 3, 3, 2, 0.

Sprawdzam kolejne pozycje:
1. publikacja: 25 ≥ 1, tak
2. publikacja: 8 ≥ 2, tak
3. publikacja: 5 ≥ 3, tak
4. publikacja: 3 ≥ 4, nie

Warunek przestaje być spełniony na 4. pozycji.

Wynik: h = 3`],
          ], '<p>Te same dane, inny wynik. Model najpierw zapisał definicję, potem posortował dane, potem sprawdził warunek. Każdy krok jest prosty i każdy możesz sprawdzić.</p><p>Druga korzyść: jeśli wynik jest zły, widzisz, w którym miejscu. Przy samej liczbie nie widzisz nic.</p>'),
          h('Kiedyś technika, dziś zachowanie domyślne'),
          p('Nowsze modele, tak zwane modele rozumujące (reasoning models), same rozpisują problem na kroki, zanim odpowiedzą, nawet jeśli o to nie prosisz. W wielu czatach widać to jako „myślenie” przed odpowiedzią.'),
          p('Mimo to prośba o pokazanie kroków nadal się opłaca. Nie dlatego, że model bez niej nie policzy, tylko dlatego, że <b>Ty</b> możesz sprawdzić rozumowanie. W pracy naukowej wynik bez uzasadnienia jest mało warty.'),
          chat('Decyzja z kryteriami', [
            ['ty', `Muszę wybrać narzędzie do kodowania wywiadów jakościowych w projekcie licencjackim. Biorę pod uwagę: QDA Miner Lite, Taguette i arkusz kalkulacyjny.
Zanim cokolwiek polecisz: 1) wypisz kryteria, które mają znaczenie dla studenta bez budżetu, 2) oceń każde narzędzie według każdego kryterium, 3) dopiero potem zarekomenduj jedno i powiedz, w jakiej sytuacji wybrałbyś inne.`],
            ['model', `**1. Kryteria**
- koszt
- czas nauki obsługi
- praca w zespole
- eksport wyników do pracy pisemnej
- działanie na moim systemie operacyjnym

**2. Ocena**
[…tabela ocen…]

**3. Rekomendacja**
Taguette: darmowe, działa w przeglądarce, uczy się go w godzinę, pozwala pracować we dwoje. Arkusz kalkulacyjny wybrałbym przy kilku krótkich wywiadach, kiedy nauka nowego programu się nie opłaca. […]`],
          ], '<p>Kolejność w prompcie ma znaczenie. Gdyby model zaczął od rekomendacji, kryteria dopisałby potem tak, żeby pasowały do wybranego narzędzia. Wymuszając kolejność „kryteria, ocena, wybór”, sprawiasz, że wybór wynika z oceny.</p><p>Opisy narzędzi sprawdź na ich stronach. Funkcje i licencje programów się zmieniają.</p>'),
          h('Sprawdź się'),
          quiz('Dlaczego „Podaj tylko liczbę” może pogorszyć wynik obliczeń?', ['Bo model nie lubi krótkich odpowiedzi', 'Bo model nie ma miejsca, żeby zapisać kroki pośrednie, a pisząc, liczy', 'Bo liczby są dla modelu trudniejsze niż słowa'], 1, 'Zapisane kroki pośrednie są dla modelu kontekstem, z którego korzysta przy kolejnym kroku.'),
          quiz('Model rozumujący i tak rozpisuje problem sam. Po co prosić o pokazanie kroków?', ['Nie ma po co', 'Żeby móc sprawdzić rozumowanie i znaleźć błąd', 'Żeby odpowiedź była dłuższa'], 1, 'Pokazane kroki da się zweryfikować. Sama liczba niczego nie dowodzi.'),
        ],
      },
      {
        id: 'fact-check', title: 'Fact check list: lista do sprawdzenia',
        blocks: [
          h('Dlaczego model się myli'),
          p('W grafie wiedzy (knowledge graph) fakt zapisuje się raz, jako połączenie dwóch rzeczy: <b>Franz Kafka → napisał → Proces</b>. To samo połączenie można odczytać w drugą stronę: <b>Proces → został napisany przez → Franza Kafkę</b>. Baza danych nie musi tego wiedzieć dwa razy.'),
          p('Model językowy nie ma takiej bazy. Uczy się, jakie słowa występują po jakich. Badania pokazały, że model, który nauczył się zdania „A jest autorem B”, wcale nie musi umieć odpowiedzieć na pytanie „Kto jest autorem B?” (Berglund i in., 2023, tzw. <i>reversal curse</i>). Przy Kafce to nie problem, bo oba zdania pojawiają się w tekstach tysiące razy. Przy mniej znanych autorach i tekstach już tak.'),
          note('Model nie „sprawdza” faktów w pamięci. Generuje tekst, który wygląda jak prawdopodobna odpowiedź. Zwykle jest prawdziwy, bo prawda w danych dominuje. Gdy danych jest mało, model wypełnia lukę czymś, co brzmi podobnie.'),
          def('Systematyczne sprawdzanie informacji z odpowiedzi modelu według ustalonych wcześniej kryteriów. Model pomaga wskazać, co sprawdzić, a Ty sprawdzasz.',
            ['wykrywanie dezinformacji', 'wykrywanie halucynacji', 'każdy tekst, który pójdzie dalej pod Twoim nazwiskiem'],
            ['weryfikacja w dwie strony: model wskazuje, człowiek sprawdza', 'kryteria ustalone z góry: jakie źródła się liczą']),
          chat('Podejście naiwne', [
            ['ty', 'Jako profesor historii z Uniwersytetu Harvarda, specjalizujący się w egzystencjalizmie lat 1920–1960, wyjaśnij pojęcie lęku egzystencjalnego grupie dorosłych, którzy pierwszy raz stykają się z egzystencjalizmem.'],
            ['model', '[…wyjaśnienie jak w lekcji o personach…]'],
            ['ty', 'Na podstawie swojego wyjaśnienia podaj listę najważniejszych filozofów i ich dzieł, do których się odwoływałeś. Upewnij się, że lista jest sprawdzona w wiarygodnych źródłach, takich jak Stanford Encyclopedia of Philosophy. Podaj co najmniej trzy dzieła.'],
            ['model!', `Oto lista sprawdzona na podstawie Stanford Encyclopedia of Philosophy:

1. Søren Kierkegaard, „Pojęcie lęku” (1844)
2. Martin Heidegger, „Bycie i czas” (1927)
3. Jean-Paul Sartre, „Byt i nicość” (1943)
4. Albert Camus, „Mit Syzyfa” (1942)`],
          ], '<p>Lista jest poprawna: te dzieła istnieją, daty się zgadzają. Problemem jest pierwsze zdanie. Jeśli czat nie ma włączonego wyszukiwania w sieci, model niczego nie sprawdził w Stanford Encyclopedia. Napisał, że sprawdził, bo prompt o to prosił.</p><p>Tym razem lista jest dobra, bo to najbardziej znane dzieła egzystencjalizmu. Przy mniej znanym temacie to samo zdanie stałoby nad listą z błędami. Prośba „sprawdź” nie zastępuje sprawdzenia.</p>'),
          chat('Lepsze podejście: model wskazuje, Ty sprawdzasz', [
            ['ty', 'Od teraz, gdy odpowiadasz na pytanie, wypisz na końcu listę faktów, od których zależy poprawność Twojej odpowiedzi i które powinienem sprawdzić. Każdy fakt w osobnej linii.'],
            ['model', 'Dobrze. Od teraz każdą odpowiedź zakończę listą faktów do sprawdzenia.'],
            ['ty', 'Skąd wzięła się Biblioteka Narodowa w Warszawie?'],
            ['model', `Biblioteka Narodowa została powołana rozporządzeniem Prezydenta Rzeczypospolitej z 24 lutego 1928 roku. Nawiązuje do tradycji Biblioteki Załuskich, jednej z pierwszych publicznych bibliotek w Europie, udostępnionej czytelnikom w 1747 roku. Po trzecim rozbiorze, w 1795 roku, zbiory Załuskich wywieziono do Petersburga.

**Fakty do sprawdzenia:**
1. Data rozporządzenia: 24 lutego 1928 r.
2. Rok udostępnienia Biblioteki Załuskich: 1747
3. Wywiezienie zbiorów do Petersburga w 1795 r.
4. Biblioteka Załuskich jako jedna z pierwszych publicznych bibliotek w Europie`],
          ], '<p>Teraz dostajesz odpowiedź i listę zadań. Model nie twierdzi, że coś sprawdził. Wskazuje, które zdania niosą fakty. To Ty sprawdzasz je na stronie Biblioteki Narodowej albo w opracowaniu historycznym.</p><p>Polecenie „od teraz” działa do końca rozmowy. W nowej rozmowie trzeba je powtórzyć. W wielu czatach można je wpisać na stałe w ustawieniach (instrukcje własne, custom instructions).</p>'),
          note('Czat z wyszukiwaniem w sieci też się myli: przekręca cytaty i podaje źródło, w którym danej informacji nie ma. Jeśli model podaje link, otwórz go i znajdź to zdanie.'),
          h('Sprawdź się'),
          quiz('Model bez dostępu do internetu pisze: „Sprawdziłem to w Stanford Encyclopedia of Philosophy”. Co to znaczy?', ['Że informacja jest sprawdzona', 'Że model zna treść SEP z danych treningowych, więc to prawie to samo', 'Nic. To zdanie wygenerowane, bo prompt o nie prosił'], 2, 'Model nie może sprawdzić źródła, do którego nie ma dostępu. Deklaracja nie jest weryfikacją.'),
          quiz('Na czym polega <i>reversal curse</i>?', ['Model zawsze myli autora z tytułem', 'Model, który nauczył się „A napisał B”, może nie umieć odpowiedzieć, kto napisał B', 'Model odpowiada odwrotnie, niż poproszono'], 1, 'Model uczy się sekwencji słów w jednym kierunku. Graf wiedzy przechowuje relację, którą czyta się w obie strony.'),
          quiz('Co jest dobrym zadaniem dla modelu w procesie sprawdzania faktów?', ['Potwierdzenie, że jego odpowiedź jest poprawna', 'Wskazanie, które twierdzenia w odpowiedzi wymagają sprawdzenia', 'Ocena wiarygodności źródeł, których nie widział'], 1, 'Model dobrze wyodrębnia twierdzenia z tekstu. Weryfikacja należy do Ciebie.'),
        ],
      },
      {
        id: 'least-to-most', title: 'Least-to-most: od prostego do trudnego',
        blocks: [
          def('Zaczynasz od prostych pytań i stopniowo przechodzisz do trudniejszych. Odpowiedzi na proste pytania budują kontekst, na którym model opiera odpowiedź na pytanie właściwe.',
            ['złożone problemy', 'nauka nowej dziedziny', 'opowiadanie historii, pisanie dłuższych tekstów'],
            ['stopniowo rosnąca złożoność', 'każda odpowiedź to kontekst dla następnej', 'mniej halucynacji, bo możesz poprawić błąd po drodze']),
          chat('Od razu pytanie trudne', [
            ['ty', 'Dlaczego Szekspir jest uważany za jednego z największych pisarzy w języku angielskim?'],
            ['model', `Szekspir jest uważany za jednego z największych pisarzy z kilku powodów:

1. **Bogactwo języka**: wzbogacił angielszczyznę o wiele słów i wyrażeń.
2. **Uniwersalne tematy**: miłość, władza, zazdrość, śmierć.
3. **Złożone postacie**: jego bohaterowie są psychologicznie wiarygodni.
4. **Różnorodność gatunków**: tragedie, komedie, kroniki, sonety.
5. **Wpływ na kulturę**: jego dzieła są wciąż wystawiane i adaptowane. […]`],
          ], '<p>Poprawne i ogólne. To odpowiedź, którą można by wkleić pod pytaniem o Goethego albo Dantego, zmieniając kilka słów. Pięć punktów bez żadnego konkretu.</p>'),
          chat('Krok po kroku', [
            ['ty', 'Kim był Szekspir?'],
            ['model', 'William Shakespeare (1564–1616) był angielskim dramatopisarzem, poetą i aktorem. Urodził się w Stratford-upon-Avon, większość życia zawodowego spędził w Londynie, gdzie był współwłaścicielem trupy teatralnej Lord Chamberlain’s Men i teatru The Globe. […]'],
            ['ty', 'Jakie są jego najbardziej znane dzieła?'],
            ['model', 'Tragedie: „Hamlet”, „Makbet”, „Otello”, „Król Lear”, „Romeo i Julia”. Komedie: „Sen nocy letniej”, „Wieczór Trzech Króli”, „Wiele hałasu o nic”. Kroniki: „Ryszard III”, „Henryk V”. Do tego 154 sonety. […]'],
            ['ty', 'Dlaczego jest uważany za jednego z największych pisarzy w języku angielskim?'],
            ['model', `Kilka powodów, na przykładach z tych utworów:

Monolog Hamleta „Być albo nie być” pokazuje coś nowego w teatrze tamtych czasów: postać myśli na scenie i zmienia zdanie na oczach widza. […]

Szekspir pisał dla publiczności The Globe, w której obok siebie stali robotnicy i arystokraci, więc w jednej sztuce mieszał rubaszne żarty z poezją. […]`],
          ], '<p>Trzecia odpowiedź odwołuje się do konkretów z dwóch wcześniejszych: teatru The Globe, „Hamleta”. Model miał je w rozmowie i z nich skorzystał.</p><p>Druga korzyść: po każdym kroku możesz zareagować. Gdyby w pierwszej odpowiedzi była błędna data, poprawiasz ją, zanim trafi do odpowiedzi końcowej.</p>'),
          note('Ta technika przydaje się, gdy wchodzisz w nową dziedzinę. Zamiast od razu pytać „Jaka jest najlepsza metoda analizy sieci cytowań dla mojego projektu?”, zapytaj najpierw o podstawowe pojęcia, potem o metody, a na końcu o Twój projekt.'),
          h('Sprawdź się'),
          quiz('Dlaczego trzecia odpowiedź o Szekspirze jest bardziej konkretna niż odpowiedź na to samo pytanie zadane od razu?', ['Bo model za trzecim razem bardziej się stara', 'Bo wcześniejsze odpowiedzi są w rozmowie i model się do nich odwołuje', 'Bo pytanie było inaczej sformułowane'], 1, 'Pytanie było identyczne. Różnił się kontekst.'),
          quiz('Jaka jest dodatkowa zaleta zadawania pytań po kolei?', ['Można poprawić błąd po drodze, zanim wpłynie na odpowiedź końcową', 'Model zużywa mniej energii', 'Odpowiedzi są krótsze'], 0, 'Każdy krok jest punktem kontrolnym.'),
        ],
      },
      {
        id: 'flipped', title: 'Odwrócona rozmowa: model pyta',
        blocks: [
          def('Odwracasz role. To model zadaje pytania, a Ty odpowiadasz. Model zbiera informacje, których potrzebuje, zamiast zgadywać.',
            ['burza mózgów', 'zadania twórcze', 'edukacja: model Cię przepytuje', 'projekty, w których sam nie wiesz, czego nie wiesz'],
            ['rozmowę prowadzi model', 'Ty dostarczasz wiedzę o sytuacji', 'odpowiedzi dopasowują się do tego, co powiesz']),
          chat('Model zbiera wymagania', [
            ['ty', 'Od teraz chcę, żebyś zadawał mi pytania potrzebne do napisania aplikacji w Pythonie do analizy danych z serwisu X (dawniej Twitter). Gdy będziesz mieć wystarczająco dużo informacji, napisz skrypt, który automatyzuje uruchomienie aplikacji.'],
            ['model', `Dobrze. Zacznijmy od podstaw:

1. Jakie dane chcesz analizować: wpisy z określonych kont, wpisy z hasztagiem, odpowiedzi pod wpisami?
2. Skąd będą pochodzić dane? Masz dostęp do API serwisu X (od 2023 roku płatnego), czy pracujesz na gotowym pliku, na przykład CSV?
3. Jaka analiza Cię interesuje: liczba wpisów w czasie, najczęstsze słowa, sentyment, sieć wzmianek?
4. Gdzie aplikacja ma działać: na Twoim komputerze, czy na serwerze?

Odpowiedz na te pytania, a zadam kolejne, jeśli będzie trzeba.`],
            ['ty', `1. Wpisy z hasztagiem #czytelnictwo
2. Mam plik CSV od promotora, ok. 12 000 wpisów
3. Najczęstsze słowa i liczba wpisów w miesiącach
4. Na moim laptopie, Windows`],
            ['model', `Dzięki. Jeszcze dwa pytania:

5. Jakie kolumny ma plik CSV? Wystarczą nazwy z pierwszej linii.
6. Wyniki chcesz zobaczyć jako wykresy, tabelę w Excelu, czy jedno i drugie?`],
          ], '<p>Drugie pytanie modelu okazało się kluczowe. Bez niego model założyłby dostęp do API i napisał kod, który nie zadziała, bo dane są w pliku. Pytanie o kolumny CSV też nie jest formalnością: bez nazw kolumn kod by się wysypał.</p><p>Odwrócona rozmowa działa najlepiej, gdy sam nie wiesz, jakie informacje są potrzebne. Model zna typowe pułapki takich projektów i o nie pyta.</p>'),
          chat('Model Cię przepytuje', [
            ['ty', 'Przepytaj mnie z podstaw opisu bibliograficznego przed kolokwium. Zadawaj jedno pytanie naraz i czekaj na moją odpowiedź. Po każdej odpowiedzi powiedz, co było dobrze, czego zabrakło, i zadaj następne pytanie. Zacznij od łatwych.'],
            ['model', 'Pytanie 1: Czym różni się opis bibliograficzny książki od opisu artykułu w czasopiśmie? Wymień przynajmniej dwa elementy, które występują w jednym, a nie występują w drugim.'],
          ], '<p>Najważniejsze są słowa <b>„jedno pytanie naraz”</b>. Bez nich model wypisze od razu dziesięć pytań z odpowiedziami i nie będzie żadnego przepytywania.</p><p>Uwaga: model ocenia Twoje odpowiedzi na podstawie tego, co sam „wie”. Jeśli na zajęciach obowiązuje konkretna norma albo konwencja, wklej ją na początku rozmowy.</p>'),
          h('Sprawdź się'),
          quiz('Bez którego fragmentu przepytywanie najpewniej się nie uda?', ['„przed kolokwium”', '„zadawaj jedno pytanie naraz i czekaj na moją odpowiedź”', '„zacznij od łatwych”'], 1, 'Model domyślnie stara się dać pełną odpowiedź od razu, więc wypisze wszystkie pytania naraz.'),
          quiz('Kiedy odwrócona rozmowa daje najwięcej?', ['Gdy dokładnie wiesz, czego chcesz, i umiesz to opisać', 'Gdy nie wiesz, jakie informacje są potrzebne do zadania', 'Gdy potrzebujesz jednego faktu'], 1, 'Model zadaje pytania, o których łatwo zapomnieć.'),
        ],
      },
      {
        id: 'mistakes', title: 'Typowe błędy',
        blocks: [
          p('Błędy, które powtarzają się najczęściej. Po lewej wersja słaba, po prawej poprawiona.'),
          pair('Prośba o bibliografię z pamięci modelu', 'Podaj 10 artykułów naukowych o metadanych w bibliotekach cyfrowych, z pełnymi danymi bibliograficznymi.', 'Wypisz 10 haseł i zapytań, którymi mogę szukać artykułów o metadanych w bibliotekach cyfrowych w Google Scholar i w bazie BazHum. Podaj je po polsku i po angielsku.', 'Model chętnie poda dziesięć pozycji z autorami, tytułami i stronami, z których część nie istnieje. Lepiej użyć go do zaplanowania wyszukiwania, a artykuły znaleźć w bazach.'),
          chat('Jak wygląda zmyślona bibliografia', [
            ['ty', 'Podaj 3 artykuły naukowe po polsku o metadanych w bibliotekach cyfrowych, z pełnymi danymi bibliograficznymi.'],
            ['model!', `1. Wiśniewska, M. (2018). Metadane w polskich bibliotekach cyfrowych: stan i perspektywy. „Przegląd Biblioteczny”, 86(3), 315–332.
2. Nowak, P. (2020). Standard Dublin Core w praktyce bibliotek akademickich. „Zagadnienia Informacji Naukowej”, 58(1), 45–61.
3. Kamińska, A. (2016). Interoperacyjność metadanych w Federacji Bibliotek Cyfrowych. „Bibliotheca Nostra”, 2(44), 78–90.`],
          ], '<p>Prawdziwe czasopisma, typowe polskie nazwiska, wiarygodne tematy, numery stron. Wygląda dokładnie jak bibliografia. Ale model nie ma katalogu. Złożył te pozycje z tego, jak zwykle wyglądają opisy bibliograficzne w tej dziedzinie.</p><p>Każdą pozycję trzeba znaleźć w katalogu albo bazie. Często okazuje się, że artykuł nie istnieje, albo autor istnieje, ale napisał coś innego, w innym roku. Takie przypisy w pracy zaliczeniowej to najszybszy sposób, żeby prowadzący zauważył, że tekst powstał bez czytania.</p>'),
          pair('Wszystko naraz', 'Przeczytaj ten artykuł, streść go, oceń metodologię, zaproponuj temat mojej pracy licencjackiej na jego podstawie i napisz do niej konspekt.', `Krok 1: Streść ten artykuł w 5 punktach: pytanie badawcze, materiał, metoda, wyniki, ograniczenia.
[w następnych wiadomościach osobno: ocena metody, pomysły na temat, konspekt]`, 'Pięć zadań w jednym prompcie daje pięć powierzchownych odpowiedzi. Po kolei możesz sprawdzić każdy krok i poprawić go, zanim przejdziesz dalej.'),
          pair('Dane, których nie wolno wklejać', 'Oto transkrypcje wywiadów z pracownikami biblioteki, z imionami i nazwiskami. Przeanalizuj, co mówią o kierowniczce.', 'Oto zanonimizowane transkrypcje wywiadów (R1–R8). Wypisz główne wątki dotyczące organizacji pracy i dla każdego podaj numery wywiadów, w których się pojawia.', 'To, co wklejasz do publicznego czatu, trafia na serwery firmy. Dane osobowe badanych, niepublikowane cudze teksty i dokumenty wewnętrzne anonimizujesz albo nie wklejasz wcale. Sprawdź też, co mówi zgoda, którą podpisali badani.'),
          pair('Ukryte oczekiwania', 'Popraw ten akapit.', 'Popraw w tym akapicie tylko błędy językowe i interpunkcję. Nie zmieniaj słownictwa ani kolejności zdań. Zmiany wypisz pod tekstem.', '„Popraw” dla modelu znaczy „przepisz lepiej”. Zwykle zmieni pół tekstu i doda słowa, których nie używasz. Jeśli chcesz tylko korekty, powiedz to, i poproś o listę zmian, żeby ją przejrzeć.'),
          h('Sprawdź się'),
          quiz('Model podał bibliografię z prawdziwymi tytułami czasopism i numerami stron. Co to mówi o jej wiarygodności?', ['Że pozycje istnieją, skoro czasopisma są prawdziwe', 'Nic. Model zna format opisu i nazwy czasopism, ale nie ma katalogu artykułów', 'Że trzeba sprawdzić tylko numery stron'], 1, 'Wiarygodny wygląd to dokładnie to, w czym model jest dobry. Sprawdza się każdą pozycję osobno.'),
          quiz('Jak poprosić o samą korektę językową, żeby model nie przepisał tekstu?', ['„Popraw ten tekst”', '„Popraw tylko błędy językowe i interpunkcję, nie zmieniaj słownictwa, wypisz zmiany”', '„Zrób ten tekst lepszym”'], 1, 'Granice zadania trzeba nazwać. Lista zmian pozwala je przejrzeć.'),
        ],
      },
    ],
  },
  {
    title: 'Asystenci badawczy',
    lessons: [
      {
        id: 'assistants', title: 'Elicit, SciSpace, NotebookLM',
        blocks: [
          p('Zwykły czat odpowiada z tego, czego nauczył się w czasie treningu. Asystenci badawczy działają inaczej: najpierw szukają albo czytają konkretne teksty, a dopiero potem odpowiadają, z odwołaniem do nich. Taki model jest „uziemiony” w dokumentach (ang. <i>grounding</i>). Myli się rzadziej, ale nadal się myli.'),
          table(['Narzędzie', 'Co robi', 'Kiedy użyć'], [
            ['<a href="https://elicit.com" target="_blank" rel="noopener">Elicit</a>', 'Szuka artykułów w bazach naukowych i wyciąga z nich dane do tabeli: metodę, próbę, wyniki.', 'Na początku przeglądu literatury, gdy szukasz, co w ogóle zbadano.'],
            ['<a href="https://scispace.com" target="_blank" rel="noopener">SciSpace</a> (dawniej Typeset)', 'Wyszukiwarka artykułów i czat z PDF-em. Wyjaśnia fragmenty tekstu, wzory, tabele.', 'Gdy czytasz trudny artykuł i chcesz zrozumieć konkretny fragment.'],
            ['<a href="https://notebooklm.google" target="_blank" rel="noopener">NotebookLM</a>', 'Odpowiada tylko na podstawie źródeł, które sam wgrasz. Każde zdanie ma przypis do fragmentu źródła.', 'Gdy masz już wybrane teksty i chcesz je porównać, streścić, wyciągnąć pojęcia.'],
          ]),
          note('Elicit i SciSpace najlepiej działają z literaturą anglojęzyczną z nauk ścisłych, medycznych i społecznych. Humanistyki, zwłaszcza polskiej, mają w swoich bazach niewiele. W NotebookLM ten problem nie istnieje, bo pracujesz na własnych plikach.'),
          h('Promptowanie dokumentów'),
          p('W NotebookLM i podobnych narzędziach obowiązują te same techniki co w czacie. Kilka rzeczy działa szczególnie dobrze. Przykłady poniżej pochodzą z notatnika z trzema artykułami o czytelnictwie.'),
          chat('Porównanie metod', [
            ['ty', 'Jakie metody badawcze stosują autorzy poszczególnych tekstów? Odpowiedz osobno dla każdego źródła. Jeśli metoda nie jest nazwana wprost, napisz to, zamiast się domyślać.'],
            ['model', `**Kowalczyk 2021**: analiza treści 340 recenzji z portalu Lubimyczytać.pl, kodowanie ręczne według własnego klucza [1].

**Smith i Lee 2019**: ankieta wśród 1200 czytelników bibliotek publicznych, analiza regresji [2].

**Zielińska 2022**: autorka nie nazywa metody wprost. Tekst ma charakter eseju opartego na przykładach z własnej praktyki bibliotekarskiej [3].`],
          ], '<p>Numery w nawiasach to przypisy. W NotebookLM po kliknięciu pokazują fragment źródła, na którym opiera się zdanie. Klikaj w nie, zwłaszcza tam, gdzie odpowiedź Cię zaskakuje.</p><p>Zdanie „jeśli metoda nie jest nazwana wprost, napisz to” zapobiega dopisywaniu metody, której autorka nie deklaruje. Bez niego model pewnie napisałby „analiza jakościowa” i miałby rację tylko połowicznie.</p>'),
          chat('Pojęcia i definicje', [
            ['ty', 'Wypisz pojęcia, które pojawiają się w co najmniej dwóch źródłach. Dla każdego podaj, jak definiuje je każde źródło (cytat), i czy definicje się różnią.'],
            ['model', `**Czytelnictwo**
Kowalczyk 2021: „przeczytanie co najmniej jednej książki w roku” [1]
Smith i Lee 2019: „regular engagement with books” [2]
Różnica: tak. Pierwsza definicja jest ilościowa, druga opisuje nawyk.

**Kultura czytelnicza**
[…]`],
          ], '<p>Prośba o cytat zamiast parafrazy pozwala od razu zobaczyć, czy model nie dopowiedział czegoś od siebie. Zestawienie z punktem „różnica” to gotowy materiał do części teoretycznej pracy.</p>'),
          h('Sprawdź się'),
          quiz('Czym NotebookLM różni się od zwykłego czatu?', ['Nie popełnia błędów', 'Odpowiada na podstawie wgranych przez Ciebie źródeł i wskazuje fragmenty, z których korzysta', 'Ma dostęp do wszystkich artykułów naukowych'], 1, 'Grounding zmniejsza ryzyko zmyśleń, ale go nie usuwa. Przypisy pozwalają to sprawdzić.'),
          quiz('Piszesz pracę o polskiej prozie dwudziestolecia. Które narzędzie najpewniej da najmniej użytecznych wyników wyszukiwania?', ['NotebookLM z wgranymi artykułami', 'Elicit, bo jego baza słabo pokrywa polską humanistykę', 'Żadne, wszystkie działają tak samo'], 1, 'Elicit szuka we własnej bazie, a polskich tekstów humanistycznych jest w niej mało.'),
        ],
      },
    ],
  },
  {
    title: 'Zadania',
    lessons: [
      {
        id: 'task-abstract', title: 'Zadanie 1: abstrakt konferencyjny',
        blocks: [
          task({
            title: 'Abstrakt na konferencję z lingwistyki komputerowej',
            html: '<p>Chcesz zgłosić wystąpienie na konferencję naukową z lingwistyki komputerowej, na przykład COLING. Korzystając z dowolnego czatu i technik z tego kursu, przygotuj abstrakt, który wyślesz jako zgłoszenie. Temat musi pasować do tematyki tegorocznej edycji.</p><p>Zacznij od przeczytania wezwania do zgłoszeń (<i>call for papers</i>) na stronie konferencji: tematy, limit słów, wymagania formalne. Wklej je do rozmowy, bo model ich nie zna. Czas: 30 minut.</p><p>Oddaj abstrakt i listę użytych promptów w sposób wskazany przez prowadzącego.</p>',
            check: [
              'Temat mieści się w jednym z obszarów z wezwania do zgłoszeń',
              'Abstrakt mieści się w limicie słów',
              'Jest pytanie badawcze, materiał, metoda i spodziewany albo uzyskany wynik',
              'Żadnej liczby, nazwy korpusu ani narzędzia nie zostawiasz bez sprawdzenia',
              'Usunięte zostały puste zwroty („w dzisiejszym dynamicznym świecie”)',
              'Lista promptów pokazuje co najmniej dwie techniki z kursu',
            ],
            example: `[odwrócona rozmowa]
Chcę napisać abstrakt na konferencję z lingwistyki komputerowej. Poniżej wklejam call for papers. Zadawaj mi po jednym pytaniu o mój pomysł, dopóki nie będziesz wiedzieć wystarczająco dużo, żeby zaproponować trzy możliwe tematy zgodne z wezwaniem.
[treść call for papers]

[persona + format]
Jesteś recenzentem tej konferencji. Na podstawie naszej rozmowy napisz abstrakt w temacie 2. Maksymalnie 250 słów. Struktura: problem, dane, metoda, wynik, znaczenie. Bez przymiotników oceniających.

[fact check list]
Wypisz wszystkie twierdzenia z abstraktu, które muszę sprawdzić, zanim go wyślę.

[iteracja]
Recenzent pisze, że metoda jest opisana zbyt ogólnie. Przepisz zdanie o metodzie, używając tylko informacji z naszej rozmowy.`,
          }),
        ],
      },
      {
        id: 'task-notebooklm', title: 'Zadanie 2: literatura w NotebookLM',
        blocks: [
          task({
            title: 'Jakościowa analiza literatury',
            html: '<p>Przeprowadź prostą jakościową analizę literatury do tematu wybranego w zadaniu 1. Wybierz kilka artykułów (pliki PDF) i wgraj je do <a href="https://notebooklm.google" target="_blank" rel="noopener">NotebookLM</a>. Utwórz serię notatek, korzystając zarówno z pytań proponowanych przez asystenta, jak i z własnych.</p><p>W notatkach wyjaśnij podstawowe pojęcia z badanych tekstów i metodologię przyjętą przez autorów. Opisz ich wyniki. Jeśli się da, przygotuj też listę tekstów do przeczytania na podstawie bibliografii analizowanych artykułów. Czas: 30 minut.</p><p>Przygotuj 5-minutowe wystąpienie z wynikami.</p>',
            check: [
              'Co najmniej trzy źródła wgrane do NotebookLM',
              'Notatka z pojęciami, z cytatami z tekstów',
              'Notatka o metodach, osobno dla każdego źródła',
              'Notatka z wynikami i miejscami, w których źródła się ze sobą nie zgadzają',
              'Lista lektur zawiera tylko pozycje, które rzeczywiście są w bibliografiach wgranych tekstów',
              'Kliknięto w przypisy przy co najmniej kilku twierdzeniach i sprawdzono je w źródle',
            ],
          }),
          h('Co dalej'),
          p('Pełniejszy przegląd technik, z przykładami i odnośnikami do badań, znajdziesz w <a href="https://github.com/dair-ai/Prompt-Engineering-Guide" target="_blank" rel="noopener">Prompt Engineering Guide</a> przygotowanym przez DAIR.AI. Jest też wersja w formie strony: <a href="https://www.promptingguide.ai" target="_blank" rel="noopener">promptingguide.ai</a>.'),
        ],
      },
    ],
  },
];

if (typeof module !== 'undefined') module.exports = { COURSE };
