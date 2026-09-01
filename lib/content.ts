/**
 * Single source of truth for every piece of copy and data on the site.
 * Everything is bilingual: `L(en, ar)` wraps a value in both languages and
 * `usePick()` (see LocaleProvider) resolves it for the active locale.
 */

export type Locale = "en" | "ar";
export type Localized<T> = { en: T; ar: T };
export const L = <T>(en: T, ar: T): Localized<T> => ({ en, ar });

/* ------------------------------------------------------------------ profile */

export const profile = {
  name: L("Dr. Hafez Mohamed Farid", "د. حافظ محمد فريد"),
  shortName: L("Hafez M. Farid", "حافظ فريد"),
  monogram: "HF",
  credential: L("Ph.D.", "دكتوراه"),
  role: L(
    "Assistant Professor of Business Administration · Certified Trainer",
    "أستاذ مساعد في إدارة الأعمال · مدرب معتمد",
  ),
  location: L("Cairo, Egypt", "القاهرة، مصر"),
  email: "hafezkhalaf@gmail.com",
  phoneDisplay: L("+20 115 551 9400", "+20 115 551 9400"),
  phoneHref: "+201155519400",
  orcid: "0000-0002-9057-7545",
  orcidUrl: "https://orcid.org/0000-0002-9057-7545",
  linkedin: "https://www.linkedin.com/in/hafez-farid/",
  linkedinHandle: "in/hafez-farid",
  specializations: L(
    ["Human Resource Management", "Organizational Behavior", "Strategic Management", "Instructional Design"],
    ["إدارة الموارد البشرية", "السلوك التنظيمي", "الإدارة الاستراتيجية", "التصميم التعليمي"],
  ),
  intro: L(
    "Ph.D. in Business Administration with 16 years in higher education and over a decade designing and delivering professional training. My research examines how ethical climate, leadership and sustainability shape people and performance.",
    "دكتوراه في إدارة الأعمال، وستة عشر عامًا في التعليم العالي، وأكثر من عشر سنوات في تصميم وتقديم برامج التدريب المهني. تتناول أبحاثي كيف يشكّل المناخ الأخلاقي والقيادة والاستدامة الأفرادَ والأداء.",
  ),
};

/* --------------------------------------------------- signature research model */

/**
 * The doctoral model — used as the site's identity figure (hero + About) in
 * place of a portrait. Job satisfaction mediates ethical climate → HR
 * sustainability (Farid, 2021).
 */
export const researchModel = {
  antecedent: L("Ethical Climate", "المناخ الأخلاقي"),
  mediator: L("Job Satisfaction", "الرضا الوظيفي"),
  outcome: L("HR Sustainability", "استدامة الموارد البشرية"),
  heroKicker: L("Doctoral research model", "نموذج بحث الدكتوراه"),
  figLabel: L("Fig. 1", "شكل ١"),
  figCaption: L(
    "Job satisfaction as the mechanism linking ethical climate to human-resource sustainability.",
    "الرضا الوظيفي بوصفه الآلية التي تربط المناخ الأخلاقي باستدامة الموارد البشرية.",
  ),
  legend: L(
    ["a — antecedent → mediator", "b — mediator → outcome", "c′ — direct effect"],
    ["a — المتغير المستقل ← الوسيط", "b — الوسيط ← المتغير التابع", "c′ — الأثر المباشر"],
  ),
};

/**
 * Methodological signature of a paper, inferred from its title. Dr. Farid's work
 * is overwhelmingly mediation / moderation modelling; surfacing it lets a reader
 * scan the "shape" of the research.
 */
export type ModelKind = "mediation" | "moderation" | "direct";

export function modelKind(title: string): ModelKind {
  const s = title.toLowerCase();
  if (s.includes("moderat")) return "moderation";
  if (s.includes("mediat")) return "mediation";
  return "direct";
}

/* --------------------------------------------------------------- navigation */

export type NavItem = { id: string; label: Localized<string> };

export const navItems: NavItem[] = [
  { id: "about", label: L("About", "نبذة") },
  { id: "research", label: L("Research", "الأبحاث") },
  { id: "experience", label: L("Experience", "الخبرة") },
  { id: "teaching", label: L("Teaching", "التدريس") },
  { id: "training", label: L("Training", "التدريب") },
  { id: "contact", label: L("Contact", "تواصل") },
];

/* -------------------------------------------------------------------- about */

