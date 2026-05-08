export type Movie = {
  id: string;
  title: string;
  year: number;
  director: string;
  topic: string;
  poster: string; // gradient classes (fallback)
  posterUrl?: string; // real image URL
  short: string;
  long: string;
  imdb?: string;
};

export type Game = {
  id: string;
  title: string;
  platform: string;
  topic: string;
  poster: string;
  posterUrl?: string;
  short: string;
  long: string;
  url?: string;
};

export const PHYSICS_MOVIES: Movie[] = [
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    topic: "النسبية العامة، الثقوب السوداء، تمدّد الزمن",
    poster: "from-indigo-900 via-purple-800 to-black",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    short: "رحلة عبر الثقب الدودي لإنقاذ البشرية.",
    long: "فيلم خيال علمي اعتمد فيه نولان على المختص في النسبية كيب ثورن. يستعرض تأثير الجاذبية القوية على الزمن قرب الثقب الأسود (Gargantua)، وفكرة الثقب الدودي (Wormhole) كاختصار في الزمكان، ومفارقة الجد، والأبعاد الإضافية.",
    imdb: "tt0816692",
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    topic: "الفيزياء النووية، مشروع مانهاتن",
    poster: "from-amber-700 via-red-800 to-black",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
    short: "قصة أبو القنبلة الذرية ج. روبرت أوبنهايمر.",
    long: "سيرة العالم أوبنهايمر وقيادته لمشروع مانهاتن (1942–1945). يتناول الفيلم الانشطار النووي، تفاعل سلسلي لليورانيوم/البلوتونيوم، تجربة Trinity، والتداعيات الأخلاقية للأسلحة النووية.",
    imdb: "tt15398776",
  },
  {
    id: "the-theory-of-everything",
    title: "The Theory of Everything",
    year: 2014,
    director: "James Marsh",
    topic: "الكوسمولوجيا، الثقوب السوداء",
    poster: "from-sky-700 via-blue-900 to-indigo-950",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/c/c5/Theory_of_Everything_%282014_film%29_poster.jpg",
    short: "حياة ستيفن هوكينغ.",
    long: "سيرة ستيفن هوكينغ من أيامه في كامبريدج إلى اكتشاف إشعاع هوكينغ، وعلاقته بـ ALS، ومحاولته توحيد النسبية وميكانيكا الكمّ.",
    imdb: "tt2980516",
  },
  {
    id: "a-beautiful-mind",
    title: "A Beautiful Mind",
    year: 2001,
    director: "Ron Howard",
    topic: "الرياضيات، نظرية الألعاب",
    poster: "from-emerald-800 via-teal-900 to-slate-900",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/2/24/A_Beautiful_Mind_Poster.jpg",
    short: "قصة الرياضي جون ناش.",
    long: "سيرة الحاصل على نوبل في الاقتصاد جون ناش، مكتشف توازن ناش، وصراعه مع الفصام.",
    imdb: "tt0268978",
  },
  {
    id: "hidden-figures",
    title: "Hidden Figures",
    year: 2016,
    director: "Theodore Melfi",
    topic: "الميكانيك المداري، ناسا",
    poster: "from-orange-600 via-rose-700 to-purple-900",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/4/4d/Hidden_Figures.jpg",
    short: "العقول النسائية خلف ناسا.",
    long: "ثلاث عالمات حسابيات من ناسا أسهمن في إطلاق رحلة جون غلين المدارية عام 1962، عبر حسابات مدارية دقيقة.",
    imdb: "tt4846340",
  },
  {
    id: "the-martian",
    title: "The Martian",
    year: 2015,
    director: "Ridley Scott",
    topic: "علم الفلك، البقاء الفيزيائي",
    poster: "from-red-700 via-orange-800 to-stone-900",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/c/cd/The_Martian_film_poster.jpg",
    short: "البقاء على المريخ.",
    long: "رائد فضاء يعلق على المريخ ويستخدم الفيزياء والكيمياء (الديناميكا الحرارية، إنتاج الماء والأكسجين) للبقاء حتى الإنقاذ.",
    imdb: "tt3659388",
  },
  {
    id: "contact",
    title: "Contact",
    year: 1997,
    director: "Robert Zemeckis",
    topic: "علم الفلك الراديوي، SETI",
    poster: "from-violet-800 via-fuchsia-900 to-black",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/4/44/Contact_ver2.jpg",
    short: "البحث عن إشارة من الفضاء.",
    long: "عالمة فيزياء فلكية تكشف رسالة فضائية تحوي مخططات لآلة سفر بين النجوم. مقتبس من رواية كارل ساغان.",
    imdb: "tt0118884",
  },
  {
    id: "tenet",
    title: "Tenet",
    year: 2020,
    director: "Christopher Nolan",
    topic: "الإنتروبيا، انعكاس الزمن",
    poster: "from-slate-700 via-zinc-900 to-black",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
    short: "حرب باردة عبر الزمن.",
    long: "يستكشف الفيلم انعكاس الإنتروبيا (Time Inversion) ومفهوم اتجاه الزمن في الديناميكا الحرارية.",
    imdb: "tt6723592",
  },
];

