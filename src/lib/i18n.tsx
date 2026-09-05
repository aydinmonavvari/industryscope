'use client'
import { createContext, useContext, useEffect, useCallback, useSyncExternalStore, ReactNode } from 'react'

// ---- Dictionary -------------------------------------------------------------
// Persian-first. Natural Iranian Persian. English mirrors structure.
// Brand wordmark "INDUSTRYSCOPE" stays English in both locales.

export const dict = {
  fa: {
    dir: 'rtl',
    langName: 'فارسی',
    otherLang: 'EN',
    nav: {
      platform: 'پلتفرم',
      commandCenter: 'مرکز فرماندهی',
      inventory: 'موجودی',
      logistics: 'لجستیک',
      risk: 'ریسک',
      copilot: 'دستیار هوش مصنوعی',
      ecosystem: 'اکوسیستم',
      intelligence: 'مقالات',
      talkEnterprise: 'قیمت‌گذاری',
      enterDemo: 'ورود به دموی زنده',
      contact: 'تماس',
    },
    hero: {
      tagline: 'سیستم‌عامل هوش مصنوعی برای صنعت و زنجیره تأمین',
      wordmark: 'INDUSTRYSCOPE',
      headline: 'کل عملیات خود را یکجا ببینید.',
      subhead: 'هر سیگنال را درک کنید؛ پیش از وقوع مشکل اقدام کنید.',
      supporting: 'IndustryScope داده‌های صنعت، تولید، انبار، لجستیک و زنجیره تأمین را به یک لایه هوشمند عملیاتی متصل می‌کند.',
      scroll: 'اسکرول کنید',
      ctaEnter: 'ورود به مرکز فرماندهی',
      ctaSee: 'تماشای هوشمندی در عمل',
      live: 'دنیای صنعتی زنده',
      fallback2d: 'نسخهٔ دو‌بعدی',
      webgl: 'حالت فضایی',
      chips: {
        see: 'دیدن', seeD: 'هر سیگنال متصل',
        understand: 'درک', understandD: 'چرا رخ می‌دهد',
        predict: 'پیش‌بینی', predictD: 'چه می‌شود',
        act: 'اقدام', actD: 'پیش از مشکل',
      },
      scene: {
        road: 'جادهٔ صنعتی',
        truck: 'کامیون IndustryScope',
        warehouse: 'انبار',
        warehouseA: 'انبار A',
        inventory: 'موجودی',
        units: 'واحد',
        capacity: 'ظرفیت',
        risk: 'ریسک',
        riskLow: 'پایین',
        sku: 'کد SKU-۲۰۴۸',
        stock: 'موجودی',
        coverage: 'پوشش',
        days: 'روز',
        forecast: 'پیش‌بینی',
        shipment: 'محمولهٔ #۱۸۴۲',
        eta: 'تاریخ رسیدن',
        delayRisk: 'ریسک تأخیر',
        inTransit: 'در حال ترانزیت',
        operational: 'فعال',
        health: 'سلامت',
        machine: 'دستگاه M-۲۰۴',
      },
    },
    liveWorld: {
      eyebrow: 'دنیای صنعتی زنده',
      title: 'یک سیستم زنده، نه مجموعه‌ای از صفحات.',
      titleAccent: 'مجموعه‌ای از صفحات.',
      desc: 'تأسیسات، انبارها، ناوگان و تأمین‌کنندگان — به‌صورت یک گراف عملیاتی واحد متصل. هر سیگنال به هوشمندی، هشدار، توصیه و ممیزی تبدیل می‌شود.',
      sites: 'تأسیسات متصل',
      events: 'جریان رویدادها',
      org: 'سازمان: pars_industrial_group',
      live: 'زنده', synced: 'همگام',
      pillars: [
        { t: 'مدل دامنهٔ نرمالایز', d: 'محدود به مستأجر، محدودیت کلید خارجی، دفتر جابجایی تغییرناپذیر.' },
        { t: 'هوش مصنوعی مبتنی بر ابزار', d: '۹ ابزار ممیزی‌شده. مدل هرگز مستقیم به دیتابیس دسترسی ندارد.' },
        { t: 'گذارهای وضعیت صریح', d: 'محموله‌ها، تأییدها، موجودی — بدون تغییرات دلخواه.' },
        { t: 'ممیزی پیش‌فرض', d: 'هر اقدام حساس ثبت می‌شود، فقط-افزایشی.' },
      ],
      signals: {
        invReceived: 'موجودی دریافت شد',
        shipDispatched: 'محموله ارسال شد',
        invLow: 'موجودی کم',
        shipDelayed: 'محموله با تأخیر',
        prodCompleted: 'تولید کامل شد',
        supplierDrop: 'کاهش زمان‌بندی تأمین‌کننده',
        machineWarn: 'هشدار دستگاه',
        invAdjusted: 'موجودی تعدیل شد',
      },
    },
    commandCenter: {
      eyebrow: 'مرکز فرماندهی اجرایی',
      title: 'چه چیزی نیاز به توجه دارد؟',
      desc: 'تجربهٔ امضای IndustryScope. مرکز فرماندهی را باز کنید و سیستم به زبان ساده می‌گوید چه می‌گذرد، چرا مهم است و چه باید کرد.',
      greeting: 'صبح بخیر.',
      attention: 'مورد نیاز به توجه شماست.',
      operationalHealth: 'سلامت عملیاتی',
      activeRisks: 'ریسک فعال',
      critical: 'بحرانی', high: 'بالا', medium: 'متوسط', low: 'پایین', info: 'اطلاع',
      kpis: {
        capital: 'سرمایهٔ درگیر (موجودی)',
        stockout: 'اقلام رو به اتمام',
        delayed: 'محموله‌های تأخیری',
        otf: 'تحویل به‌موقع کامل',
      },
      needsAttention: 'چه چیزی نیاز به توجه شما دارد',
      open: 'باز',
      topRisks: 'برجسته‌ترین ریسک‌های زنجیره تأمین',
      aiRecs: 'توصیه‌های هوش مصنوعی',
      pending: 'در انتظار',
      active: 'فعال',
      acknowledge: 'تأیید',
      acknowledged: 'تأیید شد',
      review: 'بررسی',
      preparePO: 'آماده‌سازی سفارش خرید',
      trackShipment: 'ردیابی محموله',
      source: 'منبع',
      confidence: 'اطمینان',
      impact: 'اثر',
      recommended: 'اقدام پیشنهادی',
      autonomy: ['تحلیل', 'توصیه', 'آماده‌سازی', 'تأیید انسانی', 'اجرای خودکار'],
      ago: { m: 'دقیقه پیش', h: 'ساعت پیش', d: 'روز پیش' },
    },
    inventory: {
      eyebrow: 'هوشمندی موجودی',
      title: 'ببینید چه چیزی در هر انبار',
      titleAccent: 'در معرض ریسک است.',
      desc: 'سلامت موجودی به‌هنگام، پیش‌بینی اتمام، قفل سرمایهٔ مازاد، تشخیص موجودی راکد. دفتر جابجایی پشتیبان. هر تغییر قابل ممیزی.',
      kpis: { total: 'کل SKU', stockout: 'رو به اتمام (فوری)', low: 'کم (در حال نزدیک شدن)', capital: 'سرمایهٔ درگیر' },
      tabs: { all: 'همه', stockout: 'رو به اتمام', low: 'کم', overstock: 'مازاد', healthy: 'سالم' },
      search: 'جستجوی SKU یا محصول…',
      cols: { sku: 'SKU / محصول', wh: 'انبار', onHand: 'موجودی', reorder: 'نقطهٔ سفارش', safety: 'حد ایمن', coverage: 'پوشش', capital: 'سرمایه', health: 'وضعیت' },
      movement: 'دفتر جابجایی · تغییرناپذیر · ممیزی‌شده',
      items: 'مورد از',
    },
    logistics: {
      eyebrow: 'برج کنترل لجستیک',
      title: 'هر محموله را ردیابی کنید. تأخیر را',
      titleAccent: 'پیش‌بینی کنید.',
      desc: 'وضعیت زندهٔ محموله، ETA، پیش‌بینی تأخیر، پیوند ترازنما و تأمین‌کننده. گذارهای وضعیت صریح — بدون تغییر دلخواه سمت کلاینت.',
      kpis: { open: 'محموله‌های باز', transit: 'در حال ترانزیت', delayed: 'تأخیری', delivered: 'تحویل‌شده (چرخه)' },
      pipeline: { planned: 'برنامه‌ریزی', dispatched: 'ارسال‌شده', inTransit: 'در ترانزیت', delayed: 'تأخیری', delivered: 'تحویل‌شده', cancelled: 'لغو‌شده' },
      active: 'محموله‌های فعال',
      progress: 'پیشرفت', eta: 'ETA', delay: 'تأخیر', onTime: 'به‌موقع',
      contents: 'محتویات',
      lastTracking: 'آخرین ردیابی',
      origin: 'مبدأ', dest: 'مقصد', select: 'یک محموله را برای بررسی انتخاب کنید.',
    },
    risk: {
      eyebrow: 'موتور ریسک زنجیره تأمین',
      title: 'احتمال × اثر × فوریت.',
      titleAccent: 'اولویت‌بندی‌شده.',
      desc: 'امتیازدهی چندبعدی ریسک — تأمین‌کننده، موجودی، محموله، زمان تدارک، تقاضا، تولید. هر ریسک با اقدام پیشنهادی و باند اطمینان.',
      matrix: 'ماتریس ریسک',
      supplierPerf: 'عملکرد تأمین‌کننده',
      activeRisks: 'ریسک‌های فعال — مرتب‌شده',
      onTime: 'به‌موقع', lead: 'تدارک', defect: 'نقص', risk: 'ریسک',
      prob: 'احت', impact: 'اثر', score: 'امتیاز', conf: 'اطمینان',
      dims: { inventory: 'موجودی', shipment: 'محموله', supplier: 'تأمین‌کننده', lead_time: 'زمان تدارک', demand: 'تقاضا', production: 'تولید' },
    },
    copilot: {
      eyebrow: 'دستیار هوش مصنوعی',
      title: 'از عملیاتیات خود سؤالی بپرسید.',
      titleAccent: 'پاسخ مستند بگیرید.',
      desc: 'هوش مصنوعی IndustryScope هرگز واقعیت عملیاتی نمی‌سازد. تنها بر خروجی ابزارهای ساختاریافته استدلال می‌کند، مشاهدات را از پیش‌بینی و توصیه تفکیک می‌کند و پیش از هر اقدام حساس به تأیید انسانی نیاز دارد.',
      name: 'هوش مصنوعی IndustryScope',
      meta: 'رجیستری ابزار · محدود به مستأجر · ممیزی‌شده',
      level: 'L1 توصیه',
      toolsCount: '۹ ابزار',
      welcome: 'من هوش مصنوعی IndustryScope هستم — دستیار هوش عملیاتی شما. تنها از طریق یک رجیستری ابزار کنترل‌شده روی داده‌های عملیاتی متصل شما استدلال می‌کنم؛ هر واقعیتی که می‌آورم مستند است. بپرسید چه چیزی نیاز به توجه دارد، چه رو به اتمام است یا چه باید کرد.',
      suggestions: [
        'کدام محصولات رو به اتمام‌اند و چه باید کرد؟',
        'چرا سرمایهٔ درگیر موجودی این‌قدر بالاست؟',
        'کدام محموله‌ها در معرض ریسک تأخیرند؟',
        'کدام تأمین‌کننده ضعیف عمل می‌کند و چرا؟',
        'امروز چه چیزی نیاز به توجه دارد؟',
      ],
      placeholder: 'بپرسید: امروز چه چیزی نیاز به توجه دارد؟…',
      send: 'ارسال',
      toolsLabel: 'ابزارها:',
      freshness: 'تازگی داده',
      consulting: 'در حال مشاوره با رجیستری ابزار…',
      cantReach: 'هم‌اکنون نمی‌توانم به لایهٔ هوشمندی دسترسی پیدا کنم. لطفاً دوباره تلاش کنید. (این به‌جای ساختن پاسخ نمایش داده می‌شود.)',
      trust: [
        { t: 'بدون دسترسی مستقیم به دیتابیس', d: 'مدل تنها بر خروجی صریح ابزارها استدلال می‌کند.' },
        { t: 'کنترل توهم', d: 'مشاهده، پیش‌بینی و توصیه برچسب‌گذاری می‌شوند.' },
        { t: 'ممیزی و محدود به مستأجر', d: 'هر فراخوانی ابزار با آرگومان و منبع ثبت می‌شود.' },
      ],
    },
    ecosystem: {
      eyebrow: 'اکوسیستم Scope',
      title: 'یک اکوسیستم.',
      titleAccent: 'چندین دنیا.',
      desc: 'IndustryScope بخشی از یک سیستم‌عامل بزرگ‌تر است. DNA طراحی، احراز هویت، مدل سازمان و زیرساخت هوش مشترک — هر عمودی شخصیت خودش را دارد.',
      youAreHere: 'اینجا هستید',
      shared: 'مشترک: توکن‌های طراحی · احراز هویت · سازمان‌ها · دسترسی‌ها · زیرساخت هوش · ممیزی',
      products: [
        { name: 'ScopeOS', tag: 'مدیریت کسب‌وکار', desc: 'سیستم هوشمند مدیریت کسب‌وکار: حسابداری، حقوق و دستمزد، مالیات و منابع انسانی.' },
        { name: 'IndustryScope', tag: 'هوش صنعتی', desc: 'سیستم‌عامل هوش مصنوعی برای صنعت و زنجیره تأمین.' },
        { name: 'FinScope', tag: 'هوش مالی-اقتصادی', desc: 'اولین اکوسیستم هوشمند و ابزارمحور تحلیل مالی-اقتصادی ایران.' },
        { name: 'GoldScope', tag: 'مارکت‌پلیس طلا', desc: 'مارکت‌پلیس هوشمند خرید و فروش طلا با مقایسهٔ قیمت از صدها فروشنده و کارگاه طلاسازی.' },
        { name: 'VestaScope', tag: 'املاک لوکس', desc: 'سایت هوشمند املاک لوکس منطقهٔ ۱ تهران.' },
        { name: 'HealthScope', tag: 'هوش سلامت', desc: 'پلتفرم مدیریت هوشمند کلینیک و بیمارستان‌ها، مخصوص پزشکان و دندان‌پزشکان.' },
      ],
    },
    intelligence: {
      eyebrow: 'مقالات تخصصی',
      title: 'تحلیل، بصری‌سازی و بینش هوش مصنوعی',
      desc: 'مقالات تخصصی مجموعهٔ Scope در حوزه‌های صنعت، لجستیک، زنجیرهٔ تأمین، هوش مصنوعی، تولید، اقتصاد و عملیات — با تحلیل داده، بصری‌سازی و بینش قابل اقدام هوش مصنوعی.',
      cats: ['صنعت', 'لجستیک', 'زنجیره تأمین', 'هوش مصنوعی', 'تولید', 'اقتصاد', 'عملیات'],
      aiInsight: 'بینش هوش مصنوعی',
      read: 'دقیقه مطالعه',
      articles: [
        { cat: 'زنجیره تأمین', title: 'چرا نوسان زمان تدارک، مالیات پنهان سرمایهٔ در گردش است', insight: 'یک نوسان ۱۴٪ی زمان تدارک می‌تواند ۹–۱۲٪ سرمایهٔ بیشتری را بدون افزایش محافظت از اتمام قفل کند.', delta: '+۱۴٪ زمان تدارک', stat: '۹.۲٪', statLabel: 'سرمایهٔ اضافی قفل‌شده', read: '۸' },
        { cat: 'موجودی', title: 'موجودی راکد یک عدد نیست — تصمیمی است که به تعویق انداختید', insight: '۶۷٪ مازاد توزیع‌کنندگان متوسط به ۳ سیاست سفارش لمس‌نشده برمی‌گردد.', delta: '-۲۲٪ گردش', stat: '۶۷٪', statLabel: 'مازاد ناشی از سیاست', read: '۶' },
        { cat: 'لجستیک', title: 'OTIF ویژگی سیستم است، نه کارت امتیاز ترازنما', insight: 'ترازنماها تنها ~۳۰٪ واریانس OTIF را توضیح می‌دهند؛ بقیه به برنامه‌ریزی بالادستی برمی‌گردد.', delta: '+۸ نقطه OTIF', stat: '۷۰٪', statLabel: 'ناشی از برنامه‌ریزی', read: '۷' },
      ],
    },
    enterprise: {
      eyebrow: 'سازمانی',
      title: 'ساخته‌شده برای مشتریان صنعتی واقعی.',
      titleAccent: 'قیمت‌گذاری بر اساس بازگشت سرمایه.',
      desc: 'بسته‌بندی با تأسیسات، ماژول‌ها، حجم داده و مصرف هوش مقیاس می‌یابد — نه فقط تعداد کاربر. شرکای طراحی نتایج قابل اندازه‌گیری می‌گیرند: اتمام کمتر، راکد کمتر، OTIF بالاتر.',
      mostChosen: 'پرطرفدارترین',
      tiers: [
        { name: 'استارتر', desc: 'موجودی + لجستیک + مرکز فرماندهی.', features: ['چند تأسیسه و انبار', 'سلامت موجودی به‌هنگام', 'ردیابی محموله', 'موتور ریسک و هشدار', 'وارد کردن اکسل/CSV'], cta: 'شروع با استارتر' },
        { name: 'رشد', desc: 'زنجیره تأمین + تدارک + دستیار هوش مصنوعی.', features: ['همهٔ امکانات استارتر', 'تدارک و تأییدها', 'هوش تأمین‌کننده', 'دستیار هوش (رجیستری ابزار)', 'REST API و وب‌هوک', 'هوش Scope'], cta: 'مقیاس با رشد' },
        { name: 'سازمانی', desc: 'هوش کامل + یکپارچه‌سازی‌ها + هوش مصنوعی پیشرفته.', features: ['همهٔ امکانات رشد', 'یکپارچه‌سازی اختصاصی ERP', 'عامل‌های هوش و اتوماسیون گردش کار', 'نگهداری پیش‌بینانه', 'همزن دیجیتال (نقشه راه)', 'استقرار خصوصی', 'SSO و RBAC پیشرفته'], cta: 'تماس با تیم سازمانی' },
      ],
      ctaTitle: 'آن را روی ',
      ctaTitleAccent: 'عملیاتیات خودتان ',
      ctaTitle2: 'ببینید — نه یک محیط آزمایشی.',
      ctaDesc: 'شرکای طراحی یک راه‌اندازی راهنما، منابع دادهٔ متصل و بازبینی بازگشت سرمایه در ۳۰، ۶۰ و ۹۰ روز می‌گیرند.',
      bookBtn: 'رزرو جلسهٔ شریک طراحی',
      readArch: 'مطالعهٔ معماری',
    },
    footer: {
      tagline: 'مغز دیجیتال عملیات صنعتی. دیدن ← درک ← پیش‌بینی ← اقدام.',
      operational: 'همهٔ سیستم‌ها فعال',
      cols: [
        { title: 'پلتفرم', links: ['مرکز فرماندهی', 'هوشمندی موجودی', 'برج کنترل لجستیک', 'ریسک زنجیره تأمین', 'دستیار هوش مصنوعی', 'مقالات'] },
        { title: 'اکوسیستم', links: ['ScopeOS', 'FinScope', 'GoldScope', 'VestaScope', 'HealthScope', 'IndustryScope'] },
        { title: 'مقالات', links: ['صنعت', 'لجستیک', 'زنجیره تأمین', 'هوش مصنوعی', 'تولید', 'اقتصاد', 'عملیات'] },
        { title: 'شرکت', links: ['قیمت‌گذاری', 'شرکای طراحی', 'حریم خصوصی', 'شرایط استفاده', 'تماس'] },
      ],
      copy: 'تمامی حقوق این مجموعه برای Scope محفوظ است.',
      founder: 'سازنده و مؤسس مجموعه‌های Scope: آیدین منوری',
    },
    contact: {
      eyebrow: 'تماس با ما',
      title: 'بیایید IndustryScope شما را بسازیم.',
      titleAccent: 'همین امروز شروع کنید',
      desc: 'آماده‌اید عملیاتیات خود را به یک لایهٔ هوشمند متصل کنید؟ تیم ما در یک روز کاری پاسخ می‌دهد. جلسهٔ دمو رایگان است.',
      phoneLabel: 'تلفن تماس',
      emailLabel: 'ایمیل',
      addressLabel: 'آدرس',
      hoursLabel: 'ساعات کاری',
      whatsapp: 'واتساپ',
      telegram: 'تلگرام',
      callNow: 'همین حالا تماس بگیرید',
      success: 'پیام شما ثبت شد. تیم ما به‌زودی تماس می‌گیرد. ممنون!',
      successNews: 'ثبت‌نام خبرنامه انجام شد. ممنون!',
      duplicateNews: 'ایمیل شما قبلاً ثبت شده است.',
    },
    forms: {
      name: 'نام و نام خانوادگی', email: 'ایمیل', phone: 'شماره تماس', company: 'شرکت',
      role: 'سمت', country: 'کشور', message: 'پیام شما', tier: 'بستهٔ موردنظر',
      sites: 'تعداد تأسیسات', submit: 'ارسال درخواست', submitting: 'در حال ارسال…',
      newsletterPlaceholder: 'ایمیل شما برای خبرنامه',
      subscribe: 'عضویت در خبرنامه',
      nameReq: 'نام الزامی است', emailReq: 'ایمیل معتبر الزامی است', messageReq: 'پیام الزامی است',
      demoTitle: 'درخواست دمو', quoteTitle: 'درخواست استعلام قیمت',
      selectTier: 'انتخاب بسته', sitesHint: 'تأسیسات عملیاتی شما',
    },
    owner: {
      navLabel: 'پنل مالک',
      title: 'پنل مدیریت IndustryScope',
      desc: 'دسترسی به لیدها و درخواست‌های دریافتی از وب‌سایت.',
      passcodeLabel: 'کد دسترسی',
      passcodePlaceholder: 'کد ۸ رقمی',
      login: 'ورود', logout: 'خروج',
      wrong: 'کد دسترسی نادرست است.',
      stats: { total: 'کل لیدها', new: 'جدید', contacted: 'تماس‌گرفته‌شده', qualified: 'تأییدشده', won: 'برنده‌شده', newsletter: 'مشترکین خبرنامه' },
      leadType: { contact: 'تماس', demo: 'دمو', quote: 'استعلام', partnership: 'همکاری', newsletter: 'خبرنامه' },
      status: { new: 'جدید', contacted: 'تماس‌گرفته', qualified: 'تأییدشده', won: 'برنده‌شده', lost: 'باخته‌شده' },
      setStatus: 'تغییر وضعیت', delete: 'حذف', noLeads: 'هنوز لیدی ثبت نشده است.',
      tableCols: { type: 'نوع', name: 'نام', contact: 'تماس', company: 'شرکت', message: 'پیام', date: 'تاریخ', status: 'وضعیت' },
    },
    testimonials: {
      eyebrow: 'آنچه شرکای طراحی می‌گویند',
      title: 'نتایج واقعی، از مشتریان واقعی.',
    },
    legal: {
      privacy: 'حریم خصوصی', terms: 'شرایط استفاده', cookie: 'سیاست کوکی',
      privacyBody: 'IndustryScope به حریم خصوصی شما احترام می‌گذارد. داده‌های تماس شما تنها برای پاسخ و ارائهٔ خدمات استفاده می‌شود و بدون رضایت به اشتراک‌گذاری نمی‌شود.',
      termsBody: 'با استفاده از IndustryScope، شما با شرایط سرویس موافقت می‌کنید. این یک نمونهٔ نمایشی است؛ قرارداد نهایی پیش از قرارداد تجاری امضا می‌شود.',
    },
    actions: {
      approve: 'تأیید', execute: 'اجرا', resolve: 'حل‌شده', snooze: 'تعویق',
      adjust: 'تعدیل', advance: 'پیشرفت وضعیت',
      approved: 'تأیید شد', executed: 'اجرا شد', resolved: 'حل‌شد',
      snoozed: 'به تعویق افتاد', adjusted: 'موجودی تعدیل شد', advanced: 'وضعیت محموله پیش رفت',
      snoozeHours: '۲۴ ساعت',
      needApproveFirst: 'ابتدا باید تأیید شود',
      adjustTitle: 'تعدیل موجودی', adjustDelta: 'تغییر (+/-)', adjustReason: 'دلیل',
      confirm: 'تأیید', cancel: 'انصراف',
    },
    toasts: {
      leadOk: 'درخواست شما ثبت شد ✓', newsOk: 'در خبرنامه عضو شدید ✓', newsDup: 'قبلاً عضو شده‌اید',
      err: 'خطایی رخ داد. دوباره تلاش کنید.',
    },
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    otherLang: 'فارسی',
    nav: {
      platform: 'Platform', commandCenter: 'Command Center', inventory: 'Inventory',
      logistics: 'Logistics', risk: 'Risk', copilot: 'AI Copilot', ecosystem: 'Ecosystem',
      intelligence: 'Articles', talkEnterprise: 'Pricing', enterDemo: 'Enter Live Demo',
      contact: 'Contact',
    },
    hero: {
      tagline: 'AI Operating System for Industry & Supply Chain',
      wordmark: 'INDUSTRYSCOPE',
      headline: 'See Your Entire Operation.',
      subhead: 'Understand Every Signal. Act Before the Problem.',
      supporting: 'IndustryScope connects industrial operations, supply chains, logistics and intelligence in one living system.',
      scroll: 'Scroll to explore',
      ctaEnter: 'Enter Live Command Center',
      ctaSee: 'See Intelligence in Action',
      live: 'LIVE INDUSTRIAL WORLD',
      fallback2d: '2D · fallback',
      webgl: 'WebGL · spatial',
      chips: {
        see: 'See', seeD: 'Every signal connected',
        understand: 'Understand', understandD: 'Why it is happening',
        predict: 'Predict', predictD: 'What happens next',
        act: 'Act', actD: 'Before the problem',
      },
      scene: {
        road: 'INDUSTRIAL ROAD',
        truck: 'INDUSTRYSCOPE TRUCK',
        warehouse: 'WAREHOUSE',
        warehouseA: 'WAREHOUSE A',
        inventory: 'Inventory', units: 'units', capacity: 'Capacity', risk: 'Risk', riskLow: 'LOW',
        sku: 'SKU-2048', stock: 'Stock', coverage: 'Coverage', days: 'days', forecast: 'Forecast',
        shipment: 'SHIPMENT #1842', eta: 'ETA', delayRisk: 'Delay Risk', inTransit: 'IN TRANSIT',
        operational: 'Operational', health: 'Health', machine: 'Machine M-204',
      },
    },
    liveWorld: {
      eyebrow: 'The Live Industrial World',
      title: 'A living system, not a ', titleAccent: 'collection of screens.',
      desc: 'Sites, facilities, warehouses, fleets, suppliers — connected as one operational graph. Every signal flows into intelligence, alerts, recommendations, and audit.',
      sites: 'Connected Sites', events: 'Event Stream',
      org: 'org: pars_industrial_group',
      live: 'LIVE', synced: 'SYNCED',
      pillars: [
        { t: 'Normalized domain model', d: 'Tenant-bound, FK-constrained, immutable movement ledger.' },
        { t: 'Tool-registry AI', d: '9 audited tools. Model never touches the database.' },
        { t: 'Explicit state transitions', d: 'Shipments, approvals, inventory — no arbitrary mutation.' },
        { t: 'Audit by default', d: 'Every sensitive action recorded, append-only.' },
      ],
      signals: {
        invReceived: 'inventory.received', shipDispatched: 'shipment.dispatched', invLow: 'inventory.low_stock',
        shipDelayed: 'shipment.delayed', prodCompleted: 'production.completed', supplierDrop: 'supplier.on_time_drop',
        machineWarn: 'machine.warning', invAdjusted: 'inventory.adjusted',
      },
    },
    commandCenter: {
      eyebrow: 'Executive Command Center',
      title: 'What needs my attention?',
      desc: "The signature IndustryScope experience. Open the command center and the system tells you — in plain language — what is happening, why it matters, and what to do.",
      greeting: 'Good morning.',
      attention: 'things need your attention.',
      operationalHealth: 'Operational Health',
      activeRisks: 'active risks',
      critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low', info: 'Info',
      kpis: { capital: 'Capital Locked (Inventory)', stockout: 'Stockout Items', delayed: 'Delayed Shipments', otf: 'On-Time in-Full (OTIF)' },
      needsAttention: 'What needs your attention',
      open: 'open', topRisks: 'Top Supply Chain Risks', aiRecs: 'AI Recommendations',
      pending: 'pending', active: 'active',
      acknowledge: 'Acknowledge', acknowledged: 'Acknowledged', review: 'Review',
      preparePO: 'Prepare Purchase Order', trackShipment: 'Track Shipment',
      source: 'source', confidence: 'Confidence', impact: 'Impact', recommended: 'Recommended Action',
      autonomy: ['Analyze', 'Recommend', 'Prepare', 'Human Approval', 'Autonomous'],
      ago: { m: 'm ago', h: 'h ago', d: 'd ago' },
    },
    inventory: {
      eyebrow: 'Inventory Intelligence',
      title: 'See what is ', titleAccent: 'at risk across every warehouse',
      desc: 'Real-time stock health, stockout prediction, overstock capital lock, dead-stock detection. Movement ledger backed. Every change auditable.',
      kpis: { total: 'Total SKUs Tracked', stockout: 'Stockout (immediate)', low: 'Low Stock (approaching)', capital: 'Capital Locked' },
      tabs: { all: 'All', stockout: 'Stockout', low: 'Low Stock', overstock: 'Overstock', healthy: 'Healthy' },
      search: 'Search SKU or product…',
      cols: { sku: 'SKU / Product', wh: 'Warehouse', onHand: 'On Hand', reorder: 'Reorder Pt', safety: 'Safety', coverage: 'Coverage', capital: 'Capital', health: 'Health' },
      movement: 'movement ledger · immutable · audited', items: 'items of',
    },
    logistics: {
      eyebrow: 'Logistics Control Tower',
      title: 'Track every shipment. ', titleAccent: 'Predict delays.',
      desc: 'Live shipment status, ETA, delay prediction, carrier and supplier linkage. Explicit state transitions — no arbitrary client-side mutation.',
      kpis: { open: 'Open Shipments', transit: 'In Transit', delayed: 'Delayed', delivered: 'Delivered (cycle)' },
      pipeline: { planned: 'Planned', dispatched: 'Dispatched', inTransit: 'In Transit', delayed: 'Delayed', delivered: 'Delivered', cancelled: 'Cancelled' },
      active: 'Active Shipments', progress: 'Progress', eta: 'ETA', delay: 'Delay', onTime: 'on time',
      contents: 'Contents', lastTracking: 'Last Tracking', origin: 'Origin', dest: 'Destination', select: 'Select a shipment to inspect.',
    },
    risk: {
      eyebrow: 'Supply Chain Risk Engine',
      title: 'Probability × Impact × Urgency. ', titleAccent: 'Prioritized.',
      desc: 'Multi-dimensional risk scoring — supplier, inventory, shipment, lead time, demand, production. Every risk carries a recommended action and a confidence band.',
      matrix: 'Risk Matrix', supplierPerf: 'Supplier Performance', activeRisks: 'Active Risks — ranked',
      onTime: 'On-time', lead: 'Lead', defect: 'Defect', risk: 'risk',
      prob: 'P', impact: 'I', score: 'Score', conf: 'Conf',
      dims: { inventory: 'Inventory', shipment: 'Shipment', supplier: 'Supplier', lead_time: 'Lead Time', demand: 'Demand', production: 'Production' },
    },
    copilot: {
      eyebrow: 'AI Copilot',
      title: 'Ask your operation a question. ', titleAccent: 'Get a sourced answer.',
      desc: "IndustryScope AI never invents operational facts. It reasons over structured tool results, labels observations vs predictions vs recommendations, and requires human approval before any sensitive action.",
      name: 'IndustryScope AI',
      meta: 'tool-registry · tenant-bound · audited', level: 'L1 Recommend', toolsCount: '9 tools',
      welcome: "I'm IndustryScope AI — your operational intelligence copilot. I reason only over your connected operational data through a controlled tool registry, so every fact I cite is sourced. Ask me what needs your attention, what may stock out, or what to do next.",
      suggestions: [
        'Which products may stock out and what should I do?',
        'Why is my inventory capital so high?',
        'Which shipments are at risk of delay?',
        'Which supplier is underperforming and why?',
        'What needs my attention today?',
      ],
      placeholder: 'Ask: what needs my attention today?…',
      send: 'Send', toolsLabel: 'tools:', freshness: 'data freshness',
      consulting: 'Consulting tool registry…',
      cantReach: "I couldn't reach the intelligence layer right now. Please retry. (This is shown instead of fabricating an answer.)",
      trust: [
        { t: 'No direct DB access', d: 'Model reasons only over explicit tool outputs.' },
        { t: 'Hallucination control', d: 'Observations vs predictions vs recommendations are labeled.' },
        { t: 'Audited & tenant-bound', d: 'Every tool call logged with args and resource.' },
      ],
    },
    ecosystem: {
      eyebrow: 'The Scope Ecosystem',
      title: 'One ecosystem. ', titleAccent: 'Multiple worlds.',
      desc: 'IndustryScope is part of a larger operating system. Shared design DNA, authentication, organization model, and AI infrastructure — each vertical keeps its own personality.',
      youAreHere: 'YOU ARE HERE',
      shared: 'shared: design tokens · auth · organizations · permissions · AI infrastructure · audit',
      products: [
        { name: 'ScopeOS', tag: 'Business Management', desc: 'Smart business management system: accounting, payroll, tax, and human resources.' },
        { name: 'IndustryScope', tag: 'Industrial Intelligence', desc: 'AI operating system for industry & supply chain.' },
        { name: 'FinScope', tag: 'Financial-Economic Intelligence', desc: 'Iran\'s first smart, tool-driven financial-economic analysis ecosystem.' },
        { name: 'GoldScope', tag: 'Gold Marketplace', desc: 'Smart gold marketplace: buy and sell gold with price comparison across hundreds of sellers and gold workshops.' },
        { name: 'VestaScope', tag: 'Luxury Real Estate', desc: 'Smart luxury real estate platform for District 1, Tehran.' },
        { name: 'HealthScope', tag: 'Health Intelligence', desc: 'Smart clinic and hospital management platform for doctors and dentists.' },
      ],
    },
    intelligence: {
      eyebrow: 'Expert Articles',
      title: 'Analysis, Visualization & AI Insight',
      desc: 'Expert articles from the Scope family across industry, logistics, supply chain, AI, manufacturing, economy and operations — with data analysis, visualization and actionable AI insight.',
      cats: ['Industry', 'Logistics', 'Supply Chain', 'AI', 'Manufacturing', 'Economy', 'Operations'],
      aiInsight: 'AI Insight', read: 'min read',
      articles: [
        { cat: 'Supply Chain', title: 'Why lead-time volatility is the hidden tax on working capital', insight: 'A 14% lead-time swing can lock 9–12% more capital in inventory without raising stockout protection.', delta: '+14% lead time', stat: '9.2%', statLabel: 'extra capital locked', read: '8' },
        { cat: 'Inventory', title: 'Dead stock is not a number — it is a decision you kept postponing', insight: '67% of overstock at mid-size distributors traces back to 3 untouched reorder policies.', delta: '-22% turnover', stat: '67%', statLabel: 'policy-driven overstock', read: '6' },
        { cat: 'Logistics', title: 'OTIF is a system property, not a carrier scorecard', insight: 'Carriers explain only ~30% of OTIF variance; upstream planning explains the rest.', delta: '+8 pts OTIF', stat: '70%', statLabel: 'planning-driven', read: '7' },
      ],
    },
    enterprise: {
      eyebrow: 'Enterprise',
      title: 'Built for real industrial customers. ', titleAccent: 'Priced for ROI.',
      desc: 'Packaging scales with sites, modules, data volume, and AI usage — not just seat count. Design partners ship measurable outcomes: fewer stockouts, less dead stock, higher OTIF.',
      mostChosen: 'MOST CHOSEN',
      tiers: [
        { name: 'Starter', desc: 'Inventory + Logistics + Command Center.', features: ['Multi-site & warehouse', 'Real-time stock health', 'Shipment tracking', 'Risk & alert engine', 'Excel/CSV import'], cta: 'Start with Starter' },
        { name: 'Growth', desc: 'Supply Chain + Procurement + AI Copilot.', features: ['Everything in Starter', 'Procurement & approvals', 'Supplier intelligence', 'AI Copilot (tool-registry)', 'REST API & webhooks', 'Scope Intelligence'], cta: 'Scale with Growth' },
        { name: 'Enterprise', desc: 'Full intelligence + integrations + advanced AI.', features: ['Everything in Growth', 'Custom ERP integrations', 'AI agents & workflow automation', 'Predictive maintenance', 'Digital twin (roadmap)', 'Private deployment', 'SSO & advanced RBAC'], cta: 'Talk to Enterprise' },
      ],
      ctaTitle: 'See it on ', ctaTitleAccent: 'your operation', ctaTitle2: ' — not a sandbox.',
      ctaDesc: 'Design partners get a guided onboarding, connected data sources, and a measurable ROI review at 30, 60, and 90 days.',
      bookBtn: 'Book a design-partner session', readArch: 'Read the architecture',
    },
    footer: {
      tagline: 'The Digital Brain of Industrial Operations. SEE → UNDERSTAND → PREDICT → ACT.',
      operational: 'All systems operational',
      cols: [
        { title: 'Platform', links: ['Command Center', 'Inventory Intelligence', 'Logistics Control Tower', 'Supply Chain Risk', 'AI Copilot', 'Articles'] },
        { title: 'Ecosystem', links: ['ScopeOS', 'FinScope', 'GoldScope', 'VestaScope', 'HealthScope', 'IndustryScope'] },
        { title: 'Articles', links: ['Industry', 'Logistics', 'Supply Chain', 'AI', 'Manufacturing', 'Economy', 'Operations'] },
        { title: 'Company', links: ['Pricing', 'Design Partners', 'Privacy', 'Terms', 'Contact'] },
      ],
      copy: 'All rights reserved by Scope.',
      founder: 'Creator & Founder of the Scope product family: Aidin Manouri',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build your IndustryScope.",
      titleAccent: 'Start today.',
      desc: 'Ready to connect your operations to an intelligent layer? Our team replies within one business day. Demo sessions are free.',
      phoneLabel: 'Phone', emailLabel: 'Email', addressLabel: 'Address', hoursLabel: 'Working hours',
      whatsapp: 'WhatsApp', telegram: 'Telegram', callNow: 'Call now',
      success: 'Your message has been received. Our team will reach out shortly. Thank you!',
      successNews: 'Subscribed to the newsletter. Thank you!',
      duplicateNews: 'You are already subscribed.',
    },
    forms: {
      name: 'Full name', email: 'Email', phone: 'Phone', company: 'Company',
      role: 'Role', country: 'Country', message: 'Your message', tier: 'Preferred tier',
      sites: 'Number of sites', submit: 'Submit request', submitting: 'Submitting…',
      newsletterPlaceholder: 'Your email for the newsletter',
      subscribe: 'Subscribe',
      nameReq: 'Name is required', emailReq: 'A valid email is required', messageReq: 'Message is required',
      demoTitle: 'Request a demo', quoteTitle: 'Request a quote',
      selectTier: 'Select tier', sitesHint: 'Your operational sites',
    },
    owner: {
      navLabel: 'Owner panel',
      title: 'IndustryScope Owner Dashboard',
      desc: 'Access leads and requests collected from the website.',
      passcodeLabel: 'Access passcode', passcodePlaceholder: '8-digit code',
      login: 'Sign in', logout: 'Sign out',
      wrong: 'Invalid passcode.',
      stats: { total: 'Total leads', new: 'New', contacted: 'Contacted', qualified: 'Qualified', won: 'Won', newsletter: 'Newsletter subscribers' },
      leadType: { contact: 'Contact', demo: 'Demo', quote: 'Quote', partnership: 'Partnership', newsletter: 'Newsletter' },
      status: { new: 'New', contacted: 'Contacted', qualified: 'Qualified', won: 'Won', lost: 'Lost' },
      setStatus: 'Set status', delete: 'Delete', noLeads: 'No leads yet.',
      tableCols: { type: 'Type', name: 'Name', contact: 'Contact', company: 'Company', message: 'Message', date: 'Date', status: 'Status' },
    },
    testimonials: {
      eyebrow: 'What design partners say',
      title: 'Real results, from real customers.',
    },
    legal: {
      privacy: 'Privacy', terms: 'Terms', cookie: 'Cookie Policy',
      privacyBody: 'IndustryScope respects your privacy. Your contact data is used only to respond and provide services, and is never shared without consent.',
      termsBody: 'By using IndustryScope you agree to the terms of service. This is a demonstration; the final agreement is signed before a commercial engagement.',
    },
    actions: {
      approve: 'Approve', execute: 'Execute', resolve: 'Resolve', snooze: 'Snooze',
      adjust: 'Adjust', advance: 'Advance status',
      approved: 'Approved', executed: 'Executed', resolved: 'Resolved',
      snoozed: 'Snoozed', adjusted: 'Inventory adjusted', advanced: 'Shipment advanced',
      snoozeHours: '24 hours',
      needApproveFirst: 'Must approve first',
      adjustTitle: 'Adjust inventory', adjustDelta: 'Delta (+/-)', adjustReason: 'Reason',
      confirm: 'Confirm', cancel: 'Cancel',
    },
    toasts: {
      leadOk: 'Your request was submitted ✓', newsOk: 'Subscribed ✓', newsDup: 'Already subscribed',
      err: 'Something went wrong. Please try again.',
    },
  },
} as const

