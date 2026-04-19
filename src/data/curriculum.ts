// Central data for the physics platform.
// Easy to extend later by adding entries to the arrays below.

export type Resource = {
  title: string;
  description?: string;
  url?: string;
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  resources?: Resource[];
};

export type YearLevel = {
  id: string;
  title: string;
  subtitle: string;
  units: Unit[];
};

export type Stage = {
  id: "moyen" | "secondaire";
  title: string;
  subtitle: string;
  description: string;
  years: YearLevel[];
};

// ---- 3ème année secondaire (terminale) units ----
const terminaleUnits: Unit[] = [
  {
    id: "u1",
    title: "الوحدة 01: المتابعة الزمنية لتحول كيميائي",
    description: "التحولات السريعة والبطيئة، تتبع التقدم بالتحليل اللوني والمعايرة وقياس الناقلية.",
  },
  {
    id: "u2",
    title: "الوحدة 02: دراسة ظواهر كهربائية (الكهرباء)",
    description: "ثنائي القطب RC، RL، RLC: الاستجابة الزمنية والذبذبات الكهربائية الحرة.",
  },
  {
    id: "u3",
    title: "الوحدة 03: تطور جملة ميكانيكية (الميكانيك)",
    description: "قوانين نيوتن، السقوط الحر، الحركات في حقل الجاذبية والحقل الكهربائي.",
  },
  {
    id: "u4",
    title: "الوحدة 04: تطور جملة كيميائية نحو حالة التوازن (الأحماض والأسس)",
    description: "التفاعلات الحمضية القاعدية، ثوابت الحموضة، pH والمحاليل المنظمة.",
  },
  {
    id: "u5",
    title: "الوحدة 05: دراسة التحولات النووية",
    description: "الإشعاعية الطبيعية والاصطناعية، الانشطار والاندماج، طاقة الربط.",
  },
  {
    id: "u6",
    title: "الوحدة 06: مراقبة تطور جملة كيميائية (تفاعلات الاسترة)",
    description: "تفاعلات الاسترة والحلمأة، مردود التفاعل والحفز.",
  },
  {
    id: "u7",
    title: "الوحدة 07: تطور جملة مهتزة (الاهتزازات و الموجات)",
    description: "النواس المرن، النواس الموازين، الاهتزازات الحرة والقسرية، الرنين.",
  },
];

// Simple chapter list factories for other levels
const genericChapters = (label: string): Unit[] => [
  { id: "ch1", title: `${label} — المجال الميكانيكي`, description: "مفاهيم الحركة، القوى، والطاقة." },
  { id: "ch2", title: `${label} — المجال الكهربائي`, description: "الدارات الكهربائية والقوانين الأساسية." },
  { id: "ch3", title: `${label} — المجال الموجي والضوئي`, description: "الموجات، الصوت والظواهر الضوئية." },
  { id: "ch4", title: `${label} — المجال المادي والكيميائي`, description: "بنية المادة والتحولات الكيميائية." },
];

export const stages: Stage[] = [
  {
    id: "moyen",
    title: "التعليم المتوسط",
    subtitle: "BEM",
    description: "دروس الفيزياء لجميع سنوات التعليم المتوسط.",
    years: [
      { id: "1am", title: "الأولى متوسط", subtitle: "1AM", units: genericChapters("1 متوسط") },
      { id: "2am", title: "الثانية متوسط", subtitle: "2AM", units: genericChapters("2 متوسط") },
      { id: "3am", title: "الثالثة متوسط", subtitle: "3AM", units: genericChapters("3 متوسط") },
      { id: "4am", title: "الرابعة متوسط", subtitle: "4AM — BEM", units: genericChapters("4 متوسط") },
    ],
  },
  {
    id: "secondaire",
    title: "التعليم الثانوي",
    subtitle: "BAC",
    description: "دروس الفيزياء لجميع سنوات التعليم الثانوي.",
    years: [
      { id: "1as", title: "الأولى ثانوي", subtitle: "1AS", units: genericChapters("1 ثانوي") },
      { id: "2as", title: "الثانية ثانوي", subtitle: "2AS", units: genericChapters("2 ثانوي") },
      { id: "3as", title: "الثالثة ثانوي", subtitle: "3AS — BAC", units: terminaleUnits },
    ],
  },
];

export const getStage = (id: string) => stages.find((s) => s.id === id);
export const getYear = (stageId: string, yearId: string) =>
  getStage(stageId)?.years.find((y) => y.id === yearId);
