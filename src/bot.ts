import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  Browsers,
  type WASocket,
  type proto
} from '@whiskeysockets/baileys'
import QRCode from 'qrcode'
import { logger } from './utils/logger.js'
import { messageStore } from './store/message-store.js'
import { groupCache } from './store/group-cache.js'
import { makeSocketConfig } from './config.js'

export type StartOptions = { pairingPhone?: string }

export async function startBot(opts: StartOptions = {}) {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const baseCfg = makeSocketConfig()

  const sock = makeWASocket({
    ...baseCfg,
    logger,
    auth: state,
    cachedGroupMetadata: async (jid) => groupCache.get(jid),
    getMessage: async (key) => messageStore.get(key.remoteJid, key.id)
    })

  sock.ev.on('creds.update', saveCreds)

  // simpan pesan minimal ke store
  sock.ev.on('messages.upsert', ({ messages }) => {
    for (const m of messages) {
      if (m?.key?.remoteJid && m?.key?.id && m?.message) {
        messageStore.put(m.key.remoteJid, m.key.id, m.message)
      }
    }
  })

  // tampilkan QR kalau tidak memakai pairing code
  if (!opts.pairingPhone) {
    sock.ev.on('connection.update', async ({ qr }) => {
      if (qr) {
        const out = await QRCode.toString(qr, { type: 'terminal', small: true })
        console.log(out)
      }
    })
  } else {
    // cetak pairing code di terminal
    sock.ev.on('connection.update', async ({ connection }) => {
      if (connection === 'connecting') {
        try {
          const code = await sock.requestPairingCode(opts.pairingPhone!)
          logger.info({ code }, 'Pairing code')
        } catch (e) {
          logger.error({ err: e }, 'requestPairingCode failed')
        }
      }
    })
  }

  // reconnect logic
  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const status = (lastDisconnect?.error as any)?.output?.statusCode
      if (status === DisconnectReason.loggedOut) {
        logger.warn('Logged out. Hapus folder auth/ untuk login ulang.')
      } else {
        logger.warn({ status }, 'Disconnected → mencoba ulang...')
        startBot(opts)
      }
    } else if (connection === 'open') {
      logger.info('✅ Connected to WhatsApp')
    }
  })

  // handler pesan
  const { handleIncoming } = await import('./handlers/commands.js')
  sock.ev.on('messages.upsert', async ({ type, messages }) => {
    if (type !== 'notify') return
    for (const m of messages) {
      try {
        await handleIncoming(sock, m)
      } catch (e) {
        logger.error({ err: e }, 'handleIncoming error')
      }
    }
  })

  // cache metadata grup jika ada update
  sock.ev.on('groups.upsert', async (ev) => {
    for (const g of ev) groupCache.set(g.id, g)
  })
  sock.ev.on('groups.update', async (ev) => {
    for (const g of ev) if (g.id && g.subject) groupCache.set(g.id, g)
  })

  return sock as WASocket
}
