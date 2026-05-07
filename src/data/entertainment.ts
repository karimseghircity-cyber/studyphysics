export type Movie = {
  id: string;
  title: string;
  year: number;
  director: string;
  topic: string;
  poster: string; // gradient classes
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
    short: "حياة ستيفن هوكينغ.",
    long: "سيرة ستيفن هوكينغ من أيامه في كامبريدج إلى اكتشاف إشعاع هوكينغ، وعلاقته بـ ALS، ومحاولته توحيد النسبية وميكانيكا الكمّ.",
  },
  {
    id: "a-beautiful-mind",
    title: "A Beautiful Mind",
    year: 2001,
    director: "Ron Howard",
    topic: "الرياضيات، نظرية الألعاب",
    poster: "from-emerald-800 via-teal-900 to-slate-900",
    short: "قصة الرياضي جون ناش.",
    long: "سيرة الحاصل على نوبل في الاقتصاد جون ناش، مكتشف توازن ناش، وصراعه مع الفصام.",
  },
  {
    id: "hidden-figures",
    title: "Hidden Figures",
    year: 2016,
    director: "Theodore Melfi",
    topic: "الميكانيك المداري، ناسا",
    poster: "from-orange-600 via-rose-700 to-purple-900",
    short: "العقول النسائية خلف ناسا.",
    long: "ثلاث عالمات حسابيات من ناسا أسهمن في إطلاق رحلة جون غلين المدارية عام 1962، عبر حسابات مدارية دقيقة.",
  },
  {
    id: "the-martian",
    title: "The Martian",
    year: 2015,
    director: "Ridley Scott",
    topic: "علم الفلك، البقاء الفيزيائي",
    poster: "from-red-700 via-orange-800 to-stone-900",
    short: "البقاء على المريخ.",
    long: "رائد فضاء يعلق على المريخ ويستخدم الفيزياء والكيمياء (الديناميكا الحرارية، إنتاج الماء والأكسجين) للبقاء حتى الإنقاذ.",
  },
  {
    id: "contact",
    title: "Contact",
    year: 1997,
    director: "Robert Zemeckis",
    topic: "علم الفلك الراديوي، SETI",
    poster: "from-violet-800 via-fuchsia-900 to-black",
    short: "البحث عن إشارة من الفضاء.",
    long: "عالمة فيزياء فلكية تكشف رسالة فضائية تحوي مخططات لآلة سفر بين النجوم. مقتبس من رواية كارل ساغان.",
  },
  {
    id: "tenet",
    title: "Tenet",
    year: 2020,
    director: "Christopher Nolan",
    topic: "الإنتروبيا، انعكاس الزمن",
    poster: "from-slate-700 via-zinc-900 to-black",
    short: "حرب باردة عبر الزمن.",
    long: "يستكشف الفيلم انعكاس الإنتروبيا (Time Inversion) ومفهوم اتجاه الزمن في الديناميكا الحرارية.",
  },
];

export const PHYSICS_GAMES: Game[] = [
  {
    id: "kerbal",
    title: "Kerbal Space Program",
    platform: "PC / Console",
    topic: "ميكانيكا مدارية، صواريخ",
    poster: "from-green-700 via-teal-800 to-slate-900",
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
    short: "بوابات تتحدّى الفيزياء.",
    long: "ألغاز قائمة على حفظ الزخم: «Speedy thing goes in, speedy thing comes out». مدخل ممتع لمفهوم انحفاظ الطاقة الحركية.",
  },
  {
    id: "universe-sandbox",
    title: "Universe Sandbox",
    platform: "PC",
    topic: "جاذبية، فلك",
    poster: "from-indigo-700 via-purple-900 to-black",
    short: "محاكي الكون بين يديك.",
    long: "حرّك الكواكب، صادم النجوم، اضبط ثابت الجاذبية، شاهد إشعاع النجوم وتمدد الكون. أداة فلك محاكاتية ممتازة.",
    url: "https://universesandbox.com/",
  },
  {
    id: "human-resource",
    title: "The Talos Principle",
    platform: "PC / Console",
    topic: "ألغاز فيزيائية فلسفية",
    poster: "from-yellow-600 via-orange-800 to-stone-900",
    short: "ألغاز ليزر وأبواب طاقة.",
    long: "ألغاز قائمة على شعاع الليزر، انعكاس وتغذية بصرية، مع طبقات فلسفية حول الوعي والذكاء الاصطناعي.",
  },
  {
    id: "world-of-goo",
    title: "World of Goo",
    platform: "PC / Mobile",
    topic: "بنية، شد وضغط",
    poster: "from-lime-600 via-emerald-800 to-slate-900",
    short: "ابنِ جسوراً بقطرات Goo.",
    long: "لعبة فيزيائية كلاسيكية تُعلّم مبادئ التوازن، مركز الكتلة، الشد والضغط في الإنشاءات.",
  },
  {
    id: "factorio",
    title: "Factorio",
    platform: "PC",
    topic: "هندسة، طاقة، حرارة",
    poster: "from-red-700 via-orange-900 to-black",
    short: "ابنِ مصنعاً صناعياً بأكمله.",
    long: "محاكاة لخطوط إنتاج، توليد الطاقة (بخار/شمسي/نووي)، إدارة الحرارة، التبريد، والكفاءة الطاقوية.",
    url: "https://www.factorio.com/",
  },
];
