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

// Helper to build units with simple ids
const u = (title: string, description = ""): Unit => ({
  id: title.replace(/\s+/g, "-").slice(0, 40),
  title,
  description,
});

// ---- Middle school (متوسط) ----
const units1AM: Unit[] = [
  u("ميدان الظواهر الكهربائية", "الدارات الكهربائية البسيطة وقوانينها."),
  u("ميدان المادة وتحولاتها", "حالات المادة وتحولاتها الفيزيائية والكيميائية."),
  u("ميدان الظواهر الضوئية والفلكية", "الضوء، الرؤية، والظواهر الفلكية."),
];

const units2AM: Unit[] = [
  u("ميدان المادة وتحولاتها", "تركيب المادة، الذرات والجزيئات."),
  u("ميدان الظواهر الميكانيكية", "الحركة والقوى وتأثيراتها."),
  u("ميدان الظواهر الكهرومغناطيسية", "المغناطيس، الكهرباء والمغناطيسية."),
];

const units3AM: Unit[] = [
  u("ميدان المادة وتحولاتها", "التحولات الكيميائية وقوانين حفظ الكتلة."),
  u("ميدان الطاقة", "أشكال الطاقة وتحولاتها."),
  u("ميدان الظواهر الكهربائية", "التيار الكهربائي، التوتر والمقاومة."),
];

const units4AM: Unit[] = [
  u("ميدان الظواهر الكهربائية", "القدرة والطاقة الكهربائية، التركيب الإلكتروني."),
  u("ميدان المادة وتحولاتها", "التفاعلات الكيميائية والمعادلات."),
  u("مذكرات ميدان الظواهر الميكانيكية", "الحركة، السرعة، القوى وتطبيقاتها."),
  u("مذكرات ميدان الظواهر الضوئية", "الضوء، العدسات والظواهر الضوئية."),
];

// ---- Secondary school (ثانوي) ----
const units1AS: Unit[] = [
  u("بنية أفراد بعض الأنواع الكيميائية", "الذرة، الجزيء وبنية المادة."),
  u("هندسة أفراد بعض الأنواع الكيميائية", "الهندسة الفراغية للجزيئات."),
  u("القوة والحركات المستقيمة", "دراسة الحركة المستقيمة وتطبيقاتها."),
  u("القوة والحركات المنحنية", "دراسة الحركات المنحنية والدائرية."),
  u("القوة والحركة والمرجع", "المرجع والحركة النسبية."),
  u("دفع وكبح متحرك", "تأثير القوى على حركة المتحرك."),
  u("من المجهري إلى العياني", "الانتقال من العالم المجهري إلى العياني."),
  u("التماسك في المادة والفضاء", "قوى التماسك بين الجزيئات."),
  u("الضوء", "الظواهر الضوئية وقوانين الانتشار."),
];

const units2AS: Unit[] = [
  u("العمل والطاقة", "العمل، الطاقة الحركية وطاقة الوضع."),
  u("المادة وتحولاتها", "التحولات الكيميائية والتفاعلات."),
  u("الظواهر الكهرومغناطيسية", "المجال المغناطيسي والحث الكهرومغناطيسي."),
];

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

export const stages: Stage[] = [
  {
    id: "moyen",
    title: "التعليم المتوسط",
    subtitle: "BEM",
    description: "دروس الفيزياء لجميع سنوات التعليم المتوسط.",
    years: [
      { id: "1am", title: "الأولى متوسط", subtitle: "1AM", units: units1AM },
      { id: "2am", title: "الثانية متوسط", subtitle: "2AM", units: units2AM },
      { id: "3am", title: "الثالثة متوسط", subtitle: "3AM", units: units3AM },
      { id: "4am", title: "الرابعة متوسط", subtitle: "4AM — BEM", units: units4AM },
    ],
  },
  {
    id: "secondaire",
    title: "التعليم الثانوي",
    subtitle: "BAC",
    description: "دروس الفيزياء لجميع سنوات التعليم الثانوي.",
    years: [
      { id: "1as", title: "الأولى ثانوي", subtitle: "1AS", units: units1AS },
      { id: "2as", title: "الثانية ثانوي", subtitle: "2AS", units: units2AS },
      { id: "3as", title: "الثالثة ثانوي", subtitle: "3AS — BAC", units: terminaleUnits },
    ],
  },
];

export const getStage = (id: string) => stages.find((s) => s.id === id);
export const getYear = (stageId: string, yearId: string) =>
  getStage(stageId)?.years.find((y) => y.id === yearId);