export const about = {
  body: L(
    [
      "Dr. Hafez Mohamed Farid is an Assistant Professor of Business Administration whose work sits where organizational research meets classroom and boardroom practice. His doctoral study modelled job satisfaction as the mechanism linking ethical climate to human-resource sustainability in Egyptian commercial banks.",
      "Across five institutions he teaches strategic management, organizational behavior and human-resource management, supervises graduate research, and contributes to curriculum design and quality accreditation. As a certified trainer he has delivered programs for academic, government and corporate audiences — most recently an international engagement in Saudi Arabia.",
    ],
    [
      "الدكتور حافظ محمد فريد أستاذ مساعد في إدارة الأعمال، يعمل عند نقطة التقاء البحث التنظيمي بالممارسة في قاعة الدرس وفي بيئة العمل. تناولت دراسته للدكتوراه الرضا الوظيفي بوصفه الآلية التي تربط المناخ الأخلاقي باستدامة الموارد البشرية في البنوك التجارية المصرية.",
      "يدرّس في خمس مؤسسات مقررات الإدارة الاستراتيجية والسلوك التنظيمي وإدارة الموارد البشرية، ويشرف على أبحاث الدراسات العليا، ويسهم في تصميم المناهج وضمان الجودة والاعتماد. وبصفته مدربًا معتمدًا قدّم برامج لجهات أكاديمية وحكومية وشركات، كان آخرها برنامجًا دوليًا في المملكة العربية السعودية.",
    ],
  ),
  focusAreas: L(
    ["Human Resource Management", "Organizational Behavior", "Strategic Management", "Instructional Design", "Quality & Accreditation", "AI in HR"],
    ["إدارة الموارد البشرية", "السلوك التنظيمي", "الإدارة الاستراتيجية", "التصميم التعليمي", "الجودة والاعتماد", "الذكاء الاصطناعي في الموارد البشرية"],
  ),
  languages: L(
    ["Arabic — native", "English — very good"],
    ["العربية — اللغة الأم", "الإنجليزية — جيد جدًا"],
  ),
};

/* ------------------------------------------------------------------ metrics */

export type Metric = {
  value: number;
  suffix?: string;
  label: Localized<string>;
};

export const metrics: Metric[] = [
  { value: 16, label: L("Years in higher education", "سنة في التعليم العالي") },
  { value: 10, suffix: "+", label: L("Peer-reviewed papers", "بحث محكّم") },
  { value: 5, label: L("Academic institutions", "مؤسسات أكاديمية") },
  { value: 10, suffix: "+", label: L("Years of training practice", "سنوات من ممارسة التدريب") },
  { value: 9, label: L("University courses taught", "مقررات جامعية يدرّسها") },
  { value: 3, label: L("Sectors trained: academic · government · corporate", "قطاعات التدريب: أكاديمي · حكومي · شركات") },
];

/* --------------------------------------------------------------- education */

export type Education = {
  degree: Localized<string>;
  institution: Localized<string>;
  year: string;
  note?: Localized<string>;
  featured?: boolean;
};

export const education: Education[] = [
  {
    degree: L("Ph.D. in Business Administration", "دكتوراه في إدارة الأعمال"),
    institution: L("University of Sadat City", "جامعة مدينة السادات"),
    year: "2021",
    note: L(
      "Dissertation — Job Satisfaction as a Mediating Variable between Ethical Climate and Human Resource Sustainability: A Study on Egyptian Commercial Banks",
      "الأطروحة — الرضا الوظيفي كمتغير وسيط بين المناخ الأخلاقي واستدامة الموارد البشرية: دراسة على البنوك التجارية المصرية",
    ),
    featured: true,
  },
  {
    degree: L("M.Sc. in Business Administration", "ماجستير في إدارة الأعمال"),
    institution: L("Helwan University", "جامعة حلوان"),
    year: "2014",
  },
  {
    degree: L("MBA in Financial Management", "ماجستير إدارة الأعمال — الإدارة المالية"),
    institution: L("Arab Academy for Management — English Section", "الأكاديمية العربية للإدارة — القسم الإنجليزي"),
    year: "2013",
  },
  {
    degree: L("Professional Diploma in Quality & Accreditation Management", "دبلوم مهني في إدارة الجودة والاعتماد"),
    institution: L("Ain Shams University", "جامعة عين شمس"),
    year: "2015",
  },
  {
    degree: L("B.A. in Management Information Systems", "بكالوريوس نظم المعلومات الإدارية"),
    institution: L("Thebes Academy", "أكاديمية طيبة"),
    year: "2010",
    note: L("GPA 3.86", "المعدل التراكمي ٣٫٨٦"),
  },
];

/* -------------------------------------------------------------- experience */

export type Appointment = {
  institution: Localized<string>;
  role: Localized<string>;
  period: Localized<string>;
  location: Localized<string>;
  current: boolean;
  points: Localized<string[]>;
};

