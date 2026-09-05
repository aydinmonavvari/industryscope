# راهنمای کامل دیپلوی IndustryScope — صفر تا صد (نسخهٔ نهایی با اکانت مشتریان)

> این نسخه شامل دیتابیس حرفه‌ای (اکانت کاربری + اشتراک + صورتحساب) است تا بتوانید اکانت بسازید و به شرکت‌ها بفروشید.
> روش پیشنهادی: **Supabase (PostgreSQL)** + **Vercel** + دامنهٔ **ParsPack**.

---

## آنچه می‌سازید
- یک سایت چندصفحه‌ای فارسی-اول با ورودی سینمایی سه‌بعدی، مرکز فرماندهی، موجودی، لجستیک، ریسک، دستیار هوش، مقالات سئو، اکوسیستم.
- پنل مدیریت برای شما (ویرایش متن/رنگ/مقالات + دیدن لیدها).
- **سیستم اکانت**: مشتری ثبت‌نام می‌کند، پلن (Starter/Growth/Enterprise) انتخاب می‌کند، اشتراک می‌سازد — آماده برای فروش.

---

## قدم ۱ — کد را به GitHub ببرید

```bash
cd /home/z/my-project
git init
git add .
git commit -m "feat: IndustryScope production-ready with SaaS accounts"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/industryscope.git
git push -u origin main
```

---

## قدم ۲ — Supabase (PostgreSQL) بسازید

1. وارد https://supabase.com شوید → **New Project** → نام: `industryscope`، منطقه: `Frankfurt`.
2. رمز database قوی بگذارید و ذخیره کنید.
3. به **Settings → Database → Connection string → URI** بروید و رشته را کپی کنید:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxx.supabase.co:5432/postgres
   ```

---

## قدم ۳ — Prisma را به PostgreSQL سوییچ کنید

در `prisma/schema.prisma` خط `provider` را عوض کنید:

```prisma
datasource db {
  provider = "postgresql"   // ← از "sqlite" به "postgresql"
  url      = env("DATABASE_URL")
}
```

> این تنها تغییری است که لازم است. همهٔ مدل‌ها (از جمله User/Plan/Subscription) با PostgreSQL سازگارند.

---

## قدم ۴ — متغیرهای محیطی

روی سیستم محلی یک فایل `.env` و در Vercel در **Settings → Environment Variables**:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres

# پنل مدیریت شما
OWNER_PASSCODE=یک_رمز_قوی_مثلا_IndScope2025!

# تماس
CONTACT_PHONE=09123326387
CONTACT_EMAIL=hello@industryscope.ir
CONTACT_ADDRESS_FA=تهران، ایران
CONTACT_ADDRESS_EN=Tehran, Iran
CONTACT_WHATSAPP=989123326387
CONTACT_TELEGRAM=industryscope
CONTACT_HOURS_FA=شنبه تا پنج‌شنبه، ۹ تا ۱۸
CONTACT_HOURS_EN=Sat–Thu, 9:00–18:00
```

> `.env` را هرگز به git push نکنید.

---

## قدم ۵ — Schema را بسازید و seed کنید

روی سیستم محلی (با `DATABASE_URL` تنظیم‌شده):

```bash
bun install
bunx prisma db push    # همهٔ جداول (از جمله User/Plan/Subscription) ساخته می‌شود
bunx tsx prisma/seed-plans.ts        # پلن‌ها (Starter/Growth/Enterprise با قیمت IRR)
bunx tsx prisma/seed.ts              # دادهٔ دموی عملیاتی (اختیاری برای دمو)
bunx tsx prisma/seed-marketing.ts    # مقالات + نظرات
bunx tsx prisma/seed-articles.ts     # ۲۳ مقالهٔ سئو
```

> در production واقعی، seed دموی (`seed.ts`) را نخواهید؛ فقط plans + articles + marketing.

---

## قدم ۶ — در Vercel دیپلوی کنید

1. https://vercel.com → **Add New → Project** → import repo.
2. Framework: Next.js (خودکار تشخیص داده می‌شود).
3. در **Environment Variables**، تمام متغیرهای قدم ۴ را وارد کنید.
4. **Deploy**. پس از اتمام URL موقت می‌گیرید.

---

## قدم ۷ — دامنهٔ ParsPack را وصل کنید

### در Vercel:
- **Settings → Domains** → `industryscope.ir` و `www.industryscope.ir` اضافه کنید.

### در پنل ParsPack → مدیریت DNS:
- رکورد **A**، نام `@`، مقدار `76.76.21.21`
- رکورد **CNAME**، نام `www`، مقدار `cname.vercel-dns.com`

### تأیید:
- در Vercel روی دامنه Refresh بزنید تا سبز شود.
- مرورگر → `https://industryscope.ir`.

