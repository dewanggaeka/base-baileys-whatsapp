import { Browsers, type UserFacingSocketConfig } from '@whiskeysockets/baileys'

// Base config yang tidak mencakup 'auth' (dan logger/getMessage kita isi di bot.ts)
type BaseSocketConfig = Omit<UserFacingSocketConfig, 'auth' | 'logger' | 'getMessage'>

export function makeSocketConfig(): BaseSocketConfig {
  const markOnline = String(process.env.MARK_ONLINE || 'false') === 'true'
  const syncFullHistory = String(process.env.SYNC_FULL_HISTORY || 'false') === 'true'

  return {
    markOnlineOnConnect: markOnline,
    syncFullHistory,
    // Saat pairing code, WA butuh browser yang valid
    browser: Browsers.macOS('Google Chrome')
  }
}