export const PHYSICS_GAMES: Game[] = [
  {
    id: "kerbal",
    title: "Kerbal Space Program",
    platform: "PC / Console",
    topic: "ميكانيكا مدارية، صواريخ",
    poster: "from-green-700 via-teal-800 to-slate-900",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/0/04/Kerbal_Space_Program_cover.jpg",
    short: "ابنِ صاروخك واغزُ الفضاء.",
    long: "محاكاة فيزيائية واقعية لبناء صواريخ وحساب المدارات (مناورات هوهمان، Δv، الاحتراق المداري). أداة تعليمية حقيقية لميكانيكا الفضاء.",
    url: "https://www.kerbalspaceprogram.com/",
  },
  {
    id: "portal",
    title: "Portal 2",
    platform: "PC / Console",
    topic: "حركة بالقصور الذاتي",
    poster: "from-orange-500 via-amber-700 to-blue-900",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/f/f9/Portal2cover.jpg",
    short: "بوابات تتحدّى الفيزياء.",
    long: "ألغاز قائمة على حفظ الزخم: «Speedy thing goes in, speedy thing comes out». مدخل ممتع لمفهوم انحفاظ الطاقة الحركية.",
  },
  {
    id: "universe-sandbox",
    title: "Universe Sandbox",
    platform: "PC",
    topic: "جاذبية، فلك",
    poster: "from-indigo-700 via-purple-900 to-black",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/3/3c/Universe_Sandbox_2_cover_art.jpg",
    short: "محاكي الكون بين يديك.",
    long: "حرّك الكواكب، صادم النجوم، اضبط ثابت الجاذبية، شاهد إشعاع النجوم وتمدد الكون. أداة فلك محاكاتية ممتازة.",
    url: "https://universesandbox.com/",
  },
  {
    id: "talos",
    title: "The Talos Principle",
    platform: "PC / Console",
    topic: "ألغاز فيزيائية فلسفية",
    poster: "from-yellow-600 via-orange-800 to-stone-900",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/4/47/The_Talos_Principle_cover.jpg",
    short: "ألغاز ليزر وأبواب طاقة.",
    long: "ألغاز قائمة على شعاع الليزر، انعكاس وتغذية بصرية، مع طبقات فلسفية حول الوعي والذكاء الاصطناعي.",
  },
  {
    id: "world-of-goo",
    title: "World of Goo",
    platform: "PC / Mobile",
    topic: "بنية، شد وضغط",
    poster: "from-lime-600 via-emerald-800 to-slate-900",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/5/52/World_of_Goo_cover.jpg",
    short: "ابنِ جسوراً بقطرات Goo.",
    long: "لعبة فيزيائية كلاسيكية تُعلّم مبادئ التوازن، مركز الكتلة، الشد والضغط في الإنشاءات.",
  },
  {
    id: "factorio",
    title: "Factorio",
    platform: "PC",
    topic: "هندسة، طاقة، حرارة",
    poster: "from-red-700 via-orange-900 to-black",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/9/90/Factorio_cover.png",
    short: "ابنِ مصنعاً صناعياً بأكمله.",
    long: "محاكاة لخطوط إنتاج، توليد الطاقة (بخار/شمسي/نووي)، إدارة الحرارة، التبريد، والكفاءة الطاقوية.",
    url: "https://www.factorio.com/",
  },
];
