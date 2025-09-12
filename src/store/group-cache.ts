import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 * 60 }) // 1 jam

export const groupCache = {
  async get(jid: string) {
    return cache.get(jid) as any | undefined
  },
  async set(jid: string, meta: any) {
    cache.set(jid, meta)
  },
}
