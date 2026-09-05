// Public contact + config (safe for client). Owner passcode is server-only.
export const CONTACT = {
  phone: process.env.CONTACT_PHONE || '09123326387',
  phoneIntl: '+98 912 332 6387',
  phoneRaw: '09123326387',
  email: process.env.CONTACT_EMAIL || 'hello@industryscope.io',
  whatsapp: process.env.CONTACT_WHATSAPP || '989123326387',
  telegram: process.env.CONTACT_TELEGRAM || 'industryscope',
  hoursFa: process.env.CONTACT_HOURS_FA || 'شنبه تا پنج‌شنبه، ۹ تا ۱۸',
  hoursEn: process.env.CONTACT_HOURS_EN || 'Sat–Thu, 9:00–18:00',
  addressFa: process.env.CONTACT_ADDRESS_FA || 'تهران، ایران',
  addressEn: process.env.CONTACT_ADDRESS_EN || 'Tehran, Iran',
}

export function ownerAuthOk(passcode: string | undefined): boolean {
  return !!passcode && passcode === process.env.OWNER_PASSCODE
}
