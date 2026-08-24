# ביקורת עיצוב ו-UI — אתר Raphael Barber

**סוג המסמך:** ביקורת קריאה-בלבד (Read-only). לא בוצע שום שינוי בקוד המקור, לא הותקנו חבילות, לא תוקן דבר.
**תאריך:** 2026-08-21
**Stack:** Vite 8 + React 19.2 + TypeScript 6 + Tailwind CSS v4 (CSS-first theme, ללא `tailwind.config.js`)

---

## הערה מקדימה חשובה — תיקון הנחת יסוד

הבקשה המקורית ביקשה לזהות אילו כותרות עבריות משתמשות ב-"Noto Sans Hebrew" ואילו כותרות אנגליות משתמשות ב-"Oswald". **בדקתי את זה בפועל בקוד ובדפדפן (computed `font-family`), וזו לא המציאות באתר:**

- כותרות (`h1`–`h4`, וכל מקום עם `font-display`): **"Frank Ruhl Libre"**, עם fallback ל-"David Libre" → "Noto Serif Hebrew" → Georgia → serif.
- טקסט רגיל (body, ניווט, כפתורים, פסקאות): **"Assistant"**, עם fallback ל-"Noto Sans Hebrew" → system-ui.
- **"Oswald" לא מופיע בשום מקום בפרויקט.** "Noto Sans Hebrew" ו-"Noto Serif Hebrew" מופיעים רק כ-fallback שלישי/רביעי בשרשרת הפונטים, לא כפונט הפעיל בפועל (Frank Ruhl Libre ו-Assistant נטענים בהצלחה מ-Google Fonts ומיושמים בפועל, כפי שאומת דרך `document.fonts` בדפדפן).

כל שאר הדוח מבוסס על המדידה האמיתית, לא על ההנחה מהבקשה.

---

## 1. מבנה הפרויקט — נתיבים מדויקים

| רכיב | נתיב |
|---|---|
| קובץ אפליקציה ראשי | `src/App.tsx` |
| נקודת כניסה / mount | `src/main.tsx` |
| CSS גלובלי + הגדרות Tailwind theme | `src/index.css` (משתמש ב-`@theme` של Tailwind v4 — **אין** קובץ `tailwind.config.js` נפרד) |
| תוכן/תרגומים (מקור יחיד לכל הטקסט) | `src/content/translations.ts` |
| הדר + ניווט | `src/components/Header.tsx` |
| תפריט נייד | `src/components/MobileMenu.tsx` |
| הירו | `src/components/Hero.tsx` |
| אודות | `src/components/About.tsx` |
| שירותים | `src/components/Services.tsx` |
| לפני/אחרי | `src/components/BeforeAfterSlider.tsx` |
| גלריה | `src/components/Gallery.tsx` |
| Lightbox | `src/components/Lightbox.tsx` |
| CTA | `src/components/CTASection.tsx` |
| צור קשר | `src/components/Contact.tsx` |
| פוטר | `src/components/Footer.tsx` |
| באנר עוגיות | `src/components/CookieBanner.tsx` |
| מודל העדפות עוגיות | `src/components/CookiePreferencesModal.tsx` |
| פאנל נגישות | `src/components/AccessibilityPanel.tsx` |
| הצהרת נגישות (מודל) | `src/components/AccessibilityStatementModal.tsx` |
| מודל פרטיות/עוגיות/תנאים | `src/components/LegalModal.tsx` |
| מודל בסיס (משותף לכל המודלים) | `src/components/Modal.tsx` |
| מתג שפה + כפתור נגישות צף | `src/components/FloatingControls.tsx` |
| סרגל פעולות קבוע בנייד | `src/components/MobileActionBar.tsx` |
| Skip link | `src/components/SkipLink.tsx` |
| הכרזת שינוי שפה (live region) | `src/components/LiveAnnouncer.tsx` |
| סמן עכבר מותאם (מספריים) | `src/components/CustomScissorsCursor.tsx` + `public/assets/cursors/scissors-cursor.svg` |
| Context: שפה | `src/context/LanguageContext.tsx` |
| Context: נגישות | `src/context/AccessibilityContext.tsx` |
| Context: הסכמת עוגיות | `src/context/CookieConsentContext.tsx` |
| Hooks | `src/hooks/useFocusTrap.ts`, `src/hooks/useBodyScrollLock.ts`, `src/hooks/useScrolled.ts` |
| תמונות מותאמות (WebP, נוצרו מ-sharp) | `src/assets/images/*.webp` |
| סקריפט אופטימיזציית תמונות | `scripts/optimize-images.mjs` |
| SEO סטטי | `index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/og-image.jpg` |

---

## 2. טיפוגרפיה — מדידה מדויקת (desktop 1440px, computed styles)

כל הגדלים נמדדו בפועל דרך `getComputedStyle` בדפדפן (לא רק נקראו מהקוד), ב-3 breakpoints של Tailwind: **מובייל** (ברירת מחדל, `<640px`), **`sm`** (`≥640px`), **`lg`** (`≥1024px`).