export const experience: Appointment[] = [
  {
    institution: L("Sadat Academy for Management Sciences", "أكاديمية السادات للعلوم الإدارية"),
    role: L("Assistant Professor of Management", "أستاذ مساعد في الإدارة"),
    period: L("2025 — Present", "٢٠٢٥ — حتى الآن"),
    location: L("Cairo, Egypt", "القاهرة، مصر"),
    current: true,
    points: L(
      [
        "Teaching undergraduate and postgraduate management courses",
        "Supervising academic research",
        "Designing practical, skill-based learning experiences",
      ],
      [
        "تدريس مقررات الإدارة لمرحلتي البكالوريوس والدراسات العليا",
        "الإشراف على الأبحاث الأكاديمية",
        "تصميم خبرات تعلّم عملية قائمة على المهارات",
      ],
    ),
  },
  {
    institution: L("Ahram Canadian University (ACU)", "جامعة الأهرام الكندية"),
    role: L("Assistant Professor of Management", "أستاذ مساعد في الإدارة"),
    period: L("2024 — Present", "٢٠٢٤ — حتى الآن"),
    location: L("Giza, Egypt", "الجيزة، مصر"),
    current: true,
    points: L(
      [
        "Taught Communication Skills with an emphasis on real-world application",
        "Ran workshops in public speaking and interpersonal communication",
        "Used skill-based assessments to build presentation and negotiation ability",
      ],
      [
        "تدريس مهارات الاتصال مع التركيز على التطبيق الواقعي",
        "تنفيذ ورش عمل في التحدث أمام الجمهور والتواصل بين الأشخاص",
        "استخدام تقييمات قائمة على المهارات لتنمية قدرات العرض والتفاوض",
      ],
    ),
  },
  {
    institution: L("International Academy of Engineering & Media Science (IAEMS)", "الأكاديمية الدولية للهندسة وعلوم الإعلام"),
    role: L("Assistant Professor of Management", "أستاذ مساعد في الإدارة"),
    period: L("2021 — Present", "٢٠٢١ — حتى الآن"),
    location: L("Giza, Egypt", "الجيزة، مصر"),
    current: true,
    points: L(
      [
        "Delivered Organizational Behavior, Strategic Management, Innovation and Project Management",
        "Contributed to curriculum development and academic quality assurance",
        "Led academic workshops and published in international journals",
      ],
      [
        "تدريس السلوك التنظيمي والإدارة الاستراتيجية والابتكار وإدارة المشروعات",
        "المشاركة في تطوير المناهج وضمان الجودة الأكاديمية",
        "قيادة ورش عمل أكاديمية والنشر في مجلات دولية",
      ],
    ),
  },
  {
    institution: L("Arab Academy for Science, Technology & Maritime Transport (AASTMT)", "الأكاديمية العربية للعلوم والتكنولوجيا والنقل البحري"),
    role: L("Assistant Professor of Management", "أستاذ مساعد في الإدارة"),
    period: L("2020 — Present", "٢٠٢٠ — حتى الآن"),
    location: L("Cairo, Egypt", "القاهرة، مصر"),
    current: true,
    points: L(
      [
        "Taught International Business, HRM, Marketing, Negotiation and Financial Management",
        "Supervised graduate research",
        "Designed student-centered assessments and published in peer-reviewed journals",
      ],
      [
        "تدريس الأعمال الدولية وإدارة الموارد البشرية والتسويق والتفاوض والإدارة المالية",
        "الإشراف على أبحاث الدراسات العليا",
        "تصميم تقييمات محورها الطالب والنشر في مجلات محكّمة",
      ],
    ),
  },
  {
    institution: L("Thebes Academy", "أكاديمية طيبة"),
    role: L("Lecturer (Full-time)", "محاضر (متفرغ)"),
    period: L("2010 — 2015", "٢٠١٠ — ٢٠١٥"),
    location: L("Cairo, Egypt", "القاهرة، مصر"),
    current: false,
    points: L(
      [
        "Lectured in Management Information Systems, E-Commerce and Decision Support Systems",
        "Contributed to course development and academic engagement",
      ],
      [
        "تدريس نظم المعلومات الإدارية والتجارة الإلكترونية ونظم دعم القرار",
        "المساهمة في تطوير المقررات والتفاعل الأكاديمي",
      ],
    ),
  },
];

/* ---------------------------------------------------------------- teaching */

export type Subject = { name: Localized<string>; blurb: Localized<string> };

export const teachingSubjects: Subject[] = [
  {
    name: L("Strategic Management", "الإدارة الاستراتيجية"),
    blurb: L("Analysis, formulation and execution of competitive strategy.", "تحليل الاستراتيجية التنافسية وصياغتها وتنفيذها."),
  },
  {
    name: L("Organizational Behavior", "السلوك التنظيمي"),
    blurb: L("Individuals, teams and culture inside organizations.", "الأفراد والفرق والثقافة داخل المنظمات."),
  },
  {
    name: L("Innovation Management", "إدارة الابتكار"),
    blurb: L("Building and leading the innovation pipeline.", "بناء مسار الابتكار وقيادته."),
  },
  {
    name: L("Human Resource Management", "إدارة الموارد البشرية"),
    blurb: L("Attracting, developing and retaining talent.", "استقطاب المواهب وتطويرها والاحتفاظ بها."),
  },
  {
    name: L("International Management", "الإدارة الدولية"),
    blurb: L("Managing across borders, cultures and institutions.", "الإدارة عبر الحدود والثقافات والمؤسسات."),
  },
  {
    name: L("Marketing Management", "إدارة التسويق"),
    blurb: L("Segmentation, positioning and the marketing mix.", "التقسيم والتموضع والمزيج التسويقي."),
  },
  {
    name: L("Project Management", "إدارة المشروعات"),
    blurb: L("Scope, schedule, cost and stakeholder control.", "ضبط النطاق والجدول والتكلفة وأصحاب المصلحة."),
  },
  {
    name: L("Quality Management", "إدارة الجودة"),
    blurb: L("TQM, ISO and continuous improvement.", "إدارة الجودة الشاملة والأيزو والتحسين المستمر."),
  },
  {
    name: L("Entrepreneurship", "ريادة الأعمال"),
    blurb: L("From opportunity to venture and growth.", "من الفرصة إلى المشروع ثم النمو."),
  },
];

/* ---------------------------------------------------------------- training */

