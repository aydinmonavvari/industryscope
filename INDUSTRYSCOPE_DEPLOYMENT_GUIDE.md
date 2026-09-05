# راهنمای کامل دیپلوی IndustryScope — صفر تا صد

> این راهنما قدم‌به‌قدم، شما را از کد فعلی تا سایت زنده روی دامنهٔ اصلی همراهی می‌کند.
> روش پیشنهادی: **Supabase (PostgreSQL)** + **Vercel** + دامنهٔ **ParsPack**.

---

## پیش‌نیازها

1. یک حساب **GitHub** (کد را آنجا push می‌کنید).
2. یک حساب **Supabase** (رایگان — https://supabase.com) برای پایگاه دادهٔ PostgreSQL.
3. یک حساب **Vercel** (رایگان — https://vercel.com) برای هاستینگ.
4. دامنهٔ خریداری‌شده از **ParsPack** (مثلاً `industryscope.ir`).
5. **Node.js 18+** و **Bun** روی سیستم محلی (برای تست نهایی).

---

## قدم ۱ — کد را به GitHub ببرید

اگر هنوز repo نساخته‌اید:

```bash
cd /home/z/my-project
git init
git add .
git commit -m "feat: IndustryScope production-ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/industryscope.git
git push -u origin main
```

> نکته: مطمئن شوید `.gitignore` شامل `node_modules`, `.next`, `.env` است (پروژهٔ فعلی دارد).

---

## قدم ۲ — پایگاه دادهٔ PostgreSQL در Supabase بسازید

1. وارد https://supabase.com شوید → **New Project**.
2. نام: `industryscope`، منطقه: `Frankfurt` (نزدیک‌ترین به ایران با تاخیر کم).
3. یک رمز قوی برای database بگذارید و ذخیره کنید.
4. پس از ساخت پروژه، به **Settings → Database → Connection string → URI** بروید.
5. آن رشته را کپی کنید — شبیه این است:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxx.supabase.co:5432/postgres
   ```
6. جای `[YOUR-PASSWORD]` رمزی که تنظیم کردید را بگذارید. این `DATABASE_URL` شماست.

---

## قدم ۳ — اسکیمای Prisma را به PostgreSQL سوییچ کنید

در فایل `prisma/schema.prisma`، خط ۱۰ را تغییر دهید:

```prisma
datasource db {
  provider = "postgresql"   // ← از "sqlite" به "postgresql"
  url      = env("DATABASE_URL")
}
```

> این تنها تغییری است که لازم است. تمام مدل‌ها (Organization، Product، Lead، Article، ...) با PostgreSQL سازگارند چون از قبل با این منطق نوشته شده‌اند (پول به‌صورت String/Decimal، هیچ نوع SQLite-only‌ای استفاده نشده).

---

## قدم ۴ — متغیرهای محیطی را آماده کنید

یک فایل `.env` محلی برای تست، و در Vercel برای production تنظیم کنید:

```env
# Production (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres

# پنل مدیریت — یک رمز قوی انتخاب کنید (این کد دسترسی به لیدهاست)
OWNER_PASSCODE=یک_رمز_قوی_مثلا_IndScope2025!

# راه‌های ارتباطی (اطلاعات شما)
CONTACT_PHONE=09123326387
CONTACT_EMAIL=hello@industryscope.ir
CONTACT_ADDRESS_FA=تهران، ایران
CONTACT_ADDRESS_EN=Tehran, Iran
CONTACT_WHATSAPP=989123326387
CONTACT_TELEGRAM=industryscope
CONTACT_HOURS_FA=شنبه تا پنج‌شنبه، ۹ تا ۱۸
CONTACT_HOURS_EN=Sat–Thu, 9:00–18:00

# سر پنل مدیریت هوش مصنوعی (اگر نیاز دارید زبان پیش‌فرض را عوض کنید)
NEXT_PUBLIC_DEFAULT_LANG=fa
```

> **مهم**: در Vercel این متغیرها را در **Settings → Environment Variables** وارد کنید. `.env` را هرگز به git push نکنید.

---

## قدم ۵ — Schema را به Supabase بفرستید

روی سیستم محلی (با `DATABASE_URL` تنظیم‌شده):

```bash
bun install
bun run db:push    # یا: bunx prisma db push
# این همه جداول را در Supabase می‌سازد
```

سپس دادهٔ seed را وارد کنید:

```bash
# دادهٔ عملیاتی نمونه (سایت‌ها، محصولات، محموله‌ها، هشدارها)
bunx tsx prisma/seed.ts

# محتوای بازاریابی (مقالات + نظرات)
bunx tsx prisma/seed-marketing.ts
```

> در production می‌توانید seed عملیاتی را نخواهید (چون دادهٔ دموی است). فقط seed-marketing را اجرا کنید تا مقالات و نظرات لود شوند. لیدهای واقعی از فرم‌های سایت جمع می‌شوند.

---

## قدم ۶ — در Vercel دیپلوی کنید

1. وارد https://vercel.com شوید → **Add New → Project**.
2. repo گیت‌هاب `industryscope` را import کنید.
3. Vercel به‌طور خودکار Next.js را تشخیص می‌دهد. **Framework Preset**: Next.js.
4. **Build Command**: `next build` (پیش‌فرض).
5. **Output Directory**: `.next` (پیش‌فرض).
6. در **Environment Variables**، تمام متغیرهای قدم ۴ را وارد کنید.
7. **Deploy** را بزنید. چند دقیقه طول می‌کشد.
8. پس از اتمام، یک URL موقت می‌گیرید (مثل `industryscope-xxx.vercel.app`). تست کنید که سایت لود می‌شود.

---

## قدم ۷ — دامنهٔ ParsPack را به Vercel وصل کنید

### در Vercel:
1. وارد پروژه شوید → **Settings → Domains**.
2. دامنهٔ خود را اضافه کنید: `industryscope.ir` و `www.industryscope.ir`.
3. Vercel دو رکورد DNS به شما می‌دهد (معمولاً):
   - رکورد **A** به `76.76.21.21` برای `@` (رویشه).
   - رکورد **CNAME** به `cname.vercel-dns.com` برای `www`.

### در پنل ParsPack:
1. وارد پنل دامنه شوید → **مدیریت DNS**.
2. رکوردهای بالا را دقیقاً اضافه کنید:
   - نوع **A**، نام/هاست: `@`، مقدار: `76.76.21.21`
   - نوع **CNAME**، نام: `www`، مقدار: `cname.vercel-dns.com`
3. صبر کنید (۵ تا ۳۰ دقیقه تا DNS پخش شود).

### تأیید:
1. به Vercel برگردید → روی دامنه **Refresh** بزنید تا وضعیت **Valid Configuration** شود.
2. مرورگر را باز کنید → `https://industryscope.ir` → سایت باید لود شود.

---

## قدم ۸ — HTTPS و امنیت

- Vercel به‌طور خودکار گواهی SSL رایگان (Let's Encrypt) صادر می‌کند. نیاز به کار اضافی نیست.
- Vercel به‌طور خودکار `https` را اجبار می‌کند (redirect از http به https).
- برای امنیت بیشتر:
  - **OWNER_PASSCODE** را قوی انتخاب کنید.
  - در Supabase → **Database → Network Restrictions** می‌توانید دسترسی را فقط به Vercel محدود کنید (IP ranges Vercel).
  - Supabase به‌صورت پیش‌فرض RLS (Row Level Security) را روشن می‌کند. در فاز بعدی می‌توانید policyهای RLS اضافه کنید تا حتی اگر connection لو رود، داده‌ها محافظت شوند. (الان جداسازی در لایهٔ app است؛ برای امنیت سازمانی، RLS را اضافه کنید.)

---

## قدم ۹ — تست نهایی

پس از دیپلوی، این فلوها را تست کنید:

1. **صفحهٔ اصلی**: `https://industryscope.ir` لود می‌شود، فارسی/RTL پیش‌فرض، ویدیو سینمایی سه‌بعدی اجرا می‌شود.
2. **فرم تماس**: پر کنید → بفرستید → به `/api/lead` می‌رود → در DB ذخیره می‌شود.
3. **پنل مدیریت**: به `https://industryscope.ir/#/admin` بروید → با `OWNER_PASSCODE` وارد شوید → لیدها، مقالات، محتوای سایت را ببینید.
4. **سئو**: `https://industryscope.ir/sitemap.xml` و `https://industryscope.ir/robots.txt` را در مرورگر باز کنید.
5. **سوییچ زبان**: دکمهٔ EN / فارسی را تست کنید.
6. **دستیار هوش**: در `#/copilot` یک سؤال بپرسید و پاسخ واقعی LLM را ببینید.

---

## قدم ۱۰ — پنل مدیریت (برای شما)

- آدرس: `https://industryscope.ir/#/admin`
- کد دسترسی: `OWNER_PASSCODE` که در Vercel تنظیم کردید.
- سه تب:
  - **لیدها**: همهٔ تماس‌ها/دمو/استعلام‌ها با وضعیت (جدید → تماس‌گرفته → تأییدشده → برنده‌شده). می‌توانید وضعیت را تغییر دهید یا حذف کنید.
  - **مقالات**: لیست مقالات + «مقالهٔ جدید». هر مقاله: slug، عنوان، بینش، متن کامل (Markdown)، آمار، و **فیلدهای سئو** (Meta Description، کلمات کلیدی، لینک‌های خارجی به سایت‌های اکوسیستم). پس از ذخیره، فوراً روی سایت ظاهر می‌شود.
  - **محتوای سایت**: متن‌های اصلی سایت (تیترها، زیرتیترها، شماره تماس) قابل ویرایش.

---

## قدم ۱۱ — سئو (برای دیده شدن)

کارهای انجام‌شده در کد:
- `sitemap.xml` خودکار (شامل آدرس مقالات).
- `robots.txt` (allow `/`، disallow `/api/`).
- `manifest.webmanifest` (PWA، fa/rtl، رنگ زمردی).
- **JSON-LD** دادهٔ ساختاریافته (SoftwareApplication + Organization با تلفن شما).
- متادیتای دوزبانه (fa-IR / en)، OpenGraph، Twitter Card.
- favicon اختصاصی.

کارهایی که شما باید انجام دهید:
1. **Google Search Console**: سایت را اضافه کنید → `https://industryscope.ir` → مالکیت را با رکورد DNS یا فایل HTML تأیید کنید → `sitemap.xml` را submit کنید.
2. **Google Analytics یا Plausible**: (اختیاری) برای ردیابی تبدیل روی فرم‌ها.
3. **مقالات**: در پنل مدیریت، برای هر مقاله Meta Description + کلمات کلیدی فارسی بنویسید. مقالات جدید با کلمات کلیدی صنعتی بنویسید (مثلاً «مدیریت موجودی با هوش مصنوعی»، «زنجیره تأمین هوشمند»).
4. **لینک‌های بین‌سایتی**: مقالات به finscope.ir / scopeos.ir / vestascope.ir / healthscope.ir لینک می‌دهند — این سئوی کل اکوسیستم Scope را قوی می‌کند. از آن‌ها بخواهید به industriaScope.ir هم لینک دهند (بک‌لینک متقابل).

---

## قدم ۱۲ — نگهداری و رشد

- **بک‌آپ**: Supabase روزانه از DB بک‌آپ می‌گیرد. برای نسخهٔ رایگان کافی است.
- **مانیتورینگ**: Vercel → داشبورد پروژه → logs و analytics.
- **به‌روزرسانی محتوا**: از پنل مدیریت، مقالات و متن‌ها را هر هفته به‌روز کنید (سئو را قوی می‌کند).
- **حذف دادهٔ دموی**: اگر خواستید سایت‌ها/محموله‌های نمونه را پاک کنید، در Supabase → Table Editor جدول `Shipment`, `Alert`, `Risk`, `Recommendation` را خالی کنید (یا فقط seed نزنید).
- **مقیاس‌پذیری**: Vercel و Supabase به‌طور خودکار scale می‌شوند. برای هزاران شرکت کافی است. اگر ترافیک بسیار بالا رفت، به Supabase Pro و Vercel Pro ارتقا دهید.

---

## خلاصهٔ سریع (چک‌لیست)

- [ ] کد به GitHub push شد
- [ ] Supabase project ساخته شد + `DATABASE_URL` کپی شد
- [ ] `prisma/schema.prisma` → `provider = "postgresql"`
- [ ] `.env` محلی تنظیم شد + `db:push` + seed
- [ ] Vercel: repo import + Environment Variables + Deploy
- [ ] ParsPack: رکوردهای DNS (A + CNAME) اضافه شد
- [ ] دامنه در Vercel تأیید شد + SSL سبز
- [ ] `https://industryscope.ir` لود شد
- [ ] `/#/admin` با passcode کار کرد
- [ ] فرم تماس لید ذخیره کرد
- [ ] sitemap.xml / robots.txt قابل دسترس
- [ ] Google Search Console + sitemap submit

---

## عیب‌یابی رایج

| مشکل | راه‌حل |
|---|---|
| `Prisma can't reach database` | `DATABASE_URL` را در Vercel چک کنید؛ IP Vercel در Supabase allowlist نباشد (در حالت Pro) |
| دامنه لود نمی‌شود | DNS را در https://dnschecker.org چک کنید؛ صبر کنید پخش شود |
| ۳D لود نمی‌شود | عادی است — fallback ۲D نمایش داده می‌شود؛ کاربران واقعی روی GPU واقعی ۳D را می‌بینند |
| Copilot پاسخ نمی‌دهد | متغیرهای z-ai SDK را در Vercel چک کنید (معمولاً پیش‌فرض کار می‌کند) |
| لیدها ذخیره نمی‌شوند | `DATABASE_URL` و `OWNER_PASSCODE` را در Vercel بررسی کنید |

---

## تماس پشتیبانی

اگر در هر قدم گیر کردید:
- **تلفن**: 09123326387
- **ایمیل**: hello@industryscope.ir
- **واتساپ**: wa.me/989123326387

موفق باشید! 🚀