export type Lang = 'fa' | 'en'
type Dict = typeof dict.fa

// ---- Context ----------------------------------------------------------------
type Ctx = { t: Dict; lang: Lang; setLang: (l: Lang) => void; toggle: () => void; dir: 'rtl' | 'ltr' }
const I18nContext = createContext<Ctx | null>(null)

// External store (lint-clean, hydration-safe). SSR snapshot = 'fa'.
// We keep the snapshot constant during hydration to avoid mismatches,
// then reconcile from localStorage in a post-mount effect (lint-clean because
// it mutates the external store + notifies listeners, not React state directly).
let currentLang: Lang = 'fa'
const listeners = new Set<() => void>()
function getLangSnap(): Lang { return currentLang }
function subscribeLang(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  listeners.add(cb)
  return () => listeners.delete(cb)
}
function setStoreLang(l: Lang) {
  if (currentLang === l && typeof document !== 'undefined') {
    // still reflect on DOM
  }
  currentLang = l
  try { if (typeof localStorage !== 'undefined') localStorage.setItem('industryscope.lang', l) } catch {}
  if (typeof document !== 'undefined') {
    const el = document.documentElement
    el.lang = l
    el.dir = l === 'fa' ? 'rtl' : 'ltr'
  }
  listeners.forEach(fn => fn())
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, getLangSnap, () => 'fa' as Lang)
  // Reconcile persisted preference after mount (external store mutation — lint-clean).
  useEffect(() => {
    try {
      const s = (typeof localStorage !== 'undefined' ? localStorage.getItem('industryscope.lang') : null) as Lang | null
      if (s && s !== lang && (s === 'fa' || s === 'en')) setStoreLang(s)
    } catch {}
    const el = document.documentElement
    el.lang = lang
    el.dir = lang === 'fa' ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = useCallback((l: Lang) => setStoreLang(l), [])
  const toggle = useCallback(() => setStoreLang(lang === 'fa' ? 'en' : 'fa'), [lang])

  return (
    <I18nContext.Provider value={{ t: dict[lang] as Dict, lang, setLang, toggle, dir: lang === 'fa' ? 'rtl' : 'ltr' }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): Ctx {
  const c = useContext(I18nContext)
  if (!c) throw new Error('useI18n must be used within I18nProvider')
  return c
}