| טקסט | קובץ | Tailwind classes | פונט | משקל | Desktop (lg) | Tablet (sm/768px) | Mobile (<640px) | line-height | letter-spacing | יישור | max-width |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hero eyebrow | `Hero.tsx:31` | `text-sm font-semibold uppercase tracking-[0.2em]` | Assistant | 600 | 14px | 14px | 14px | 20px | 2.8px | start (RTL: ימין) | ללא הגבלה |
| Hero H1 | `Hero.tsx:32` | `text-4xl leading-[1.1] sm:text-5xl lg:text-6xl` | Frank Ruhl Libre | 500 | **60px** (נמדד) | 48px | 36px | 66px (desktop, ≈1.1) | normal | start | `max-w-xl` (36rem/576px) על ההורה |
| Hero gold line | `Hero.tsx:36` | `text-xl sm:text-2xl` | Frank Ruhl Libre | 500 (400 ב-CSS default, אך יורש h-tag? לא — זה `<p>`, כך שהמשקל בפועל הוא 400) | 24px | 24px | 20px | normal | normal | start | inline-block |
| Hero subtext | `Hero.tsx:40` | `text-base leading-relaxed sm:text-lg` | Assistant | 400 | 18px | 18px | 16px | 1.625×פונט | normal | start | `max-w-md` (28rem/448px) |
| Section kicker/eyebrow (About/Services/Before-After/Gallery/Contact) | לדוגמה `About.tsx:32` | `text-sm font-semibold uppercase tracking-[0.2em]` | Assistant | 600 | 14px | 14px | 14px | 20px | 2.8px | start/center (תלוי סקשן) | — |
| Section H2 | לדוגמה `About.tsx:33` | `text-3xl sm:text-4xl` | Frank Ruhl Libre | 500 | **36px** (נמדד) | 36px | **30px** (נמדד ב-430px) | 40px | normal | start/center | — |
| About/CTA/Services/Contact/Gallery description | `text-base leading-relaxed` | Assistant | 400 | 16px | 16px | 16px | 1.625× | normal | start/center | `max-w-xl`/`max-w-lg` (משתנה) |
| Service card title (H3) | `Services.tsx:34` | `text-lg` | Frank Ruhl Libre | 500 | 18px | 18px | 18px | 28px | normal | start | — |
| Service card description | `Services.tsx:35` | `text-sm leading-relaxed` | Assistant | 400 | 14px | 14px | 14px | 1.625× | normal | start | — |
| **מחירים** | — | — | — | — | — | — | — | — | — | — | **אין מחירים באתר בכלל — לא הוצג מחיר לאף שירות, בהתאם לדרישת "אל תמציא מחירים" מהבנייה המקורית** |
| כפתור ראשי (Book) | `Hero.tsx:47` | `text-sm font-semibold` | Assistant | 600 | 14px | 14px | 14px | 20px | normal | center | — |
| ניווט (Header) | `Header.tsx:53` | `text-sm font-medium` | Assistant | 500 | 14px | — (מוסתר מתחת ל-`lg`) | — (מוסתר) | 20px | normal | — | — |
| פרטי קשר (טלפון/כתובת בסקשן Contact) | `Contact.tsx:25,34` | `text-base` / `text-xs uppercase tracking-wide` | Assistant | 400 | 16px / 12px | — | — | — | — | — | — |
| כותרות פוטר (עמודות) | `Footer.tsx:66,79` | `text-xs font-semibold uppercase tracking-wider` | Assistant | 600 | 12px | — | — | — | 0.05em (tracking-wider) | — | — |
| טקסט פוטר (זכויות/תגית) | `Footer.tsx:34,130` | `text-sm` / `text-xs` | Assistant | 400 | 14px / 12px | — | — | — | — | — | `max-w-xs` (20rem) לתגית |

**סיכום גדלי כותרת ראשית לפי breakpoint (H1 בהירו, נמדד בפועל):**
| רוחב מסך | `font-size` בפועל |
|---|---|
| 1440px, 1280px, 1024px (`lg:text-6xl`) | 60px |
| 768px (`sm:text-5xl`, מתחת ל-`lg`) | 48px |
| 430px, 390px, 360px (ברירת מחדל `text-4xl`) | 36px |

---

## 3. ריווח ופריסה לפי סקשן

כל ערכי ה-padding מבוססים על סקאלת הריווח הדיפולטיבית של Tailwind (לא הוגדרה סקאלה מותאמת ב-`@theme`): `py-14`=56px, `py-16`=64px, `py-20`=80px, `py-24`=96px, `py-28`=112px, `px-4`=16px, `px-6`=24px, `px-8`=32px, `gap-3`=12px, `gap-5`=20px, `gap-10`=40px, `gap-12`=48px, `gap-16`=64px.

