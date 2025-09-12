export function extractText(m: any): string | undefined {
  const msg = m?.message
  if (!msg) return undefined
  return (
    msg.conversation ||
    msg.extendedTextMessage?.text ||
    msg.imageMessage?.caption ||
    msg.videoMessage?.caption ||
    msg.buttonsResponseMessage?.selectedDisplayText ||
    msg.listResponseMessage?.singleSelectReply?.selectedRowId ||
    undefined
  )
}

export function isGroupJid(jid?: string | null) {
  return typeof jid === 'string' && jid.endsWith('@g.us')
}

export function mentionTag(userJid: string) {
  const num = userJid.split('@')[0]
  return `@${num}`
}