export type TrainingEngagement = {
  org: Localized<string>;
  place: Localized<string>;
  period: Localized<string>;
  program?: Localized<string>;
  client?: Localized<string>;
  international?: boolean;
  points: Localized<string[]>;
};

export const training: TrainingEngagement[] = [
  {
    org: L("SEEN Training", "شركة SEEN للتدريب"),
    place: L("Saudi Arabia", "المملكة العربية السعودية"),
    period: L("2026", "٢٠٢٦"),
    program: L(
      "Smart Staffing: Improving Recruitment, Selection & Retention of Employees",
      "التوظيف الذكي: تحسين الاستقطاب والاختيار والاحتفاظ بالموظفين",
    ),
    client: L("Petrogistix", "Petrogistix"),
    international: true,
    points: L(
      [
        "Advanced program on smart recruitment and selection techniques",
        "Employee-retention strategies designed for a corporate client",
      ],
      [
        "برنامج متقدّم في تقنيات الاستقطاب والاختيار الذكي",
        "استراتيجيات الاحتفاظ بالموظفين مصمّمة لعميل من قطاع الشركات",
      ],
    ),
  },
  {
    org: L("UP Skill Center", "مركز أب سكيل"),
    place: L("Egypt", "مصر"),
    period: L("2022 — Present", "٢٠٢٢ — حتى الآن"),
    points: L(
      [
        "Repeat cohorts for students and working professionals",
        "Communication skills, time management, stress management and presentation skills",
      ],
      [
        "دفعات متكررة للطلاب والمهنيين العاملين",
        "مهارات الاتصال وإدارة الوقت وإدارة الضغوط ومهارات العرض",
      ],
    ),
  },
  {
    org: L("Ministry of Justice — Experts Sector", "وزارة العدل — قطاع الخبراء"),
    place: L("Egypt", "مصر"),
    period: L("2015 — 2021", "٢٠١٥ — ٢٠٢١"),
    points: L(
      [
        "Training programs for professionals within the Experts Sector",
        "Focus on communication, professional skills and workplace effectiveness",
      ],
      [
        "برامج تدريبية للمهنيين داخل قطاع الخبراء",
        "التركيز على الاتصال والمهارات المهنية وفاعلية بيئة العمل",
      ],
    ),
  },
  {
    org: L("Al-Massa Training Center — Thebes Academy", "مركز الماسة للتدريب — أكاديمية طيبة"),
    place: L("Egypt", "مصر"),
    period: L("2010 — 2015", "٢٠١٠ — ٢٠١٥"),
    points: L(
      [
        "Foundational programs in soft skills and management topics",
        "Prepared students for the job market",
      ],
      [
        "برامج تأسيسية في المهارات الشخصية وموضوعات الإدارة",
        "إعداد الطلاب لسوق العمل",
      ],
    ),
  },
];

export const trainingAreas = L(
  [
    "Human Resource Management",
    "Recruitment & Selection",
    "Employee Retention",
    "Communication Skills",
    "Time Management",
    "Stress Management",
    "Presentation Skills",
    "Leadership Development",
    "AI in HR & Smart Staffing",
  ],
  [
    "إدارة الموارد البشرية",
    "الاستقطاب والاختيار",
    "الاحتفاظ بالموظفين",
    "مهارات الاتصال",
    "إدارة الوقت",
    "إدارة الضغوط",
    "مهارات العرض والتقديم",
    "تنمية القيادة",
    "الذكاء الاصطناعي في الموارد البشرية والتوظيف الذكي",
  ],
);

/* ---------------------------------------------------------- certifications */

export type Credential = { title: Localized<string>; issuer: Localized<string> };

export const certifications: Credential[] = [
  {
    title: L("Certified Trainer", "مدرب معتمد"),
    issuer: L("National Institute of Management — Ministry of Planning", "المعهد القومي للإدارة — وزارة التخطيط"),
  },
  {
    title: L("Training of Trainers (TOT)", "تدريب المدربين (TOT)"),
    issuer: L("Egabi Learn", "إيجابي ليرن"),
  },
  {
    title: L("Quality Management Systems — ISO & Six Sigma", "نظم إدارة الجودة — الأيزو وستة سيجما"),
    issuer: L("Ain Shams University", "جامعة عين شمس"),
  },
  {
    title: L("Strategic Studies & National Security · Crisis Management", "الدراسات الاستراتيجية والأمن القومي · إدارة الأزمات"),
    issuer: L("Nasser Higher Military Academy", "أكاديمية ناصر العسكرية العليا"),
  },
  {
    title: L("Effective Teaching in Higher Education", "التدريس الفعّال في التعليم العالي"),
    issuer: L("NAQAAE", "الهيئة القومية لضمان جودة التعليم والاعتماد"),
  },
  {
    title: L("External Review Course", "دورة المراجعة الخارجية"),
    issuer: L("NAQAAE", "الهيئة القومية لضمان جودة التعليم والاعتماد"),
  },
  {
    title: L("HR Management · Marketing Basics · Communication Skills", "إدارة الموارد البشرية · أساسيات التسويق · مهارات الاتصال"),
    issuer: L("UP Skill Center", "مركز أب سكيل"),
  },
];

/* -------------------------------------------------------------- speaking */

export type Talk = { title: Localized<string>; host: Localized<string> };