| סקשן | קובץ | גובה | Padding אנכי (mobile → sm → lg) | Padding אופקי | max-width תוכן | Grid | Gap | הערות |
|---|---|---|---|---|---|---|---|---|
| Hero | `Hero.tsx:13` | `min-h-[100svh]` (מלא מסך) | `pt-40 pb-16` → `sm:pb-20` → `lg:pb-24` (top קבוע 160px בכל הגדלים!) | `px-4 sm:px-8 lg:px-16` | `max-w-xl` (576px) לתוכן הטקסט | flex | `gap-3` (כפתורים) | **`pt-40` (160px) קבוע בכל הרוחבים, כולל מובייל — ר' סעיף קריטי למטה** |
| About | `About.tsx:12` | auto | `py-20 → sm:py-28` (80px→112px) | `px-4 sm:px-6 lg:px-8` | `max-w-7xl` (1280px) | `grid lg:grid-cols-2` | `gap-12 lg:gap-16` (48px→64px) | תמונה `aspect-[4/5]`, טבעת דקורטיבית מוסתרת מתחת ל-`sm` |
| Services | `Services.tsx:13` | auto | `py-20 → sm:py-28` | `px-4 sm:px-6 lg:px-8` | `max-w-7xl` | `grid sm:grid-cols-2 lg:grid-cols-4` | `gap-5` (20px) | כרטיסים `p-6` (24px) פנימי |
| Before/After | `BeforeAfterSlider.tsx:67` | auto | `py-20 → sm:py-28` | `px-4 sm:px-6 lg:px-8` | `max-w-3xl` (768px) לכותרת, `max-w-md` (448px) למחוון עצמו | flex | — | המחוון עצמו מוגבל ל-448px רוחב גם בדסקטופ ענק — יכול להיראות קטן ביחס לשאר הסקשנים |
| Gallery | `Gallery.tsx:42` | auto | `py-20 → sm:py-28` | `px-4 sm:px-6 lg:px-8` | `max-w-7xl` | `grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3` | `gap-3 sm:gap-4` (12px→16px) | ריבועים `aspect-square` |
| CTA | `CTASection.tsx:9` | auto | `py-20 sm:py-24` (80px→96px, **שים לב: אין `lg:` נפרד, שונה מתבנית שאר הסקשנים**) | `px-4 sm:px-6 lg:px-8` | `max-w-3xl` | — | — | קופסה פנימית `px-6 py-14 → sm:px-12 sm:py-16` |
| Contact | `Contact.tsx:14` | auto | `py-20 → sm:py-28` | `px-4 sm:px-6 lg:px-8` | `max-w-7xl` | `grid lg:grid-cols-2` | `gap-12 lg:gap-16` | תמונה `aspect-[4/3]` |
| Footer | `Footer.tsx:27` | auto | `pt-14 pb-28 → lg:pb-14` (56px top, 112px→56px bottom) | `px-4 sm:px-6 lg:px-8` | `max-w-7xl` | `grid md:grid-cols-3` | `gap-10` (40px) | `pb-28` הענק במובייל הוא **מכוון** — משאיר מקום לסרגל הפעולות הקבוע (`MobileActionBar`), לא באג |

