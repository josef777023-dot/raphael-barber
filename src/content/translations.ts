export type Locale = "he" | "en";

export const BUSINESS = {
  name: "Raphael Barber",
  phoneDisplay: "058-499-9631",
  phoneLink: "tel:+972584999631",
  whatsapp: "https://wa.me/972584999631",
  instagram: "https://www.instagram.com/raphaelw.barber/",
  booking: "https://mytor.co.il/p/jOW3y",
  addressHe: "השושן 17, בית שמש",
  addressEn: "17 HaShoshan Street, Beit Shemesh",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("השושן 17, בית שמש"),
} as const;

interface ServiceItem {
  name: string;
  description: string;
}

interface GalleryCopy {
  heading: string;
  kicker: string;
  instagramCard: string;
  lightboxClose: string;
  lightboxNext: string;
  lightboxPrev: string;
  lightboxCounter: (current: number, total: number) => string;
}

export interface Translation {
  meta: {
    title: string;
    description: string;
  };
  skipLink: string;
  nav: {
    home: string;
    about: string;
    services: string;
    beforeAfter: string;
    gallery: string;
    contact: string;
    book: string;
    menuOpen: string;
    menuClose: string;
  };
  langSwitch: {
    label: string;
    he: string;
    en: string;
    announcement: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineGold: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
    location: string;
  };
  about: {
    kicker: string;
    heading: string;
    paragraphs: string[];
    benefits: { title: string }[];
    imageAlt: string;
  };
  services: {
    kicker: string;
    heading: string;
    items: ServiceItem[];
    cardCta: string;
  };
  beforeAfter: {
    kicker: string;
    heading: string;
    subtext: string;
    before: string;
    after: string;
    sliderLabel: string;
    instructions: string;
  };
  gallery: GalleryCopy;
  cta: {
    heading: string;
    text: string;
    button: string;
  };
  contact: {
    kicker: string;
    heading: string;
    addressLabel: string;
    phoneLabel: string;
    hoursNote: string;
    callButton: string;
    whatsappButton: string;
    bookButton: string;
    instagramButton: string;
    mapButton: string;
  };
  footer: {
    tagline: string;
    navHeading: string;
    contactHeading: string;
    rights: string;
    privacy: string;
    cookieSettings: string;
    accessibility: string;
  };
  mobileBar: {
    book: string;
    whatsapp: string;
  };
  floatingControls: {
    accessibilityLabel: string;
  };
  a11yPanel: {
    title: string;
    close: string;
    textSize: string;
    increase: string;
    decrease: string;
    reset: string;
    highContrast: string;
    grayscale: string;
    highlightLinks: string;
    reduceMotion: string;
    resetAll: string;
    disclaimer: string;
  };
  a11yStatement: {
    title: string;
    lastUpdated: string;
    body: string[];
  };
  legal: {
    title: string;
    lastUpdated: string;
    ownerTitle: string;
    ownerBody: string[];
    privacyTitle: string;
    privacyBody: string[];
    retentionTitle: string;
    retentionBody: string[];
    termsTitle: string;
    termsBody: string[];
    cookieTitle: string;
    cookieBody: string[];
    close: string;
  };
  cookieBanner: {
    title: string;
    body: string;
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
    savePreferences: string;
    essential: string;
    essentialDesc: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
    alwaysOn: string;
    privacyLink: string;
  };
}

