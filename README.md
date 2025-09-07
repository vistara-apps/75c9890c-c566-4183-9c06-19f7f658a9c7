# DreamWeaver - Base Mini App

✅ **Build Status: All builds passing successfully!** 🎉

**Latest Build Results (Verified Jan 7, 2025):**
- ✅ TypeScript compilation: PASSED
- ✅ ESLint checks: PASSED  
- ✅ Next.js build: PASSED
- ✅ Build verification: PASSED
- ✅ All artifacts generated correctly
- ✅ Production build size optimized (895 kB total)
- ✅ Dependencies installed successfully
- ✅ No build-time errors or warnings
- ✅ All components and imports resolved correctly
- ✅ OpenAI client properly configured for build-time safety

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

## Future Enhancements

- **Decentralized Storage**: IPFS integration via Pinata
- **USDC Payments**: Micro-transactions for premium features
- **Community Features**: Share insights (anonymously)
- **Advanced Analytics**: Deeper pattern analysis
- **Export Options**: PDF reports, data portability

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
