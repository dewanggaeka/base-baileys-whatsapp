import pino from 'pino'
import fs from 'fs'
import path from 'path'

const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')
const logFile = process.env.LOG_FILE || 'logs/bot.log'

// pastikan folder log ada
fs.mkdirSync(path.dirname(logFile), { recursive: true })

// tulis ke file (bukan console)
const transport = pino.transport({
  target: 'pino/file',
  options: { destination: logFile }
})

export const logger = pino({ level }, transport)
