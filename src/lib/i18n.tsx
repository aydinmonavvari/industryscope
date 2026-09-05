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
      intelligence: 'هوش',
      talkEnterprise: 'تماس با تیم سازمانی',
      enterDemo: 'ورود به دموی زنده',
    },
    hero: {
      tagline: 'سیستم‌عامل هوش مصنوعی برای صنعت و زنجیره تأمین',
      wordmark: 'INDUSTRYSCOPE',
      headline: 'کل عملیات خود را یکجا ببینید.',
      subhead: 'هر سیگنال را درک کنید؛ پیش از وقوع مشکل اقدام کنید.',
      supporting: 'IndustryScope داده‌های صنعت، تولید، انبار، لجستیک و زنجیره تأمین را به یک لایه هوشمند عملیاتی متصل می‌کند.',
      scroll: 'برای کاوش، اسکرول کنید',
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
        { name: 'ScopeOS', tag: 'سیستم‌عامل پایه', desc: 'هویت، سازمان‌ها، دسترسی‌ها و DNA طراحی در خانوادهٔ Scope.' },
        { name: 'IndustryScope', tag: 'هوش صنعتی', desc: 'سیستم‌عامل هوش مصنوعی برای صنعت و زنجیره تأمین.' },
        { name: 'FinScope', tag: 'هوش مالی', desc: 'هوش بازار، ریسک و سرمایه برای تیم‌های مالی.' },
        { name: 'GoldScope', tag: 'هوش کالا', desc: 'هوش فلزات گران‌بها و کالا، به‌صورت زنده.' },
        { name: 'HealthScope', tag: 'هوش سلامت', desc: 'هوش بالینی و عملیاتی برای حوزهٔ سلامت.' },
      ],
    },
    intelligence: {
      eyebrow: 'هوش Scope',
      title: 'داده + تحلیل + بصری‌سازی + بینش هوش مصنوعی',
      desc: 'دانش صنعتی — نه پُرکنندهٔ سئو. هر مقاله روی یک پرسش عملیاتی واقعی ساخته شده و با بینش قابل اقدام هوش مصنوعی پایان می‌یابد.',
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
      ctaTitle: 'آن را روی',
      ctaTitleAccent: 'عملیاتیات خودتان',
      ctaTitle2: 'ببینید — نه یک محیط آزمایشی.',
      ctaDesc: 'شرکای طراحی یک راه‌اندازی راهنما، منابع دادهٔ متصل و بازبینی بازگشت سرمایه در ۳۰، ۶۰ و ۹۰ روز می‌گیرند.',
      bookBtn: 'رزرو جلسهٔ شریک طراحی',
      readArch: 'مطالعهٔ معماری',
    },
    footer: {
      tagline: 'مغز دیجیتال عملیات صنعتی. دیدن ← درک ← پیش‌بینی ← اقدام.',
      operational: 'همهٔ سیستم‌ها فعال',
      cols: [
        { title: 'پلتفرم', links: ['مرکز فرماندهی', 'هوشمندی موجودی', 'برج کنترل لجستیک', 'ریسک زنجیره تأمین', 'دستیار هوش مصنوعی'] },
        { title: 'اکوسیستم', links: ['ScopeOS', 'FinScope', 'GoldScope', 'HealthScope', 'IndustryScope'] },
        { title: 'هوش', links: ['صنعت', 'لجستیک', 'زنجیره تأمین', 'هوش مصنوعی', 'تولید'] },
        { title: 'شرکت', links: ['درباره', 'شرکای طراحی', 'امنیت', 'همکاری', 'تماس'] },
      ],
      copy: '© Scope — عمودی IndustryScope. ساخت نمونهٔ اولیه برای نمایش.',
      version: 'نسخهٔ ۱.۰ · نمونهٔ اولیه',
      dataSeeded: 'داده: دموی کاشته‌شده',
    },
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    otherLang: 'فارسی',
    nav: {
      platform: 'Platform', commandCenter: 'Command Center', inventory: 'Inventory',
      logistics: 'Logistics', risk: 'Risk', copilot: 'AI Copilot', ecosystem: 'Ecosystem',
      intelligence: 'Intelligence', talkEnterprise: 'Talk to Enterprise', enterDemo: 'Enter Live Demo',
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
        { name: 'ScopeOS', tag: 'Foundation OS', desc: 'Identity, organizations, permissions, design DNA across the Scope family.' },
        { name: 'IndustryScope', tag: 'Industrial Intelligence', desc: 'AI operating system for industry & supply chain.' },
        { name: 'FinScope', tag: 'Financial Intelligence', desc: 'Market, risk, and capital intelligence for finance teams.' },
        { name: 'GoldScope', tag: 'Commodity Intelligence', desc: 'Precious metals and commodity intelligence, live.' },
        { name: 'HealthScope', tag: 'Health Intelligence', desc: 'Clinical and operational intelligence for healthcare.' },
      ],
    },
    intelligence: {
      eyebrow: 'Scope Intelligence',
      title: 'Data + Analysis + Visualization + AI Insight',
      desc: 'Industrial knowledge — not generic SEO filler. Every article is built on a real operational question and ends with an AI insight you can act on.',
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
        { title: 'Platform', links: ['Command Center', 'Inventory Intelligence', 'Logistics Control Tower', 'Supply Chain Risk', 'AI Copilot'] },
        { title: 'Ecosystem', links: ['ScopeOS', 'FinScope', 'GoldScope', 'HealthScope', 'IndustryScope'] },
        { title: 'Intelligence', links: ['Industry', 'Logistics', 'Supply Chain', 'AI', 'Manufacturing'] },
        { title: 'Company', links: ['About', 'Design Partners', 'Security', 'Careers', 'Contact'] },
      ],
      copy: '© Scope — IndustryScope vertical. Prototype build for demonstration.',
      version: 'v1.0 · prototype', dataSeeded: 'data: seeded demo',
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
