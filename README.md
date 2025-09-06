# DreamWeaver - Base Mini App

A privacy-focused dream interpretation app built for the Base ecosystem. Unlock the meaning of your dreams with AI-powered analysis and discover patterns in your subconscious mind.

## Features

- **AI Dream Interpretation**: Get instant, AI-powered insights into your dreams
- **Dream Journaling**: Record dreams with mood tags and timestamps
- **Pattern Analysis**: Discover recurring themes and symbols in your dreams
- **Privacy-First**: Your data stays secure with wallet-based authentication
- **Base Integration**: Built as a Base Mini App with OnchainKit

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Coinbase L2)
- **Wallet**: OnchainKit + MiniKit integration
- **AI**: OpenAI GPT for dream interpretation
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your API keys:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key
   OPENAI_API_KEY=your_openai_key
   NEXT_PUBLIC_PAYMENT_RECIPIENT=0x742d35Cc6634C0532925a3b8D0C9e3e0C0e0e0e0
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## Core Features

### 🌙 Dream Recording
- Simple, intuitive interface for logging dreams
- Mood tag system for emotional context
- Timestamp tracking for pattern analysis

### 🧠 AI Interpretation
- Powered by OpenAI's advanced language models
- Analyzes symbols, themes, and psychological significance
- Provides personalized insights and meanings

### 📊 Pattern Discovery
- Identifies recurring themes across multiple dreams
- Tracks frequency and significance of symbols
- Helps users understand their subconscious patterns

### 🔐 Privacy & Security
- Wallet-based authentication via Base
- Local data storage with encryption options
- User controls their own dream data

## Architecture

### Data Model
- **User**: Wallet-based identity
- **Dream**: Description, mood tags, interpretation, timestamp
- **Pattern**: Recurring themes with frequency tracking

### Components
- `AppShell`: Main navigation and layout
- `DreamInputForm`: Dream recording interface
- `InterpretationCard`: AI analysis display
- `ThemeCard`: Pattern visualization
- `WalletConnect`: Base wallet integration

### API Integration
- OpenAI API for dream interpretation
- OnchainKit for Base blockchain features
- Local storage for demo (upgradeable to IPFS)

## Design System

### Colors
- Primary: `hsl(240 80% 50%)` - Deep blue
- Accent: `hsl(180 70% 55%)` - Teal
- Background: Gradient from slate to purple
- Glass morphism effects throughout

### Typography
- Display: Bold, large headings
- Body: Clean, readable text
- Consistent spacing and hierarchy

### Components
- Glass card design with backdrop blur
- Smooth animations and transitions
- Mobile-first responsive layout

## Deployment

This app is designed to be deployed as a Base Mini App:

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - Vercel (recommended)
   - Netlify
   - Base Mini App platform

3. **Configure environment variables** in your deployment platform

## Premium Features (x402 Payments)

DreamWeaver now supports USDC payments on Base for premium features:

### 🔐 Premium Dream Interpretation ($0.10 USDC)
- Deeper psychological analysis with enhanced AI prompts
- Symbolic meaning exploration and archetypal connections
- Personal growth insights and actionable recommendations
- Life integration guidance

### 📊 Premium Pattern Analysis ($0.25 USDC)
- Advanced pattern recognition across multiple dreams
- Subconscious trend analysis and emotional mapping
- Personal growth indicators and life cycle connections
- Comprehensive insights report

### 💳 Payment Integration
- **x402-axios**: Seamless USDC payments on Base
- **wagmi + OnchainKit**: Wallet integration
- **Transaction Verification**: Automatic confirmation handling
- **Error Handling**: Balance checks and user-friendly error messages

## Future Enhancements

- **Decentralized Storage**: IPFS integration via Pinata
- **Dream Export**: PDF reports with premium analysis ($0.05 USDC)
- **Community Features**: Share insights (anonymously)
- **Advanced Analytics**: Deeper pattern analysis
- **Subscription Model**: Monthly premium access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**DreamWeaver** - Unlock the meaning of your dreams, privately. 🌙✨