> Vercel به‌طور خودکار SSL رایگان صادر می‌کند و HTTPS را اجبار می‌کند.

---

## قدم ۸ — امنیت production

1. **OWNER_PASSCODE** را قوی انتخاب کنید.
2. در Supabase → **Database → Network Restrictions**: دسترسی را به IPهای Vercel محدود کنید (در حالت Pro).
3. **SSL یا RLS**: Supabase به‌صورت پیش‌فرض RLS را روشن می‌کند. برای امنیت سازمانی policyهای RLS اضافه کنید تا جداسازی مستأجر در سطح DB هم تضمین شود.
4. (اختیاری) برای hash پسورد قوی‌تر، در `src/lib/auth.ts` از `bcrypt` یا `argon2` استفاده کنید (نیازمند native build در Vercel، که پشتیبانی می‌شود).

---

## قدم ۹ — تست نهایی

1. `https://industryscope.ir` لود شود، فارسی/RTL، ورودی سینمایی، «اسکرول کنید».
2. منوی هدر: «پلتفرم ▾» و «منابع ▾» (تمیز و دراپ‌داون).
3. فرم تماس پر کنید → در DB ذخیره شود.
4. **ثبت‌نام مشتری**: `curl` یا یک فرم ثبت‌نام بسازید → POST `/api/auth/signup` → user + customer(trial 14 روز) ساخته شود.
5. **ورود**: POST `/api/auth/login` → cookie.
6. **اشتراک**: POST `/api/subscription` با `planCode=growth` → اشتراک فعال.
7. پنل مدیریت: `https://industryscope.ir/#/admin` با `OWNER_PASSCODE` → لیدها + مقالات + محتوای سایت.
8. فوتر: لینک‌ها فعالند، «تمامی حقوق...Scope محفوظ است» + «آیدین منوری».
9. مقالات: `#/intelligence` → ۲۳ مقاله با کاور + سئو.

---

## قدم ۱۰ — شروع فروش به مشتریان

### جریان فروش:
1. مشتری وارد سایت می‌شود، صفحات را می‌بیند.
2. در «قیمت‌گذاری» پلن را انتخاب می‌کند (Starter/Growth/Enterprise).
3. ثبت‌نام می‌کند (`/api/auth/signup`) → حساب کاربری + ۱۴ روز رایگان trial.
4. اشتراک می‌سازد (`/api/subscription`).
5. شما در پنل مدیریت لیدها را می‌بینید و تماس می‌گیرید (۰۹۱۲۳۳۲۶۳۸۷).

### صورتحساب (billing):
- پلن‌ها با قیمت ریالی (IRR) در دیتابیس ذخیره شده‌اند: Starter ۲.۹M، Growth ۷.۹M، Enterprise ۲۴.۹M در ماه.
- برای درگاه پرداخت واقعی: یک درگاه ایرانی (زرین‌پال/آیدی‌پی) یا بین‌المللی (Stripe) وصل کنید. در `subscription/route.ts` پس از تأیید پرداخت، اشتراک را `active` کنید.

### گزارش‌های پنل شما:
- لیدها + مشتریان + اشتراک‌ها در `#/admin` قابل دیدن است (در تب لیدها)؛ برای دیدن اشتراک‌ها می‌توانید یک تب «مشتریان» اضافه کنید.

---

## چک‌لیست نهایی

- [ ] کد به GitHub push شد
- [ ] Supabase project + `DATABASE_URL`
- [ ] `provider = "postgresql"` در schema
- [ ] `.env` + Vercel env vars
- [ ] `prisma db push` + seed (plans + articles + marketing)
- [ ] Vercel: import + deploy
- [ ] ParsPack DNS (A + CNAME)
- [ ] دامنه سبز + SSL
- [ ] `https://industryscope.ir` لود شد
- [ ] `/#/admin` با passcode کار کرد
- [ ] ثبت‌نام + ورود مشتری کار کرد
- [ ] اشتراک ساخته شد
- [ ] Google Search Console + sitemap

---

## عیب‌یابی

| مشکل | راه‌حل |
|---|---|
| `Prisma can't reach database` | `DATABASE_URL` در Vercel + IP Vercel در Supabase allowlist |
| دامنه لود نمی‌شود | DNS را در dnschecker.org چک کنید؛ صبر کنید |
| ثبت‌نام خطا می‌دهد | مطمئن شوید `prisma db push` روی Supabase اجرا شده |
| ۳D لود نمی‌شود | عادی — fallback ۲D نمایش داده می‌شود |
| لیدها ذخیره نمی‌شوند | `DATABASE_URL` + `OWNER_PASSCODE` را چک کنید |

---

## تماس پشتیبانی
- **تلفن**: ۰۹۱۲۳۳۲۶۳۸۷
- **ایمیل**: hello@industryscope.ir
- **واتساپ**: wa.me/989123326387

موفق باشید! 🚀