export const speaking: Talk[] = [
  { title: L("Crisis Management in Universities", "إدارة الأزمات في الجامعات"), host: L("Thebes Academy", "أكاديمية طيبة") },
  { title: L("Academic Quality Standards", "معايير الجودة الأكاديمية"), host: L("Thebes Academy", "أكاديمية طيبة") },
  { title: L("Toward an Accredited University 2025", "نحو جامعة معتمدة ٢٠٢٥"), host: L("Ain Shams University", "جامعة عين شمس") },
  { title: L("Egyptian Academic Conference", "المؤتمر الأكاديمي المصري"), host: L("Al Nahda University", "جامعة النهضة") },
];

/* ---------------------------------------------------------------- awards */

export const awards: Localized<string>[] = [
  L(
    "1st Place — Ministry of Higher Education “Information League” Competition",
    "المركز الأول — مسابقة “دوري المعلومات” بوزارة التعليم العالي",
  ),
];

/* ------------------------------------------------------------ publications */

export type ThemeKey = "hrm" | "leadership" | "ob" | "marketing" | "digital" | "finance";

export const pubThemes: { key: ThemeKey; label: Localized<string> }[] = [
  { key: "hrm", label: L("HR & Sustainability", "الموارد البشرية والاستدامة") },
  { key: "leadership", label: L("Leadership", "القيادة") },
  { key: "ob", label: L("Organizational Behavior", "السلوك التنظيمي") },
  { key: "marketing", label: L("Marketing", "التسويق") },
  { key: "digital", label: L("Digital Transformation", "التحول الرقمي") },
  { key: "finance", label: L("Banking & Finance", "البنوك والتمويل") },
];

export type Publication = {
  id: number;
  year: number;
  sort: number;
  origin: "en" | "ar";
  themes: ThemeKey[];
  title: Localized<string>;
  journal: Localized<string>;
  publisher: Localized<string>;
  issue: Localized<string>;
  date: Localized<string>;
};

