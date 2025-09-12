# WhatsApp Bot - Base Baileys MD Bot

A modern WhatsApp bot built with TypeScript and [Baileys](https://baileys.wiki/docs/intro/) library. This bot provides a solid foundation for creating WhatsApp automation with features like QR code authentication, pairing code support, message handling, and group management.

> **Note**: This project uses the [Baileys WhatsApp Web API](https://baileys.wiki/docs/intro/) library, which connects to WhatsApp using the Linked Devices feature. It is not affiliated with or endorsed by WhatsApp. Use responsibly and in accordance with WhatsApp's Terms of Service.

## 🚀 Features

- **QR Code Authentication**: Easy setup with QR code scanning
- **Pairing Code Support**: Alternative authentication method using phone number
- **Message Handling**: Process incoming messages with command system
- **Group Management**: Support for both private and group chats
- **Message Storage**: In-memory message store for message retrieval
- **Group Caching**: Efficient group metadata caching
- **Logging**: Comprehensive logging with Pino logger
- **TypeScript**: Full TypeScript support with type safety
- **Auto Reconnection**: Automatic reconnection on connection loss
- **WebSocket Protocol**: Uses WhatsApp Web's WebSocket-based protocol (not browser automation)
- **Linked Devices**: Connects using WhatsApp's Linked Devices feature

## 📋 Prerequisites

- **Node.js 17+** (required by Baileys library)
- npm, yarn, pnpm, or bun
- WhatsApp account (personal or business)
- WhatsApp Web access (for Linked Devices feature)

## 🔧 About Baileys Library

This project is built on top of the [Baileys](https://baileys.wiki/docs/intro/) library, which is a WhatsApp Web API automation TypeScript library. Here are the key technical details:

### How Baileys Works
- **WebSocket Protocol**: Uses WhatsApp Web's WebSocket-based protocol to interact with WhatsApp servers
- **No Browser Automation**: Unlike other solutions, Baileys doesn't control WhatsApp using an automated browser
- **Linked Devices**: Connects to your personal or business WhatsApp account using the Linked Devices feature
- **Event-Based**: Asynchronous and event-based architecture for handling WhatsApp events

### Key Baileys Components Used
- `makeWASocket`: Main function that creates the WhatsApp socket connection
- `useMultiFileAuthState`: Handles authentication state persistence
- `Browsers`: Provides browser configuration for pairing
- `DisconnectReason`: Handles different disconnection scenarios

### Important Notes
- **Not WABA**: Baileys does not use the WhatsApp Business API (WABA)
- **Personal Use**: Designed for personal or business mobile app accounts
- **No Affiliation**: Not affiliated with or endorsed by WhatsApp
- **Responsible Use**: Please use responsibly and avoid spam or automated bulk messaging

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd base-baileys-md-bot
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   
   # Using pnpm
   pnpm install
   
   # Using bun
   bun install
   ```

3. **Environment Setup**
   Copy the configuration template and create your `.env` file:
   ```bash
   cp config.example.env .env
   ```
   
   Then edit `.env` with your preferred settings:
   ```env
   # Optional: Phone number for pairing code authentication
   PAIRING_PHONE=+1234567890
   
   # Optional: Mark bot as online (default: false)
   MARK_ONLINE=false
   
   # Optional: Sync full message history (default: false)
   SYNC_FULL_HISTORY=false
   
   # Optional: Log level (default: debug in dev, info in production)
   LOG_LEVEL=debug
   
   # Optional: Log file path (default: logs/bot.log)
   LOG_FILE=logs/bot.log
   ```

## 🚀 Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## 🔧 Configuration

### Authentication Methods

#### 1. QR Code Authentication (Default)
- Run the bot without `PAIRING_PHONE` environment variable
- Scan the QR code displayed in terminal with your WhatsApp
- The bot will automatically connect

#### 2. Pairing Code Authentication
- Set `PAIRING_PHONE` environment variable with your phone number
- The bot will generate a pairing code
- Enter the pairing code in your WhatsApp app

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PAIRING_PHONE` | Phone number for pairing code auth | - | No |
| `MARK_ONLINE` | Mark bot as online | `false` | No |
| `SYNC_FULL_HISTORY` | Sync full message history | `false` | No |
| `LOG_LEVEL` | Logging level | `debug`/`info` | No |
| `LOG_FILE` | Log file path | `logs/bot.log` | No |

## 🤖 Available Commands

The bot responds to the following commands:

- `ping` - Test bot responsiveness (responds with "pong")
- `!menu` - Display available commands
- `!id` - Show chat information (chat ID, message ID, sender, group status)
- `!who` - Greet the sender by name

## 📁 Project Structure

```
base-baileys-md-bot/
├── src/
│   ├── handlers/
│   │   ├── commands.ts      # Command handlers
│   │   └── messages.ts      # Message utilities
│   ├── store/
│   │   ├── message-store.ts # Message storage
│   │   └── group-cache.ts   # Group metadata cache
│   ├── utils/
│   │   └── logger.ts        # Logging configuration
│   ├── bot.ts              # Main bot logic
│   ├── config.ts           # Socket configuration
│   └── index.ts            # Entry point
├── logs/                   # Log files
├── auth/                   # Authentication data (auto-generated)
├── dist/                   # Compiled JavaScript (after build)
├── config.example.env      # Configuration template
├── .gitignore             # Git ignore rules
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Development

### Understanding the Baileys Socket

The bot uses Baileys' `makeWASocket` function which returns a socket object that extends EventEmitter. Key events handled:

- `connection.update`: Handles connection status changes
- `messages.upsert`: Processes incoming messages
- `creds.update`: Saves authentication credentials
- `groups.upsert` & `groups.update`: Manages group metadata

### Adding New Commands

1. Open `src/handlers/commands.ts`
2. Add your command logic in the `handleIncoming` function:

```typescript
if (lower === 'yourcommand') {
  await sock.sendMessage(jid, { text: 'Your response' })
  return
}
```

3. Update the menu in the `!menu` command to include your new command

### Working with Baileys Events

The bot listens to various Baileys events. You can extend functionality by adding more event listeners in `src/bot.ts`:

```typescript
// Example: Handle group updates
sock.ev.on('groups.update', async (updates) => {
  for (const update of updates) {
    if (update.subject) {
      logger.info(`Group ${update.id} updated: ${update.subject}`)
    }
  }
})
```

### Message Types Supported

The bot can handle various message types:
- Text messages
- Image messages (with captions)
- Video messages (with captions)
- Button responses
- List responses

### Group vs Private Chat

The bot automatically detects whether a message is from a group or private chat using the `isGroupJid()` utility function.

## 📝 Logging

The bot uses Pino logger for structured logging:
- Logs are written to `logs/bot.log` by default
- Log level can be configured via `LOG_LEVEL` environment variable
- Logs include connection status, errors, and message handling events

## 🔄 Auto Reconnection

The bot automatically handles reconnection:
- Detects connection loss
- Attempts to reconnect automatically
- Handles different disconnect reasons
- Preserves authentication state

## 🚨 Troubleshooting

### Common Issues

1. **Authentication Issues**
   - Delete the `auth/` folder and restart the bot
   - Ensure your phone number is correct for pairing code
   - Make sure WhatsApp Web is not already connected on another device

2. **Connection Issues**
   - Check your internet connection
   - Verify WhatsApp is working on your phone
   - Check the logs for specific error messages
   - Ensure Node.js version is 17+ (required by Baileys)

3. **Baileys-Specific Issues**
   - **QR Code not showing**: Check if `PAIRING_PHONE` is set in environment
   - **Connection timeout**: WhatsApp may have rate-limited the connection
   - **Auth state corruption**: Delete `auth/` folder and re-authenticate
   - **Message not sending**: Check if the bot is properly connected (look for "✅ Connected to WhatsApp" in logs)

4. **Permission Issues**
   - Ensure the bot has write permissions for the `logs/` and `auth/` directories

### Baileys Disconnect Reasons

The bot handles different disconnect reasons from Baileys:
- `DisconnectReason.loggedOut`: Bot was logged out, delete `auth/` folder
- `DisconnectReason.connectionClosed`: Connection closed, will auto-reconnect
- `DisconnectReason.connectionLost`: Connection lost, will auto-reconnect
- `DisconnectReason.connectionReplaced`: Another device connected, will auto-reconnect

### Logs

Check the log file for detailed information:
```bash
tail -f logs/bot.log
```

### Baileys Documentation

For more advanced troubleshooting and features, refer to the [official Baileys documentation](https://baileys.wiki/docs/intro/).

## 📄 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the logs
3. Create an issue in the repository

## 📚 Additional Resources

- [Baileys Official Documentation](https://baileys.wiki/docs/intro/)
- [Baileys GitHub Repository](https://github.com/WhiskeySockets/Baileys)
- [WhatsApp Terms of Service](https://www.whatsapp.com/legal/terms-of-service)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🔄 Version Information

- **Baileys Library**: v6.7.18
- **Node.js Required**: 17+
- **TypeScript**: v5.9.2
- **Package Manager**: npm, yarn, pnpm, or bun

---

**Note**: This bot is for educational and personal use. Please respect WhatsApp's Terms of Service and use responsibly. This project uses the Baileys library which is not affiliated with or endorsed by WhatsApp.