**ערכי פיקסל קבועים שעלולים ליצור בעיית רספונסיביות (נבדק, לא נמצאה בעיה בפועל):**
- `pt-40` (160px) בהירו קבוע בכל הרוחבים, כולל 360px — נבדק ויזואלית שאין חפיפה עם ההדר (65px) כי יש שוליים גדולים בכוונה מעל הכותרת, אבל זה יוצר מרחק ריק גדול יחסית במובייל לפני שהטקסט מתחיל (ר' "שיפורים חשובים" למטה).
- `MobileActionBar.tsx:12` — `bottom-[calc(4.75rem+env(safe-area-inset-bottom))]` בבאנר העוגיות מחושב בהתאם לגובה סרגל המובייל (76px) + safe-area, נבדק שאין חפיפה ב-360px.

---

## 4. תמונות — מדידה מדויקת (מקור + כל הגרסאות שנוצרו)

| קובץ מוצג | נתיב | מקור מקורי (px) | סקשן | תצוגה/aspect-ratio | object-fit / position | srcset | lazy? | הערות |
|---|---|---|---|---|---|---|---|---|
| `hero-raphael-cutting-*.webp` | `src/assets/images/` | `hero.png` 1536×1024 | Hero | מלא מסך, `min-h-[100svh]` | `cover` / `78% center` | 640w/1024w/1536w, `sizes="100vw"` | **לא** (`loading="eager" fetchPriority="high"`, נכון עבור LCP) | היחיד עם `sizes=100vw` — טוען את הכי גדולה גם במסכים קטנים לפעמים (הדפדפן בוחר לפי צפיפות פיקסלים בפועל) |
| `about-raphael-working-*.webp` | | `cute hair.png` 1254×1254 (מקור מרובע!) | About | `aspect-[4/5]` (חתוך בשרת ל-4:5 עם sharp `attention`) | `cover` / ברירת מחדל | 640/900/1200w, `sizes="(min-width:1024px) 44vw, 100vw"` | כן | חיתוך שרת — לא cropping לקוי בדפדפן |
| `workstation-tools-*.webp` | | `place.png` 1254×1254 (מרובע) | Contact | `aspect-[4/3]` | `cover` | 640/900/1200w | כן | |
| `before-fade-portrait-*.webp` | | `befor.png` 853×1844 (פורטרט צר וגבוה) | Before/After | `aspect-[4/5]` (חיתוך קבוע וזהה ל-after, נבדק פיקסלית בסבב תיקונים קודם) | `cover` | 420/640/800w, `sizes="(min-width:640px) 448px, 90vw"` | כן | |
| `after-fade-portrait-*.webp` | | `after.png` 853×1844 | Before/After | זהה ל-before | `cover` | זהה | כן | |
| `gallery-*-500/800.webp` (5 קבצים) | | 4× `peprr*.png` 1254×1254 + חיתוך נוסף של `after.png` | Gallery | `aspect-square` | `cover`, חיתוך שרת עם `attention` (זיהוי פנים אוטומטי) | 500/800w, `sizes="(min-width:1024px) 30vw, 45vw"` | כן | תמונה חמישית (gallery-clean-fade) היא חיתוך מרובע נפרד של `after.png` — **אין באתר 5 תמונות "עבודה" ייחודיות אמיתיות, אחת מהן חוזרת (בחיתוך שונה) מתמונת ה"אחרי" של הסקשן הקודם** |
| `logo-mark-*.webp` | | `logo.png` 1402×1122, נחתך ל-930×930 (המונוגרם בלבד, ללא הכיתוב) | Header/Footer | מוצג 40×40 (הדר) / 36×36 (פוטר) מתוך קובץ 160×160/96×96 | `contain` | אין | לא (מעל הקפל) | יחס דחיסה של פי 4 בהדר — לא בזבזני, נותן חדות ב-Retina |
| `og-image.jpg` | `public/` | נגזר מ-`hero.png`, 1200×630 | מטא (שיתוף) | — | `cover`/`attention` | — | — | לא מוצג באתר עצמו, רק ב-Open Graph |

**האם יש טקסט/ממשק אינסטגרם "אפוי" בתוך תמונה?** לא — הכרטיס השישי בגלריה ("לעבודות נוספות באינסטגרם") הוא רכיב HTML/SVG (אייקון Phosphor + טקסט Tailwind), **לא תמונה**. אין טקסט "אפוי" בתוך אף תמונה באתר.

**האם איכות התמונות מספיקה לדסקטופ?** הגרסה הגדולה ביותר של כל תמונה (1200–1536px רוחב) מספקת ל-container הגדול ביותר באתר (`max-w-7xl`=1280px חצוי לרוב לשתי עמודות, כך שתמונה בודדת לעולם לא מוצגת ברוחב מלא מעל ~640px בפועל) — לא נמצאה בעיית רזולוציה.

---

## 5. כפתורים ו-CTA

| טקסט (HE/EN) | יעד | קובץ:רכיב | מידות מחושבות (1440px) | Padding | Font | Border-radius | צבע/קונטרסט | דרגה |
|---|---|---|---|---|---|---|---|---|
| קביעת תור / Book Appointment | `BUSINESS.booking` (MyTor, טאב חדש) | `Hero.tsx:44` | ~132×48px | `px-6 py-3.5` (24px/14px) | 14px/600 | `rounded-full` (9999px) | זהב על שחור (gold #C8A45D / ink) — יחס ניגודיות **8.46:1** | **ראשי** — היחיד עם רקע מלא (`bg-gold`) בהירו |
| WhatsApp | `BUSINESS.whatsapp` | `Hero.tsx:53` | ~110×48px | `px-6 py-3.5` | 14px/600 | `rounded-full` | קרם על שקוף עם border עדין | משני |
| קביעת תור (Services card CTA) | MyTor | `Services.tsx:24` (כל הכרטיס לחיץ) | הכרטיס כולו קליק, לא רק "טקסט הכפתור" | — | 14px/600 | — | טקסט זהב-בהיר, ללא רקע | טרשיארי/רמז בלבד — לא נראה כמו כפתור אמיתי |
| קביעת תור עכשיו / Book an Appointment (CTA section) | MyTor | `CTASection.tsx:14` | ~150×52px | `px-7 py-3.5` | 14px/600 | `rounded-full` | זהב על שחור | ראשי |
| קביעת תור אונליין (Contact) | MyTor | `Contact.tsx:44` | ~150×46px | `px-5 py-3` | 14px/600 | `rounded-full` | זהב על שחור | ראשי מקומי |
| WhatsApp / התקשרו / אינסטגרם (Contact) | | `Contact.tsx:53,62,69` | ~150×46px כל אחד | `px-5 py-3` | 14px/600 | `rounded-full` | outline בלבד, ללא רקע | משני (3 כפתורים באותה דרגה — עלול לטשטש היררכיה) |
| קביעת תור (Header, desktop) | MyTor | `Header.tsx:61` | ~97×40px (נמדד) | `px-5 py-2.5` | 14px/600 | `rounded-full` | זהב על שקוף | ראשי בהדר |
| קביעת תור / WhatsApp (Mobile Action Bar) | MyTor / WhatsApp | `MobileActionBar.tsx:16,25` | חצי-רוחב מסך כל אחד, גובה ~48px | `px-4 py-3` | 14px/600 | `rounded-full` | זהב מלא / outline ירוק WhatsApp (#25D366) | שני כפתורים שווי-משקל בסרגל תחתון קבוע |

**האם כפתור ההזמנה בולט מספיק?** כן — הוא **תמיד** בעל `bg-gold` מלא (הצבע הכי בהיר/בולט בפלטה) בכל מקום שהוא מופיע, בעוד כל שאר הכפתורים הם outline-בלבד או ללא רקע. יוצא דופן: **כרטיסי השירותים** (`Services.tsx`) — ה-CTA שלהם הוא טקסט זהב בלי מסגרת/רקע, כמעט בלתי-מורגש כ"כפתור" בפני עצמו (אמנם כל הכרטיס לחיץ, אבל זה לא מובן ויזואלית מיד).

---

## 6. הדר וניווט

- **גובה הדר:** נמדד בפועל = **65px**, קבוע וזהה גם במצב "לפני גלילה" וגם "אחרי גלילה" — **רק הרקע (`bg-transparent`→`bg-ink/90` + `backdrop-blur-md`) והגבול התחתון משתנים, לא הגובה.** (לא הצלחתי לאמת ויזואלית את מעבר הצבע בפועל בסביבת הבדיקה שלי — הדפדפן האוטומטי לא איפשר גלילה תוכנתית אמיתית בסשן הזה; זה מבוסס על קריאת הקוד ב-`Header.tsx:38-40` ו-`useScrolled.ts` (סף 24px), לא על מדידה חזותית חיה.)
- **לוגו:** קובץ מקור 160×160px, מוצג ב-40×40px בהדר (`Header.tsx:44`) וב-36×36px בפוטר (`Footer.tsx:31`).
- **גדלי/ריווח ניווט:** `text-sm font-medium` (14px/500), `gap-7` (28px) בין פריטים (`Header.tsx:48`).
- **Sticky/fixed:** `fixed inset-x-0 top-0 z-40` — ההדר תמיד מעל התוכן, לא sticky-רגיל.
- **התנהגות desktop/mobile:** ניווט טקסטואלי מוצג רק מ-`lg` (1024px) ומעלה; מתחת לזה — כפתור המבורגר (`h-11 w-11`=44×44px, בדיוק על הסף המינימלי).
- **תפריט נייד:** `MobileMenu.tsx` — פאנל צד (`w-[86%] max-w-sm`) עם `role="dialog"`, focus trap אמיתי (`useFocusTrap`), מרונדר דרך `createPortal` ל-`document.body` (לא מקונן בתוך ה-DOM הרגיל, כדי לתמוך ב-`inert` על שאר הדף).
- **בעיות יישור/קריאות:** לא נמצאו. הכיתוב "Raphael Barber" בהדר (`text-lg`=18px) מיושר `gap-2` (8px) מהלוגו — עקבי.
- **האם ההדר מכסה סקשנים מעוגנים (anchor)?** ההדר `fixed` בגובה 65px, אבל אין `scroll-margin-top` על אף סקשן (`#about`, `#services` וכו') — **כשקישור עוגן נלחץ, הסקשן עלול להתחיל בדיוק מתחת לקצה החלון ולהיחסם חלקית על ידי ההדר השקוף/מטושטש.** לא נמצא תיקון קיים לכך בקוד.

---

## 7. גלריה ולפני/אחרי

**גלריה (`Gallery.tsx`):**
| Breakpoint | `grid-template-columns` (נמדד) |
|---|---|
| מובייל (<640px) | 2 עמודות (`grid-cols-2`) |
| 768px | 2 עמודות (אין שינוי — `sm:grid-cols-2` זהה לברירת המחדל, כלל מיותר בקוד) |
| ≥1024px (`lg`) | 3 עמודות |

- **5 תמונות + כרטיס אינסטגרם שישי** (סה"כ 6 אריחים), כולם `aspect-square`.
- **Overlay/hover:** מסגרת זהב מופיעה ב-hover (`group-hover:border-gold`), + שכבת כהות עם אייקון זכוכית מגדלת (`MagnifyingGlassPlus`) — hover-only, לא רלוונטי למגע/מובייל (אין hover במגע, אז זה פשוט לא מופיע — לא בעיה, רק הערה).
- **Lightbox:** `role="dialog"` + `aria-modal`, ניווט מקלדת (חצים, Escape), `aria-live="polite"` מכריז על תמונה נוכחית, `createPortal` ל-body, `useBodyScrollLock`. **תקין מבחינת נגישות** לפי בדיקת קוד + בדיקה פונקציונלית בסבב עבודה קודם.
- **טקסט כפול/עומס חזותי:** לא נמצא. כל תמונה עם `alt` ייחודי ותיאורי, אין טקסט חופף.

**Before/After Slider (`BeforeAfterSlider.tsx`):**
- מיכל: `max-w-md` (448px) × `aspect-[4/5]` → **בדסקטופ 1440px זה בערך 448×560px בלבד** — קטן משמעותית ביחס לרוחב שאר הסקשנים (`max-w-7xl`=1280px), ויוצר הרבה שטח ריק מימין ומשמאל למחוון בדסקטופ רחב.
- ידית: `h-11 w-11` (44×44px — עומד בדיוק בסף המינימלי).
- **נגישות:** `role="slider"`, `aria-valuemin/max/now/text`, `aria-orientation="horizontal"`, תמיכה מלאה במקלדת (חצים, Home, End) — נבדק ועובד בפועל בסבב קודם.
- **גרירה/מגע:** משתמש ב-Pointer Events (`onPointerDown/Move/Up` + `setPointerCapture`) — מאחד עכבר ומגע במנגנון אחד, ללא קוד נפרד למגע. `touch-none` על המיכל מונע קונפליקט גלילה אנכית מול גרירה אופקית.
- **בעיה פוטנציאלית:** אין שום אינדיקציה חזותית שהאזור *כולו* לחיץ (רק הידית עצמה משדרת "גרור אותי") — משתמש עלול לנסות לגרור רק מהידית ולא לדעת שאפשר ללחוץ בכל מקום בתמונה כדי לקפוץ לשם.

---

## 8. צור קשר ופוטר

- **Contact:** גריד 2 עמודות מ-`lg` (`gap-12/16`), תמונה `aspect-[4/3]`. **4 כפתורי טקסט** (הזמנה/WhatsApp/טלפון/אינסטגרם) כולם באותה דרגה חזותית (outline) חוץ מ"הזמנה" (מלא) — ר' סעיף 5.
- **כתובת/טלפון/WhatsApp/הזמנה/אינסטגרם מופיעים פעמיים באתר:** גם בסקשן Contact וגם בפוטר (`Footer.tsx`) — **זו כפילות מכוונת** (נפוצה ומקובלת באתרי עמוד-אחד), לא שגיאה, אבל שווה לציין.
- **פוטר:** 3 עמודות מ-`md` (768px), `gap-10` (40px). למטה: שורת זכויות + 3 קישורי מדיניות (`text-xs`).
- **האם הפוטר "גדול/עמוס" מדי?** גובה הפוטר במובייל (`pt-14 pb-28`) מרגיש נדיב בגלל ה-`pb-28` הענק — אך זה **בכוונה** כדי לפנות מקום לסרגל התחתון הקבוע. בדסקטופ (`lg:pb-14`) זה חוזר לפרופורציה רגילה. לא נמצא עומס-יתר של תוכן — 3 עמודות פשוטות בלבד.

---

## 9. בדיקת רספונסיביות בפועל (7 viewports, נבדק בדפדפן חי)

| Viewport | גלישה אופקית | טקסט חופף/נחתך | ריווח מוגזם | כפתורים מתחת ל-44×44px |
|---|---|---|---|---|
| 1440×900 | **לא נמצאה** | לא | לא | קישורי טקסט בניווט/פוטר (רוחב 19–55px — טקסט inline רגיל, לא כפתורי-אייקון, מקובל); **כפתורי אייקון חברתי בפוטר (Instagram/WhatsApp/טלפון) 40×40px — מתחת לסף** |
| 1280×800 | לא נמצאה | לא | לא | (לא נבדק שוב לעומק — זהה מבנית ל-1440) |
| 1024×768 | לא נמצאה | לא | לא | גבול מדויק: בדיוק ב-1024px התפריט הדסקטופי עדיין מוצג (`lg:` = `min-width:1024px` כולל) |
| 768×1024 (טאבלט) | לא נמצאה | לא | לא | About/Contact עוברים לעמודה בודדת (כצפוי, `lg:grid-cols-2` לא פעיל עדיין) |
| 430×932 | לא נמצאה | לא | לא | **כפתורי אייקון חברתי בפוטר 40×40px, מתג שפה בפוטר ~59×30px — שניהם מתחת ל-44×44** |
| 390×844 | לא נמצאה | לא | לא | זהה ל-430 |
| 360×800 | לא נמצאה | לא | לא | זהה; אין חפיפה בין באנר עוגיות לסרגל תחתון קבוע (נבדק תכנותית — `getBoundingClientRect` על שניהם, אין חפיפה) |

**RTL/LTR:** נבדק מעבר עברית↔אנגלית ב-360px וב-1440px — **אין גלישה אופקית בשתי השפות**, `dir` מתעדכן נכון (`rtl`/`ltr`).
**קונסול:** **0 שגיאות** בכל אחד מהבדיקות (נמדד עם listener ל-`window.onerror` שאופס ונבדק בכל viewport).

---

## 10. צילומי מסך

**לא נוצרו צילומי מסך.** כלי ה-screenshot בסביבת העבודה שלי החזיר את השגיאה הבאה בכל ניסיון (גם בסשנים קודמים באותו פרויקט, לא רק עכשיו):
> `Screenshot timed out — the Browser pane is not displayed, so the page is not compositing frames.`

זו מגבלה טכנית של סביבת הריצה שלי (הדפדפן האוטומטי לא מרנדר frames בפועל בהקשר הזה) — לא בעיה באתר. תיקיית `audit-screenshots/` נוצרה אך **ריקה**; לא הוספתי אליה תמונות מדומות. מומלץ שתעשה זאת בעצמך (למשל דרך DevTools → Cmd/Ctrl+Shift+P → "Capture full size screenshot") אם צילומים אמיתיים נחוצים ל-ChatGPT.

---

## 11. בדיקות טכניות

- **שגיאות/אזהרות קונסול (runtime, בדפדפן חי):** 0.
- **`npm run lint` (oxlint):** 0 שגיאות, 3 אזהרות שוליות בלבד (`react(only-export-components)` ב-`LanguageContext.tsx:57`, `AccessibilityContext.tsx:80`, `CookieConsentContext.tsx:70`) — נובעות מכך שקבצי ה-Context מייצאים גם Provider וגם hook מאותו קובץ (תבנית נפוצה ותקינה, רק פוגעת ב-Fast Refresh בפיתוח).
- **`npm run build` (tsc + vite build):** עובר נקי, 0 שגיאות TypeScript.
- **נכסים חסרים:** לא נמצאו (כל התמונות/פונטים/robots.txt/sitemap.xml נטענים בהצלחה, נבדק דרך fetch בדפדפן).
- **קישורים שבורים / עוגנים שגויים:** נבדק תכנותית — כל 6 קישורי העוגן בניווט (`#hero`, `#about`, `#services`, `#before-after`, `#gallery`, `#contact`) מצביעים לאלמנטים קיימים. `#main-content` (Skip Link) קיים.
- **Layout shifts גלויים:** לא נצפו (לכל התמונות יש `width`/`height` מפורשים המתאימים ליחס הממדים בפועל).
- **היררכיית כותרות:** `h1` יחיד בעמוד ("התספורת שלך. הסטייל שלך.") → `h2` לכל סקשן → `h3` לכותרות כרטיסי שירות. **הערה:** כותרות הפוטר ("ניווט", "יצירת קשר") וכותרת באנר העוגיות ("עוגיות באתר") הן גם `h2` — טכנית תקין (כל אזור הוא landmark עצמאי), אך יוצר כמה `h2` "מקבילים" בעץ המסמך שכדאי לדעת עליהם.
- **צבעים בשימוש (מוגדרים ב-`index.css` תחת `@theme`):**
  | טוקן | Hex | שימוש |
  |---|---|---|
  | `--color-ink` | `#090909` | רקע ראשי |
  | `--color-ink-soft` | `#12110f` | רקע משני (About/Before-After/Footer) |
  | `--color-card` | `#181612` | רקע כרטיסים |
  | `--color-card-hover` | `#1f1c17` | hover כרטיסים |
  | `--color-hairline` | `rgba(200,164,93,0.22)` | גבולות דקים |
  | `--color-gold` | `#c8a45d` | הדגשה ראשית/כפתורים |
  | `--color-gold-light` | `#e2c27a` | הדגשה בהירה/hover |
  | `--color-cream` | `#f5f1e8` | טקסט ראשי |
  | `--color-fog` | `#b8b1a4` | טקסט משני |
  | `--color-whatsapp` | `#25d366` | (מוגדר אך לא בשימוש בפועל — הקוד משתמש ב-`#25D366` **hex ישיר** בכמה מקומות במקום בטוקן, ר' למטה) |
- **ניגודיות (מחושב, WCAG 2.1):** כל הזוגות שנבדקו עוברים AA בנוחות רבה (cream/ink 17.66:1, fog/ink 9.35:1, gold/ink 8.46:1, gold-light/ink 11.6:1, whatsapp/ink 10.04:1) — **אין ממצא קריטי בניגודיות**.
- **כפילות/התנגשות CSS:**
  - `--color-whatsapp` מוגדר ב-`@theme` אבל **לא בשימוש** — הקוד כותב `#25D366`/`#25d366` ישירות כ-arbitrary value ב-3 קבצים שונים (`Contact.tsx:57`, `MobileActionBar.tsx:29`, וכטוקן ה-CSS עצמו) — טוקן מת בפועל, אי-עקביות קלה.
  - `Gallery.tsx` מגדיר `sm:grid-cols-2` שזהה לברירת המחדל (`grid-cols-2`) — שורה מיותרת, לא משפיעה בפועל.
  - `CTASection.tsx` הוא הסקשן היחיד עם `py-20 sm:py-24` (ללא `lg:py-28` כמו כל שאר הסקשנים) — פוטנציאל לא-עקביות מכוונת-או-לא בריווח האנכי בין סקשנים בדסקטופ.
- **חוקי טיפוגרפיה לא בשימוש/מיותרים:** לא נמצאו כללי CSS "מתים" מלבד טוקן ה-WhatsApp שצוין למעלה.

---

## 12. סיכום מדורג

### קריטי לפני השקה
אין ממצא אחד שחוסם השקה מבחינת שימושיות/רספונסיביות/נגישות/המרה — **לא נמצאה גלישה אופקית, שגיאת קונסול, קישור שבור, או בעיית ניגודיות בשום viewport שנבדק.** שני הפריטים הכי קרובים ל"קריטי":

1. **כפתורי אייקון בפוטר קטנים מ-44×44px.**
   - קיים: `Footer.tsx:36-61` — שלושה כפתורי `<a>` עם `h-10 w-10` (40×40px) לאינסטגרם/WhatsApp/טלפון.
   - הבעיה: מתחת לסף המגע המינימלי המומלץ (WCAG 2.5.8 AA = 24×24px מינימום מוחלט, אך 44×44px הוא הסטנדרט המומלץ ל-touch).
   - ערך נוכחי: `h-10 w-10` (40px)
   - ערך מוצע: `h-11 w-11` (44px)
   - תוצאה צפויה: יעד מגע תקין במובייל בלי שינוי ויזואלי משמעותי.

2. **מתג שפה בפוטר נמוך מ-44px בגובה.**
   - קיים: `Footer.tsx:104-122` — כפתורים עם `py-1.5` בלבד (גובה מחושב ~30px).
   - ערך מוצע: להעלות ל-`py-2.5`+ כדי להגיע ל-44px, או להוסיף `min-h-11`.

### שיפורים ויזואליים חשובים
1. **הרווח העליון הקבוע בהירו (`pt-40`=160px) לא יורד במובייל** — `Hero.tsx:29`. במסך 360px גובהו זה חלק יחסית גדול מהמסך לפני שהעברת הטקסט מתחילה. מוצע: `pt-28 sm:pt-32 lg:pt-40` (יורד ל-112px במובייל).
2. **מחוון לפני/אחרי צר מדי ביחס לשאר האתר בדסקטופ** — `BeforeAfterSlider.tsx:74`, `max-w-md`=448px מול שאר הסקשנים ב-`max-w-7xl`=1280px. מוצע להעלות ל-`max-w-xl`/`max-w-2xl` (576–672px) בדסקטופ.
3. **היררכיית CTA לא עקבית בסקשן Contact** — 4 כפתורים (הזמנה/WhatsApp/טלפון/אינסטגרם) כמעט זהים ויזואלית חוץ מ"הזמנה". מוצע לתת ל-WhatsApp משקל שני (למשל רקע ירוק עדין) כדי ליצור מדרג ברור: ראשי → משני → שניים טרשיאריים.
4. **CTA card ב-Services לא נראה כמו כפתור** — `Services.tsx:36-39`, טקסט זהב בלי מסגרת. מוצע: להוסיף חץ+קו תחתון ב-hover או מסגרת עדינה כדי לאותת "זה לחיץ" גם כשלא עוברים עם עכבר על כל הכרטיס.
5. **גלריה: תמונה חמישית היא חיתוך חוזר של תמונת "אחרי"** — אין 5 עבודות ייחודיות אמיתיות. אם יתווספו תמונות עבודה אמיתיות נוספות בעתיד, מומלץ להחליף.
6. **`scroll-margin-top` חסר על סקשנים מעוגנים** — קישורי הניווט לא מביאים בחשבון את גובה ההדר הקבוע (65px), כך שסקשן עלול להתחיל ממש מתחת לקצה החלון. מוצע: `scroll-margin-top: 5rem` על כל `<section id="...">`.

### ליטוש אופציונלי
1. טוקן CSS מת: `--color-whatsapp` מוגדר אך לא בשימוש בפועל (הקוד כותב hex ישיר) — לאחד לשימוש בטוקן.
2. `sm:grid-cols-2` מיותר ב-`Gallery.tsx:49` (זהה לברירת המחדל) — אפשר להסיר.
3. `CTASection.tsx` חסר `lg:py-28` בהשוואה לתבנית הריווח האנכי של שאר הסקשנים — לשקול אחידות.
4. שקלול הוספת אינדיקציה חזותית קלה (למשל קו דק לאורך כל התמונה) שכל שטח מחוון הלפני/אחרי לחיץ, לא רק הידית.

---

## חלקים שלא ניתן היה למדוד/לאמת בסביבה הזו

1. **צילומי מסך אמיתיים** — כלי ה-screenshot לא זמין בסביבת הריצה שלי בכלל (ר' סעיף 10).
2. **מעבר צבע ההדר בגלילה בפועל** — הצלחתי לאשר זאת בעבר בסבבי עבודה קודמים על הפרויקט הזה, אך **בסשן הנוכחי הגלילה התוכנתית (`window.scrollTo`) לא הזיזה בפועל את `scrollY`** בדפדפן האוטומטי (כנראה מאותה סיבה שמונעת רינדור frames/screenshots) — לכן הביקורת הזו מתבססת על קריאת קוד (`Header.tsx`, `useScrolled.ts`) ולא על מדידה חזותית חיה בסשן הזה.
3. **כלי אוטומציה חיצוניים** (axe DevTools, Lighthouse, WAVE, Accessibility Insights, NVDA, VoiceOver) — לא זמינים לי כלל ככלים חיצוניים; כל בדיקות הנגישות בדוח זה מבוססות על קריאת קוד + בדיקות DOM/ARIA ישירות בדפדפן, לא על הרצת אחד מהכלים הללו.
4. **בדיקת מכשיר מגע אמיתי** (טאץ' פיזי, לא אמולציה) — כל הבדיקות בוצעו באמולציית viewport בדפדפן דסקטופ, לא במכשיר מגע אמיתי.
5. **אינטרקציית hover בפועל עם עכבר אמיתי** (כמו הרחבת גלריה, הצללת כפתורים) — נבדקה קריאת קוד + `getComputedStyle`, לא תיעוד חזותי חי של האנימציה עצמה.
