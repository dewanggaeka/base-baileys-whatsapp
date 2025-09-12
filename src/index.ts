import 'dotenv/config'
import { startBot } from './bot.js'

const pairingPhone = process.env.PAIRING_PHONE?.trim() || undefined
await startBot({ pairingPhone })