export const translations: Record<Locale, Translation> = {
  he: {
    meta: {
      title: "Raphael Barber | מספרת גברים בבית שמש",
      description:
        "Raphael Barber — תספורות גברים, פיידים ועיצוב זקן בשושן 17, בית שמש. קביעת תור אונליין במהירות ובקלות.",
    },
    skipLink: "דלג לתוכן הראשי",
    nav: {
      home: "בית",
      about: "אודות",
      services: "שירותים",
      beforeAfter: "לפני ואחרי",
      gallery: "גלריה",
      contact: "צור קשר",
      book: "קביעת תור",
      menuOpen: "פתיחת תפריט ניווט",
      menuClose: "סגירת תפריט ניווט",
    },
    langSwitch: {
      label: "בחירת שפה",
      he: "עברית",
      en: "EN",
      announcement: "השפה הוחלפה לעברית",
    },
    hero: {
      eyebrow: "מספרת גברים בבית שמש",
      headlineLine1: "התספורת שלך.",
      headlineLine2: "הסטייל שלך.",
      headlineGold: "בדיוק של Raphael Barber",
      subtext:
        "תספורות גברים, פיידים ועיצוב זקן ברמה מקצועית — באווירה אישית ובסטנדרט גבוה בבית שמש.",
      primaryCta: "קביעת תור",
      secondaryCta: "WhatsApp",
      location: "השושן 17, בית שמש",
    },
    about: {
      kicker: "מי אנחנו",
      heading: "יותר מתספורת",
      paragraphs: [
        "כל תספורת מתחילה בשיחה קצרה — להבין מה אתם מחפשים, איך אתם רגילים להסתרק, ולאן תרצו להגיע. משם העבודה נעשית בסבלנות ובדיוק, קו אחרי קו.",
        "התספורת מותאמת לצורת הפנים, לצפיפות השיער ולאורח החיים שלכם, כך שהיא תיראה טוב לא רק ברגע שיוצאים מהכיסא, אלא גם בבית ביום-יום שלאחר מכן.",
        "גימור נקי, עבודת מספריים וסכין מדויקת, ואווירה נעימה ומקצועית לאורך כל הביקור.",
      ],
      benefits: [{ title: "התאמה אישית" }, { title: "עבודה מדויקת" }, { title: "יחס מקצועי ואישי" }],
      imageAlt: "רפאל עובד בריכוז על תספורת של לקוח בסלון",
    },
    services: {
      kicker: "מה שאנחנו מציעים",
      heading: "שירותים",
      items: [
        {
          name: "תספורת גבר",
          description: "תספורת מדויקת המותאמת לצורת הפנים ולמרקם השיער שלכם.",
        },
        {
          name: "פייד ודירוג",
          description: "מעברים חלקים ורמות דירוג נקיות, מהעדין ועד החד.",
        },
        {
          name: "עיצוב וסידור זקן",
          description: "קווים נקיים וסימטריה מדויקת לזקן שמשלים את התספורת.",
        },
        {
          name: "תספורת ועיצוב זקן",
          description: "חבילה שלמה של תספורת ועיצוב זקן במפגש אחד.",
        },
      ],
      cardCta: "קביעת תור",
    },
    beforeAfter: {
      kicker: "התוצאה",
      heading: "לפני ואחרי",
      subtext: "גררו את הקו כדי לראות את ההבדל — מאותו לקוח, מאותה ישיבה.",
      before: "לפני",
      after: "אחרי",
      sliderLabel: "מחוון השוואת לפני ואחרי",
      instructions: "השתמשו בעכבר, במגע או במקשי החצים כדי להזיז את קו ההשוואה",
    },
    gallery: {
      kicker: "תיק העבודות",
      heading: "העבודות של Raphael",
      instagramCard: "לעבודות נוספות באינסטגרם",
      lightboxClose: "סגירת תצוגה מוגדלת",
      lightboxNext: "התמונה הבאה",
      lightboxPrev: "התמונה הקודמת",
      lightboxCounter: (current, total) => `תמונה ${current} מתוך ${total}`,
    },
    cta: {
      heading: "מוכנים לתספורת הבאה שלכם?",
      text: "בחרו את השירות והשעה שנוחים לכם וקבעו תור תוך כמה רגעים.",
      button: "קביעת תור עכשיו",
    },
    contact: {
      kicker: "בואו לבקר",
      heading: "צור קשר",
      addressLabel: "כתובת",
      phoneLabel: "טלפון",
      hoursNote: "לבירור זמינות ותורים פנויים — קבעו תור אונליין או צרו קשר בטלפון / WhatsApp.",
      callButton: "התקשרו עכשיו",
      whatsappButton: "שלחו הודעת WhatsApp",
      bookButton: "קביעת תור אונליין",
      instagramButton: "עקבו באינסטגרם",
      mapButton: "פתיחה בגוגל מפות",
    },
    footer: {
      tagline: "מספרת גברים בבית שמש — דיוק, סטייל ויחס אישי.",
      navHeading: "ניווט",
      contactHeading: "יצירת קשר",
      rights: "כל הזכויות שמורות.",
      privacy: "פרטיות ועוגיות",
      cookieSettings: "הגדרות עוגיות",
      accessibility: "הצהרת נגישות",
    },
    mobileBar: {
      book: "קביעת תור",
      whatsapp: "WhatsApp",
    },
    floatingControls: {
      accessibilityLabel: "פתיחת אפשרויות נגישות",
    },
    a11yPanel: {
      title: "אפשרויות נגישות",
      close: "סגירת חלונית נגישות",
      textSize: "גודל טקסט",
      increase: "הגדלת טקסט",
      decrease: "הקטנת טקסט",
      reset: "איפוס גודל",
      highContrast: "ניגודיות גבוהה",
      grayscale: "מצב גווני אפור",
      highlightLinks: "הדגשת קישורים",
      reduceMotion: "צמצום אנימציות",
      resetAll: "איפוס כל ההעדפות",
      disclaimer:
        "החלונית משלימה עבודת נגישות שנעשתה באתר, ואינה מהווה הצהרה או תעודה על עמידה מלאה בתקן.",
    },
    a11yStatement: {
      title: "הצהרת נגישות",
      lastUpdated: "עודכן לאחרונה: אוגוסט 2026",
      body: [
        "אתר Raphael Barber נבנה מתוך כוונה לאפשר שימוש נוח ונגיש לכלל המשתמשים, כולל ניווט מלא באמצעות מקלדת, ניגודיות צבעים קריאה, טקסטים חלופיים לתמונות משמעותיות, ותמיכה בהעדפת צמצום אנימציות של הדפדפן.",
        "באתר קיימת חלונית נגישות המאפשרת התאמת גודל טקסט, הפעלת ניגודיות גבוהה, מצב גווני אפור, הדגשת קישורים וצמצום אנימציות. ההעדפות נשמרות באופן מקומי בדפדפן שלכם לביקורים הבאים.",
        "הצהרה זו אינה מהווה אישור או תעודה על עמידה מלאה בתקן הישראלי (ת״י 5568) או ברמת AA של WCAG — אנו ממשיכים לעבוד על שיפור הנגישות באתר באופן שוטף.",
        "אם נתקלתם בקושי כלשהו בשימוש באתר, או שאתם זקוקים לחלופה נגישה לקבלת השירות, נשמח שתיצרו איתנו קשר בטלפון או ב-WhatsApp שבתחתית העמוד ונסייע בהקדם האפשרי.",
      ],
    },
    legal: {
      title: "פרטיות ועוגיות",
      lastUpdated: "עודכן לאחרונה: אוגוסט 2026",
      ownerTitle: "מי אחראי על האתר",
      ownerBody: [
        "האתר מופעל עבור העסק Raphael Barber, השושן 17, בית שמש. לפניות בנושאי פרטיות ניתן ליצור קשר בטלפון או ב-WhatsApp שבתחתית העמוד.",
      ],
      privacyTitle: "מדיניות פרטיות",
      privacyBody: [
        "אתר זה הוא אתר תדמית לעסק Raphael Barber. אין בו טופס הרשמה, תשלום מקוון, או שמירה של פרטי לקוחות במאגר מידע מטעם האתר עצמו.",
        "עם זאת, כמו כל אתר אינטרנט, ספק האחסון שמריץ את האתר עשוי לעבד באופן טכני נתוני תעבורה כגון כתובת IP, סוג דפדפן ומכשיר, וזמני גישה — לצורך תפעול והגנה על השירות.",
        "האתר טוען גופנים (Google Fonts) ישירות משרתי Google, מה שעשוי לחשוף את כתובת ה-IP שלכם לגוגל בעת הטעינה. האתר אינו טוען כלי אנליטיקס או פרסום.",
        "קביעת תורים מתבצעת דרך מערכת MyTor החיצונית, ופנייה ב-WhatsApp או אינסטגרם מתבצעת דרך השירותים של Meta — כל אחד מהם כפוף למדיניות הפרטיות שלו, ולא לזו של אתר זה.",
        "האתר אינו מיועד לאיסוף מידע במכוון מקטינים, ואינו כולל מנגנון ייעודי לפנייתם.",
      ],
      retentionTitle: "שמירת מידע",
      retentionBody: [
        "העדפות שפה, נגישות והעדפת עוגיות שנבחרות באתר נשמרות בדפדפן שלכם (Local Storage) עד שתמחקו, תאפסו או תשנו אותן — ואינן נשלחות לשרת.",
        "רישומי תעבורה טכניים אצל ספק האחסון נשמרים לפי מדיניות השמירה של אותו ספק. האתר עצמו אינו שומר נתוני הזמנה כלשהם — אלה מנוהלים על ידי MyTor בהתאם למדיניותה.",
      ],
      termsTitle: "תנאי שימוש",
      termsBody: [
        "התוכן באתר זה כללי ומיועד להצגת השירותים של Raphael Barber בלבד. קביעת תורים מתבצעת דרך מערכת ההזמנות החיצונית MyTor, ובעצם השימוש בה אתם כפופים לתנאי השימוש ולמדיניות של MyTor עצמה — ולא לתנאים אלה.",
        "מדיניות ביטולים, איחורים או שינויי תור נקבעת על ידי העסק ו/או מערכת ההזמנות בעת קביעת התור, ואינה מפורטת באתר זה.",
      ],
      cookieTitle: "עוגיות ואחסון מקומי",
      cookieBody: [
        "עוגיות/אחסון חיוני: משמשים לשמירת בחירת השפה, העדפות הנגישות והעדפת העוגיות שלכם בלבד. פעילים תמיד, מכיוון שהם נדרשים לתפקוד הבסיסי של האתר.",
        "עוגיות אנליטיקה ושיווק: אינן טעונות בפועל באתר כיום — לא לפני הסכמה ולא אחריה. הבחירה שלכם בבאנר משפיעה על ההגדרה השמורה בלבד, ואינה מפעילה מעקב שאינו קיים. אם ייעשה בעתיד שימוש בכלים כאלה, נעדכן את המדיניות הזו ונבקש הסכמה מחדש לפני טעינתם.",
      ],
      close: "סגירה",
    },
    cookieBanner: {
      title: "עוגיות באתר",
      body: "אנו משתמשים באחסון חיוני בלבד לשמירת שפה, נגישות והעדפת עוגיות. כרגע האתר אינו טוען כלי אנליטיקה או שיווק כלל — הבחירה שלכם כאן נשמרת להעדפה עתידית בלבד.",
      acceptAll: "אישור הכול",
      rejectNonEssential: "דחיית עוגיות לא חיוניות",
      customize: "התאמה אישית",
      savePreferences: "שמירת העדפות",
      essential: "חיוניות",
      essentialDesc: "נדרשות לתפקוד האתר — שפה, נגישות והעדפת עוגיות. תמיד פעילות.",
      analytics: "אנליטיקה",
      analyticsDesc: "אינן בשימוש כרגע באתר. יופעלו רק באישורכם.",
      marketing: "שיווק",
      marketingDesc: "אינן בשימוש כרגע באתר. יופעלו רק באישורכם.",
      alwaysOn: "תמיד פעיל",
      privacyLink: "מדיניות פרטיות ועוגיות",
    },
  },
  en: {
    meta: {
      title: "Raphael Barber | Men's Barbershop in Beit Shemesh",
      description:
        "Raphael Barber — men's haircuts, fades, and beard styling at 17 HaShoshan Street, Beit Shemesh. Book your appointment online in seconds.",
    },
    skipLink: "Skip to main content",
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      beforeAfter: "Before & After",
      gallery: "Gallery",
      contact: "Contact",
      book: "Book Appointment",
      menuOpen: "Open navigation menu",
      menuClose: "Close navigation menu",
    },
    langSwitch: {
      label: "Language selection",
      he: "עברית",
      en: "EN",
      announcement: "Language switched to English",
    },
    hero: {
      eyebrow: "Men's Barbershop in Beit Shemesh",
      headlineLine1: "Your haircut.",
      headlineLine2: "Your style.",
      headlineGold: "Precision by Raphael Barber",
      subtext:
        "Professional men's haircuts, fades, and beard styling in a personal atmosphere with uncompromising attention to detail.",
      primaryCta: "Book Appointment",
      secondaryCta: "WhatsApp",
      location: "17 HaShoshan Street, Beit Shemesh",
    },
    about: {
      kicker: "About",
      heading: "More Than a Haircut",
      paragraphs: [
        "Every visit starts with a short conversation — understanding what you're after, how you usually wear it, and where you'd like to take it. From there, the work is patient and precise, line by line.",
        "Each cut is adapted to your face shape, hair density, and everyday routine, so it looks right the moment you leave the chair — and just as right when you style it yourself days later.",
        "Clean finishing, precise scissor and blade work, and a comfortable, professional atmosphere throughout the visit.",
      ],
      benefits: [{ title: "Personal Fit" }, { title: "Precise Craft" }, { title: "Professional Attention" }],
      imageAlt: "Raphael focused on cutting a client's hair in the barbershop",
    },
    services: {
      kicker: "What We Offer",
      heading: "Services",
      items: [
        {
          name: "Men's Haircut",
          description: "A precise cut tailored to your face shape and hair texture.",
        },
        {
          name: "Fade & Taper",
          description: "Smooth transitions and clean taper levels, from subtle to sharp.",
        },
        {
          name: "Beard Trim & Shape",
          description: "Clean lines and precise symmetry that complete the haircut.",
        },
        {
          name: "Haircut & Beard Styling",
          description: "A complete haircut and beard styling package in one sitting.",
        },
      ],
      cardCta: "Book Appointment",
    },
    beforeAfter: {
      kicker: "The Result",
      heading: "Before & After",
      subtext: "Drag the line to see the difference — same client, same sitting.",
      before: "Before",
      after: "After",
      sliderLabel: "Before and after comparison slider",
      instructions: "Use your mouse, touch, or arrow keys to move the comparison line",
    },
    gallery: {
      kicker: "Portfolio",
      heading: "Raphael's Work",
      instagramCard: "More Work on Instagram",
      lightboxClose: "Close enlarged view",
      lightboxNext: "Next image",
      lightboxPrev: "Previous image",
      lightboxCounter: (current, total) => `Image ${current} of ${total}`,
    },
    cta: {
      heading: "Ready for Your Next Haircut?",
      text: "Choose the service and time that work for you and book your appointment in just a few moments.",
      button: "Book an Appointment",
    },
    contact: {
      kicker: "Visit Us",
      heading: "Contact",
      addressLabel: "Address",
      phoneLabel: "Phone",
      hoursNote: "For availability and open slots, book online or reach out by phone or WhatsApp.",
      callButton: "Call Now",
      whatsappButton: "Message on WhatsApp",
      bookButton: "Book Online",
      instagramButton: "Follow on Instagram",
      mapButton: "Open in Google Maps",
    },
    footer: {
      tagline: "Men's barbershop in Beit Shemesh — precision, style, and personal attention.",
      navHeading: "Navigation",
      contactHeading: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy & Cookies",
      cookieSettings: "Cookie Settings",
      accessibility: "Accessibility Statement",
    },
    mobileBar: {
      book: "Book",
      whatsapp: "WhatsApp",
    },
    floatingControls: {
      accessibilityLabel: "Open accessibility options",
    },
    a11yPanel: {
      title: "Accessibility Options",
      close: "Close accessibility panel",
      textSize: "Text Size",
      increase: "Increase text size",
      decrease: "Decrease text size",
      reset: "Reset size",
      highContrast: "High Contrast",
      grayscale: "Grayscale Mode",
      highlightLinks: "Highlight Links",
      reduceMotion: "Reduce Animations",
      resetAll: "Reset all preferences",
      disclaimer:
        "This panel supplements the accessibility work already built into the site and is not a certification of full compliance.",
    },
    a11yStatement: {
      title: "Accessibility Statement",
      lastUpdated: "Last updated: August 2026",
      body: [
        "The Raphael Barber website was built with accessibility in mind, including full keyboard navigation, readable color contrast, meaningful alt text on important images, and support for the browser's reduced-motion preference.",
        "The site includes an accessibility panel that lets you adjust text size, enable high contrast, switch to grayscale, highlight links, and reduce animations. Your preferences are saved locally in your browser for future visits.",
        "This statement is not a certification of full compliance with WCAG AA or the Israeli accessibility standard (IS 5568) — we continue to work on improving accessibility across the site.",
        "If you run into any difficulty using the site, or need an accessible alternative to reach us, please contact us by phone or WhatsApp in the footer and we'll be glad to help as soon as possible.",
      ],
    },
    legal: {
      title: "Privacy & Cookies",
      lastUpdated: "Last updated: August 2026",
      ownerTitle: "Who runs this site",
      ownerBody: [
        "This site is operated for the Raphael Barber business, 17 HaShoshan Street, Beit Shemesh. For privacy questions, please contact us by phone or WhatsApp in the footer.",
      ],
      privacyTitle: "Privacy Policy",
      privacyBody: [
        "This is a brochure website for Raphael Barber. It has no registration form, no online payment, and does not store client data in a database operated by the site itself.",
        "Like any website, the hosting provider that runs the site may technically process traffic data such as IP address, browser/device type, and access times, in order to operate and protect the service.",
        "The site loads fonts (Google Fonts) directly from Google's servers, which may expose your IP address to Google when the page loads. The site does not load any analytics or advertising tools.",
        "Booking is handled through the external MyTor platform, and WhatsApp/Instagram contact goes through Meta's services — each is subject to its own privacy policy, not this site's.",
        "The site is not intended to knowingly collect information from minors, and has no dedicated mechanism for them to contact us.",
      ],
      retentionTitle: "Data Retention",
      retentionBody: [
        "Language, accessibility, and cookie preferences chosen on this site are stored in your browser (local storage) until you clear, reset, or change them — they are never sent to a server.",
        "Technical traffic logs at the hosting provider are kept per that provider's own retention policy. The site itself does not store any booking data — that is managed by MyTor under its own policy.",
      ],
      termsTitle: "Terms of Use",
      termsBody: [
        "The content on this site is general and intended only to present Raphael Barber's services. Appointments are booked through the external MyTor booking platform, and by using it you are subject to MyTor's own terms and policies — not these terms.",
        "Any cancellation, lateness, or rescheduling policy is set by the business and/or the booking platform at the time of booking, and is not detailed on this site.",
      ],
      cookieTitle: "Cookies & Local Storage",
      cookieBody: [
        "Essential cookies/storage: used only to remember your language choice, accessibility preferences, and cookie preference. Always active, as they're required for the site's basic functioning.",
        "Analytics and marketing cookies: not actually loaded on this site today — neither before nor after consent. Your choice in the banner only affects the saved setting and does not turn on tracking that doesn't exist. If such tools are used in the future, we will update this policy and ask for renewed consent before loading them.",
      ],
      close: "Close",
    },
    cookieBanner: {
      title: "Cookies on this site",
      body: "We use essential storage only to remember language, accessibility, and cookie preferences. The site does not currently load any analytics or marketing tools at all — your choice here is only saved for future reference.",
      acceptAll: "Accept All",
      rejectNonEssential: "Reject Non-Essential",
      customize: "Customize",
      savePreferences: "Save Preferences",
      essential: "Essential",
      essentialDesc: "Required for the site to work — language, accessibility, and cookie preference. Always active.",
      analytics: "Analytics",
      analyticsDesc: "Not currently used on this site. Will only be enabled with your consent.",
      marketing: "Marketing",
      marketingDesc: "Not currently used on this site. Will only be enabled with your consent.",
      alwaysOn: "Always active",
      privacyLink: "Privacy & Cookie Policy",
    },
  },
};
