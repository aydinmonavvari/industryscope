# IndustryScope — AI Operating System for Industry & Supply Chain

سیستم‌عامل هوش مصنوعی برای صنعت و زنجیرهٔ تأمین. فارسی-اول با ورودی سینمایی سه‌بعدی، مرکز فرماندهی، موجودی، لجستیک، ریسک، دستیار هوش، مقالات سئو، اکوسیستم، پنل مدیریت، و **سیستم اکانت مشتری** (ثبت‌نام + اشتراک + صورتحساب).

## Technology
- Next.js 16 + App Router + TypeScript 5 + Tailwind 4 + shadcn/ui
- Prisma + PostgreSQL (Supabase)
- z-ai-web-dev-sdk (AI Copilot)
- Framer Motion (page transitions, hover effects)

## Quick Deploy (Supabase + Vercel)

### 1. Database setup (Supabase)
۱. در Supabase یک پروژه بسازید و `DATABASE_URL` را کپی کنید.
۲. در **SQL Editor** این سه فایل را به‌ترتیب اجرا کنید:
   - https://raw.githubusercontent.com/aydinmonavvari/industryscope/main/supabase_schema.sql (ساخت جداول)
   - https://raw.githubusercontent.com/aydinmonavvari/industryscope/main/supabase_seed_plans.sql (۳ پلن)
   - https://raw.githubusercontent.com/aydinmonavvari/industryscope/main/supabase_seed_content.sql (۲۳ مقاله + نظرات)

### 2. Deploy (Vercel)
۱. در Vercel این repo را import کنید.
۲. Environment Variables را اضافه کنید:
   - `DATABASE_URL` = (Supabase connection string)
   - `OWNER_PASSCODE` = (رمز پنل مدیریت شما — قوی انتخاب کنید)
   - `CONTACT_PHONE` = 09123326387
   - `CONTACT_EMAIL` = hello@industryscope.ir
   - `CONTACT_ADDRESS_FA` = تهران، ایران
   - `CONTACT_ADDRESS_EN` = Tehran, Iran
   - `CONTACT_WHATSAPP` = 989123326387
   - `CONTACT_TELEGRAM` = industryscope
   - `CONTACT_HOURS_FA` = شنبه تا پنج‌شنبه، ۹ تا ۱۸
   - `CONTACT_HOURS_EN` = Sat–Thu, 9:00–18:00
۳. Deploy.

### 3. Domain (ParsPack)
- در Vercel: Settings → Domains → دامنه اضافه کنید.
- در پنل ParsPack DNS:
  - رکورد A، نام `@`، مقدار `76.76.21.21`
  - رکورد CNAME، نام `www`، مقدار `cname.vercel-dns.com`

## Owner Dashboard
- آدرس: `https://yourdomain/#/admin`
- کد دسترسی: `OWNER_PASSCODE` که در Vercel تنظیم کردید.
- تب‌ها: لیدها / مقالات (CRUD + سئو) / محتوای سایت (ویرایش متن + رنگ + تماس + سازمانی).

## Customer Accounts
- `/api/auth/signup` — ثبت‌نام + ساخت مشتری trial (۱۴ روز).
- `/api/auth/login` — ورود + cookie.
- `/api/auth/me` — کاربر فعلی + مشتری + اشتراک.
- `/api/plans` — لیست پلن‌ها (Starter/Growth/Enterprise).
- `/api/subscription` — ساخت/دریافت اشتراک.

## Founder
سازنده و مؤسس مجموعه‌های Scope: **آیدین منوری** — 09123326387