export const publications: Publication[] = [
  {
    id: 1,
    year: 2025,
    sort: 202507,
    origin: "ar",
    themes: ["digital", "hrm"],
    title: L(
      "The Impact of Digital Transformation in HRM on Job Performance: The Mediating Role of Operational Efficiency in Higher Education Institutions",
      "تأثير التحول الرقمي في إدارة الموارد البشرية على الأداء الوظيفي: دراسة تحليلية لوساطة الكفاءة التشغيلية في مؤسسات التعليم العالي",
    ),
    journal: L("Raya International Journal of Commercial Sciences", "مجلة راية الدولية للعلوم التجارية"),
    publisher: L("Raya Higher Institute for Management & Foreign Trade, New Damietta", "معهد راية العالي للإدارة والتجارة الخارجية بدمياط الجديدة"),
    issue: L("Vol. 4, No. 14", "المجلد ٤، العدد ١٤"),
    date: L("July 2025", "يوليو ٢٠٢٥"),
  },
  {
    id: 2,
    year: 2025,
    sort: 202501,
    origin: "ar",
    themes: ["leadership", "hrm"],
    title: L(
      "Knowledge Sharing as a Mediating Variable between Distributed Leadership and Sustainable Competitive Advantage: Evidence from Telecom Egypt, Menoufia",
      "مشاركة المعرفة كمتغير وسيط في العلاقة بين القيادة الموزعة والميزة التنافسية المستدامة — بالتطبيق على العاملين في الشركة المصرية للاتصالات بمحافظة المنوفية",
    ),
    journal: L("Journal of Contemporary Business Studies", "مجلة الدراسات التجارية المعاصرة"),
    publisher: L("Faculty of Commerce, Kafr El-Sheikh University", "كلية التجارة — جامعة كفر الشيخ"),
    issue: L("No. 19", "العدد التاسع عشر"),
    date: L("January 2025", "يناير ٢٠٢٥"),
  },
  {
    id: 3,
    year: 2025,
    sort: 202501,
    origin: "ar",
    themes: ["leadership", "ob"],
    title: L(
      "Virtuous Leadership as a Moderator between Workaholism and Counterproductive Work Behaviors: Evidence from Government-Sector Physicians, Beheira",
      "القيادة الفاضلة كمتغير معدِّل للعلاقة بين إدمان العمل وسلوكيات العمل المضادة للإنتاجية — بالتطبيق على الأطباء العاملين بالقطاع الحكومي بمستشفيات محافظة البحيرة",
    ),
    journal: L("Journal of Contemporary Business Studies", "مجلة الدراسات التجارية المعاصرة"),
    publisher: L("Faculty of Commerce, Kafr El-Sheikh University", "كلية التجارة — جامعة كفر الشيخ"),
    issue: L("No. 19", "العدد التاسع عشر"),
    date: L("January 2025", "يناير ٢٠٢٥"),
  },
  {
    id: 4,
    year: 2025,
    sort: 202503,
    origin: "ar",
    themes: ["ob", "hrm"],
    title: L(
      "Environmental Awareness as a Moderator between Corporate Social Responsibility and Employees’ Green Behavior: Evidence from Menoufia University",
      "الوعي البيئي كمتغير معدِّل للعلاقة بين المسؤولية الاجتماعية للمنظمات والسلوك الأخضر للعاملين — بالتطبيق على العاملين بجامعة المنوفية",
    ),
    journal: L("Scientific Journal of Commerce & Finance", "المجلة العلمية للتجارة والتمويل"),
    publisher: L("Faculty of Commerce, Tanta University", "كلية التجارة — جامعة طنطا"),
    issue: L("Vol. 45, No. 1", "المجلد ٤٥، العدد الأول"),
    date: L("March 2025", "مارس ٢٠٢٥"),
  },
  {
    id: 5,
    year: 2024,
    sort: 202409,
    origin: "ar",
    themes: ["marketing"],
    title: L(
      "The Mediating Role of Brand Love between Content Credibility and E-Purchase Intention on Social Media: Evidence from Toshiba El Araby Customers on Facebook",
      "توسيط حب العلامة في العلاقة بين مصداقية المحتوى ونية الشراء الإلكتروني عبر منصات التواصل الاجتماعي — بالتطبيق على عملاء شركة توشيبا العربي على فيسبوك",
    ),
    journal: L("Scientific Journal of Commerce & Finance", "المجلة العلمية للتجارة والتمويل"),
    publisher: L("Faculty of Commerce, Tanta University", "كلية التجارة — جامعة طنطا"),
    issue: L("Vol. 44, No. 3", "المجلد ٤٤، العدد الثالث"),
    date: L("September 2024", "سبتمبر ٢٠٢٤"),
  },
  {
    id: 6,
    year: 2024,
    sort: 202403,
    origin: "ar",
    themes: ["ob", "hrm"],
    title: L(
      "Job Happiness as a Mediating Variable between Organizational Justice and Job Burnout: A Field Study on Menoufia University Hospitals",
      "السعادة الوظيفية كمتغير وسيط في العلاقة بين العدالة التنظيمية والاحتراق الوظيفي — دراسة ميدانية على مستشفيات جامعة المنوفية",
    ),
    journal: L("Scientific Journal of Commerce & Finance", "المجلة العلمية للتجارة والتمويل"),
    publisher: L("Faculty of Commerce, Tanta University", "كلية التجارة — جامعة طنطا"),
    issue: L("Vol. 44, No. 1", "المجلد ٤٤، العدد الأول"),
    date: L("March 2024", "مارس ٢٠٢٤"),
  },
  {
    id: 7,
    year: 2024,
    sort: 202405,
    origin: "en",
    themes: ["hrm"],
    title: L(
      "The Role of Human Resources Sustainability in Promoting Innovation and Entrepreneurship",
      "دور استدامة الموارد البشرية في تعزيز الابتكار وريادة الأعمال",
    ),
    journal: L("Academic Journal of Social Sciences", "المجلة الأكاديمية للعلوم الاجتماعية"),
    publisher: L("International Academy of Engineering & Media Sciences", "الأكاديمية الدولية للهندسة وعلوم الإعلام"),
    issue: L("—", "—"),
    date: L("May 2024", "مايو ٢٠٢٤"),
  },
  {
    id: 8,
    year: 2023,
    sort: 202307,
    origin: "en",
    themes: ["finance"],
    title: L(
      "Technological Infrastructure Investments Between Their Reflections and Motives: Evidence from Arab Banks",
      "استثمارات البنية التحتية التكنولوجية بين انعكاساتها ودوافعها: أدلة من البنوك العربية",
    ),
    journal: L("Scientific Journal of Business & Environmental Studies", "المجلة العلمية للدراسات التجارية والبيئية"),
    publisher: L("Faculty of Commerce, Suez Canal University", "كلية التجارة — جامعة قناة السويس"),
    issue: L("Vol. 14, No. 3", "المجلد ١٤، العدد ٣"),
    date: L("July 2023", "يوليو ٢٠٢٣"),
  },
  {
    id: 9,
    year: 2021,
    sort: 202106,
    origin: "ar",
    themes: ["hrm", "finance"],
    title: L(
      "The Role of Ethical Climate in Achieving Human Resource Sustainability: An Applied Study on Egyptian Commercial Banks",
      "دور المناخ الأخلاقي في تحقيق استدامة الموارد البشرية: دراسة تطبيقية على البنوك التجارية المصرية",
    ),
    journal: L("Scientific Journal of Financial & Administrative Studies and Research", "المجلة العلمية للدراسات والبحوث المالية والإدارية"),
    publisher: L("Faculty of Commerce, Sadat City University", "كلية التجارة — جامعة مدينة السادات"),
    issue: L("Vol. 9, No. 1", "المجلد ٩، العدد الأول"),
    date: L("June 2021", "يونيو ٢٠٢١"),
  },
  {
    id: 10,
    year: 2020,
    sort: 202012,
    origin: "ar",
    themes: ["hrm", "finance"],
    title: L(
      "Job Satisfaction as a Mediating Variable between Ethical Climate and Human Resource Sustainability: An Applied Study on Egyptian Commercial Banks",
      "الرضا الوظيفي كمتغير وسيط بين المناخ الأخلاقي واستدامة الموارد البشرية: دراسة تطبيقية على البنوك التجارية المصرية",
    ),
    journal: L("Scientific Journal of Financial & Administrative Studies and Research", "المجلة العلمية للدراسات والبحوث المالية والإدارية"),
    publisher: L("Faculty of Commerce, Sadat City University", "كلية التجارة — جامعة مدينة السادات"),
    issue: L("Vol. 8, No. 2", "المجلد ٨، العدد الثاني"),
    date: L("December 2020", "ديسمبر ٢٠٢٠"),
  },
];

