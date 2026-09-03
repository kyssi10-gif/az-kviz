
"use strict";
/* ============================================================
   >>>> SEM VLOŽ SVŮJ FIREBASE CONFIG <<<<
   (Firebase console → Project settings → Your apps → Web)
   Nezapomeň na databaseURL (Realtime Database).
============================================================ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDfKrvX9kksLiXmSRniA3W9Y6K-EEf2h7E",
  authDomain: "az-kviz-53493.firebaseapp.com",
  databaseURL: "https://az-kviz-53493-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "az-kviz-53493",
  storageBucket: "az-kviz-53493.firebasestorage.app",
  messagingSenderId: "607263032370",
  appId: "1:607263032370:web:45e5556f363b26832be82b"
};

/* ============================================================ */
const PLAYER_COLORS=['#3f8cff','#ff5268','#35d07f','#ffab3d'];
const PLAYER_NAMES=['Modrý','Červený','Zelený','Oranžový'];

const SEED_QUESTIONS=[
  {cat:'Outdoor & příroda',q:'Nejvyšší hora Česka?',a:'Sněžka',d:['Praděd','Lysá hora']},
  {cat:'Outdoor & příroda',q:'Membrána proslulá voděodolností a prodyšností od firmy W. L. Gore?',a:'Gore‑Tex',d:['Cordura','Polartec']},
  {cat:'Outdoor & příroda',q:'Jak se říká funkční první vrstvě oblečení, co odvádí pot od těla?',a:'Baselayer',d:['Softshell','Hardshell']},
  {cat:'Outdoor & příroda',q:'Co znamená zkratka „UL“ u turistické výbavy?',a:'Ultralight',d:['Ultra Long','Universal Lock']},
  {cat:'Outdoor & příroda',q:'Nejvyšší vodopád v Česku?',a:'Pančavský vodopád',d:['Mumlavský vodopád','Vydra']},
  {cat:'Outdoor & příroda',q:'Kolik hlavních světových stran ukazuje kompas?',a:'4',d:['6','8']},
  {cat:'Outdoor & příroda',q:'Jak se nazývá technika vrstvení oblečení podle funkce (spodní, střední, vrchní)?',a:'Vrstvení (layering)',d:['Rozvrstvení','Kaskádování']},
  {cat:'Outdoor & příroda',q:'Který materiál se často používá jako lehká izolace do zimních bund místo prachového peří?',a:'Syntetická izolace (např. Primaloft)',d:['Bavlna','Len']},
  {cat:'Outdoor & příroda',q:'Co udává tzv. „fill power“ u prachového peří?',a:'Kvalitu a nadýchanost peří',d:['Vodotěsnost bundy','Váhu spacáku']},
  {cat:'Outdoor & příroda',q:'Jak se nazývá jednotka udávající vodní sloupec (voděodolnost) u outdoorových tkanin?',a:'mm vodního sloupce',d:['Denier','Bar']},
  {cat:'Outdoor & příroda',q:'Který pohyblivý přírodní jev v horách vzniká sesuvem velkého množství sněhu?',a:'Lavina',d:['Sesuv půdy','Bystřina']},
  {cat:'Outdoor & příroda',q:'Jak se nazývá nejvyšší hora světa?',a:'Mount Everest',d:['K2','Kangčendženga']},
  {cat:'Outdoor & příroda',q:'Ve kterém pohoří leží nejvyšší hora Česka Sněžka?',a:'Krkonoše',d:['Jeseníky','Šumava']},
  {cat:'Outdoor & příroda',q:'Jak se nazývá turistická značka s vlastní sítí, kterou v Česku spravuje KČT?',a:'Značené turistické trasy',d:['Naučné stezky','Cyklotrasy']},
  {cat:'Outdoor & příroda',q:'Jak se nazývá spací pytel bez izolace na spodní straně, doplňovaný karimatkou?',a:'Quilt (přikrývka)',d:['Bivak', 'Iglú']},
  {cat:'Outdoor & příroda',q:'Který přírodní park v Česku je znám pískovcovými skalními městy (např. Adršpach)?',a:'Adršpašsko-teplické skály',d:['Moravský kras','Prachovské skály']},
  {cat:'Auta & Tesla',q:'Na voze které značky byl postaven první Tesla Roadster?',a:'Lotus',d:['Porsche','Mazda']},
  {cat:'Auta & Tesla',q:'Co znamená zkratka SOH u baterie?',a:'State of Health',d:['Speed of Heat','Standard Output Hz']},
  {cat:'Auta & Tesla',q:'Jaký konektor pro rychlonabíjení používá Tesla v Evropě od Modelu 3?',a:'CCS Combo 2',d:['CHAdeMO','Type 1']},
  {cat:'Auta & Tesla',q:'V jaké jednotce se udává kapacita trakční baterie?',a:'kWh',d:['kW','Volt']},
  {cat:'Auta & Tesla',q:'Kdo je od roku 2008 generálním ředitelem Tesly?',a:'Elon Musk',d:['JB Straubel','Martin Eberhard']},
  {cat:'Auta & Tesla',q:'Jak se jmenuje asistenční systém řízení od Tesly?',a:'Autopilot',d:['CoPilot','DriveMate']},
  {cat:'Auta & Tesla',q:'Ve kterém americkém státě má Tesla svou centrálu (k roku 2024)?',a:'Texas',d:['Kalifornie','Nevada']},
  {cat:'Auta & Tesla',q:'Jak se jmenuje elektrický pickup od Tesly s hranatým designem?',a:'Cybertruck',d:['Model X','Roadster']},
  {cat:'Auta & Tesla',q:'Který model Tesly byl první, co firma sama navrhla a vyrobila od základu (ne na cizí platformě)?',a:'Model S',d:['Roadster','Model 3']},
  {cat:'Auta & Tesla',q:'Jak se nazývá Teslina síť rychlonabíjecích stanic?',a:'Supercharger',d:['FastCharge','PowerStation']},
  {cat:'Auta & Tesla',q:'Co znamená zkratka BMS u elektromobilů?',a:'Battery Management System',d:['Brake Monitoring Sensor','Basic Motor Setup']},
  {cat:'Auta & Tesla',q:'Jak se nazývá jev, kdy elektromobil při brzdění dobíjí baterii?',a:'Rekuperace',d:['Regenerace paliva','Reflexní brzdění']},
  {cat:'Auta & Tesla',q:'Který typ motoru se nejčastěji používá v elektromobilech pro svou účinnost a spolehlivost?',a:'Elektromotor (synchronní/indukční)',d:['Dieselový motor','Wankelův motor']},
  {cat:'Auta & Tesla',q:'Jak se česky běžně říká zásuvce/konektoru typu CCS na elektromobilu?',a:'Nabíjecí konektor',d:['Palivová hubice','Adaptér zapalování']},
  {cat:'Auta & Tesla',q:'Který výrobce aut je považován za dlouhodobě prvního v sériové výrobě automobilů (Model T)?',a:'Ford',d:['General Motors','Chrysler']},
  {cat:'Auta & Tesla',q:'Jak se jmenuje Teslin elektrický sportovní vůz plánovaný jako nástupce původního Roadsteru?',a:'Tesla Roadster (druhá generace)',d:['Tesla Model R','Tesla GT']},
  {cat:'Technika & programování',q:'Kdo je autorem jazyka Python?',a:'Guido van Rossum',d:['Linus Torvalds','James Gosling']},
  {cat:'Technika & programování',q:'Kterým příkazem vytvoříš v Gitu novou větev?',a:'git branch',d:['git new','git fork']},
  {cat:'Technika & programování',q:'Značkovací jazyk pro strukturu webových stránek?',a:'HTML',d:['CSS','HTTP']},
  {cat:'Technika & programování',q:'Odlehčený datový formát běžný v API?',a:'JSON',d:['JPEG','JAR']},
  {cat:'Technika & programování',q:'Nástroj v Excelu pro načítání a transformaci dat (ETL)?',a:'Power Query',d:['Power Pivot','Power BI']},
  {cat:'Technika & programování',q:'Co znamená HTTP status 404?',a:'Stránka nenalezena',d:['Přístup odepřen','Chyba serveru']},
  {cat:'Technika & programování',q:'Jak se nazývá systém pro sledování verzí souborů, který vyvinul Linus Torvalds?',a:'Git',d:['Subversion','Mercurial']},
  {cat:'Technika & programování',q:'Co znamená zkratka API?',a:'Application Programming Interface',d:['Automated Program Integration','Application Process Index']},
  {cat:'Technika & programování',q:'Který jazyk se používá primárně pro stylování webových stránek?',a:'CSS',d:['HTML','JavaScript']},
  {cat:'Technika & programování',q:'Jak se nazývá databázový jazyk pro dotazování relačních databází?',a:'SQL',d:['NoSQL','PHP']},
  {cat:'Technika & programování',q:'Co znamená zkratka CPU?',a:'Central Processing Unit',d:['Computer Power Unit','Core Processing Utility']},
  {cat:'Technika & programování',q:'Jak se nazývá platforma pro hostování a sdílení kódu pomocí Gitu, kterou vlastní Microsoft?',a:'GitHub',d:['GitLab','Bitbucket']},
  {cat:'Technika & programování',q:'Který datový typ v programování reprezentuje true/false?',a:'Boolean',d:['Integer','String']},
  {cat:'Technika & programování',q:'Jak se nazývá proces automatického spouštění testů a nasazení při každé změně kódu?',a:'CI/CD',d:['ETL','MVP']},
  {cat:'Technika & programování',q:'Co znamená zkratka RAM?',a:'Random Access Memory',d:['Read Access Module','Rapid Application Memory']},
  {cat:'Technika & programování',q:'Který programovací jazyk se používá primárně pro interaktivitu na webových stránkách v prohlížeči?',a:'JavaScript',d:['Python','C++']},
  {cat:'Všeobecné',q:'Hlavní město Česka?',a:'Praha',d:['Brno','Ostrava']},
  {cat:'Všeobecné',q:'Kolik má Česko krajů (včetně Prahy)?',a:'14',d:['13','8']},
  {cat:'Všeobecné',q:'Nejdelší řeka, která protéká celá jen Českem?',a:'Vltava',d:['Labe','Morava']},
  {cat:'Všeobecné',q:'Kdo napsal Osudy dobrého vojáka Švejka?',a:'Jaroslav Hašek',d:['Karel Čapek','Bohumil Hrabal']},
  {cat:'Všeobecné',q:'Z díla kterého českého autora pochází slovo „robot“?',a:'Karel Čapek',d:['Jules Verne','Isaac Asimov']},
  {cat:'Všeobecné',q:'Jaká je měna v Česku?',a:'Koruna česká',d:['Euro','Zlotý']},
  {cat:'Všeobecné',q:'Kolik minut má jedna hodina?',a:'60',d:['100','30']},
  {cat:'Všeobecné',q:'Jak se jmenuje nejvyšší hora světa?',a:'Mount Everest',d:['K2','Mont Blanc']},
  {cat:'Všeobecné',q:'Který oceán je největší na světě?',a:'Tichý oceán',d:['Atlantský oceán','Indický oceán']},
  {cat:'Všeobecné',q:'Kolik stupňů má pravý úhel?',a:'90',d:['180','45']},
  {cat:'Všeobecné',q:'Jak se jmenuje naše nejbližší hvězda?',a:'Slunce',d:['Sirius','Polárka']},
  {cat:'Všeobecné',q:'Kolik dní má obvykle únor v přestupném roce?',a:'29',d:['28','30']},
  {cat:'Všeobecné',q:'Jaký je chemický vzorec vody?',a:'H2O',d:['CO2','O2']},
  {cat:'Všeobecné',q:'Který kontinent je rozlohou největší?',a:'Asie',d:['Afrika','Severní Amerika']},
  {cat:'Všeobecné',q:'Kolik barev má klasická duha?',a:'7',d:['5','9']},
  {cat:'Všeobecné',q:'Ve kterém městě sídlí Evropský parlament (hlavní sídlo)?',a:'Štrasburk',d:['Brusel','Lucemburk']},

  // Hudba – moderní
  {cat:'Hudba – moderní',q:'Která britská skupina vydala album „Abbey Road“?',a:'The Beatles',d:['The Rolling Stones','Queen']},
  {cat:'Hudba – moderní',q:'Kdo nazpíval světový hit „Shape of You“?',a:'Ed Sheeran',d:['Justin Bieber','Shawn Mendes']},
  {cat:'Hudba – moderní',q:'Který zpěvák je přezdívaný „King of Pop“?',a:'Michael Jackson',d:['Prince','Elvis Presley']},
  {cat:'Hudba – moderní',q:'Ve které kapele zpíval Freddie Mercury?',a:'Queen',d:['Pink Floyd','Led Zeppelin']},
  {cat:'Hudba – moderní',q:'Jak se jmenuje švédská skupina, autoři písně „Dancing Queen“?',a:'ABBA',d:['Roxette','Ace of Base']},
  {cat:'Hudba – moderní',q:'Kdo je autorem alba „Thriller“ z roku 1982?',a:'Michael Jackson',d:['Prince','Stevie Wonder']},
  {cat:'Hudba – moderní',q:'Která zpěvačka vydala album „1989“?',a:'Taylor Swift',d:['Katy Perry','Ariana Grande']},
  {cat:'Hudba – moderní',q:'Kdo stojí za hitem „Blinding Lights“?',a:'The Weeknd',d:['Drake','Bruno Mars']},
  {cat:'Hudba – moderní',q:'Ve které kapele hrál kytarista Slash?',a:'Guns N’ Roses',d:['Metallica','Aerosmith']},
  {cat:'Hudba – moderní',q:'Která kapela natočila „Bohemian Rhapsody“?',a:'Queen',d:['Pink Floyd','The Who']},
  {cat:'Hudba – moderní',q:'Jak se jmenuje irská rocková kapela vedená zpěvákem Bonem?',a:'U2',d:['Coldplay','Oasis']},
  {cat:'Hudba – moderní',q:'Která zpěvačka je známá jako „Queen of Pop“?',a:'Madonna',d:['Cher','Kylie Minogue']},
  {cat:'Hudba – moderní',q:'Kdo napsal a nazpíval „Rolling in the Deep“?',a:'Adele',d:['Amy Winehouse','Sia']},
  {cat:'Hudba – moderní',q:'Jak se jmenuje kapela, jejímž frontmanem je Chris Martin?',a:'Coldplay',d:['Keane','Muse']},
  {cat:'Hudba – moderní',q:'Který hudební žánr proslavil Bob Marley?',a:'Reggae',d:['Blues','Jazz']},
  {cat:'Hudba – moderní',q:'Jak se jmenuje americká zpěvačka známá hitem „Bad Romance“?',a:'Lady Gaga',d:['Beyoncé','Rihanna']},
  {cat:'Hudba – moderní',q:'Ve které kapele zpíval Kurt Cobain?',a:'Nirvana',d:['Pearl Jam','Soundgarden']},
  {cat:'Hudba – moderní',q:'Jak se jmenuje žánr elektronické taneční hudby zkráceně EDM?',a:'Electronic Dance Music',d:['Electric Disco Mix','Extended Dance Melody']},
  {cat:'Hudba – moderní',q:'Který zpěvák je znám jako frontman skupiny Linkin Park až do své smrti v roce 2017?',a:'Chester Bennington',d:['Mike Shinoda','Chris Cornell']},
  {cat:'Hudba – moderní',q:'Který kanadský zpěvák a rapper je autorem hitu „One Dance“?',a:'Drake',d:['The Weeknd','Justin Bieber']},
  {cat:'Hudba – moderní',q:'Ve které kapele hrál baskytarista a zpěvák Sting?',a:'The Police',d:['Genesis','Dire Straits']},
  {cat:'Hudba – moderní',q:'Jak se jmenuje hudební festival konaný tradičně v poušti Black Rock v Nevadě?',a:'Burning Man',d:['Coachella','Tomorrowland']},
  {cat:'Hudba – moderní',q:'Jak se jmenuje amerického rapera a producenta, spoluzakladatele značky Beats?',a:'Dr. Dre',d:['Snoop Dogg','Eminem']},

  // Hudba – klasická
  {cat:'Hudba – klasická',q:'Kdo zkomponoval Devátou symfonii s „Ódou na radost“?',a:'Ludwig van Beethoven',d:['Wolfgang Amadeus Mozart','Johannes Brahms']},
  {cat:'Hudba – klasická',q:'Který český skladatel napsal operu „Prodaná nevěsta“?',a:'Bedřich Smetana',d:['Antonín Dvořák','Leoš Janáček']},
  {cat:'Hudba – klasická',q:'Kdo zkomponoval cyklus symfonických básní „Má vlast“?',a:'Bedřich Smetana',d:['Antonín Dvořák','Zdeněk Fibich']},
  {cat:'Hudba – klasická',q:'Který skladatel je autorem „Novosvětské symfonie“?',a:'Antonín Dvořák',d:['Bedřich Smetana','Petr Iljič Čajkovskij']},
  {cat:'Hudba – klasická',q:'Ve kterém městě se narodil Wolfgang Amadeus Mozart?',a:'Salcburk',d:['Vídeň','Praha']},
  {cat:'Hudba – klasická',q:'Kdo zkomponoval balet „Labutí jezero“?',a:'Petr Iljič Čajkovskij',d:['Sergej Prokofjev','Igor Stravinskij']},
  {cat:'Hudba – klasická',q:'Který skladatel v pozdějším věku ohluchl a přesto komponoval?',a:'Ludwig van Beethoven',d:['Johann Sebastian Bach','Franz Schubert']},
  {cat:'Hudba – klasická',q:'Kdo je autorem opery „Rusalka“?',a:'Antonín Dvořák',d:['Bedřich Smetana','Leoš Janáček']},
  {cat:'Hudba – klasická',q:'Který barokní skladatel napsal cyklus „Čtvero ročních dob“?',a:'Antonio Vivaldi',d:['Johann Sebastian Bach','Georg Friedrich Händel']},
  {cat:'Hudba – klasická',q:'Kdo zkomponoval operu „Její pastorkyňa“?',a:'Leoš Janáček',d:['Bohuslav Martinů','Josef Suk']},
  {cat:'Hudba – klasická',q:'Kdo zkomponoval slavné „Bolero“?',a:'Maurice Ravel',d:['Claude Debussy','Erik Satie']},
  {cat:'Hudba – klasická',q:'Který skladatel napsal přes sto symfonií a přezdívá se mu „otec symfonie“?',a:'Joseph Haydn',d:['Wolfgang Amadeus Mozart','Ludwig van Beethoven']},
  {cat:'Hudba – klasická',q:'Kdo je autorem „Braniborských koncertů“?',a:'Johann Sebastian Bach',d:['Georg Friedrich Händel','Antonio Vivaldi']},
  {cat:'Hudba – klasická',q:'Který ruský skladatel zkomponoval operu „Evžen Oněgin“?',a:'Petr Iljič Čajkovskij',d:['Sergej Rachmaninov','Modest Musorgskij']},
  {cat:'Hudba – klasická',q:'Kdo napsal „Rekviem“, které po jeho smrti dokončil žák Süssmayr?',a:'Wolfgang Amadeus Mozart',d:['Joseph Haydn','Ludwig van Beethoven']},
  {cat:'Hudba – klasická',q:'Jak se jmenuje Dvořákova nejslavnější symfonie s podtitulem odkazujícím na Ameriku?',a:'Novosvětská symfonie',d:['Eroica','Pastorální symfonie']},
  {cat:'Hudba – klasická',q:'Jak se nazývá Beethovenova třetí symfonie, původně věnovaná Napoleonovi?',a:'Eroica',d:['Osudová','Pastorální']},
  {cat:'Hudba – klasická',q:'Kdo zkomponoval operu „Kouzelná flétna“?',a:'Wolfgang Amadeus Mozart',d:['Ludwig van Beethoven','Joseph Haydn']},
  {cat:'Hudba – klasická',q:'Jak se nazývá skladba pro jednoho sólového hráče a orchestr, typická pro klasickou hudbu?',a:'Koncert',d:['Symfonie','Sonáta']},
  {cat:'Hudba – klasická',q:'Který český hudební skladatel je autorem „Sinfonietty“?',a:'Leoš Janáček',d:['Bohuslav Martinů','Vítězslav Novák']},

  // Hry: Minecraft
  {cat:'Hry: Minecraft',q:'Pod jakou přezdívkou vytvořil Minecraft Markus Persson?',a:'Notch',d:['Jeb','Dinnerbone']},
  {cat:'Hry: Minecraft',q:'Která firma dnes vlastní Minecraft?',a:'Microsoft',d:['Sony','EA']},
  {cat:'Hry: Minecraft',q:'Ve kterém roce vyšla plná verze Minecraftu 1.0?',a:'2011',d:['2009','2013']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje nepřátelský tvor, který exploduje při kontaktu s hráčem?',a:'Creeper',d:['Zombie','Enderman']},
  {cat:'Hry: Minecraft',q:'Z jakého materiálu se vyrábí druhé nejsilnější nářadí (hned po netheritu)?',a:'Diamant',d:['Zlato','Železo']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje alternativní dimenze plná lávy a pevností?',a:'Nether',d:['End','Overworld']},
  {cat:'Hry: Minecraft',q:'Kterého tvora musí hráč porazit, aby „dohrál“ dimenzi The End?',a:'Ender Dragon',d:['Wither','Enderman']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje herní režim, kde hráč nemá zdraví ani hlad a umí létat?',a:'Kreativní režim',d:['Survival','Hardcore']},
  {cat:'Hry: Minecraft',q:'Jaký nástroj hráč potřebuje jako úplně první k těžbě kamene?',a:'Dřevěný krumpáč',d:['Dřevěná sekera','Dřevěná lopata']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje mírumilovný tvor podobný člověku, se kterým lze obchodovat?',a:'Vesničan',d:['Piglin','Zombie']},
  {cat:'Hry: Minecraft',q:'Který blok hráč potřebuje k vytvoření portálu do Netheru?',a:'Obsidian',d:['Bedrock','Netherit']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje švédské studio, které Minecraft vyvíjí?',a:'Mojang',d:['Rockstar Games','Valve']},
  {cat:'Hry: Minecraft',q:'Co musí hráč hlídat, aby mu postupně neubývalo zdraví hladem?',a:'Hlad (jídlo)',d:['Manu','Staminu']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje nejvzácnější nerost přidaný do Netheru, silnější než diamant?',a:'Netherit',d:['Smaragd','Zlato']},
  {cat:'Hry: Minecraft',q:'Ve kterém roce koupil Microsoft studio Mojang?',a:'2014',d:['2011','2016']},
  {cat:'Hry: Minecraft',q:'Jak se nazývá nejtvrdší, nezničitelná hornina tvořící okraj světa?',a:'Bedrock',d:['Obsidian','Žula']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje létající nepřátelský tvor v Netheru, který střílí ohnivé koule?',a:'Ghast',d:['Blaze','Phantom']},
  {cat:'Hry: Minecraft',q:'Jaký nástroj je potřeba k dojení krávy nebo stříhání ovce?',a:'Vědro / nůžky',d:['Motyka','Rýč']},
  {cat:'Hry: Minecraft',q:'Jak se nazývá stavební blok vyrobený vypálením písku v peci?',a:'Sklo',d:['Terakota','Beton']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje mechanismus na bázi červeného kamene (redstone), který funguje jako logická spínací jednotka?',a:'Redstonový obvod',d:['Pístový modul','Energetický blok']},
  {cat:'Hry: Minecraft',q:'Který mód hry generuje svět nekonečně náhodně na základě zadaného čísla?',a:'Seed (semínko světa)',d:['Mod','Shader']},
  {cat:'Hry: Minecraft',q:'Jak se jmenuje edice Minecraftu optimalizovaná pro mobily, konzole a Windows, sdílející multiplayer napříč platformami?',a:'Bedrock Edition',d:['Java Edition','Legacy Edition']},
  {cat:'Hry: Minecraft',q:'Jak se nazývá nepřátelský tvor tvořený krychlemi, co se po zásahu rozpadá na menší kousky?',a:'Slime',d:['Silverfish','Magma Cube']},

  // Hry: League of Legends
  {cat:'Hry: League of Legends',q:'Která společnost vyvíjí League of Legends?',a:'Riot Games',d:['Blizzard Entertainment','Valve']},
  {cat:'Hry: League of Legends',q:'Ve kterém roce byla hra League of Legends vydána?',a:'2009',d:['2011','2013']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá struktura, kterou musí tým zničit, aby vyhrál zápas?',a:'Nexus',d:['Inhibitor','Věž']},
  {cat:'Hry: League of Legends',q:'Kolik hráčů tvoří jeden tým ve standardním zápase na Summoner’s Rift?',a:'5',d:['4','6']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje mocný neutrální tvor v džungli, jehož skolení dává celému týmu silný buff?',a:'Baron Nashor',d:['Rift Herald','Dragon']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá herní měna, kterou hráči sbírají zabíjením jednotek a věží?',a:'Zlato',d:['Mana','Zkušenosti']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje výroční mezinárodní turnaj, obdoba mistrovství světa v LoL?',a:'World Championship (Worlds)',d:['MSI','All-Star']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje mapa, na které se hraje standardní 5v5 zápas?',a:'Summoner’s Rift',d:['Howling Abyss','Twisted Treeline']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá role hráče, který obvykle hraje sám v horní linii mapy?',a:'Top laner',d:['Support','Jungler']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá bojová postava, kterou hráč ve hře ovládá?',a:'Šampion (champion)',d:['Hrdina (hero)','Jednotka (unit)']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje spin-off online karetní hra od Riot Games ze světa LoL?',a:'Legends of Runeterra',d:['Hearthstone','Gwent']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje animovaný seriál Riot Games ze světa LoL, který získal cenu Emmy?',a:'Arcane',d:['Castlevania','League of Draven']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá role hráče, který se stará hlavně o léčení a podporu spoluhráčů?',a:'Support',d:['Jungler','Mid laner']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje jihokorejský esportový tým se zkratkou „T1“, jeden z nejúspěšnějších v historii LoL?',a:'T1',d:['G2 Esports','Fnatic']},
  {cat:'Hry: League of Legends',q:'Kolik hlavních linií (lanes) má standardní mapa Summoner’s Rift?',a:'3',d:['2','4']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje virtuální měna, za kterou lze v obchodě kupovat kosmetické skiny?',a:'Riot Points (RP)',d:['Gold','Essence']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá role hráče, který hraje uprostřed mapy a často volí bojová kouzla?',a:'Mid laner',d:['Support','Top laner']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje pozice hráče, který se pohybuje po džungli a láká na neutrální příšery?',a:'Jungler',d:['Support','ADC']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá role hráče, který hraje střelce ve spodní linii a spoléhá na útoky ze zálohy?',a:'ADC (střelec)',d:['Tank','Mage']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje vstupní obranná stavba, kterou musí tým zničit před útokem na nexus?',a:'Inhibitor',d:['Turret','Ward']},
  {cat:'Hry: League of Legends',q:'Jak se nazývá předmět, který hráči pokládají pro odhalení nepřátel v mlze?',a:'Ward (hlídka)',d:['Trinket','Totem']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje herní mód s rychlejším tempem na menší mapě „Howling Abyss“?',a:'ARAM',d:['Blind Pick','Clash']},
  {cat:'Hry: League of Legends',q:'Jak se jmenuje čtvrtletní menší mezinárodní turnaj LoL konaný před sezónním play-off?',a:'MSI (Mid-Season Invitational)',d:['Worlds','All-Star']},

  // Hry: CS2
  {cat:'Hry: CS2',q:'Která firma vyvinula sérii Counter‑Strike?',a:'Valve',d:['Epic Games','Riot Games']},
  {cat:'Hry: CS2',q:'Na jakém herním enginu běží Counter‑Strike 2?',a:'Source 2',d:['Unreal Engine','Source 1']},
  {cat:'Hry: CS2',q:'Ve kterém roce vyšel Counter‑Strike 2?',a:'2023',d:['2021','2019']},
  {cat:'Hry: CS2',q:'Kterou předchozí hru Counter‑Strike 2 zcela nahradil a vyřadil z prodeje?',a:'Counter‑Strike: Global Offensive',d:['Counter‑Strike: Source','Counter‑Strike 1.6']},
  {cat:'Hry: CS2',q:'Jak se nazývají dvě soupeřící strany v klasickém kompetitivním módu?',a:'Teroristé a protiteroristé',d:['Útočníci a obránci','Modří a červení']},
  {cat:'Hry: CS2',q:'Jaký je hlavní cíl teroristů na bombových mapách („de_“)?',a:'Položit a odpálit bombu',d:['Zachránit rukojmí','Ubránit základnu']},
  {cat:'Hry: CS2',q:'Jak se jmenuje výbušnina, kterou teroristé pokládají na bombový bod?',a:'C4',d:['Semtex','Dynamit']},
  {cat:'Hry: CS2',q:'Kolik hráčů tvoří jeden tým ve standardním kompetitivním zápase?',a:'5',d:['4','6']},
  {cat:'Hry: CS2',q:'Jak se nazývá jedna z nejikoničtějších map série, klasika s bodama A a B v poušti?',a:'Dust II',d:['Mirage','Inferno']},
  {cat:'Hry: CS2',q:'Jak se jmenuje ikonická útočná puška teroristů, symbol celé série?',a:'AK‑47',d:['M4A4','AWP']},
  {cat:'Hry: CS2',q:'Jak se jmenuje odstřelovací puška, která dokáže zabít jednou ranou téměř kamkoliv do těla?',a:'AWP',d:['Desert Eagle','Scout']},
  {cat:'Hry: CS2',q:'Jak se nazývá hodnotící systém dovednosti hráčů v CS2, který nahradil staré „ranky“ z CS:GO?',a:'CS Rating',d:['ELO Score','Skill Level']},
  {cat:'Hry: CS2',q:'Kdo vyhrává kolo, pokud vyprší čas a bomba nebyla odpálena ani nikdo nezemřel?',a:'Protiteroristé',d:['Kolo se opakuje','Teroristé']},
  {cat:'Hry: CS2',q:'Jak se nazývá rychlý herní mód s volným respawnem, oblíbený pro warm‑up?',a:'Deathmatch',d:['Wingman','Retake']},
  {cat:'Hry: CS2',q:'Jak se nazývají nejprestižnější turnaje CS scény, pořádané pod záštitou Valve?',a:'Majors',d:['Minors','Legends Stage']},
  {cat:'Hry: CS2',q:'Jaký je český/obecný název pro herní peníze, za které si hráči na začátku kola kupují zbraně?',a:'Ekonomika (peníze na nákup)',d:['Zlato','Kredity']},
  {cat:'Hry: CS2',q:'Jak se nazývá vybavení, které chrání hráče před poškozením a musí se koupit zvlášť na hlavu?',a:'Helma a vesta (armor)',d:['Štít','Batoh']},
  {cat:'Hry: CS2',q:'Jak se jmenuje granát, který dočasně oslepí protihráče bílým zábleskem?',a:'Flashbang',d:['Smoke','HE granát']},
  {cat:'Hry: CS2',q:'Jak se nazývá granát vytvářející neprůhlednou clonu, za kterou se dá bezpečně přesunout?',a:'Smoke (dýmovnice)',d:['Molotov','Decoy']},
  {cat:'Hry: CS2',q:'Jak se jmenuje pistole, kterou hráči často kupují v tzv. „pistol roundu“ na začátku poloviny?',a:'Podle strany (Glock/USP-S/P250)',d:['AWP','AK-47']},
  {cat:'Hry: CS2',q:'Kolik kol standardně stačí vyhrát k celkovému vítězství v klasickém competitive formátu (MR12)?',a:'13',d:['16','10']},
  {cat:'Hry: CS2',q:'Jak se nazývá granát, který zapaluje plochu a brání v průchodu?',a:'Molotov / zápalná láhev',d:['Smoke','Flashbang']},
  {cat:'Hry: CS2',q:'Jak se nazývá pozice hráče, který jako první vstupuje do prostoru a riskuje první kontakt s nepřítelem?',a:'Entry fragger',d:['Lurker','AWPer']},

  // Zvířata: psi a kočky
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá nejmenší plemeno psa na světě podle výšky?',a:'Čivava',d:['Yorkšírský teriér','Pekingský palácový psík']},
  {cat:'Zvířata: psi a kočky',q:'Které plemeno psa je považováno za nejrychlejší na světě?',a:'Chrt (greyhound)',d:['Border kolie','Husky']},
  {cat:'Zvířata: psi a kočky',q:'Kolik mléčných zubů má obvykle štěně, než mu narostou trvalé?',a:'28',d:['20','42']},
  {cat:'Zvířata: psi a kočky',q:'Jak dlouho v průměru trvá březost (těhotenství) u fen?',a:'Zhruba 63 dní',d:['Zhruba 30 dní','Zhruba 90 dní']},
  {cat:'Zvířata: psi a kočky',q:'Které plemeno se tradičně používá jako záchranářský pes v horách?',a:'Bernardýn',d:['Jezevčík','Mops']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá plemeno kočky bez ocasu, pocházející z britského ostrova?',a:'Manská kočka',d:['Britská krátkosrstá','Sfinga']},
  {cat:'Zvířata: psi a kočky',q:'Kolik hodin denně v průměru prospí dospělá kočka?',a:'12–16 hodin',d:['6–8 hodin','20–22 hodin']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá bezsrstá kočka oblíbená pro svůj nezaměnitelný vzhled?',a:'Sfinga',d:['Ragdoll','Maine Coon']},
  {cat:'Zvířata: psi a kočky',q:'Které plemeno kočky patří mezi vůbec největší domácí kočky na světě?',a:'Maine Coon',d:['Britská krátkosrstá','Perská kočka']},
  {cat:'Zvířata: psi a kočky',q:'Jaký smysl mají kočky výrazně vyvinutější než lidé a pomáhá jim vidět za šera?',a:'Zrak',d:['Sluch','Chuť']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá plemeno psa s výraznými vráskami, pocházející z Číny?',a:'Šarpej',d:['Buldok','Mops']},
  {cat:'Zvířata: psi a kočky',q:'Který smysl je u psů považován za nejvyvinutější?',a:'Čich',d:['Zrak','Chuť']},
  {cat:'Zvířata: psi a kočky',q:'Jak se jmenuje jedno z nejstarších plemen psa ze Sibiře, používané k tahání saní?',a:'Sibiřský husky',d:['Aljašský malamut','Samojed']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá chování kočky, kdy hlasitě vrní na znamení spokojenosti?',a:'Předení',d:['Mňoukání','Prskání']},
  {cat:'Zvířata: psi a kočky',q:'Které plemeno psa je typické extrémně krátkýma nohama a dlouhým tělem?',a:'Jezevčík',d:['Baset','Korgi']},
  {cat:'Zvířata: psi a kočky',q:'Jak se česky nazývá skupina koťat narozených ve stejném vrhu?',a:'Vrh',d:['Smečka','Hejno']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá plemeno psa s typickými dlouhými visícími ušima, oblíbené jako čichací stopař?',a:'Bassett/Bloodhound (stopař)',d:['Ohař','Teriér']},
  {cat:'Zvířata: psi a kočky',q:'Kolik obvykle žije domácí kočka let při dobré péči?',a:'12–18 let',d:['5–8 let','25–30 let']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá reflex, díky kterému kočka téměř vždy dopadne po pádu na nohy?',a:'Narovnávací reflex',d:['Únikový reflex','Lovecký reflex']},
  {cat:'Zvířata: psi a kočky',q:'Které plemeno psa je typické svým naprosto černým jazykem?',a:'Čou-čou',d:['Akita','Šarpej']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá organizace, která celosvětově uznává a registruje psí plemena (mezinárodní federace)?',a:'FCI (Fédération Cynologique Internationale)',d:['WHO','IOC']},
  {cat:'Zvířata: psi a kočky',q:'Které plemeno kočky má typicky modré oči a světlou srst s tmavými „body“?',a:'Siamská kočka',d:['Ruská modrá','Britská krátkosrstá']},
  {cat:'Zvířata: psi a kočky',q:'Jak se nazývá psí plemeno vyšlechtěné v Německu k lovu jezevců a nořícím se do nor?',a:'Jezevčík',d:['Foxteriér','Baset']},

  // Zeměpis: státy světa
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Austrálie?',a:'Canberra',d:['Sydney','Melbourne']},
  {cat:'Zeměpis: státy světa',q:'Který stát je rozlohou největší na světě?',a:'Rusko',d:['Kanada','Čína']},
  {cat:'Zeměpis: státy světa',q:'Která země je aktuálně nejlidnatější na světě?',a:'Indie',d:['Čína','USA']},
  {cat:'Zeměpis: státy světa',q:'Který stát je nejmenší na světě rozlohou?',a:'Vatikán',d:['Monako','San Marino']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Kanady?',a:'Ottawa',d:['Toronto','Vancouver']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží Machu Picchu?',a:'Peru',d:['Bolívie','Ekvádor']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Egypta?',a:'Káhira',d:['Alexandrie','Luxor']},
  {cat:'Zeměpis: státy světa',q:'Který stát je rozlohou největší v Africe?',a:'Alžírsko',d:['Súdán','Demokratická republika Kongo']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Turecka?',a:'Ankara',d:['Istanbul','Izmir']},
  {cat:'Zeměpis: státy světa',q:'Kolik států tvoří Spojené státy americké?',a:'50',d:['48','52']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží hora Fudži?',a:'Japonsko',d:['Jižní Korea','Čína']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Brazílie?',a:'Brasília',d:['Rio de Janeiro','São Paulo']},
  {cat:'Zeměpis: státy světa',q:'Který stát je zcela obklopen územím Jihoafrické republiky?',a:'Lesotho',d:['Eswatini (Svazijsko)','Botswana']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Nového Zélandu?',a:'Wellington',d:['Auckland','Christchurch']},
  {cat:'Zeměpis: státy světa',q:'Který stát je rozlohou nejmenší v Jižní Americe?',a:'Surinam',d:['Uruguay','Guyana']},
  {cat:'Zeměpis: státy světa',q:'Který průplav v Panamě spojuje Atlantský a Tichý oceán?',a:'Panamský průplav',d:['Suezský průplav','Kielský průplav']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Argentiny?',a:'Buenos Aires',d:['Santiago','Montevideo']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží starobylé město Petra vytesané do skal?',a:'Jordánsko',d:['Egypt','Sýrie']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Thajska?',a:'Bangkok',d:['Hanoj','Jakarta']},
  {cat:'Zeměpis: státy světa',q:'Který stát tvoří spolu s Anglií, Skotskem a Severním Irskem Spojené království?',a:'Wales',d:['Irsko','Man']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Švédska?',a:'Stockholm',d:['Oslo','Helsinky']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží slavné Viktoriino jezero (částečně)?',a:'Tanzanie / Uganda / Keňa',d:['Jihoafrická republika','Etiopie']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Řecka?',a:'Atény',d:['Soluň','Patra']},
  {cat:'Zeměpis: státy světa',q:'Který stát je rozlohou největší v Jižní Americe?',a:'Brazílie',d:['Argentina','Peru']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Norska?',a:'Oslo',d:['Bergen','Stockholm']},

  // Historie (těžší)
  {cat:'Historie (těžší)',q:'Ve kterém roce vypukla třicetiletá válka?',a:'1618',d:['1648','1588']},
  {cat:'Historie (těžší)',q:'Kdo byl posledním českým a uherským králem z rodu Lucemburků?',a:'Zikmund Lucemburský',d:['Karel IV.','Václav IV.']},
  {cat:'Historie (těžší)',q:'Který mír formálně ukončil třicetiletou válku v roce 1648?',a:'Vestfálský mír',d:['Vídeňský kongres','Utrechtský mír']},
  {cat:'Historie (těžší)',q:'V kterém roce padla Konstantinopol a zanikla Byzantská říše?',a:'1453',d:['1204','1517']},
  {cat:'Historie (těžší)',q:'Kdo vedl bolševickou revoluci v Rusku v roce 1917?',a:'Vladimir Lenin',d:['Josif Stalin','Lev Trockij']},
  {cat:'Historie (těžší)',q:'Která mírová smlouva formálně ukončila první světovou válku s Německem?',a:'Versailleská smlouva',d:['Brestlitevský mír','Trianonská smlouva']},
  {cat:'Historie (těžší)',q:'Ve kterém roce vypukla Velká francouzská revoluce?',a:'1789',d:['1799','1776']},
  {cat:'Historie (těžší)',q:'Kdo byl posledním císařem Západořímské říše?',a:'Romulus Augustulus',d:['Konstantin Veliký','Justinián I.']},
  {cat:'Historie (těžší)',q:'Který anglosaský král je považován za prvního krále sjednocené Anglie (10. století)?',a:'Athelstan',d:['Vilém Dobyvatel','Alfréd Veliký']},
  {cat:'Historie (těžší)',q:'Ve kterém roce byla podepsána Mnichovská dohoda bez účasti Československa?',a:'1938',d:['1939','1937']},
  {cat:'Historie (těžší)',q:'Jak se jmenovala první žena, která samostatně vládla starověkému Egyptu jako faraon?',a:'Hatšepsut',d:['Kleopatra','Nefertiti']},
  {cat:'Historie (těžší)',q:'Který starověký jihoamerický národ postavil Machu Picchu?',a:'Inkové',d:['Aztékové','Mayové']},
  {cat:'Historie (těžší)',q:'Ve kterém roce skončila druhá světová válka v Evropě?',a:'1945',d:['1944','1946']},
  {cat:'Historie (těžší)',q:'Kdo byl prvním československým prezidentem?',a:'Tomáš Garrigue Masaryk',d:['Edvard Beneš','Milan Rastislav Štefánik']},
  {cat:'Historie (těžší)',q:'V kterém roce padla Berlínská zeď?',a:'1989',d:['1991','1987']},
  {cat:'Historie (těžší)',q:'Který starověký národ postavil pyramidy v Gíze?',a:'Staří Egypťané',d:['Sumerové','Féničané']},

  // Věda a vesmír (těžší)
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá nejbližší velká galaxie k naší Mléčné dráze?',a:'Galaxie v Andromedě',d:['Trojúhelníková galaxie','Velké Magellanovo mračno']},
  {cat:'Věda a vesmír (těžší)',q:'Který vědec formuloval obecnou teorii relativity?',a:'Albert Einstein',d:['Isaac Newton','Niels Bohr']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá základní jednotka dědičné informace v DNA?',a:'Gen',d:['Chromozom','Protein']},
  {cat:'Věda a vesmír (těžší)',q:'Kolik chromozomů má běžná lidská tělní buňka?',a:'46',d:['44','48']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá proces, při kterém rostliny přeměňují světlo na chemickou energii?',a:'Fotosyntéza',d:['Respirace','Fermentace']},
  {cat:'Věda a vesmír (těžší)',q:'Který chemický prvek má značku Fe?',a:'Železo',d:['Fluor','Fosfor']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá nejmenší částice prvku, která si zachovává jeho vlastnosti?',a:'Atom',d:['Molekula','Iont']},
  {cat:'Věda a vesmír (těžší)',q:'Který vědec objevil zákony pohybu planet kolem Slunce?',a:'Johannes Kepler',d:['Galileo Galilei','Tycho Brahe']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá jev, kdy světlo mění směr při přechodu z jednoho prostředí do druhého?',a:'Lom světla',d:['Odraz světla','Difrakce']},
  {cat:'Věda a vesmír (těžší)',q:'Kolik planet obíhá kolem Slunce od vyřazení Pluta z definice planety?',a:'8',d:['9','7']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá teorie popisující vznik vesmíru z jednoho extrémně horkého a hustého bodu?',a:'Teorie velkého třesku',d:['Teorie strun','Teorie multivesmíru']},
  {cat:'Věda a vesmír (těžší)',q:'Který plyn tvoří většinu objemu zemské atmosféry?',a:'Dusík',d:['Kyslík','Oxid uhličitý']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se jmenuje nejbližší planeta ke Slunci?',a:'Merkur',d:['Venuše','Mars']},
  {cat:'Věda a vesmír (těžší)',q:'Který vědec je považován za objevitele penicilinu?',a:'Alexander Fleming',d:['Louis Pasteur','Robert Koch']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá proces dělení jádra atomu uvolňující velké množství energie?',a:'Jaderné štěpení',d:['Jaderná fúze','Radioaktivní rozpad']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se jmenuje první člověk, který vkročil na Měsíc?',a:'Neil Armstrong',d:['Buzz Aldrin','Jurij Gagarin']},
  {cat:'Věda a vesmír (těžší)',q:'Který orgán lidského těla čerpá a rozvádí krev?',a:'Srdce',d:['Játra','Slezina']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá jednotka elektrického napětí?',a:'Volt',d:['Ampér','Watt']},
  {cat:'Věda a vesmír (těžší)',q:'Který plyn rostliny při fotosyntéze uvolňují jako vedlejší produkt?',a:'Kyslík',d:['Dusík','Vodík']},
  {cat:'Věda a vesmír (těžší)',q:'Jak se nazývá největší planeta sluneční soustavy?',a:'Jupiter',d:['Saturn','Neptun']},
  {cat:'Věda a vesmír (těžší)',q:'Který vědec je autorem periodické tabulky prvků?',a:'Dmitrij Mendělejev',d:['Marie Curie','Antoine Lavoisier']},

  // Filmy a seriály (těžší)
  {cat:'Filmy a seriály (těžší)',q:'Kdo režíroval film „Pulp Fiction“?',a:'Quentin Tarantino',d:['Martin Scorsese','David Fincher']},
  {cat:'Filmy a seriály (těžší)',q:'Který film získal Oscara za nejlepší film na obřadu v roce 1995?',a:'Forrest Gump',d:['Pulp Fiction','Skřítek']},
  {cat:'Filmy a seriály (těžší)',q:'Kdo ztvárnil Jacka Sparrowa ve filmech Piráti z Karibiku?',a:'Johnny Depp',d:['Orlando Bloom','Geoffrey Rush']},
  {cat:'Filmy a seriály (těžší)',q:'Který režisér natočil filmovou trilogii „Pán prstenů“?',a:'Peter Jackson',d:['James Cameron','Christopher Nolan']},
  {cat:'Filmy a seriály (těžší)',q:'Které animační studio stojí za filmy Shrek a Kung Fu Panda?',a:'DreamWorks Animation',d:['Pixar','Disney']},
  {cat:'Filmy a seriály (těžší)',q:'Kdo napsal knižní předlohu k seriálu „Hra o trůny“?',a:'George R. R. Martin',d:['J. R. R. Tolkien','Terry Pratchett']},
  {cat:'Filmy a seriály (těžší)',q:'Který herec ztvárnil Tonyho Starka / Iron Mana ve filmech MCU?',a:'Robert Downey Jr.',d:['Chris Evans','Chris Hemsworth']},
  {cat:'Filmy a seriály (těžší)',q:'Kdo režíroval filmy „Sedm“ a „Klub rváčů“?',a:'David Fincher',d:['Quentin Tarantino','Christopher Nolan']},
  {cat:'Filmy a seriály (těžší)',q:'Ve kterém roce měl premiéru první díl Star Wars (epizoda IV)?',a:'1977',d:['1980','1983']},
  {cat:'Filmy a seriály (těžší)',q:'Ve kterém seriálu učitel chemie z Albuquerque začne vařit drogy?',a:'Perníkový táta (Breaking Bad)',d:['Ozark','Narcos']},
  {cat:'Filmy a seriály (těžší)',q:'Kdo režíroval film „Počátek“ (Inception)?',a:'Christopher Nolan',d:['Denis Villeneuve','Ridley Scott']},
  {cat:'Filmy a seriály (těžší)',q:'Který animovaný film od Pixaru se odehrává v hlavě dívky jménem Riley?',a:'V hlavě (Inside Out)',d:['Coco','Ratatouille']},
  {cat:'Filmy a seriály (těžší)',q:'Který herec ztvárnil postavu Neo ve filmové sérii Matrix?',a:'Keanu Reeves',d:['Brad Pitt','Tom Cruise']},
  {cat:'Filmy a seriály (těžší)',q:'Kdo režíroval film „Titanic“ z roku 1997?',a:'James Cameron',d:['Steven Spielberg','Ron Howard']},
  {cat:'Filmy a seriály (těžší)',q:'Ve kterém sci-fi seriálu létá posádka lodí Enterprise vesmírem?',a:'Star Trek',d:['Star Wars','Battlestar Galactica']},
  {cat:'Filmy a seriály (těžší)',q:'Který herec hrál hlavní roli Waltera Whitea v seriálu Perníkový táta?',a:'Bryan Cranston',d:['Aaron Paul','Giancarlo Esposito']},
  {cat:'Filmy a seriály (těžší)',q:'Kdo režíroval trilogii filmů o Batmanovi „The Dark Knight“?',a:'Christopher Nolan',d:['Tim Burton','Zack Snyder']},
  {cat:'Filmy a seriály (těžší)',q:'Který studiový film uvedl poprvé postavu Mickey Mouse v roce 1928?',a:'Steamboat Willie',d:['Fantasia','Sněhurka a sedm trpaslíků']},
  {cat:'Filmy a seriály (těžší)',q:'Ve kterém filmu z roku 1994 hraje Tom Hanks postavu s nízkým IQ, která zažívá klíčové okamžiky americké historie?',a:'Forrest Gump',d:['Philadelphia','Cast Away']},
  {cat:'Filmy a seriály (těžší)',q:'Který režisér stojí za filmy „Vetřelec“ a „Blade Runner“?',a:'Ridley Scott',d:['James Cameron','George Lucas']},
  {cat:'Filmy a seriály (těžší)',q:'Jak se jmenuje fiktivní město, ve kterém se odehrává většina filmů o Batmanovi?',a:'Gotham City',d:['Metropolis','Central City']},

  // Literatura (těžší)
  {cat:'Literatura (těžší)',q:'Kdo napsal román „Válka a mír“?',a:'Lev Nikolajevič Tolstoj',d:['Fjodor Dostojevskij','Anton Čechov']},
  {cat:'Literatura (těžší)',q:'Který anglický dramatik napsal tragédii „Hamlet“?',a:'William Shakespeare',d:['Christopher Marlowe','Ben Jonson']},
  {cat:'Literatura (těžší)',q:'Kdo je autorem románu „1984“?',a:'George Orwell',d:['Aldous Huxley','Ray Bradbury']},
  {cat:'Literatura (těžší)',q:'Která česká spisovatelka napsala „Babičku“?',a:'Božena Němcová',d:['Karolína Světlá','Eliška Krásnohorská']},
  {cat:'Literatura (těžší)',q:'Kdo napsal román „Zločin a trest“?',a:'Fjodor Dostojevskij',d:['Lev Tolstoj','Ivan Turgeněv']},
  {cat:'Literatura (těžší)',q:'Kdo je autorkou knižní série o Harrym Potterovi?',a:'J. K. Rowlingová',d:['C. S. Lewis','J. R. R. Tolkien']},
  {cat:'Literatura (těžší)',q:'Kdo napsal existencialistický román „Cizinec“?',a:'Albert Camus',d:['Jean-Paul Sartre','Franz Kafka']},
  {cat:'Literatura (těžší)',q:'Který pražský německy píšící spisovatel je autorem „Proměny“?',a:'Franz Kafka',d:['Rainer Maria Rilke','Max Brod']},
  {cat:'Literatura (těžší)',q:'Kdo je autorem starověkého eposu „Odysseia“?',a:'Homér',d:['Sofoklés','Vergilius']},
  {cat:'Literatura (těžší)',q:'Který český básník napsal lyrickoepickou skladbu „Máj“?',a:'Karel Hynek Mácha',d:['Jan Neruda','Jaroslav Vrchlický']},
  {cat:'Literatura (těžší)',q:'Kdo napsal román „Sto roků samoty“?',a:'Gabriel García Márquez',d:['Jorge Luis Borges','Mario Vargas Llosa']},
  {cat:'Literatura (těžší)',q:'Která anglická autorka napsala „Pýchu a předsudek“?',a:'Jane Austenová',d:['Charlotte Brontëová','Virginia Woolfová']},
  {cat:'Literatura (těžší)',q:'Kdo napsal pohádkovou knihu „Malý princ“?',a:'Antoine de Saint-Exupéry',d:['Jules Verne','Charles Perrault']},
  {cat:'Literatura (těžší)',q:'Který český spisovatel napsal „Osudy dobrého vojáka Švejka za světové války“ celým názvem?',a:'Jaroslav Hašek',d:['Karel Poláček','Jan Werich']},
  {cat:'Literatura (těžší)',q:'Kdo je autorem fantasy série „Zeměplocha“?',a:'Terry Pratchett',d:['Neil Gaiman','Douglas Adams']},

  // Sport (těžší)
  {cat:'Sport (těžší)',q:'Ve kterém městě se konaly první novodobé olympijské hry v roce 1896?',a:'Athény',d:['Paříž','Londýn']},
  {cat:'Sport (těžší)',q:'Kolik hráčů má fotbalový tým na hřišti celkem, včetně brankáře?',a:'11',d:['10','12']},
  {cat:'Sport (těžší)',q:'Kolik setů musí muž vyhrát pro finálové vítězství na Wimbledonu?',a:'3',d:['2','4']},
  {cat:'Sport (těžší)',q:'Ve kterých dvou sportech se běžně používá pojem „hattrick“ pro tři góly jednoho hráče v zápase?',a:'Fotbal a hokej',d:['Basketbal a volejbal','Ragby a baseball']},
  {cat:'Sport (těžší)',q:'Kolik bodů se v basketbalu počítá za koš proměněný zpoza tříbodové čáry?',a:'3',d:['2','1']},
  {cat:'Sport (těžší)',q:'Který stát vyhrál mistrovství světa ve fotbale nejvícekrát (k roku 2022)?',a:'Brazílie',d:['Německo','Itálie']},
  {cat:'Sport (těžší)',q:'Ve kterém roce se konalo úplně první mistrovství světa ve fotbale?',a:'1930',d:['1926','1934']},
  {cat:'Sport (těžší)',q:'Kolik kol má standardně profesionální boxerský zápas na mistrovské úrovni?',a:'12',d:['10','15']},
  {cat:'Sport (těžší)',q:'Jak se přezdívalo českému hokejovému brankáři Dominiku Haškovi pro jeho neortodoxní styl chytání?',a:'Dominátor',d:['Bourák','Kanonýr']},
  {cat:'Sport (těžší)',q:'Kolik hráčů tvoří na ledě jeden hokejový tým bez brankáře?',a:'5',d:['6','4']},
  {cat:'Sport (těžší)',q:'Který cyklista vyhrál Tour de France sedmkrát za sebou, než mu byly tituly odebrány za doping?',a:'Lance Armstrong',d:['Miguel Induráin','Eddy Merckx']},
  {cat:'Sport (těžší)',q:'Kolik minut trvá standardní fotbalový zápas bez nastavení?',a:'90',d:['80','100']},
  {cat:'Sport (těžší)',q:'Ve kterém sportu se hraje o trofej zvanou Stanley Cup?',a:'Lední hokej',d:['Basketbal','Baseball']},
  {cat:'Sport (těžší)',q:'Kolik hráčů je na hřišti v basketbalovém týmu (bez střídajících)?',a:'5',d:['6','7']},
  {cat:'Sport (těžší)',q:'Ve kterém městě se konaly letní olympijské hry v roce 2021 (přeloženy z 2020)?',a:'Tokio',d:['Paříž','Peking']},
  {cat:'Sport (těžší)',q:'Jak se nazývá nejprestižnější cyklistický etapový závod konaný ve Francii?',a:'Tour de France',d:['Giro d’Italia','Vuelta a España']},
  {cat:'Sport (těžší)',q:'Kolik setů se hraje ve volejbale standardně na vítězství (do kolika vítězných setů)?',a:'3',d:['2','4']},
  {cat:'Sport (těžší)',q:'Který sport je typický pro použití hole zvané „biřle“ a hraje se na ledě mezi dvěma týmy s kamenem?',a:'Curling',d:['Bandy','Ringette']},
  {cat:'Sport (těžší)',q:'Kolik hráčů má na hřišti jeden tým v ragby union (15členné družstvo)?',a:'15',d:['13','11']},
  {cat:'Sport (těžší)',q:'Ve kterém roce naposledy získala česká hokejová reprezentace zlato na mistrovství světa (domácí šampionát v Praze)?',a:'2024',d:['2010','2005']},
  {cat:'Sport (těžší)',q:'Jak se nazývá nejvyšší fotbalová soutěž klubů v Evropě, kterou pořádá UEFA?',a:'Liga mistrů',d:['Evropská liga','Konferenční liga']},

  // Zeměpis (těžší)
  {cat:'Zeměpis (těžší)',q:'Jaké je hlavní město Kazachstánu?',a:'Astana',d:['Almaty','Biškek']},
  {cat:'Zeměpis (těžší)',q:'Který průliv odděluje Afriku od Evropy u Gibraltaru?',a:'Gibraltarský průliv',d:['Bosporský průliv','Ormuzský průliv']},
  {cat:'Zeměpis (těžší)',q:'Která poušť je největší horkou pouští na světě?',a:'Sahara',d:['Gobi','Arabská poušť']},
  {cat:'Zeměpis (těžší)',q:'Které sladkovodní jezero je největší na světě podle rozlohy?',a:'Hořejší jezero',d:['Bajkal','Viktoriino jezero']},
  {cat:'Zeměpis (těžší)',q:'Mezi kterými dvěma zeměmi vede nejdelší státní hranice na světě?',a:'USA a Kanada',d:['Rusko a Kazachstán','Čína a Mongolsko']},
  {cat:'Zeměpis (těžší)',q:'Které pohoří tvoří tradiční hranici mezi Evropou a Asií na území Ruska?',a:'Ural',d:['Kavkaz','Altaj']},
  {cat:'Zeměpis (těžší)',q:'Který stát má své největší město (Istanbul) rozkročené na dvou kontinentech zároveň?',a:'Turecko',d:['Rusko','Egypt']},
  {cat:'Zeměpis (těžší)',q:'Která evropská řeka protéká nejvíce státy na světě?',a:'Dunaj',d:['Nil','Amazonka']},
  {cat:'Zeměpis (těžší)',q:'Který ostrov je největší na světě (nepočítáme-li kontinent Austrálii)?',a:'Grónsko',d:['Nová Guinea','Borneo']},
  {cat:'Zeměpis (těžší)',q:'Které pohoří je nejdelší na světě?',a:'Andy',d:['Himálaj','Skalnaté hory']},
  {cat:'Zeměpis (těžší)',q:'Na hranici kterých dvou zemí leží Viktoriiny vodopády?',a:'Zambie a Zimbabwe',d:['Jihoafrická republika a Namibie','Keňa a Tanzanie']},
  {cat:'Zeměpis (těžší)',q:'Ve které zemi leží Grand Canyon?',a:'USA',d:['Mexiko','Kanada']},

  // Jídlo a vaření
  {cat:'Jídlo a vaření',q:'Z jaké země pochází pokrm sushi?',a:'Japonsko',d:['Čína','Korea']},
  {cat:'Jídlo a vaření',q:'Jaká surovina je základem klasického italského pesta?',a:'Bazalka',d:['Petržel','Špenát']},
  {cat:'Jídlo a vaření',q:'Jak se nazývá proces pomalého vaření masa ve vlastní šťávě při nízké teplotě?',a:'Dušení',d:['Blanšírování','Flambování']},
  {cat:'Jídlo a vaření',q:'Který koření dodává currymu typickou žlutou barvu?',a:'Kurkuma',d:['Šafrán','Paprika']},
  {cat:'Jídlo a vaření',q:'Z jaké mouky se tradičně vyrábí italské těstoviny?',a:'Z pšeničné (semolinové) mouky',d:['Z rýžové mouky','Z kukuřičné mouky']},
  {cat:'Jídlo a vaření',q:'Jak se nazývá francouzská technika krátkého opečení masa na prudkém ohni?',a:'Sear (opečení za vysoké teploty)',d:['Confit','Poaching']},
  {cat:'Jídlo a vaření',q:'Který sýr se tradičně používá na pravou italskou pizzu Margheritu?',a:'Mozzarella',d:['Parmazán','Gorgonzola']},
  {cat:'Jídlo a vaření',q:'Z jaké rostliny se získává čokoláda?',a:'Kakaovník',d:['Vanilkovník','Kávovník']},
  {cat:'Jídlo a vaření',q:'Jak se nazývá francouzský vývar, základ mnoha omáček?',a:'Fond (vývar)',d:['Roux','Bujón']},
  {cat:'Jídlo a vaření',q:'Který nápoj vzniká fermentací hroznů?',a:'Víno',d:['Pivo','Cider']},
  {cat:'Jídlo a vaření',q:'Jak se jmenuje tradiční český pokrm z bramborového těsta plněný uzeným masem?',a:'Bramborové knedlíky',d:['Halušky','Škubánky']},
  {cat:'Jídlo a vaření',q:'Který koření se získává ze sušených tyčinek kůry stromu skořicovníku?',a:'Skořice',d:['Muškátový oříšek','Hřebíček']},
  {cat:'Jídlo a vaření',q:'Jak se nazývá proces krátkého povaření zeleniny a jejího prudkého zchlazení v ledové vodě?',a:'Blanšírování',d:['Marinování','Karamelizace']},
  {cat:'Jídlo a vaření',q:'Z jaké země pochází pokrm paella?',a:'Španělsko',d:['Portugalsko','Itálie']},

  // Auta obecně
  {cat:'Auta obecně',q:'Který výrobce aut používá logo se čtyřmi propojenými kruhy?',a:'Audi',d:['BMW','Mercedes-Benz']},
  {cat:'Auta obecně',q:'Jaký je český výrobce automobilů se sídlem v Mladé Boleslavi?',a:'Škoda Auto',d:['Tatra','Praga']},
  {cat:'Auta obecně',q:'Co znamená zkratka ABS u automobilů?',a:'Protiblokovací systém brzd',d:['Automatický bezpečnostní systém','Asistent brzdného startu']},
  {cat:'Auta obecně',q:'Který typ motoru spaluje palivo pomocí kompresního zapálení bez zapalovací svíčky?',a:'Vznětový (dieselový) motor',d:['Zážehový motor','Wankelův motor']},
  {cat:'Auta obecně',q:'Jak se nazývá převodovka, která mění převodové stupně automaticky bez zásahu řidiče?',a:'Automatická převodovka',d:['Manuální převodovka','Sekvenční převodovka']},
  {cat:'Auta obecně',q:'Který italský výrobce sportovních aut má ve znaku vzpínajícího se černého koně?',a:'Ferrari',d:['Lamborghini','Maserati']},
  {cat:'Auta obecně',q:'Co znamená zkratka SUV?',a:'Sport Utility Vehicle',d:['Speed Utility Van','Standard Urban Vehicle']},
  {cat:'Auta obecně',q:'Jak se nazývá součástka tlumící nárazy mezi kolem a karoserií?',a:'Tlumič pérování',d:['Alternátor','Turbodmychadlo']},
  {cat:'Auta obecně',q:'Který německý výrobce má ve znaku modro-bílý kruh připomínající vrtuli letadla?',a:'BMW',d:['Audi','Volkswagen']},
  {cat:'Auta obecně',q:'Co znamená zkratka 4x4 u automobilů?',a:'Pohon všech čtyř kol',d:['Čtyřdveřový model','Čtyřválcový motor']},
  {cat:'Auta obecně',q:'Jak se nazývá zařízení, které stlačuje nasávaný vzduch pro zvýšení výkonu motoru?',a:'Turbodmychadlo',d:['Alternátor','Katalyzátor']},
  {cat:'Auta obecně',q:'Který americký výrobce je typický pro velké pickupy a značku s modrým oválem?',a:'Ford',d:['Chevrolet','Dodge']},
  {cat:'Auta obecně',q:'Jak se nazývá zařízení snižující škodlivé emise ve výfukovém systému spalovacího motoru?',a:'Katalyzátor',d:['Tlumič výfuku','Filtr pevných částic']},
  {cat:'Auta obecně',q:'Který český výrobce nákladních aut a terénních vozidel sídlí v Kopřivnici?',a:'Tatra',d:['Škoda','Avia']},

  // Fyzika a matematika
  {cat:'Fyzika a matematika',q:'Jak se nazývá jednotka síly v soustavě SI?',a:'Newton',d:['Joule','Watt']},
  {cat:'Fyzika a matematika',q:'Kolik je odmocnina ze 144?',a:'12',d:['14','11']},
  {cat:'Fyzika a matematika',q:'Jak se nazývá Newtonův zákon popisující akci a reakci?',a:'Třetí Newtonův zákon',d:['První Newtonův zákon','Druhý Newtonův zákon']},
  {cat:'Fyzika a matematika',q:'Jaká je přibližná hodnota čísla pí na dvě desetinná místa?',a:'3,14',d:['3,41','3,12']},
  {cat:'Fyzika a matematika',q:'Jak se nazývá jednotka elektrického odporu?',a:'Ohm',d:['Ampér','Farad']},
  {cat:'Fyzika a matematika',q:'Kolik stupňů má součet vnitřních úhlů trojúhelníku?',a:'180',d:['360','90']},
  {cat:'Fyzika a matematika',q:'Jak se nazývá síla, která táhne objekty směrem k zemi?',a:'Gravitace',d:['Setrvačnost','Magnetismus']},
  {cat:'Fyzika a matematika',q:'Jaká je přibližná rychlost světla ve vakuu?',a:'300 000 km/s',d:['150 000 km/s','1 000 000 km/s']},
  {cat:'Fyzika a matematika',q:'Jak se nazývá číslo, které lze dělit pouze jedničkou a sebou samým?',a:'Prvočíslo',d:['Sudé číslo','Celé číslo']},
  {cat:'Fyzika a matematika',q:'Jak se nazývá jednotka výkonu v soustavě SI?',a:'Watt',d:['Joule','Newton']},
  {cat:'Fyzika a matematika',q:'Kolik je 7 na druhou?',a:'49',d:['56','42']},
  {cat:'Fyzika a matematika',q:'Jak se nazývá teorie, podle které energii a hmotu nelze vytvořit ani zničit, jen přeměnit?',a:'Zákon zachování energie',d:['Termodynamický rozpad','Kvantová superpozice']},

  // Hry: obecné
  {cat:'Hry: obecné',q:'Který výrobce stojí za herní konzolí PlayStation?',a:'Sony',d:['Microsoft','Nintendo']},
  {cat:'Hry: obecné',q:'Jak se jmenuje italský instalatér, hlavní postava her od Nintenda?',a:'Mario',d:['Luigi','Wario']},
  {cat:'Hry: obecné',q:'Který žánr her je typický pohledem z první osoby a střílením (zkratka FPS)?',a:'First-Person Shooter',d:['Real-Time Strategy','Role-Playing Game']},
  {cat:'Hry: obecné',q:'Jak se jmenuje open-world hra od studia Rockstar odehrávající se v americkém velkoměstě?',a:'Grand Theft Auto (GTA)',d:['Watch Dogs','Saints Row']},
  {cat:'Hry: obecné',q:'Který herní žánr je typický budováním základny a taktickým velením jednotek (zkratka RTS)?',a:'Real-Time Strategy',d:['MOBA','MMORPG']},
  {cat:'Hry: obecné',q:'Jak se jmenuje digitální distribuční platforma pro PC hry od Valve?',a:'Steam',d:['Epic Games Store','GOG']},
  {cat:'Hry: obecné',q:'Který český herní vývojářský tým stojí za sérií Kingdom Come: Deliverance?',a:'Warhorse Studios',d:['Bohemia Interactive','Amanita Design']},
  {cat:'Hry: obecné',q:'Jak se jmenuje sériová postava lovkyně pokladů z her Tomb Raider?',a:'Lara Croft',d:['Nathan Drake','Jill Valentine']},
  {cat:'Hry: obecné',q:'Který žánr her je typický sbíráním surovin a přežíváním v otevřeném světě?',a:'Survival',d:['Puzzle','Rhythm game']},
  {cat:'Hry: obecné',q:'Jak se jmenuje česká série her o partě vojáků z druhé světové války od Bohemia Interactive?',a:'Operace Flashpoint / Arma',d:['Mafia','Vietcong']},
  {cat:'Hry: obecné',q:'Který herní vývojář stojí za sérií The Witcher?',a:'CD Projekt Red',d:['Bethesda','BioWare']},
  {cat:'Hry: obecné',q:'Jak se nazývá česká herní studio stojící za sérií Mafia?',a:'Illusion Softworks (dnes 2K Czech / Hangar 13)',d:['Warhorse Studios','Bohemia Interactive']},

  // Zvířata: divoká příroda
  {cat:'Zvířata: divoká příroda',q:'Který savec je největší na světě?',a:'Plejtvák obrovský (velryba)',d:['Slon africký','Žralok velrybí']},
  {cat:'Zvířata: divoká příroda',q:'Jak se nazývá nejrychlejší pozemský savec na světě?',a:'Gepard',d:['Antilopa','Lev']},
  {cat:'Zvířata: divoká příroda',q:'Který pták neumí létat, ale je vynikající plavec žijící v Antarktidě?',a:'Tučňák',d:['Pštros','Kivi']},
  {cat:'Zvířata: divoká příroda',q:'Jak se nazývá největší žijící plaz na světě?',a:'Krokodýl mořský',d:['Varan komodský','Anakonda velká']},
  {cat:'Zvířata: divoká příroda',q:'Který savec je jediný schopný skutečného letu?',a:'Netopýr',d:['Poletucha','Veverka']},
  {cat:'Zvířata: divoká příroda',q:'Jak se nazývá největší kočkovitá šelma žijící v Asii?',a:'Tygr',d:['Lev','Levhart']},
  {cat:'Zvířata: divoká příroda',q:'Který živočich je považován za nejjedovatějšího hada na světě podle síly jedu?',a:'Tajpan pustinný',d:['Kobra královská','Chřestýš']},
  {cat:'Zvířata: divoká příroda',q:'Jak se nazývá proces, kdy hmyz jako motýl prochází proměnou z housenky?',a:'Metamorfóza',d:['Mitóza','Fotosyntéza']},
  {cat:'Zvířata: divoká příroda',q:'Který savec žijící v Austrálii nosí mláďata ve váčku na břiše?',a:'Klokan',d:['Koala','Vombat']},
  {cat:'Zvířata: divoká příroda',q:'Jak se jmenuje největší žijící pták na světě, který neumí létat?',a:'Pštros dvouprstý',d:['Emu','Kasuár']},
  {cat:'Zvířata: divoká příroda',q:'Který savec je znám tím, že mění barvu srsti podle ročního období pro maskování (např. v Arktidě)?',a:'Zajíc bělák',d:['Liška polární','Sob polární']},
  {cat:'Zvířata: divoká příroda',q:'Jak se nazývá největší ryba na světě?',a:'Žralok obrovský (velrybí)',d:['Manta obrovská','Mečoun obecný']},

  // Technologie a internet
  {cat:'Technologie a internet',q:'Který protokol se používá pro bezpečný přenos dat na webu (šifrovaná verze HTTP)?',a:'HTTPS',d:['FTP','SMTP']},
  {cat:'Technologie a internet',q:'Jak se jmenuje sociální síť založená Markem Zuckerbergem v roce 2004?',a:'Facebook',d:['Twitter','MySpace']},
  {cat:'Technologie a internet',q:'Co znamená zkratka Wi-Fi?',a:'Wireless Fidelity',d:['Wide Field','Wireless Field']},
  {cat:'Technologie a internet',q:'Který vyhledávač je celosvětově nejpoužívanější?',a:'Google',d:['Bing','Yahoo']},
  {cat:'Technologie a internet',q:'Jak se nazývá škodlivý software, který požaduje výkupné za odemčení dat?',a:'Ransomware',d:['Spyware','Adware']},
  {cat:'Technologie a internet',q:'Co znamená zkratka VPN?',a:'Virtual Private Network',d:['Verified Public Node','Virtual Protocol Number']},
  {cat:'Technologie a internet',q:'Který systém domén překládá doménová jména na IP adresy?',a:'DNS',d:['HTTP','SSL']},
  {cat:'Technologie a internet',q:'Jak se jmenuje operační systém vyvíjený firmou Apple pro počítače Mac?',a:'macOS',d:['iOS','Windows']},
  {cat:'Technologie a internet',q:'Co znamená zkratka AI v kontextu moderní technologie?',a:'Umělá inteligence (Artificial Intelligence)',d:['Automatická integrace','Aktivní interakce']},
  {cat:'Technologie a internet',q:'Jak se nazývá úložiště dat přístupné přes internet, nikoli lokálně na disku?',a:'Cloud',d:['Server','Disk']},
  {cat:'Technologie a internet',q:'Který způsob ověření přidává k heslu ještě druhý krok, např. kód z telefonu?',a:'Dvoufaktorové ověření (2FA)',d:['Jednorázové heslo','Biometrie']},
  {cat:'Technologie a internet',q:'Jak se nazývá jednotka přenosové rychlosti internetu?',a:'Mbps (megabity za sekundu)',d:['MB (megabajt)','GHz']},

  // Zeměpis: státy světa — druhá vlna
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Portugalska?',a:'Lisabon',d:['Porto','Coimbra']},
  {cat:'Zeměpis: státy světa',q:'Který malý stát leží v Pyrenejích mezi Francií a Španělskem?',a:'Andorra',d:['Monako','San Marino']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Polska?',a:'Varšava',d:['Krakov','Vratislav']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží ostrovy Bali a Jáva?',a:'Indonésie',d:['Malajsie','Filipíny']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Mexika?',a:'Mexico City',d:['Guadalajara','Cancún']},
  {cat:'Zeměpis: státy světa',q:'Který stát je největší ostrovní zemí v Evropě?',a:'Spojené království',d:['Island','Irsko']},
  {cat:'Zeměpis: státy světa',q:'Které město je administrativním hlavním městem Jihoafrické republiky?',a:'Pretoria',d:['Kapské Město','Johannesburg']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Kuby?',a:'Havana',d:['Santiago de Cuba','Varadero']},
  {cat:'Zeměpis: státy světa',q:'Který stát má tvar boty a leží v jižní Evropě?',a:'Itálie',d:['Španělsko','Chorvatsko']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Rakouska?',a:'Vídeň',d:['Salcburk','Graz']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží nejvyšší hora Alp Mont Blanc?',a:'Francie (na hranici s Itálií)',d:['Švýcarsko','Rakousko']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Nizozemska?',a:'Amsterdam',d:['Rotterdam','Haag']},
  {cat:'Zeměpis: státy světa',q:'Který stát je kontinentální rozlohou největší v Oceánii?',a:'Austrálie',d:['Papua Nová Guinea','Nový Zéland']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Švýcarska?',a:'Bern',d:['Curych','Ženeva']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží starobylé mayské město Chichén Itzá?',a:'Mexiko',d:['Guatemala','Belize']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Dánska?',a:'Kodaň',d:['Aarhus','Odense']},
  {cat:'Zeměpis: státy světa',q:'Který stát je rozlohou nejmenší v Evropě po Vatikánu?',a:'Monako',d:['San Marino','Lichtenštejnsko']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Finska?',a:'Helsinky',d:['Turku','Tampere']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží poloostrov Yucatán?',a:'Mexiko',d:['Kuba','Belize']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Irska?',a:'Dublin',d:['Cork','Belfast']},
  {cat:'Zeměpis: státy světa',q:'Který stát je jediný na světě, jehož vlajka není obdélníková?',a:'Nepál',d:['Bhútán','Eswatini']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Chorvatska?',a:'Záhřeb',d:['Split','Dubrovník']},
  {cat:'Zeměpis: státy světa',q:'Ve které zemi leží starobylý chrámový komplex Angkor Wat?',a:'Kambodža',d:['Vietnam','Thajsko']},
  {cat:'Zeměpis: státy světa',q:'Jaké je hlavní město Belgie, sídlo institucí EU?',a:'Brusel',d:['Antverpy','Gent']},

  // Zeměpis (těžší) — druhá vlna
  {cat:'Zeměpis (těžší)',q:'Který stát má na svém souvislém území nejvíce časových pásem?',a:'Rusko',d:['USA','Kanada']},
  {cat:'Zeměpis (těžší)',q:'Které hlavní město leží nejvýše nad mořem na světě?',a:'La Paz (Bolívie)',d:['Quito','Bogotá']},
  {cat:'Zeměpis (těžší)',q:'Přibližně kolik ostrovů tvoří souostroví Filipín?',a:'Přes 7000',d:['Přes 700','Přes 70 000']},
  {cat:'Zeměpis (těžší)',q:'Která úžina odděluje Asii od Severní Ameriky?',a:'Beringova úžina',d:['Ormuzský průliv','Malacký průliv']},
  {cat:'Zeměpis (těžší)',q:'Které pohoří odděluje indický subkontinent od zbytku Asie?',a:'Himálaj',d:['Ural','Kavkaz']},
  {cat:'Zeměpis (těžší)',q:'Jak se nazývá nejhlubší bod světového oceánu?',a:'Mariánský příkop',d:['Portorický příkop','Jávský příkop']},
  {cat:'Zeměpis (těžší)',q:'Který kontinent nemá žádné trvale žijící obyvatelstvo?',a:'Antarktida',d:['Austrálie','Grónsko']},
  {cat:'Zeměpis (těžší)',q:'Která řeka je nejdelší v Jižní Americe?',a:'Amazonka',d:['Paraná','Orinoko']},
  {cat:'Zeměpis (těžší)',q:'Které moře je považováno za nejslanější vodní plochu na světě?',a:'Mrtvé moře',d:['Rudé moře','Kaspické moře']},
  {cat:'Zeměpis (těžší)',q:'Jak se dříve jmenoval dnešní stát Myanmar?',a:'Barma',d:['Bangladéš','Siam']},
  {cat:'Zeměpis (těžší)',q:'Jaké je starší jméno ostrovního státu Srí Lanka?',a:'Cejlon',d:['Barma','Siam']},
  {cat:'Zeměpis (těžší)',q:'Jaké je starší jméno dnešního Íránu?',a:'Persie',d:['Mezopotámie','Babylonie']},
  {cat:'Zeměpis (těžší)',q:'Který průliv odděluje Evropu od Asie v Istanbulu?',a:'Bospor',d:['Dardanely','Gibraltarský průliv']},
  {cat:'Zeměpis (těžší)',q:'Které dva státy jsou úplně obklopeny územím Itálie?',a:'San Marino a Vatikán',d:['Monako a Andorra','Lucembursko a Belgie']},
  {cat:'Zeměpis (těžší)',q:'Jaké je hlavní město Mongolska?',a:'Ulánbátar',d:['Karakorum','Erdenet']},
  {cat:'Zeměpis (těžší)',q:'Který stát má nejdelší pobřežní linii na světě?',a:'Kanada',d:['Rusko','Indonésie']},
  {cat:'Zeměpis (těžší)',q:'Který je nejsušší trvale obydlený kontinent?',a:'Austrálie',d:['Afrika','Antarktida']},

  // Cestování a města světa
  {cat:'Cestování a města světa',q:'Která věž postavená Gustavem Eiffelem je symbolem Paříže?',a:'Eiffelova věž',d:['Vítězný oblouk','Katedrála Notre-Dame']},
  {cat:'Cestování a města světa',q:'Ve kterém městě najdete starověké Koloseum?',a:'Řím',d:['Neapol','Milán']},
  {cat:'Cestování a města světa',q:'Který most spojuje čtvrti San Francisca přes záliv a je natřený červenooranžovou barvou?',a:'Golden Gate Bridge',d:['Bay Bridge','Brooklyn Bridge']},
  {cat:'Cestování a města světa',q:'Ve kterém městě stojí socha Krista Vykupitele na hoře Corcovado?',a:'Rio de Janeiro',d:['São Paulo','Buenos Aires']},
  {cat:'Cestování a města světa',q:'Který symbol svobody stojí na ostrově v newyorském přístavu?',a:'Socha Svobody',d:['Empire State Building','One World Trade Center']},
  {cat:'Cestování a města světa',q:'Ve kterém městě se nachází Rudé náměstí a Kreml?',a:'Moskva',d:['Petrohrad','Kyjev']},
  {cat:'Cestování a města světa',q:'Ve kterém městě najdete operu se slavnou vlnitou bílou střechou?',a:'Sydney',d:['Melbourne','Canberra']},
  {cat:'Cestování a města světa',q:'Jak se jmenuje hlavní vodní tepna benátských kanálů?',a:'Canal Grande',d:['Panamský průplav','Kielský průplav']},
  {cat:'Cestování a města světa',q:'Ve kterém městě stojí Braniborská brána?',a:'Berlín',d:['Mnichov','Hamburk']},
  {cat:'Cestování a města světa',q:'Jak se jmenuje chrám s barevnými cibulovitými kupolemi na moskevském Rudém náměstí?',a:'Chrám Vasila Blaženého',d:['Kremelský palác','Uspenský chrám']},
  {cat:'Cestování a města světa',q:'Ve kterém městě najdete slavnou třídu Champs-Élysées?',a:'Paříž',d:['Lyon','Marseille']},
  {cat:'Cestování a města světa',q:'Ve kterém španělském městě se nachází slavná ulice La Rambla?',a:'Barcelona',d:['Madrid','Sevilla']},
  {cat:'Cestování a města světa',q:'Který cestovní dokument je nutný pro překročení většiny mezinárodních hranic mimo Schengen?',a:'Cestovní pas',d:['Řidičský průkaz','Rodný list']},
  {cat:'Cestování a města světa',q:'Jak se nazývá vízum umožňující krátkodobý pobyt napříč zeměmi schengenského prostoru?',a:'Schengenské vízum',d:['Pracovní povolení','Zelená karta']},
  {cat:'Cestování a města světa',q:'Která aplikace/web se typicky používá k rezervaci ubytování přímo u místních lidí?',a:'Airbnb',d:['LinkedIn','TripAdvisor']},
  {cat:'Cestování a města světa',q:'Ve kterém čínském městě je nejběžnějším výchozím bodem pro návštěvu Velké čínské zdi?',a:'Peking',d:['Šanghaj','Sian']},
  {cat:'Cestování a města světa',q:'Které souostroví atolů v Indickém oceánu je oblíbenou líbánkovou destinací?',a:'Maledivy',d:['Seychely','Mauricius']},
  {cat:'Cestování a města světa',q:'Které letiště slouží jako hlavní letecký uzel pro lety do Dubaje?',a:'Dubai International Airport',d:['Abú Zabí International','Sharjah International']},
  {cat:'Cestování a města světa',q:'Ve kterém evropském městě najdete na Staroměstském náměstí slavný astronomický orloj?',a:'Praha',d:['Vídeň','Krakov']},
  {cat:'Cestování a města světa',q:'Který řecký ostrov je typický bílo-modrou architekturou a oblíbenými západy slunce?',a:'Santorini',d:['Kréta','Rhodos']},
  {cat:'Cestování a města světa',q:'Jak se obvykle nazývá cestovní pojištění kryjící léčebné výlohy v zahraničí?',a:'Cestovní zdravotní pojištění',d:['Havarijní pojištění','Pojištění odpovědnosti']},
  {cat:'Cestování a města světa',q:'Který národní park v USA je znám gejzírem Old Faithful?',a:'Yellowstone',d:['Yosemite','Grand Canyon']},
  {cat:'Cestování a města světa',q:'Ve kterém městě sídlí hlavní centrála OSN?',a:'New York',d:['Ženeva','Washington D.C.']},
  {cat:'Cestování a města světa',q:'Jak se nazývá slavný pouliční karneval slavený před postní dobou v Rio de Janeiru?',a:'Karneval v Riu',d:['Oktoberfest','Fiesta de San Fermín']},

  // Všeobecné — druhá vlna
  {cat:'Všeobecné',q:'Kolik měsíců má rok?',a:'12',d:['10','13']},
  {cat:'Všeobecné',q:'Jak se nazývá základní stavební jednotka všech živých organismů?',a:'Buňka',d:['Molekula','Orgán']},
  {cat:'Všeobecné',q:'Kolik kontinentů se obvykle rozlišuje na Zemi?',a:'7',d:['5','6']},
  {cat:'Všeobecné',q:'Jak se jmenuje nejmenší planeta sluneční soustavy?',a:'Merkur',d:['Mars','Pluto']},
  {cat:'Všeobecné',q:'Kolik zubů má obvykle dospělý člověk (bez zubů moudrosti)?',a:'28',d:['32','24']},
  {cat:'Všeobecné',q:'Jaká měna se používá ve většině zemí eurozóny?',a:'Euro',d:['Dolar','Libra']},
  {cat:'Všeobecné',q:'Kolik stran má šestiúhelník?',a:'6',d:['5','8']},
  {cat:'Všeobecné',q:'Jak se nazývá proces přeměny kapalné vody na páru?',a:'Odpařování (var)',d:['Kondenzace','Sublimace']},
  {cat:'Všeobecné',q:'Který orgán lidského těla produkuje inzulín?',a:'Slinivka břišní',d:['Játra','Ledviny']},
  {cat:'Všeobecné',q:'Jak se nazývá nejvyšší zákon státu, kterým se řídí ostatní zákony?',a:'Ústava',d:['Vyhláška','Nařízení']},
  {cat:'Všeobecné',q:'Kolik základních smyslů se tradičně rozlišuje u člověka?',a:'5',d:['6','4']},
  {cat:'Všeobecné',q:'Jak se jmenuje jednotka teploty běžně používaná v Česku?',a:'Stupeň Celsia',d:['Fahrenheit','Kelvin']},
  {cat:'Všeobecné',q:'Který plyn je nejvíce zodpovědný za skleníkový efekt způsobený lidskou činností?',a:'Oxid uhličitý',d:['Kyslík','Dusík']},
  {cat:'Všeobecné',q:'Jak se nazývá jev, kdy Měsíc zakryje Slunce pohledem ze Země?',a:'Zatmění Slunce',d:['Zatmění Měsíce','Konjunkce']},
  {cat:'Všeobecné',q:'Kolik hodin má jeden den?',a:'24',d:['12','20']},
  {cat:'Všeobecné',q:'Jak se jmenuje mezinárodní den věnovaný ochraně životního prostředí, slavený 22. dubna?',a:'Den Země',d:['Den vody','Den stromů']},
  {cat:'Všeobecné',q:'Jak se nazývá základní jednotka informace v počítačích (0 nebo 1)?',a:'Bit',d:['Byte','Pixel']},
  {cat:'Všeobecné',q:'Kolik je 12 krát 12?',a:'144',d:['124','132']},
  {cat:'Všeobecné',q:'Jak se jmenuje instituce, která v Česku tiskne bankovky a řídí měnovou politiku?',a:'Česká národní banka',d:['Ministerstvo financí','Komerční banka']},
  {cat:'Všeobecné',q:'Jak se nazývá smlouva mezi zaměstnancem a zaměstnavatelem upravující pracovní poměr?',a:'Pracovní smlouva',d:['Nájemní smlouva','Kupní smlouva']},
  {cat:'Všeobecné',q:'Jak se nazývá typ vlády, kde občané volí své zástupce?',a:'Demokracie',d:['Monarchie','Diktatura']},
  {cat:'Všeobecné',q:'Která planeta sluneční soustavy je nejznámější díky svým výrazným prstencům?',a:'Saturn',d:['Jupiter','Mars']},
  {cat:'Všeobecné',q:'Jak se jmenuje jednotka délky odpovídající 1000 metrům?',a:'Kilometr',d:['Míle','Yard']},
  {cat:'Všeobecné',q:'Ve které zemi se běžně používá teplotní stupnice Fahrenheita místo Celsia?',a:'USA',d:['Kanada','Velká Británie']},

  // Logika a hádanky
  {cat:'Logika a hádanky',q:'Co má zuby, ale nikdy nekouše?',a:'Hřeben',d:['Nůž','Vidlička']},
  {cat:'Logika a hádanky',q:'Čím víc ho ubývá, tím je větší. Co to je?',a:'Díra',d:['Stín','Ozvěna']},
  {cat:'Logika a hádanky',q:'Co jde nahoru, ale nikdy dolů?',a:'Věk',d:['Míč','Výtah']},
  {cat:'Logika a hádanky',q:'Má to města, ale žádné domy, má to lesy, ale žádné stromy, má to řeky, ale žádnou vodu. Co to je?',a:'Mapa',d:['Sen','Kniha']},
  {cat:'Logika a hádanky',q:'Co si můžeš držet v levé ruce, ale nikdy ne v pravé?',a:'Pravý loket',d:['Levou ruku','Klíč']},
  {cat:'Logika a hádanky',q:'Muž má 5 dcer, každá dcera má jednoho společného bratra. Kolik dětí celkem má muž?',a:'6',d:['5','10']},
  {cat:'Logika a hádanky',q:'Kolik měsíců v roce má aspoň 28 dní?',a:'Všech 12',d:['1','6']},
  {cat:'Logika a hádanky',q:'Sud plný vody váží 20 kg, prázdný sud váží 2 kg. Kolik váží sud naplněný do poloviny?',a:'11 kg',d:['10 kg','9 kg']},
  {cat:'Logika a hádanky',q:'Otec a syn havarovali autem, otec zemřel na místě, syna odvezli do nemocnice. Chirurg řekl: „Nemohu ho operovat, je to můj syn.“ Jak je to možné?',a:'Chirurg je jeho matka',d:['Byl to jiný otec','Chirurg lhal']},
  {cat:'Logika a hádanky',q:'Mám klíče, ale žádné zámky. Mám prostor, ale žádné pokoje. Můžeš do mě vstoupit, ale nemůžeš jít ven. Co jsem?',a:'Klávesnice',d:['Piano','Bludiště']},
  {cat:'Logika a hádanky',q:'Co je vždy před tebou, ale nikdy to nemůžeš dostihnout?',a:'Budoucnost',d:['Stín','Obzor']},
  {cat:'Logika a hádanky',q:'Jaké číslo, když ho vynásobíš dvěma a přičteš 3, dá výsledek 15?',a:'6',d:['5','7']},
  {cat:'Logika a hádanky',q:'Kolik je čtvrtina ze sta?',a:'25',d:['20','50']},
  {cat:'Logika a hádanky',q:'Muž žije ve 20. patře. Každé ráno jede výtahem dolů. Když se vrací, jede jen do 10. patra a zbytek jde pěšky – kromě deštivých dnů, kdy jede rovnou nahoru. Proč?',a:'Nedosáhne výš, je malý — v dešti mu pomůže deštník',d:['Výtah je rozbitý','Šetří elektřinu']},
  {cat:'Logika a hádanky',q:'Co má jazyk, ale nikdy nepromluví?',a:'Bota',d:['Zvon','Pes']},
  {cat:'Logika a hádanky',q:'Jak se nazývá slovo, které čteme stejně odpředu i odzadu, například „kajak“?',a:'Palindrom',d:['Anagram','Homonymum']},
  {cat:'Logika a hádanky',q:'Had, který se pohybuje rychlostí 5 km/h, uběhne za hodinu 5 km. Jak daleko uběhne za 30 minut?',a:'2,5 km',d:['5 km','10 km']},
  {cat:'Logika a hádanky',q:'Pokud platí „všechny kočky jsou zvířata“ a „Micka je kočka“, co z toho logicky vyplývá?',a:'Micka je zvíře',d:['Micka je pes','Nelze nic usoudit']},
  {cat:'Logika a hádanky',q:'Máš 3 krabice: jedna jen s jablky, druhá jen s pomeranči, třetí s oběma druhy. Všechny štítky jsou prohozené (žádný nesedí). Kolik kusů ovoce stačí vytáhnout, abys jistě určil obsah všech tří krabic?',a:'1',d:['2','3']},
  {cat:'Logika a hádanky',q:'Co běží kolem celého města, ale samo se nikdy nehýbe?',a:'Plot (nebo silnice)',d:['Řeka','Vítr']},
  {cat:'Logika a hádanky',q:'Jana je dvakrát starší než její bratr Tom. Je jí 20 let. Kolik je Tomovi?',a:'10',d:['15','8']},
  {cat:'Logika a hádanky',q:'Kolik je 1 + 1 × 0 + 1 (dodržuj pořadí operací)?',a:'2',d:['1','3']},
  {cat:'Logika a hádanky',q:'Muž stojí před dvěma dveřmi, za jedněmi je smrt, za druhými svoboda. Hlídají je dva strážci, jeden vždy lže, druhý vždy říká pravdu. Jakou jedinou otázku má položit, aby zjistil bezpečné dveře?',a:'Zeptá se jednoho, co by o jeho dveřích řekl druhý strážce, a zvolí opak',d:['Zeptá se, jestli lže','Hodí si mincí']},
  {cat:'Logika a hádanky',q:'Kolik čtverců všech velikostí je na klasické šachovnici 8×8?',a:'204',d:['64','100']},

  // Všeobecné — třetí vlna
  {cat:'Všeobecné',q:'Kolik je sedm plus osm?',a:'15',d:['16','14']},
  {cat:'Všeobecné',q:'Jak se jmenuje proces, při kterém housenka mění se v motýla?',a:'Metamorfóza',d:['Fotosyntéza','Fermentace']},
  {cat:'Všeobecné',q:'Který orgán lidského těla je zodpovědný za filtraci krve a tvorbu moči?',a:'Ledviny',d:['Játra','Slezina']},
  {cat:'Všeobecné',q:'Jak se nazývá nejmenší dosud objevená stavební jednotka hmoty (dříve považovaná za nedělitelnou)?',a:'Atom',d:['Molekula','Buňka']},
  {cat:'Všeobecné',q:'Kolik stupňů má plný úhel (celý kruh)?',a:'360',d:['180','270']},
  {cat:'Všeobecné',q:'Jak se jmenuje světadíl, na kterém leží Sahara?',a:'Afrika',d:['Asie','Jižní Amerika']},
  {cat:'Všeobecné',q:'Který plyn dýchají lidé při nádechu především za účelem získání energie?',a:'Kyslík',d:['Dusík','Oxid uhličitý']},
  {cat:'Všeobecné',q:'Jak se nazývá nejvyšší možná rychlost ve vesmíru podle fyziky?',a:'Rychlost světla',d:['Rychlost zvuku','Rychlost gravitace']},
  {cat:'Všeobecné',q:'Kolik měsíců (satelitů) obíhá kolem Země?',a:'1 (Měsíc)',d:['2','0']},
  {cat:'Všeobecné',q:'Jak se jmenuje jednotka hmotnosti základní v soustavě SI?',a:'Kilogram',d:['Gram','Litr']},
  {cat:'Všeobecné',q:'Který smysl umožňuje vnímat zvuky?',a:'Sluch',d:['Zrak','Hmat']},
  {cat:'Všeobecné',q:'Jak se nazývá dokument, kterým rodiče hlásí narození dítěte úřadům?',a:'Rodný list',d:['Občanský průkaz','Cestovní pas']},
  {cat:'Všeobecné',q:'Kolik je polovina ze čtyřiceti?',a:'20',d:['15','25']},
  {cat:'Všeobecné',q:'Jak se jmenuje proces, kterým rostliny ztrácejí vodu odpařováním z listů?',a:'Transpirace',d:['Fotosyntéza','Respirace']},
  {cat:'Všeobecné',q:'Který živel je spojován s ohněm ve starověké teorii čtyř živlů?',a:'Oheň',d:['Voda','Vzduch']},
  {cat:'Všeobecné',q:'Jak se nazývá instituce, kde se soudí právní spory?',a:'Soud',d:['Notářství','Úřad práce']},
  {cat:'Všeobecné',q:'Kolik minut má fotbalový poločas standardně?',a:'45',d:['30','60']},
  {cat:'Všeobecné',q:'Jak se jmenuje jednotka objemu kapalin v metrické soustavě?',a:'Litr',d:['Kilogram','Metr']},
  {cat:'Všeobecné',q:'Který orgán je centrem nervové soustavy člověka?',a:'Mozek',d:['Srdce','Plíce']},
  {cat:'Všeobecné',q:'Kolik je 100 děleno 4?',a:'25',d:['20','50']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇩🇿',a:'Alžírsko',d:['Seychely','Džibutsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇴',a:'Angola',d:['Benin','Tunisko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇯',a:'Benin',d:['Jihoafrická republika','Guinea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇼',a:'Botswana',d:['Ghana','Egypt']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇫',a:'Burkina Faso',d:['Tunisko','Demokratická republika Kongo']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇮',a:'Burundi',d:['Středoafrická republika','Tunisko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇩',a:'Čad',d:['Niger','Burundi']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇩',a:'Demokratická republika Kongo',d:['Rovníková Guinea','Malawi']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇩🇯',a:'Džibutsko',d:['Benin','Angola']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇪🇬',a:'Egypt',d:['Burundi','Gambie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇪🇷',a:'Eritrea',d:['Ghana','Mosambik']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇿',a:'Eswatini',d:['Rwanda','Angola']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇪🇹',a:'Etiopie',d:['Nigérie','Gabon']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇦',a:'Gabon',d:['Tanzanie','Sierra Leone']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇲',a:'Gambie',d:['Súdán','Niger']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇭',a:'Ghana',d:['Madagaskar','Gambie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇳',a:'Guinea',d:['Mali','Rovníková Guinea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇼',a:'Guinea-Bissau',d:['Jihoafrická republika','Kapverdy']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇿🇦',a:'Jihoafrická republika',d:['Alžírsko','Uganda']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇸',a:'Jižní Súdán',d:['Kapverdy','Eritrea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇲',a:'Kamerun',d:['Súdán','Malawi']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇪',a:'Keňa',d:['Komory','Guinea-Bissau']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇲',a:'Komory',d:['Egypt','Gabon']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇬',a:'Konžská republika',d:['Uganda','Keňa']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇸',a:'Lesotho',d:['Čad','Burundi']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇷',a:'Libérie',d:['Lesotho','Čad']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇾',a:'Libye',d:['Komory','Rwanda']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇬',a:'Madagaskar',d:['Guinea','Kapverdy']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇼',a:'Malawi',d:['Benin','Togo']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇱',a:'Mali',d:['Maroko','Niger']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇦',a:'Maroko',d:['Demokratická republika Kongo','Lesotho']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇺',a:'Mauricius',d:['Burundi','Nigérie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇷',a:'Mauritánie',d:['Jihoafrická republika','Seychely']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇿',a:'Mosambik',d:['Senegal','Konžská republika']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇦',a:'Namibie',d:['Pobřeží slonoviny','Etiopie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇪',a:'Niger',d:['Tanzanie','Burkina Faso']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇬',a:'Nigérie',d:['Benin','Somálsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇮',a:'Pobřeží slonoviny',d:['Gambie','Zambie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇶',a:'Rovníková Guinea',d:['Jihoafrická republika','Burundi']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇷🇼',a:'Rwanda',d:['Gambie','Čad']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇳',a:'Senegal',d:['Lesotho','Guinea-Bissau']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇨',a:'Seychely',d:['Mali','Senegal']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇱',a:'Sierra Leone',d:['Konžská republika','Eritrea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇴',a:'Somálsko',d:['Konžská republika','Komory']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇫',a:'Středoafrická republika',d:['Gabon','Sierra Leone']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇩',a:'Súdán',d:['Guinea-Bissau','Středoafrická republika']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇿',a:'Tanzanie',d:['Somálsko','Seychely']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇬',a:'Togo',d:['Burkina Faso','Rovníková Guinea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇳',a:'Tunisko',d:['Senegal','Eritrea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇺🇬',a:'Uganda',d:['Namibie','Tanzanie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇿🇲',a:'Zambie',d:['Ghana','Eritrea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇿🇼',a:'Zimbabwe',d:['Mali','Lesotho']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇻',a:'Kapverdy',d:['Guinea-Bissau','Senegal']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇹',a:'Svatý Tomáš a Princův ostrov',d:['Středoafrická republika','Niger']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇱',a:'Albánie',d:['Kypr','Česko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇩',a:'Andorra',d:['Malta','Bosna a Hercegovina']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇪',a:'Belgie',d:['Kypr','Bělorusko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇾',a:'Bělorusko',d:['Malta','Norsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇦',a:'Bosna a Hercegovina',d:['Lotyšsko','Bulharsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇬',a:'Bulharsko',d:['Itálie','Spojené království']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇪',a:'Černá Hora',d:['Malta','Itálie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇩🇰',a:'Dánsko',d:['Ukrajina','Řecko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇪🇪',a:'Estonsko',d:['Norsko','Ukrajina']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇫🇮',a:'Finsko',d:['Rumunsko','Francie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇫🇷',a:'Francie',d:['Litva','Estonsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇭🇷',a:'Chorvatsko',d:['Lichtenštejnsko','Slovinsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇪',a:'Irsko',d:['Slovensko','Litva']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇸',a:'Island',d:['Srbsko','Portugalsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇹',a:'Itálie',d:['Srbsko','Norsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇾',a:'Kypr',d:['Německo','Itálie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇮',a:'Lichtenštejnsko',d:['Estonsko','San Marino']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇹',a:'Litva',d:['Řecko','Bulharsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇻',a:'Lotyšsko',d:['Bělorusko','Dánsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇺',a:'Lucembursko',d:['Finsko','Švýcarsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇭🇺',a:'Maďarsko',d:['Francie','Česko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇹',a:'Malta',d:['Portugalsko','Španělsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇩',a:'Moldavsko',d:['Bosna a Hercegovina','Nizozemsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇨',a:'Monako',d:['Nizozemsko','Španělsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇩🇪',a:'Německo',d:['Rumunsko','Severní Makedonie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇱',a:'Nizozemsko',d:['Lichtenštejnsko','Slovinsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇴',a:'Norsko',d:['Albánie','Česko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇱',a:'Polsko',d:['Dánsko','Česko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇹',a:'Portugalsko',d:['Slovensko','Litva']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇹',a:'Rakousko',d:['Ukrajina','Malta']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇷🇴',a:'Rumunsko',d:['Dánsko','Lotyšsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇷🇺',a:'Rusko',d:['Polsko','Francie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇷',a:'Řecko',d:['Rakousko','Albánie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇲',a:'San Marino',d:['Lichtenštejnsko','Řecko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇰',a:'Severní Makedonie',d:['Chorvatsko','Řecko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇰',a:'Slovensko',d:['Černá Hora','Švýcarsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇮',a:'Slovinsko',d:['Lucembursko','Švýcarsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇧',a:'Spojené království',d:['Řecko','Španělsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇷🇸',a:'Srbsko',d:['Irsko','Finsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇪🇸',a:'Španělsko',d:['Monako','Francie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇪',a:'Švédsko',d:['Severní Makedonie','San Marino']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇭',a:'Švýcarsko',d:['Albánie','Srbsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇺🇦',a:'Ukrajina',d:['Maďarsko','Rusko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇻🇦',a:'Vatikán',d:['Andorra','Dánsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇿',a:'Česko',d:['Monako','Lucembursko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇫',a:'Afghánistán',d:['Jemen','Bangladéš']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇲',a:'Arménie',d:['Jemen','Sýrie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇿',a:'Ázerbájdžán',d:['Brunej','Pákistán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇭',a:'Bahrajn',d:['Bhútán','Singapur']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇩',a:'Bangladéš',d:['Gruzie','Uzbekistán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇹',a:'Bhútán',d:['Omán','Srí Lanka']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇳',a:'Brunej',d:['Indonésie','Jižní Korea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇳',a:'Čína',d:['Saúdská Arábie','Thajsko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇭',a:'Filipíny',d:['Mongolsko','Izrael']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇪',a:'Gruzie',d:['Singapur','Východní Timor']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇳',a:'Indie',d:['Írán','Katar']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇩',a:'Indonésie',d:['Malajsie','Uzbekistán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇶',a:'Irák',d:['Spojené arabské emiráty','Laos']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇷',a:'Írán',d:['Myanmar','Saúdská Arábie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇮🇱',a:'Izrael',d:['Myanmar','Čína']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇯🇵',a:'Japonsko',d:['Jemen','Izrael']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇾🇪',a:'Jemen',d:['Bangladéš','Kuvajt']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇷',a:'Jižní Korea',d:['Arménie','Tádžikistán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇯🇴',a:'Jordánsko',d:['Srí Lanka','Izrael']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇭',a:'Kambodža',d:['Tádžikistán','Izrael']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇶🇦',a:'Katar',d:['Afghánistán','Bangladéš']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇿',a:'Kazachstán',d:['Turkmenistán','Bahrajn']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇼',a:'Kuvajt',d:['Izrael','Bangladéš']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇬',a:'Kyrgyzstán',d:['Ázerbájdžán','Kazachstán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇦',a:'Laos',d:['Bangladéš','Severní Korea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇧',a:'Libanon',d:['Japonsko','Jižní Korea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇾',a:'Malajsie',d:['Uzbekistán','Pákistán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇻',a:'Maledivy',d:['Írán','Singapur']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇳',a:'Mongolsko',d:['Filipíny','Sýrie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇲',a:'Myanmar',d:['Sýrie','Omán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇵',a:'Nepál',d:['Japonsko','Omán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇴🇲',a:'Omán',d:['Malajsie','Irák']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇰',a:'Pákistán',d:['Brunej','Uzbekistán']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇵',a:'Severní Korea',d:['Maledivy','Kuvajt']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇦',a:'Saúdská Arábie',d:['Maledivy','Malajsie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇬',a:'Singapur',d:['Myanmar','Bahrajn']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇰',a:'Srí Lanka',d:['Vietnam','Spojené arabské emiráty']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇾',a:'Sýrie',d:['Spojené arabské emiráty','Brunej']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇯',a:'Tádžikistán',d:['Bahrajn','Libanon']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇭',a:'Thajsko',d:['Kazachstán','Brunej']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇷',a:'Turecko',d:['Japonsko','Irák']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇲',a:'Turkmenistán',d:['Irák','Saúdská Arábie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇪',a:'Spojené arabské emiráty',d:['Mongolsko','Filipíny']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇺🇿',a:'Uzbekistán',d:['Maledivy','Indonésie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇻🇳',a:'Vietnam',d:['Jižní Korea','Myanmar']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇱',a:'Východní Timor',d:['Japonsko','Bangladéš']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇦',a:'Kanada',d:['Ekvádor','Nikaragua']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇺🇸',a:'USA',d:['Belize','Kanada']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇽',a:'Mexiko',d:['Salvador','Barbados']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇹',a:'Guatemala',d:['Jamajka','Kolumbie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇿',a:'Belize',d:['Uruguay','Paraguay']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇭🇳',a:'Honduras',d:['Bahamy','Peru']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇻',a:'Salvador',d:['Guatemala','Jamajka']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇮',a:'Nikaragua',d:['Chile','Kanada']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇷',a:'Kostarika',d:['Chile','Grenada']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇦',a:'Panama',d:['Bolívie','Svatý Vincenc a Grenadiny']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇺',a:'Kuba',d:['Venezuela','Uruguay']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇯🇲',a:'Jamajka',d:['Panama','Dominikánská republika']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇭🇹',a:'Haiti',d:['Svatý Vincenc a Grenadiny','Bahamy']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇩🇴',a:'Dominikánská republika',d:['Guatemala','Antigua a Barbuda']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇸',a:'Bahamy',d:['Guatemala','Paraguay']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇹',a:'Trinidad a Tobago',d:['Guyana','Surinam']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇧',a:'Barbados',d:['Kuba','Guatemala']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇩',a:'Grenada',d:['Guyana','Honduras']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇱🇨',a:'Svatá Lucie',d:['Jamajka','Belize']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇻🇨',a:'Svatý Vincenc a Grenadiny',d:['Belize','Trinidad a Tobago']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇳',a:'Svatý Kryštof a Nevis',d:['Peru','Nikaragua']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇬',a:'Antigua a Barbuda',d:['Trinidad a Tobago','Mexiko']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇩🇲',a:'Dominika',d:['Honduras','Kolumbie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇷',a:'Brazílie',d:['Surinam','Svatý Kryštof a Nevis']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇷',a:'Argentina',d:['Barbados','Dominikánská republika']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇱',a:'Chile',d:['Svatý Kryštof a Nevis','Trinidad a Tobago']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇪',a:'Peru',d:['Barbados','Chile']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇨🇴',a:'Kolumbie',d:['Kostarika','Svatý Vincenc a Grenadiny']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇻🇪',a:'Venezuela',d:['Bolívie','Svatý Kryštof a Nevis']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇪🇨',a:'Ekvádor',d:['Belize','Kanada']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇧🇴',a:'Bolívie',d:['Ekvádor','Salvador']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇾',a:'Paraguay',d:['Belize','Dominikánská republika']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇺🇾',a:'Uruguay',d:['Guyana','Barbados']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇬🇾',a:'Guyana',d:['Kostarika','Dominika']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇷',a:'Surinam',d:['Belize','Trinidad a Tobago']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇦🇺',a:'Austrálie',d:['Samoa','Vanuatu']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇿',a:'Nový Zéland',d:['Fidži','Tonga']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇬',a:'Papua Nová Guinea',d:['Mikronésie','Nauru']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇫🇯',a:'Fidži',d:['Vanuatu','Palau']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇸🇧',a:'Šalamounovy ostrovy',d:['Tuvalu','Marshallovy ostrovy']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇻🇺',a:'Vanuatu',d:['Mikronésie','Austrálie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇼🇸',a:'Samoa',d:['Marshallovy ostrovy','Mikronésie']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇰🇮',a:'Kiribati',d:['Šalamounovy ostrovy','Marshallovy ostrovy']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇴',a:'Tonga',d:['Nový Zéland','Papua Nová Guinea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇫🇲',a:'Mikronésie',d:['Šalamounovy ostrovy','Nový Zéland']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇵🇼',a:'Palau',d:['Nový Zéland','Nauru']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇲🇭',a:'Marshallovy ostrovy',d:['Tonga','Papua Nová Guinea']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇳🇷',a:'Nauru',d:['Šalamounovy ostrovy','Tuvalu']},
  {cat:'Vlajky států',q:'Které zemi patří tato vlajka? 🇹🇻',a:'Tuvalu',d:['Mikronésie','Fidži']},
];

let questions=[], qSeq=1, enabledCats=new Set(), editingId=null;
let MODE='local';   // 'local' | 'online'
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function norm(s){return (s||'').toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;}
function escapeHtml(s){return (s||'').toString().replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function hexPts(cx,cy,s){const A=[-90,-30,30,90,150,210];return A.map(a=>{const r=a*Math.PI/180;return `${(cx+s*Math.cos(r)).toFixed(2)},${(cy+s*Math.sin(r)).toFixed(2)}`;}).join(' ');}

const S=34,W=Math.sqrt(3)*S,ROWH=1.5*S,HS=S*0.82;
function computeVB(rows){
  const xs=[],ys=[];
  for(let r=0;r<rows;r++)for(let i=0;i<=r;i++){const cx=(i-r/2)*W,cy=r*ROWH;xs.push(cx-W/2,cx+W/2);ys.push(cy-S,cy+S);}
  const pad=10;return {x:Math.min(...xs)-pad,y:Math.min(...ys)-pad,w:Math.max(...xs)-Math.min(...xs)+2*pad,h:Math.max(...ys)-Math.min(...ys)+2*pad};
}
function neighbors(r,i,rows){return [[r,i-1],[r,i+1],[r-1,i-1],[r-1,i],[r+1,i],[r+1,i+1]].filter(([a,b])=>a>=0&&a<rows&&b>=0&&b<=a);}

/* questions */
function loadSeed(){questions=SEED_QUESTIONS.map(q=>({id:qSeq++,...q,d:q.d.slice()}));}
function allCats(){const s=new Set();questions.forEach(q=>s.add(q.cat));return [...s];}
function poolFor(cats){return questions.filter(q=>cats.has(q.cat));}

/* ============================================================
   LOGO + SETUP UI (local)
============================================================ */
let numPlayers=3;
function renderLogo(){
  const g=$('#logoHexes'),s=8;const cols=['var(--p1)','var(--p3)','var(--gold)','var(--fresh)','var(--p2)','var(--fresh)','var(--fresh)','var(--gold)','var(--fresh)','var(--fresh)'];
  let html='',k=0,ox=50,oy=14;
  for(let r=0;r<4;r++)for(let i=0;i<=r;i++){const cx=ox+(i-r/2)*(Math.sqrt(3)*s),cy=oy+r*1.5*s;const pts=hexPts(cx,cy,s);html+=`<polygon points="${pts}" fill="${cols[k%cols.length]}" stroke="#0c0f18" stroke-width="1.4"/><polygon points="${pts}" fill="url(#cellSheen)"/>`;k++;}
  g.innerHTML=html;
}
function renderPlayers(){
  const host=$('#players');host.innerHTML='';
  for(let i=0;i<numPlayers;i++){
    const prev=host._vals&&host._vals[i];
    const name=prev?.name??PLAYER_NAMES[i],col=prev?.color??PLAYER_COLORS[i];
    const row=document.createElement('div');row.className='prow';
    row.innerHTML=`<input type="color" value="${col}" aria-label="Barva ${i+1}"><span class="dot" style="background:${col}"></span><input type="text" value="${name}" aria-label="Jméno ${i+1}" maxlength="18">`;
    const colInp=row.querySelector('input[type=color]'),dot=row.querySelector('.dot');
    colInp.addEventListener('input',()=>dot.style.background=colInp.value);
    host.appendChild(row);
  }
}
function readPlayers(){return $$('#players .prow').map((row,i)=>({name:row.querySelector('input[type=text]').value.trim()||PLAYER_NAMES[i],color:row.querySelector('input[type=color]').value}));}
function stashPlayers(){$('#players')._vals=readPlayers();}

function renderCatChips(hostSel){
  const host=$(hostSel);host.innerHTML='';const cats=allCats();
  if(enabledCats.size===0)cats.forEach(c=>enabledCats.add(c));
  cats.forEach(c=>{
    const on=enabledCats.has(c),count=questions.filter(q=>q.cat===c).length;
    const chip=document.createElement('label');chip.className='chip';
    chip.innerHTML=`<input type="checkbox" ${on?'checked':''}><span>${escapeHtml(c)}</span><span class="tag">${count}</span>`;
    chip.querySelector('input').addEventListener('change',e=>{if(e.target.checked)enabledCats.add(c);else enabledCats.delete(c);updatePoolInfo();renderCatChips(hostSel);});
    host.appendChild(chip);
  });
  updatePoolInfo();
}
function updatePoolInfo(){
  const n=poolFor(enabledCats).length;
  const el=$('#poolInfo');if(el)el.textContent=enabledCats.size===0?'Vyber aspoň jednu kategorii.':`Ve hře: ${n} otázek z ${enabledCats.size} okruhů.`;
  const sb=$('#startBtn');if(sb)sb.disabled=n===0;
}
$$('.seg [data-np]').forEach(b=>b.addEventListener('click',()=>{stashPlayers();numPlayers=+b.dataset.np;$$('.seg [data-np]').forEach(x=>x.setAttribute('aria-pressed',x===b));renderPlayers();}));

/* screens */
function show(id){['setup','online','editor','game'].forEach(s=>$('#'+s).classList.toggle('hidden',s!==id));document.body.classList.toggle('wide',id==='game');window.scrollTo(0,0);}
function showOnlinePanel(p){['oHome','oJoin','oLobby'].forEach(x=>$('#'+x).classList.toggle('hidden',x!=='o'+p.charAt(0).toUpperCase()+p.slice(1)));}

/* ============================================================
   EDITOR
============================================================ */
function refreshCatOptions(){
  const opts=allCats();
  $('#catOptions').innerHTML=opts.map(c=>`<option value="${escapeHtml(c)}">`).join('');
  const fc=$('#filterCat'),cur=fc.value;
  fc.innerHTML='<option value="">Všechny kategorie</option>'+opts.map(c=>`<option ${c===cur?'selected':''}>${escapeHtml(c)}</option>`).join('');
}
function renderQList(){
  const filter=$('#filterCat').value,list=$('#qlist');list.innerHTML='';
  const items=questions.filter(q=>!filter||q.cat===filter);
  $('#qCount').textContent=`Celkem ${questions.length} otázek`;
  if(!items.length){list.innerHTML='<p class="hint">Zatím tu nic není.</p>';return;}
  items.forEach(q=>{
    const el=document.createElement('div');el.className='qitem';
    el.innerHTML=`<div style="flex:1"><div>${escapeHtml(q.q)}</div><div class="meta">✓ ${escapeHtml(q.a)} &nbsp;·&nbsp; ${escapeHtml(q.d.join(' / '))}</div></div><span class="tag">${escapeHtml(q.cat)}</span><span class="row"><button class="btn small ghost" data-edit="${q.id}" type="button">Upravit</button><button class="btn small danger" data-del="${q.id}" type="button">×</button></span>`;
    list.appendChild(el);
  });
  list.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>startEdit(+b.dataset.edit));
  list.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{questions=questions.filter(q=>q.id!==+b.dataset.del);afterQChange();});
}
function startEdit(id){const q=questions.find(x=>x.id===id);if(!q)return;editingId=id;$('#qCat').value=q.cat;$('#qText').value=q.q;$('#qCorrect').value=q.a;$('#qD1').value=q.d[0]||'';$('#qD2').value=q.d[1]||'';$('#saveQ').textContent='Uložit změny';$('#cancelEdit').classList.remove('hidden');$('#qCat').scrollIntoView({behavior:'smooth',block:'center'});}
function cancelEdit(){editingId=null;['#qCat','#qText','#qCorrect','#qD1','#qD2'].forEach(s=>$(s).value='');$('#saveQ').textContent='Uložit otázku';$('#cancelEdit').classList.add('hidden');}
function saveQ(){
  const cat=$('#qCat').value.trim(),q=$('#qText').value.trim(),a=$('#qCorrect').value.trim();
  const d=[$('#qD1').value.trim(),$('#qD2').value.trim()].filter(Boolean);
  if(!cat||!q||!a||d.length<2){alert('Vyplň kategorii, otázku, správnou odpověď a obě špatné možnosti.');return;}
  if(editingId){Object.assign(questions.find(x=>x.id===editingId),{cat,q,a,d});}else{questions.push({id:qSeq++,cat,q,a,d});}
  cancelEdit();afterQChange();
}
function afterQChange(){refreshCatOptions();renderQList();const cats=new Set(allCats());enabledCats=new Set([...enabledCats].filter(c=>cats.has(c)));saveQuestions();}
const LS_KEY='azkviz_questions';
function saveQuestions(){try{localStorage.setItem(LS_KEY,JSON.stringify(questions.map(({cat,q,a,d})=>({cat,q,a,d}))));}catch(e){}}
function loadSavedQuestions(){try{const raw=localStorage.getItem(LS_KEY);if(!raw)return false;const arr=JSON.parse(raw);if(!Array.isArray(arr)||!arr.length)return false;const clean=arr.filter(o=>o&&o.cat&&o.q&&o.a&&Array.isArray(o.d)&&o.d.length>=2).map(o=>({id:qSeq++,cat:String(o.cat),q:String(o.q),a:String(o.a),d:o.d.slice(0,2).map(String)}));if(!clean.length)return false;questions=clean;return true;}catch(e){return false;}}
function exportJSON(){$('#ioBox').value=JSON.stringify(questions.map(({cat,q,a,d})=>({cat,q,a,d})),null,2);}
function jsStr(s){return "'"+String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+"'";}
function exportCode(){
  const lines=questions.map(q=>`  {cat:${jsStr(q.cat)},q:${jsStr(q.q)},a:${jsStr(q.a)},d:[${q.d.map(jsStr).join(',')}]},`);
  $('#ioBox').value='// Vlož tento blok do script.js na konec pole SEED_QUESTIONS, před uzavírací ];\n'+lines.join('\n');
}
function importJSON(append){
  try{
    const arr=JSON.parse($('#ioBox').value);if(!Array.isArray(arr))throw 0;
    const clean=arr.filter(o=>o&&o.cat&&o.q&&o.a&&Array.isArray(o.d)&&o.d.length>=2).map(o=>({id:qSeq++,cat:String(o.cat),q:String(o.q),a:String(o.a),d:o.d.slice(0,2).map(String)}));
    if(!clean.length){alert('Žádné platné otázky. Zkontroluj formát JSON.');return;}
    if(append){questions=questions.concat(clean);clean.forEach(o=>enabledCats.add(o.cat));afterQChange();alert('Přidáno '+clean.length+' otázek.');}
    else{questions=clean;enabledCats=new Set();afterQChange();alert('Nahrazeno — '+clean.length+' otázek.');}
  }catch(e){alert('Nepodařilo se přečíst JSON.');}
}

/* ============================================================
   LOKÁLNÍ HRA
============================================================ */
let G=null,timerHandle=null;
function startGame(){
  const players=readPlayers(),rows=+$('#rows').value,timer=+$('#timerSel').value,pool=poolFor(enabledCats);
  if(!pool.length){alert('Vyber aspoň jednu kategorii s otázkami.');return;}
  const cells={};for(let r=0;r<rows;r++)for(let i=0;i<=r;i++)cells[r+','+i]={r,i,state:'fresh'};
  G={players,rows,timer,cells,current:0,over:false,pool,used:new Set(),busy:false};
  MODE='local';$('#gConn').classList.add('hidden');$('#skipBtn').classList.add('hidden');
  G.vb=computeVB(rows);show('game');$('#log').innerHTML='';
  logMsg(`Hra začíná — ${players.length} hráči, ${rows} řad.`);
  renderScores();renderBoard();renderTurn();
}
function cellColorL(c){if(c.state==='fresh')return 'var(--fresh)';if(c.state==='black')return 'var(--black)';return G.players[c.state].color;}
function isAvailL(c){return c.state==='fresh'||c.state==='black';}
function renderBoard(){
  const {x,y,w,h}=G.vb;let svg=`<svg class="board" viewBox="${x} ${y} ${w} ${h}" role="grid" aria-label="Hrací pole">`;
  for(const k in G.cells){const c=G.cells[k];const cx=(c.i-c.r/2)*W,cy=c.r*ROWH;const cls='hex'+(isAvailL(c)&&!G.over?' avail':'')+(c._sel?' sel':'')+(c._win?' win':'');const col=cellColorL(c);const pts=hexPts(cx,cy,HS);svg+=`<polygon class="${cls}" points="${pts}" fill="${col}" style="color:${col}" data-k="${k}" tabindex="${isAvailL(c)&&!G.over?0:-1}" role="gridcell"></polygon><polygon class="hexSheen" points="${pts}" tabindex="-1"></polygon>`;}
  svg+='</svg>';$('#boardHost').innerHTML=svg;
  $$('#boardHost .hex.avail').forEach(p=>{p.addEventListener('click',()=>onPick(p.dataset.k));p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onPick(p.dataset.k);}});});
}
function renderScores(){
  const host=$('#scores');host.innerHTML='';
  const counts=G.players.map((_,idx)=>Object.values(G.cells).filter(c=>c.state===idx).length);
  G.players.forEach((p,idx)=>{const el=document.createElement('div');el.className='score'+(idx===G.current&&!G.over?' active':'');el.innerHTML=`<span class="dot" style="background:${p.color}"></span><span>${escapeHtml(p.name)}</span><span class="n">${counts[idx]}</span>`;host.appendChild(el);});
}
function renderTurn(){const p=G.players[G.current];$('#turnDot').style.background=p.color;$('#turnName').textContent=p.name+' je na tahu';$('#turnMode').textContent='Vyber pole na trojúhelníku.';$('#game').classList.remove('waiting');$('.turn').classList.add('myturn');}
function logMsg(html){const l=$('#log');const d=document.createElement('div');d.innerHTML=html;l.prepend(d);}
function onPick(k){if(G.busy||G.over)return;const c=G.cells[k];if(!isAvailL(c))return;G.busy=true;c._sel=true;renderBoard();askQuestion(c);}
function pickQuestion(){let avail=G.pool.filter(q=>!G.used.has(q.id));if(!avail.length){G.used.clear();avail=G.pool.slice();}const q=avail[Math.random()*avail.length|0];G.used.add(q.id);return q;}
function askQuestion(cell){
  const q=pickQuestion(),mode=cell.state==='black'?'open':'choice',p=G.players[G.current];
  G.q={cell,q,mode,answered:false};
  $('#mCat').textContent=q.cat;$('#mMode').textContent=mode==='choice'?'Výběr ze 3':'Dobývání — bez nápovědy';
  $('#mDot').style.background=p.color;$('#mPlayer').textContent=p.name;$('#qtext').textContent=q.q;
  $('#mVerdict').classList.add('hidden');$('#mNext').classList.add('hidden');$('#mJudge').innerHTML='';$('#mWait').classList.add('hidden');
  const opts=$('#mOpts'),openBox=$('#mOpenBox');opts.innerHTML='';openBox.classList.add('hidden');opts.classList.add('hidden');
  if(mode==='choice'){opts.classList.remove('hidden');shuffle([q.a,...q.d]).forEach(txt=>{const b=document.createElement('button');b.className='opt';b.textContent=txt;b.type='button';b.onclick=()=>answerChoice(b,txt);opts.appendChild(b);});}
  else{openBox.classList.remove('hidden');$('#mOpenInput').value='';setTimeout(()=>$('#mOpenInput').focus(),50);}
  openModal();startTimer();
}
function startTimer(){clearInterval(timerHandle);const bar=$('#mTimerBar'),box=$('#mTimer');if(!G.timer){box.classList.add('hidden');return;}box.classList.remove('hidden');let left=G.timer;bar.style.transition='none';bar.style.width='100%';requestAnimationFrame(()=>{bar.style.transition='width 1s linear';bar.style.width=((left-1)/G.timer*100)+'%';});timerHandle=setInterval(()=>{left--;bar.style.width=(Math.max(left-1,0)/G.timer*100)+'%';if(left<=0){clearInterval(timerHandle);onTimeout();}},1000);}
function stopTimer(){clearInterval(timerHandle);}
function onTimeout(){if(G.q.answered)return;if(G.q.mode==='choice'){$$('#mOpts .opt').forEach(b=>{b.disabled=true;if(b.textContent===G.q.q.a)b.classList.add('correct');});resolve(false,'Čas vypršel.');}else{resolve(false,'Čas vypršel.');}}
function answerChoice(btn,txt){if(G.q.answered)return;stopTimer();const correct=txt===G.q.q.a;$$('#mOpts .opt').forEach(b=>{b.disabled=true;if(b.textContent===G.q.q.a)b.classList.add('correct');else if(b===btn)b.classList.add('wrong');});resolve(correct,correct?'Správně!':'Špatně — pole zčerná.');}
function submitOpen(){if(G.q.answered)return;const val=$('#mOpenInput').value;const correct=norm(val)!==''&&norm(val)===norm(G.q.q.a);stopTimer();$('#mOpenSubmit').disabled=true;$('#mOpenInput').disabled=true;resolve(correct,correct?'Správně!':'Nesouhlasí se správnou odpovědí.');}
function resolve(correct,msg){
  if(G.q.answered)return;G.q.answered=true;stopTimer();
  const cell=G.q.cell,p=G.current,pname=G.players[p].name;
  if(correct){cell.state=p;logMsg(`<b>${escapeHtml(pname)}</b> získává pole ✓`);}
  else{if(G.q.mode==='choice')cell.state='black';logMsg(`<b>${escapeHtml(pname)}</b> ${G.q.mode==='choice'?'chyboval — pole zčernalo':'nedobyl pole'}`);}
  const v=$('#mVerdict');v.classList.remove('hidden','ok','no');v.classList.add(correct?'ok':'no');
  let vt=msg;if(G.q.mode==='open')vt+=`  Správná odpověď: „${G.q.q.a}“.`;$('#mVerdictText').textContent=vt;
  const judge=$('#mJudge');judge.innerHTML='';
  if(!correct){const b=document.createElement('button');b.className='btn small';b.type='button';b.textContent='Uznat jako správně';b.onclick=overrideCorrect;judge.appendChild(b);}
  renderScores();renderBoard();
  if(correct){const wc=checkWinL(cell.r,cell.i,p);if(wc){markWinL(wc);finishThen(()=>endGame(p));return;}}
  $('#mNext').classList.remove('hidden');$('#mNext').focus();
}
function overrideCorrect(){const cell=G.q.cell,p=G.current;cell.state=p;const v=$('#mVerdict');v.classList.remove('no');v.classList.add('ok');$('#mVerdictText').textContent='Uznáno jako správně. Pole získáváš.';$('#mJudge').innerHTML='';logMsg(`<b>${escapeHtml(G.players[p].name)}</b> — pole uznáno ✓`);renderScores();renderBoard();const wc=checkWinL(cell.r,cell.i,p);if(wc){markWinL(wc);finishThen(()=>endGame(p));}}
function finishThen(fn){$('#mNext').classList.remove('hidden');G._afterNext=fn;}
function nextStep(){const after=G._afterNext;G._afterNext=null;Object.values(G.cells).forEach(c=>c._sel=false);closeModal();G.busy=false;if(after){after();return;}if(G.over)return;G.current=(G.current+1)%G.players.length;if(!Object.values(G.cells).some(isAvailL)){endGameFull();return;}renderScores();renderTurn();}
function checkWinL(r,i,p){
  const seen=new Set([r+','+i]),stack=[[r,i]],comp=[[r,i]];let L=false,R=false,B=false;
  while(stack.length){const [cr,ci]=stack.pop();if(ci===0)L=true;if(ci===cr)R=true;if(cr===G.rows-1)B=true;for(const [a,b] of neighbors(cr,ci,G.rows)){const key=a+','+b;if(seen.has(key))continue;if(G.cells[key].state===p){seen.add(key);stack.push([a,b]);comp.push([a,b]);}}}
  return (L&&R&&B)?comp:null;
}
function markWinL(comp){Object.values(G.cells).forEach(c=>c._win=false);comp.forEach(([r,i])=>G.cells[r+','+i]._win=true);renderBoard();}
function endGame(p){G.over=true;const name=G.players[p].name;$('#winTitle').textContent=name+' vyhrál!';$('#winSub').textContent='Spojil svojí barvou všechny tři strany trojúhelníku.';renderBoard();renderScores();$('#winBackdrop').classList.remove('hidden');logMsg(`🏆 <b>${escapeHtml(name)}</b> spojil tři strany a vyhrává!`);}
function endGameFull(){G.over=true;const counts=G.players.map((_,idx)=>Object.values(G.cells).filter(c=>c.state===idx).length);const max=Math.max(...counts);const winners=G.players.filter((_,i)=>counts[i]===max);if(winners.length===1){$('#winTitle').textContent=winners[0].name+' vyhrál na počet polí';$('#winSub').textContent=`Nikdo nespojil tři strany. Nejvíc polí: ${max}.`;}else{$('#winTitle').textContent='Remíza!';$('#winSub').textContent=`Shodně nejvíc polí (${max}): `+winners.map(w=>w.name).join(', ')+'.';}renderBoard();renderScores();$('#winBackdrop').classList.remove('hidden');}
function openModal(){$('#qBackdrop').classList.remove('hidden');}
function closeModal(){$('#qBackdrop').classList.add('hidden');$('#mOpenSubmit').disabled=false;$('#mOpenInput').disabled=false;}

/* ============================================================
   ONLINE HRA (Firebase Realtime Database)
============================================================ */
let db=null, fbReady=false;
let roomCode=null, roomRef=null, myCid=getCid(), isCreator=false;
let onlinePlayers=[], onlinePool=[], myIdx=-1, lastOverKey='';
let listeners=[];

function ensureFirebase(){
  if(fbReady)return true;
  if(typeof firebase==='undefined')return false;
  if(String(FIREBASE_CONFIG.apiKey||'').includes('PASTE')||!FIREBASE_CONFIG.databaseURL||String(FIREBASE_CONFIG.databaseURL).includes('PASTE'))return false;
  try{firebase.initializeApp(FIREBASE_CONFIG);db=firebase.database();fbReady=true;return true;}catch(e){console.error(e);return false;}
}
function getCid(){let id;try{id=localStorage.getItem('azkviz_cid');}catch(e){}if(!id){id='c'+Math.random().toString(36).slice(2,9);try{localStorage.setItem('azkviz_cid',id);}catch(e){}}return id;}
function genCode(){const A='ABCDEFGHJKMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<4;i++)s+=A[Math.random()*A.length|0];return s;}
function TS(){return firebase.database.ServerValue.TIMESTAMP;}

function openOnline(){
  MODE='online';show('online');
  if(!ensureFirebase()){$('#fbWarn').classList.remove('hidden');$('#oHome').classList.add('hidden');$('#oJoin').classList.add('hidden');$('#oLobby').classList.add('hidden');return;}
  $('#fbWarn').classList.add('hidden');
  const params=new URLSearchParams(location.search);const rc=(params.get('room')||'').toUpperCase();
  if(rc){$('#joinCode').textContent=rc;roomCode=rc;showOnlinePanel('join');}
  else{renderCatChips('#oCatChips');showOnlinePanel('home');}
}

function attach(ref,ev,cb){ref.on(ev,cb);listeners.push({ref,ev,cb});}
function detachAll(){listeners.forEach(l=>l.ref.off(l.ev,l.cb));listeners=[];}

function createRoom(){
  if(!ensureFirebase())return;
  const name=$('#oName').value.trim()||'Hráč',color=$('#oColor').value,rows=+$('#oRows').value;
  const pool=poolFor(enabledCats);
  if(!pool.length){alert('Vyber aspoň jednu kategorii s otázkami.');return;}
  const code=genCode();
  const ref=db.ref('rooms/'+code);
  ref.child('meta').transaction(m=>m?undefined:{status:'lobby',creator:myCid,rows,createdAt:TS(),pcount:0})
    .then(res=>{
      if(!res.committed){createRoom();return;}   // kolize kódu → zkus znovu
      roomCode=code;isCreator=true;
      enterRoom(code);
      addSelf(name,color);
    }).catch(e=>alert('Nepodařilo se vytvořit místnost: '+e));
}
function joinRoom(){
  if(!ensureFirebase())return;
  const name=$('#jName').value.trim()||'Hráč',color=$('#jColor').value,code=(roomCode||'').toUpperCase();
  if(!code){alert('Chybí kód místnosti.');return;}
  db.ref('rooms/'+code+'/meta').once('value').then(s=>{
    const meta=s.val();
    if(!meta){alert('Místnost '+code+' neexistuje.');return;}
    if(meta.status!=='lobby'){alert('Hra už běží — počkej na další zápas.');return;}
    isCreator=(meta.creator===myCid);
    enterRoom(code);addSelf(name,color);
  });
}
function addSelf(name,color){
  const ref=db.ref('rooms/'+roomCode);
  ref.child('meta/pcount').transaction(n=>(n||0)+1).then(res=>{
    const idx=(res.snapshot.val()||1)-1;
    const pref=ref.child('players/'+myCid);
    pref.set({name,color,idx,connected:true,joinedAt:TS()});
    pref.onDisconnect().update({connected:false});
  });
}
function enterRoom(code){
  roomRef=db.ref('rooms/'+code);
  showOnlinePanel('lobby');
  $('#lobbyCode').textContent=code;
  const link=location.origin+location.pathname+'?room='+code;
  $('#lobbyLink').value=link;
  $('#startRoom').classList.toggle('hidden',!isCreator);
  // presence
  const conn=db.ref('.info/connected');
  attach(conn,'value',s=>{
    const ok=s.val()===true;$('#connPill').classList.toggle('off',!ok);$('#gConn').classList.toggle('off',!ok);
    if(ok&&roomRef){const pref=roomRef.child('players/'+myCid);pref.child('connected').set(true);pref.onDisconnect().update({connected:false});}
  });
  attach(roomRef.child('players'),'value',onPlayers);
  attach(roomRef.child('pool'),'value',s=>{onlinePool=s.val()||[];});
  attach(roomRef.child('meta'),'value',s=>{const m=s.val();if(!m)return;if(m.status==='playing'&&$('#game').classList.contains('hidden')){enterOnlineGame();}});
  attach(roomRef.child('state'),'value',s=>onStateChange(s.val()));
}
function onPlayers(s){
  const val=s.val()||{};
  onlinePlayers=Object.entries(val).map(([cid,p])=>({cid,...p})).sort((a,b)=>a.idx-b.idx);
  const me=onlinePlayers.find(p=>p.cid===myCid);myIdx=me?me.idx:-1;
  // lobby list
  const host=$('#lobbyPlayers');if(host){host.innerHTML='';onlinePlayers.forEach(p=>{const el=document.createElement('div');el.className='prow';el.innerHTML=`<span class="dot" style="background:${p.color}"></span><span style="flex:1">${escapeHtml(p.name)}${p.cid===myCid?' <span class="hint">(ty)</span>':''}${p.cid===me?.cid&&isCreator?'':''}</span>${p.connected?'':'<span class="hint">odpojen</span>'}`;host.appendChild(el);});}
  const note=$('#lobbyNote');if(note)note.textContent=onlinePlayers.length<2?'Čeká se na další hráče (min. 2).':(isCreator?'Můžeš spustit hru.':'Čeká se, až zakladatel spustí hru.');
  const sr=$('#startRoom');if(sr)sr.disabled=onlinePlayers.length<2;
  if(!$('#game').classList.contains('hidden'))renderOScores(lastState);
}
function startRoom(){
  if(!isCreator||!roomRef)return;
  roomRef.child('players').once('value').then(s=>{
    const arr=Object.entries(s.val()||{}).map(([cid,p])=>({cid,...p})).sort((a,b)=>(a.joinedAt||0)-(b.joinedAt||0));
    if(arr.length<2){alert('Potřeba aspoň 2 hráči.');return;}
    const updates={};arr.forEach((p,i)=>updates['players/'+p.cid+'/idx']=i);
    const rows=(lastMeta&&lastMeta.rows)||+$('#oRows').value||9;
    const pool=poolFor(enabledCats).map(({id,cat,q,a,d})=>({id,cat,q,a,d}));
    const cells={};for(let r=0;r<rows;r++)for(let i=0;i<=r;i++)cells[r+'_'+i]=-1;
    updates['pool']=pool;
    updates['state']={rows,nplayers:arr.length,current:0,phase:'idle',q:null,reveal:null,winnerIdx:-1,tie:false,winCells:[],cells,usedIds:[]};
    updates['meta/status']='playing';updates['meta/rows']=rows;
    roomRef.update(updates);
  });
}
function leaveRoom(){
  if(roomRef){try{roomRef.child('players/'+myCid).remove();}catch(e){}}
  detachAll();roomRef=null;roomCode=null;isCreator=false;onlinePlayers=[];myIdx=-1;
  history.replaceState(null,'',location.pathname);
  show('online');openOnline();
}

let lastState=null,lastMeta=null;
function onStateChange(s){
  lastState=s;if(!s)return;
  if($('#game').classList.contains('hidden'))return; // ještě nejsme ve hře
  renderOBoard(s);renderOScores(s);renderOTurn(s);
  if(s.phase==='question'||s.phase==='reveal'){renderOModal(s);}else{if(!$('#qBackdrop').classList.contains('hidden'))closeModal();}
  if(s.phase==='over'){showOWin(s);}
}
function enterOnlineGame(){
  MODE='online';show('game');$('#gConn').classList.remove('hidden');$('#log').innerHTML='';
  if(lastState)onStateChange(lastState);
}
function pcolor(idx){const p=onlinePlayers.find(x=>x.idx===idx);return p?p.color:PLAYER_COLORS[idx%4];}
function pname(idx){const p=onlinePlayers.find(x=>x.idx===idx);return p?p.name:('Hráč '+(idx+1));}
function pconn(idx){const p=onlinePlayers.find(x=>x.idx===idx);return p?p.connected!==false:false;}

function renderOBoard(s){
  const rows=s.rows,{x,y,w,h}=computeVB(rows);
  const myTurn=s.current===myIdx&&s.phase==='idle'&&s.winnerIdx<0;
  const winSet=new Set(s.winCells||[]);
  let svg=`<svg class="board" viewBox="${x} ${y} ${w} ${h}" role="grid">`;
  for(const key in s.cells){
    const [r,i]=key.split('_').map(Number);const v=s.cells[key];const cx=(i-r/2)*W,cy=r*ROWH;
    const avail=(v===-1||v===-2);const col=v===-1?'var(--fresh)':v===-2?'var(--black)':pcolor(v);
    const sel=s.q&&s.q.cell===key&&s.phase!=='idle';
    const cls='hex'+(avail&&myTurn?' avail':'')+(sel?' sel':'')+(winSet.has(key)?' win':'');
    const pts=hexPts(cx,cy,HS);
    svg+=`<polygon class="${cls}" points="${pts}" fill="${col}" style="color:${col}" data-k="${key}" tabindex="${avail&&myTurn?0:-1}"></polygon><polygon class="hexSheen" points="${pts}" tabindex="-1"></polygon>`;
  }
  svg+='</svg>';$('#boardHost').innerHTML=svg;
  if(myTurn)$$('#boardHost .hex.avail').forEach(p=>{p.addEventListener('click',()=>onlinePick(p.dataset.k));p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onlinePick(p.dataset.k);}});});
}
function renderOScores(s){
  if(!s)return;const host=$('#scores');host.innerHTML='';
  const counts=[];for(let i=0;i<s.nplayers;i++)counts[i]=0;for(const k in s.cells){const v=s.cells[k];if(v>=0)counts[v]++;}
  for(let idx=0;idx<s.nplayers;idx++){const el=document.createElement('div');el.className='score'+(idx===s.current&&s.winnerIdx<0?' active':'')+(pconn(idx)?'':' off');el.innerHTML=`<span class="dot" style="background:${pcolor(idx)}"></span><span>${escapeHtml(pname(idx))}${idx===myIdx?' <span class="hint">(ty)</span>':''}</span><span class="n">${counts[idx]}</span>`;host.appendChild(el);}
}
function renderOTurn(s){
  $('#turnDot').style.background=pcolor(s.current);
  const mine=s.current===myIdx;
  $('#turnName').textContent=s.winnerIdx>=0?'Konec hry':(mine?'Jsi na tahu':(pname(s.current)+' je na tahu'));
  $('#turnMode').textContent=s.winnerIdx>=0?'':(mine?(s.phase==='idle'?'Vyber pole na trojúhelníku.':'Odpověz na otázku.'):'Sleduj, co soupeř zahraje.');
  const stuck=s.winnerIdx<0&&!pconn(s.current)&&s.current!==myIdx;
  $('#skipBtn').classList.toggle('hidden',!stuck);
  $('.turn').classList.toggle('myturn',mine&&s.winnerIdx<0);
  $('#game').classList.toggle('waiting',!mine&&s.winnerIdx<0);
  if(!mine&&s.winnerIdx<0)$('#waitLabel').textContent='Čekáš, až dohraje '+pname(s.current)+'…';
}
function renderOModal(s){
  const q=s.q;if(!q)return;const mine=s.current===myIdx;
  $('#mCat').textContent=q.cat;$('#mMode').textContent=q.mode==='choice'?'Výběr ze 3':'Dobývání — bez nápovědy';
  $('#mDot').style.background=pcolor(s.current);$('#mPlayer').textContent=pname(s.current);$('#qtext').textContent=q.prompt;
  $('#mTimer').classList.add('hidden');
  const opts=$('#mOpts'),openBox=$('#mOpenBox'),wait=$('#mWait'),verdict=$('#mVerdict'),next=$('#mNext'),judge=$('#mJudge');
  opts.innerHTML='';opts.classList.add('hidden');openBox.classList.add('hidden');wait.classList.add('hidden');verdict.classList.add('hidden','ok','no');next.classList.add('hidden');judge.innerHTML='';
  const rev=s.reveal;
  const correctText=(onlinePool.find(x=>x.id===q.qid)||{}).a||(rev&&rev.correctText)||'';

  if(q.mode==='choice'){
    opts.classList.remove('hidden');
    (q.options||[]).forEach(txt=>{
      const b=document.createElement('button');b.className='opt';b.textContent=txt;b.type='button';
      if(rev){b.disabled=true;if(txt===rev.correctText)b.classList.add('correct');else if(txt===rev.chosen&&!rev.ok)b.classList.add('wrong');}
      else if(mine&&s.phase==='question'){b.onclick=()=>onlineAnswer(txt);}
      else{b.disabled=true;b.classList.add('waitDisabled');}
      opts.appendChild(b);
    });
  }else{ // open
    if(!rev&&mine&&s.phase==='question'){openBox.classList.remove('hidden');$('#mOpenInput').disabled=false;$('#mOpenSubmit').disabled=false;$('#mOpenInput').value='';setTimeout(()=>$('#mOpenInput').focus(),50);}
    else if(!rev){wait.classList.remove('hidden');wait.textContent=pname(s.current)+' píše odpověď…';}
  }

  if(rev){
    verdict.classList.remove('hidden');verdict.classList.add(rev.ok?'ok':'no');
    let vt=rev.msg||'';if(q.mode==='open')vt+=`  Správná odpověď: „${rev.correctText||correctText}“.`;$('#mVerdictText').textContent=vt;
    const canAdvance=mine||!pconn(s.current);
    if(!rev.ok&&mine&&q.mode==='open'){const b=document.createElement('button');b.className='btn small';b.type='button';b.textContent='Uznat jako správně';b.onclick=onlineOverride;judge.appendChild(b);}
    if(canAdvance){next.classList.remove('hidden');}
    else{wait.classList.remove('hidden');wait.textContent='Čeká se, až '+pname(s.current)+' bude pokračovat…';}
  }
  openModal();
}

/* akce (transakce) */
function stateRef(){return roomRef.child('state');}
function onlinePick(key){
  if(!onlinePool.length)return;
  stateRef().transaction(s=>{
    if(!s||s.phase!=='idle'||s.current!==myIdx||s.winnerIdx>=0)return;
    const v=s.cells[key];if(v!==-1&&v!==-2)return;
    const used=new Set(s.usedIds||[]);
    let avail=onlinePool.filter(q=>!used.has(q.id));
    if(!avail.length){avail=onlinePool.slice();used.clear();}
    const q=avail[Math.random()*avail.length|0];
    const opts=shuffle([q.a,...q.d]);
    const mode=v===-2?'open':'choice';
    s.q={qid:q.id,cell:key,cat:q.cat,prompt:q.q,mode,options:mode==='choice'?opts:null,byIdx:myIdx};
    s.phase='question';s.reveal=null;
    used.add(q.id);s.usedIds=[...used];
    return s;
  });
}
function resolveInState(s,ok){
  const key=s.q.cell,p=s.current;
  if(ok){s.cells[key]=p;const win=checkWinO(s.cells,s.rows,p,key);if(win){s.winnerIdx=p;s.winCells=win;}}
  else{if(s.q.mode==='choice')s.cells[key]=-2;}
}
function onlineAnswer(txt){
  stateRef().transaction(s=>{
    if(!s||s.phase!=='question'||s.current!==myIdx)return;
    const correctText=(onlinePool.find(x=>x.id===s.q.qid)||{}).a;
    const ok=txt===correctText;
    resolveInState(s,ok);
    s.reveal={correctText,ok,chosen:txt,msg:ok?'Správně!':'Špatně — pole zčerná.'};
    s.phase='reveal';return s;
  });
}
function onlineSubmitOpen(){
  const val=$('#mOpenInput').value;
  stateRef().transaction(s=>{
    if(!s||s.phase!=='question'||s.current!==myIdx)return;
    const correctText=(onlinePool.find(x=>x.id===s.q.qid)||{}).a||'';
    const ok=norm(val)!==''&&norm(val)===norm(correctText);
    resolveInState(s,ok);
    s.reveal={correctText,ok,chosen:val,msg:ok?'Správně!':'Nesouhlasí se správnou odpovědí.'};
    s.phase='reveal';return s;
  });
}
function onlineOverride(){
  stateRef().transaction(s=>{
    if(!s||s.phase!=='reveal'||s.current!==myIdx||!s.reveal||s.reveal.ok)return;
    const key=s.q.cell,p=s.current;s.cells[key]=p;const win=checkWinO(s.cells,s.rows,p,key);if(win){s.winnerIdx=p;s.winCells=win;}
    s.reveal.ok=true;s.reveal.msg='Uznáno jako správně.';return s;
  });
}
function onlineNext(){advance(false);}
function forceSkip(){advance(true);}
function advance(force){
  stateRef().transaction(s=>{
    if(!s)return;
    const mine=s.current===myIdx,stuck=!pconn(s.current);
    if(!force&&!(mine||stuck))return;
    if(force&&!stuck)return;
    if(s.winnerIdx>=0){s.phase='over';return s;}
    s.q=null;s.reveal=null;s.phase='idle';
    s.current=(s.current+1)%s.nplayers;
    let avail=false;for(const k in s.cells){if(s.cells[k]===-1||s.cells[k]===-2){avail=true;break;}}
    if(!avail){
      const counts=[];for(let i=0;i<s.nplayers;i++)counts[i]=0;for(const k in s.cells){const v=s.cells[k];if(v>=0)counts[v]++;}
      const max=Math.max(...counts);const winners=[];counts.forEach((c,i)=>{if(c===max)winners.push(i);});
      if(winners.length===1){s.winnerIdx=winners[0];s.tie=false;}else{s.winnerIdx=-1;s.tie=true;s.tieList=winners;}
      s.phase='over';
    }
    return s;
  });
}
function checkWinO(cells,rows,p,startKey){
  const seen=new Set([startKey]),stack=[startKey],comp=[startKey];let L=false,R=false,B=false;
  while(stack.length){const key=stack.pop();const [r,i]=key.split('_').map(Number);if(i===0)L=true;if(i===r)R=true;if(r===rows-1)B=true;for(const [a,b] of neighbors(r,i,rows)){const nk=a+'_'+b;if(seen.has(nk))continue;if(cells[nk]===p){seen.add(nk);stack.push(nk);comp.push(nk);}}}
  return (L&&R&&B)?comp:null;
}
function showOWin(s){
  if(s.winCells&&s.winCells.length){/* board already shows win via renderOBoard */}
  if(lastOverKey===JSON.stringify([s.winnerIdx,s.tie]))return;lastOverKey=JSON.stringify([s.winnerIdx,s.tie]);
  closeModal();
  if(s.tie){$('#winTitle').textContent='Remíza!';$('#winSub').textContent='Došla volná pole. Shodně nejvíc polí: '+(s.tieList||[]).map(pname).join(', ')+'.';}
  else{const w=s.winnerIdx;$('#winTitle').textContent=pname(w)+(s.winCells&&s.winCells.length?' vyhrál!':' vyhrál na počet polí');$('#winSub').textContent=s.winCells&&s.winCells.length?'Spojil všechny tři strany trojúhelníku.':'Nikdo nespojil tři strany, rozhodl počet polí.';}
  $('#winBackdrop').classList.remove('hidden');
}
function onlinePlayAgain(){
  // zakladatel restartuje do lobby
  $('#winBackdrop').classList.add('hidden');
  if(isCreator&&roomRef){roomRef.child('meta/status').set('lobby');roomRef.child('state').remove();show('online');showOnlinePanel('lobby');}
  else{show('online');showOnlinePanel('lobby');}
  lastOverKey='';
}

/* ============================================================
   Události / routing modalů (podle MODE)
============================================================ */
$('#modeLocal').onclick=()=>{startBtnFocus();};
function startBtnFocus(){document.getElementById('startBtn').scrollIntoView({behavior:'smooth',block:'center'});}
$('#modeOnline').onclick=openOnline;
$('#onlineBack').onclick=()=>{detachAll();show('setup');};
$('#openEditor').onclick=()=>{refreshCatOptions();renderQList();show('editor');};
$('#oEditor').onclick=()=>{refreshCatOptions();renderQList();show('editor');};
$('#startBtn').onclick=startGame;
$('#rulesBtn').onclick=()=>$('#rulesBackdrop').classList.remove('hidden');
$('#rulesClose').onclick=()=>$('#rulesBackdrop').classList.add('hidden');
$('#gRules').onclick=()=>$('#rulesBackdrop').classList.remove('hidden');

$('#createRoom').onclick=createRoom;
$('#joinRoomBtn').onclick=joinRoom;
$('#startRoom').onclick=startRoom;
$('#leaveRoom').onclick=leaveRoom;
$('#skipBtn').onclick=forceSkip;
$('#copyLink').onclick=async()=>{try{await navigator.clipboard.writeText($('#lobbyLink').value);$('#copyLink').textContent='Zkopírováno ✓';setTimeout(()=>$('#copyLink').textContent='Kopírovat',1200);}catch(e){$('#lobbyLink').select();}};

$('#closeEditor').onclick=()=>{renderCatChips(MODE==='online'?'#oCatChips':'#catChips');show(MODE==='online'?'online':'setup');if(MODE==='online')showOnlinePanel(roomRef?'lobby':(new URLSearchParams(location.search).get('room')?'join':'home'));};
$('#saveQ').onclick=saveQ;$('#cancelEdit').onclick=cancelEdit;$('#filterCat').onchange=renderQList;
$('#exportBtn').onclick=exportJSON;
$('#exportCodeBtn').onclick=exportCode;
$('#copyBtn').onclick=async()=>{exportJSON();try{await navigator.clipboard.writeText($('#ioBox').value);$('#copyBtn').textContent='Zkopírováno ✓';setTimeout(()=>$('#copyBtn').textContent='Kopírovat',1200);}catch(e){$('#ioBox').select();}};
$('#importBtn').onclick=()=>importJSON(false);
$('#appendBtn').onclick=()=>importJSON(true);
$('#resetBtn').onclick=()=>{if(confirm('Nahradit všechny otázky ukázkovými sadami? Smaže i uložené vlastní otázky v tomto prohlížeči.')){try{localStorage.removeItem(LS_KEY);}catch(e){}loadSeed();enabledCats=new Set();afterQChange();}};

$('#gLeave').onclick=()=>{if(MODE==='online'){$('#winBackdrop').classList.add('hidden');leaveRoom();}else{$('#winBackdrop').classList.add('hidden');show('setup');renderCatChips('#catChips');}};
$('#winAgain').onclick=()=>{if(MODE==='online'){onlinePlayAgain();}else{$('#winBackdrop').classList.add('hidden');startGame();}};
$('#winSetup').onclick=()=>{$('#winBackdrop').classList.add('hidden');if(MODE==='online'){leaveRoom();}else{show('setup');renderCatChips('#catChips');}};

/* modal shared buttons dispatch by MODE */
$('#mNext').onclick=()=>{MODE==='online'?onlineNext():nextStep();};
$('#mOpenSubmit').onclick=()=>{MODE==='online'?onlineSubmitOpen():submitOpen();};
$('#mOpenReveal').onclick=()=>{if(MODE==='online'){/* v online mode odhalí = odpovím prázdně (špatně) */ if(lastState&&lastState.current===myIdx){onlineSubmitOpen();}}else{if(G&&G.q&&!G.q.answered){stopTimer();resolve(false,'Odpověď odhalena.');}}};
$('#mOpenInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();MODE==='online'?onlineSubmitOpen():(!G.q.answered?submitOpen():(!$('#mNext').classList.contains('hidden')&&nextStep()));}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#rulesBackdrop').classList.add('hidden');});

/* ============================================================
   Init
============================================================ */
loadSeed();loadSavedQuestions();renderLogo();
$$('.seg [data-np]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.np===numPlayers));
renderPlayers();renderCatChips('#catChips');refreshCatOptions();
// deep link → rovnou online join
if(new URLSearchParams(location.search).get('room')){openOnline();}
