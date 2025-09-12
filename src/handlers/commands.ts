import type { WASocket, proto } from '@whiskeysockets/baileys'
import { extractText, isGroupJid, mentionTag } from './messages.js'

export async function handleIncoming(sock: WASocket, m: proto.IWebMessageInfo) {
  const jid = m.key.remoteJid!
  const text = extractText(m)
  const fromMe = !!m.key.fromMe
  if (!text || fromMe) return

  const lower = text.trim().toLowerCase()
  const senderJid = (m.key.participant || m.key.remoteJid)!

  if (lower === 'ping') {
    await sock.sendMessage(jid, { text: 'pong' })
    return
  }

  if (lower === '!menu') {
    const lines = [
      '*Menu*',
      '• ping — uji respon',
      '• !id — info chat',
      '• !who — sapa pengirim'
    ]
    await sock.sendMessage(jid, { text: lines.join('\n') })
    return
  }

  if (lower === '!id') {
    const parts = [
      `chat: ${jid}`,
      `msgId: ${m.key.id}`,
      `sender: ${senderJid}`,
      `group: ${isGroupJid(jid)}`
    ]
    await sock.sendMessage(jid, { text: '```' + parts.join('\n') + '```' })
    return
  }

  if (lower === '!who') {
    const sender = m.pushName || senderJid.split('@')[0]
    await sock.sendMessage(jid, { text: `Halo ${sender}!` })
    return
  }
}