export const researchInProgress: Localized<string>[] = [
  L(
    "Banks’ Technological Investment, Employees and Customers: Beyond Profitability — Unveiling Arab Banks",
    "الاستثمار التكنولوجي للبنوك والموظفون والعملاء: ما بعد الربحية — الكشف عن البنوك العربية",
  ),
];

/* --------------------------------------------------------------------- UI */

export const ui: Record<Locale, {
  langName: string;
  otherLangName: string;
  skipToContent: string;
  downloadCv: string;
  backToTop: string;
  present: string;
  copied: string;
  copy: string;
  all: string;
  menu: string;
  close: string;
  hero: {
    availability: string;
    focusLead: string;
    exploreResearch: string;
    getInTouch: string;
    scroll: string;
  };
  marqueeLead: string;
  about: { kicker: string; heading: string; focusHeading: string; factsHeading: string; factBased: string; factLanguages: string; factDoctorate: string; factOrcid: string; factRole: string; figKicker: string };
  metrics: { kicker: string; heading: string };
  research: {
    kicker: string;
    heading: string;
    sub: string;
    search: string;
    theme: string;
    language: string;
    langEn: string;
    langAr: string;
    sort: string;
    newest: string;
    oldest: string;
    empty: string;
    clear: string;
    inProgress: string;
    byYear: string;
    showing: (n: number, total: number) => string;
    orcid: string;
    legendTitle: string;
    modelMix: string;
    mediation: string;
    moderation: string;
    direct: string;
  };
  experience: { kicker: string; heading: string; current: string };
  education: { kicker: string; heading: string; dissertation: string };
  teaching: { kicker: string; heading: string; sub: string; levels: string };
  training: {
    kicker: string;
    heading: string;
    sub: string;
    program: string;
    client: string;
    international: string;
    areas: string;
    availabilityTitle: string;
    availabilityBody: string;
    availabilityCta: string;
  };
  credentials: { kicker: string; heading: string };
  speaking: { kicker: string; heading: string };
  recognition: { kicker: string; heading: string };
  contact: {
    kicker: string;
    heading: string;
    body: string;
    name: string;
    email: string;
    message: string;
    send: string;
    note: string;
    direct: string;
  };
  footer: { rights: string };
}> = {
  en: {
    langName: "EN",
    otherLangName: "العربية",
    skipToContent: "Skip to content",
    downloadCv: "Download CV",
    backToTop: "Back to top",
    present: "Present",
    copied: "Copied",
    copy: "Copy",
    all: "All",
    menu: "Menu",
    close: "Close",
    hero: {
      availability: "Cairo, Egypt · Available for engagements across the GCC",
      focusLead: "Focused on",
      exploreResearch: "Explore the research",
      getInTouch: "Get in touch",
      scroll: "Scroll",
    },
    marqueeLead: "Teaching & research across",
    about: {
      kicker: "01 — Profile",
      heading: "A scholar–practitioner in management",
      focusHeading: "Focus areas",
      factsHeading: "Quick facts",
      factBased: "Based in",
      factLanguages: "Languages",
      factDoctorate: "Doctorate",
      factOrcid: "ORCID",
      factRole: "Role",
      figKicker: "Research model",
    },
    metrics: { kicker: "02 — At a glance", heading: "The record, in numbers" },
    research: {
      kicker: "03 — Research",
      heading: "Peer-reviewed publications",
      sub: "Ten studies across HR sustainability, leadership, organizational behavior, marketing and digital transformation — with further work in progress.",
      search: "Search titles and journals…",
      theme: "Theme",
      language: "Language",
      langEn: "English",
      langAr: "Arabic",
      sort: "Sort",
      newest: "Newest",
      oldest: "Oldest",
      empty: "No publications match these filters.",
      clear: "Clear filters",
      inProgress: "In progress",
      byYear: "Publications by year",
      showing: (n, total) => `Showing ${n} of ${total}`,
      orcid: "ORCID record",
      legendTitle: "Model type",
      modelMix: "Methodological mix",
      mediation: "Mediation",
      moderation: "Moderation",
      direct: "Direct effect",
    },
    experience: { kicker: "04 — Experience", heading: "Academic appointments", current: "Current" },
    education: { kicker: "05 — Education", heading: "Degrees & diplomas", dissertation: "Doctoral dissertation" },
    teaching: {
      kicker: "06 — Teaching",
      heading: "Courses taught",
      sub: "Undergraduate and postgraduate, delivered in English and Arabic.",
      levels: "UG · PG",
    },
    training: {
      kicker: "07 — Training",
      heading: "Professional training practice",
      sub: "Over ten years of continuous training across academic, government and corporate sectors.",
      program: "Program",
      client: "Client",
      international: "International",
      areas: "Training areas",
      availabilityTitle: "Open for training across the GCC",
      availabilityBody: "Online and onsite, with full scheduling flexibility for academic, government and corporate clients.",
      availabilityCta: "Request a program",
    },
    credentials: { kicker: "08 — Credentials", heading: "Certifications & professional development" },
    speaking: { kicker: "09 — Speaking", heading: "Conferences & workshops" },
    recognition: { kicker: "10 — Recognition", heading: "Recognition" },
    contact: {
      kicker: "11 — Contact",
      heading: "Let’s work together",
      body: "Open to faculty roles, research supervision, training programs and speaking. The fastest way to reach me is email.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Compose email",
      note: "Opens your mail app with the message pre-filled.",
      direct: "Direct",
    },
    footer: { rights: "All rights reserved." },
  },
  ar: {
    langName: "ع",
    otherLangName: "English",
    skipToContent: "تخطَّ إلى المحتوى",
    downloadCv: "تحميل السيرة الذاتية",
    backToTop: "العودة إلى الأعلى",
    present: "حتى الآن",
    copied: "تم النسخ",
    copy: "نسخ",
    all: "الكل",
    menu: "القائمة",
    close: "إغلاق",
    hero: {
      availability: "القاهرة، مصر · متاح لمهام تدريبية واستشارية في دول الخليج",
      focusLead: "متخصص في",
      exploreResearch: "استعرض الأبحاث",
      getInTouch: "تواصل معي",
      scroll: "مرّر",
    },
    marqueeLead: "تدريس وبحث في",
    about: {
      kicker: "٠١ — نبذة",
      heading: "أكاديمي وممارس في الإدارة",
      focusHeading: "مجالات التركيز",
      factsHeading: "معلومات سريعة",
      factBased: "المقر",
      factLanguages: "اللغات",
      factDoctorate: "الدكتوراه",
      factOrcid: "معرّف ORCID",
      factRole: "المسمى",
      figKicker: "نموذج البحث",
    },
    metrics: { kicker: "٠٢ — لمحة", heading: "السجل في أرقام" },
    research: {
      kicker: "٠٣ — الأبحاث",
      heading: "الأبحاث المحكّمة",
      sub: "عشر دراسات في استدامة الموارد البشرية والقيادة والسلوك التنظيمي والتسويق والتحول الرقمي — مع أعمال أخرى قيد الإنجاز.",
      search: "ابحث في العناوين والمجلات…",
      theme: "المحور",
      language: "اللغة",
      langEn: "الإنجليزية",
      langAr: "العربية",
      sort: "الترتيب",
      newest: "الأحدث",
      oldest: "الأقدم",
      empty: "لا توجد أبحاث مطابقة لعوامل التصفية.",
      clear: "مسح عوامل التصفية",
      inProgress: "قيد الإنجاز",
      byYear: "الأبحاث حسب السنة",
      showing: (n, total) => `عرض ${n} من ${total}`,
      orcid: "سجل ORCID",
      legendTitle: "نوع النموذج",
      modelMix: "التوزيع المنهجي",
      mediation: "وساطة",
      moderation: "تعديل",
      direct: "أثر مباشر",
    },
    experience: { kicker: "٠٤ — الخبرة", heading: "التعيينات الأكاديمية", current: "حالي" },
    education: { kicker: "٠٥ — التعليم", heading: "الدرجات والدبلومات", dissertation: "أطروحة الدكتوراه" },
    teaching: {
      kicker: "٠٦ — التدريس",
      heading: "المقررات التي يدرّسها",
      sub: "لمرحلتي البكالوريوس والدراسات العليا، بالإنجليزية والعربية.",
      levels: "بكالوريوس · دراسات عليا",
    },
    training: {
      kicker: "٠٧ — التدريب",
      heading: "ممارسة التدريب المهني",
      sub: "أكثر من عشر سنوات من التدريب المتواصل في القطاعات الأكاديمية والحكومية والشركات.",
      program: "البرنامج",
      client: "العميل",
      international: "دولي",
      areas: "محاور التدريب",
      availabilityTitle: "متاح للتدريب في دول الخليج",
      availabilityBody: "عن بُعد وحضوريًا، مع مرونة كاملة في الجدولة لعملاء القطاع الأكاديمي والحكومي والشركات.",
      availabilityCta: "اطلب برنامجًا",
    },
    credentials: { kicker: "٠٨ — الشهادات", heading: "الشهادات والتطوير المهني" },
    speaking: { kicker: "٠٩ — المشاركات", heading: "المؤتمرات وورش العمل" },
    recognition: { kicker: "١٠ — التكريم", heading: "تكريم" },
    contact: {
      kicker: "١١ — تواصل",
      heading: "لنعمل معًا",
      body: "مهتم بالتعيينات الأكاديمية والإشراف على الأبحاث وبرامج التدريب والمشاركات. أسرع وسيلة للتواصل هي البريد الإلكتروني.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      send: "إنشاء البريد",
      note: "يفتح تطبيق البريد لديك مع تعبئة الرسالة مسبقًا.",
      direct: "مباشر",
    },
    footer: { rights: "جميع الحقوق محفوظة." },
  },
};

export const institutionsMarquee = [
  "University of Sadat City",
  "Sadat Academy for Management Sciences",
  "Ahram Canadian University",
  "IAEMS",
  "AASTMT",
  "Helwan University",
  "Ain Shams University",
  "Thebes Academy",
  "SEEN Training — KSA",
  "Ministry of Justice — Egypt",
];
