
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
  {cat:'Auta & Tesla',q:'Na voze které značky byl postaven první Tesla Roadster?',a:'Lotus',d:['Porsche','Mazda']},
  {cat:'Auta & Tesla',q:'Co znamená zkratka SOH u baterie?',a:'State of Health',d:['Speed of Heat','Standard Output Hz']},
  {cat:'Auta & Tesla',q:'Jaký konektor pro rychlonabíjení používá Tesla v Evropě od Modelu 3?',a:'CCS Combo 2',d:['CHAdeMO','Type 1']},
  {cat:'Auta & Tesla',q:'V jaké jednotce se udává kapacita trakční baterie?',a:'kWh',d:['kW','Volt']},
  {cat:'Auta & Tesla',q:'Kdo je od roku 2008 generálním ředitelem Tesly?',a:'Elon Musk',d:['JB Straubel','Martin Eberhard']},
  {cat:'Auta & Tesla',q:'Jak se jmenuje asistenční systém řízení od Tesly?',a:'Autopilot',d:['CoPilot','DriveMate']},
  {cat:'Technika & programování',q:'Kdo je autorem jazyka Python?',a:'Guido van Rossum',d:['Linus Torvalds','James Gosling']},
  {cat:'Technika & programování',q:'Kterým příkazem vytvoříš v Gitu novou větev?',a:'git branch',d:['git new','git fork']},
  {cat:'Technika & programování',q:'Značkovací jazyk pro strukturu webových stránek?',a:'HTML',d:['CSS','HTTP']},
  {cat:'Technika & programování',q:'Odlehčený datový formát běžný v API?',a:'JSON',d:['JPEG','JAR']},
  {cat:'Technika & programování',q:'Nástroj v Excelu pro načítání a transformaci dat (ETL)?',a:'Power Query',d:['Power Pivot','Power BI']},
  {cat:'Technika & programování',q:'Co znamená HTTP status 404?',a:'Stránka nenalezena',d:['Přístup odepřen','Chyba serveru']},
  {cat:'Všeobecné',q:'Hlavní město Česka?',a:'Praha',d:['Brno','Ostrava']},
  {cat:'Všeobecné',q:'Kolik má Česko krajů (včetně Prahy)?',a:'14',d:['13','8']},
  {cat:'Všeobecné',q:'Nejdelší řeka, která protéká celá jen Českem?',a:'Vltava',d:['Labe','Morava']},
  {cat:'Všeobecné',q:'Kdo napsal Osudy dobrého vojáka Švejka?',a:'Jaroslav Hašek',d:['Karel Čapek','Bohumil Hrabal']},
  {cat:'Všeobecné',q:'Z díla kterého českého autora pochází slovo „robot“?',a:'Karel Čapek',d:['Jules Verne','Isaac Asimov']},
  {cat:'Všeobecné',q:'Jaká je měna v Česku?',a:'Koruna česká',d:['Euro','Zlotý']},

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
];

let questions=[], qSeq=1, enabledCats=new Set(), editingId=null;
let MODE='local';   // 'local' | 'online'
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function norm(s){return (s||'').toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;}
function escapeHtml(s){return (s||'').toString().replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function hexPts(cx,cy,s){const A=[-90,-30,30,90,150,210];return A.map(a=>{const r=a*Math.PI/180;return `${(cx+s*Math.cos(r)).toFixed(2)},${(cy+s*Math.sin(r)).toFixed(2)}`;}).join(' ');}

const S=34,W=Math.sqrt(3)*S,ROWH=1.5*S;
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
  for(let r=0;r<4;r++)for(let i=0;i<=r;i++){const cx=ox+(i-r/2)*(Math.sqrt(3)*s),cy=oy+r*1.5*s;html+=`<polygon points="${hexPts(cx,cy,s)}" fill="${cols[k%cols.length]}" stroke="#0c0f18" stroke-width="1.4"/>`;k++;}
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
  for(const k in G.cells){const c=G.cells[k];const cx=(c.i-c.r/2)*W,cy=c.r*ROWH;const cls='hex'+(isAvailL(c)&&!G.over?' avail':'')+(c._sel?' sel':'')+(c._win?' win':'');const col=cellColorL(c);svg+=`<polygon class="${cls}" points="${hexPts(cx,cy,S)}" fill="${col}" style="color:${col}" data-k="${k}" tabindex="${isAvailL(c)&&!G.over?0:-1}" role="gridcell"></polygon>`;}
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
    updates['state']={rows,nplayers:arr.length,current:0,phase:'idle',q:null,reveal:null,winnerIdx:-1,tie:false,winCells:[],cells};
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
    svg+=`<polygon class="${cls}" points="${hexPts(cx,cy,S)}" fill="${col}" style="color:${col}" data-k="${key}" tabindex="${avail&&myTurn?0:-1}"></polygon>`;
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
      else{b.disabled=true;}
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
  const q=onlinePool[Math.random()*onlinePool.length|0];if(!q)return;
  const opts=shuffle([q.a,...q.d]);
  stateRef().transaction(s=>{
    if(!s||s.phase!=='idle'||s.current!==myIdx||s.winnerIdx>=0)return;
    const v=s.cells[key];if(v!==-1&&v!==-2)return;
    const mode=v===-2?'open':'choice';
    s.q={qid:q.id,cell:key,cat:q.cat,prompt:q.q,mode,options:mode==='choice'?opts:null,byIdx:myIdx};
    s.phase='question';s.reveal=null;return s;
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
