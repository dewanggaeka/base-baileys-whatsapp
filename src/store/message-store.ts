import type { proto } from '@whiskeysockets/baileys'

class MessageStore {
  private byId = new Map<string, proto.IMessage>()

  private key(jid?: string | null, id?: string | null) {
    return jid && id ? `${jid}::${id}` : undefined
  }

  put(jid?: string | null, id?: string | null, msg?: proto.IMessage | null) {
    const k = this.key(jid, id)
    if (!k || !msg) return
    this.byId.set(k, msg)
  }

  get(jid?: string | null, id?: string | null) {
    const k = this.key(jid, id)
    return k ? this.byId.get(k) : undefined
  }
}

export const messageStore = new MessageStore()
