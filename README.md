

# WhatsApp Bot - Base Baileys MD Bot

Bot WhatsApp ini dibuat dengan TypeScript dan menggunakan library [Baileys](https://baileys.wiki/docs/intro/) dari WhiskeySockets. **Repo ini berdasarkan dokumentasi WhiskeySockets/Baileys, bukan resmi dari WhatsApp. Penggunaan bot ini memiliki risiko seperti pemblokiran akun, karena tidak didukung atau diakui oleh WhatsApp. Gunakan dengan bijak dan pahami risikonya.**


## ✨ Fitur Utama

- Autentikasi QR Code & Pairing Code
- Penanganan pesan masuk (command sederhana)
- Manajemen grup dasar
- Penyimpanan pesan sementara (in-memory)
- Logging dengan Pino
- TypeScript support

> **Catatan:** Fitur saat ini masih terbatas hanya untuk bot sederhana. Pengembangan lanjutan seperti broadcast/bulk message akan dilakukan ke depannya, atau Anda bisa melakukan pengembangan sendiri dari repo ini.

Untuk menambah atau mengembangkan perintah bot, Anda bisa langsung mengedit atau menambahkan kode di file `src/handlers/commands.ts`.

## ⚡ Instalasi & Penggunaan

1. **Clone repo & install dependencies**
   ```bash
   git clone <repository-url>
   cd base-baileys-md-bot
   npm install
   ```

2. **Setup environment**
   ```bash
   cp config.example.env .env
   # Edit .env sesuai kebutuhan
   ```

3. **Jalankan bot**
   ```bash
   npm run dev   # mode development
   npm run build && npm start   # mode production
   ```

## 📚 Sumber & Dokumentasi

- [Baileys (WhiskeySockets) Documentation](https://baileys.wiki/docs/intro/)
- [Baileys GitHub](https://github.com/WhiskeySockets/Baileys)
- [WhatsApp Terms of Service](https://www.whatsapp.com/legal/terms-of-service)

## ⚠️ Disclaimer

Bot ini **tidak resmi dari WhatsApp**. Segala risiko penggunaan (pemblokiran, kehilangan akses, dll) ditanggung pengguna. Disarankan untuk tidak digunakan untuk spam atau aktivitas melanggar kebijakan WhatsApp.

---

**Pengembangan fitur broadcast/bulk message dan lainnya akan dilakukan ke depan. Silakan fork dan kembangkan sesuai kebutuhan Anda.**
