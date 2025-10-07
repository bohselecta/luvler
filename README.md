# Luvler - Love to Learn, Step by Step

An autism-friendly goal setting and self-advocacy tool that helps break down tasks into clear, manageable steps with evidence-based ABA methodology.

![Luvler Logo](public/favicon.svg)

## 🌟 Features

### Dual-Path System
- **Self-Advocacy Assistant**: Neurodiversity-affirming interface for autistic individuals and people with ADHD
- **Professional ABA Tool**: Comprehensive 5-stage workflow for clinicians and parents

### Autism-Friendly Design
- High contrast, consistent layouts
- Reduced visual clutter and generous white space
- Clear, literal language (no idioms or metaphors)
- Sensory accommodation options (dark mode, text sizing)
- Predictable navigation patterns

### AI-Powered Support
- Anthropic Claude API integration for smart task breakdown
- Cost-optimized prompts using Haiku and Sonnet models
- Context-aware goal parsing and generation

### Evidence-Based Methodology
- SMART goal framework
- Task analysis with prompting hierarchies
- BACB ethics compliance validation
- Progress tracking and data visualization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/luvler.git
   cd luvler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Anthropic API key:
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   NEXT_PUBLIC_SITE_URL=https://luvler.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Luvler color palette
- **AI Integration**: Anthropic Claude API (Haiku & Sonnet models)
- **Deployment**: Netlify with serverless functions
- **Accessibility**: WCAG AA compliant with autism-friendly features

## 📁 Project Structure

```
luvler/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Router screen (landing page)
│   ├── self-advocacy/     # Self-advocacy assistant page
│   └── professional/      # Professional ABA tool page
├── components/            # Reusable React components
│   ├── shared/           # Header, progress indicators, UI components
│   └── ...
├── lib/                  # Utility libraries
│   ├── types.ts         # TypeScript type definitions
│   ├── ai-prompts.ts    # Cost-optimized AI prompts
│   └── accessibility.ts # Accessibility utilities
├── netlify/
│   └── functions/       # Serverless API functions
├── public/              # Static assets (favicon, images)
├── styles/              # Global CSS and Tailwind config
└── ...
```

## 🎨 Design System

### Color Palette
- **Primary Pink**: `#E63E8B` (heart/main brand color)
- **Secondary Blue**: `#6B9FDB` (learner figure)
- **Success Green**: `#86EFAC` (completions)
- **Warning Yellow**: `#FCD34D` (tips)
- **Neutral Grays**: Warm grays with rose tints

### Typography
- **Primary Font**: DM Sans (rounded, friendly)
- **Text Sizes**: Normal, Large (1.25x), XLarge (1.5x)
- **Accessibility**: High contrast ratios, readable line heights

### Visual Elements
- Ultra-rounded corners (16px-24px radius)
- Soft, diffused shadows
- Heart icons for celebrations
- Blue figure icons for learning states

## 🔧 Netlify Deployment

### Environment Variables (Set in Netlify Dashboard)
1. Go to your Netlify site dashboard
2. Navigate to Site settings → Environment variables
3. Add the following variables:

```
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=https://luvler.com
```

### Build Settings
The `netlify.toml` file is pre-configured with:
- Next.js plugin for optimal builds
- Serverless functions directory
- Security headers
- CDN optimization

### Custom Domain
1. Add `luvler.com` as a custom domain in Netlify
2. Configure DNS records as instructed
3. SSL certificate will be automatically provisioned

## 💰 Cost Optimization

### AI Usage Strategy
- **Self-Advocacy**: Claude Haiku (~$0.25/1M tokens)
- **Clinical Analysis**: Claude Sonnet (~$3/1M tokens)
- **Target**: < $10/month for 1000+ users

### Subscription Model
- **Individuals**: Free (self-advocacy path)
- **Parents/Families**: $5/month
- **Clinics/Schools**: $15/month per clinician

## ♿ Accessibility Features

### Visual Accommodations
- Dark mode with warm colors (not stark black/white)
- Text size controls (normal/large/xlarge)
- High contrast mode option
- Reduced motion preferences

### Cognitive Support
- Progressive disclosure (one thing at a time)
- Clear visual hierarchy
- Predictable navigation patterns
- No time pressure or countdowns
- Frequent auto-save functionality

### Motor Accessibility
- Large touch targets (minimum 44px)
- Generous spacing between interactive elements
- Keyboard navigation support
- Alternative input methods

### Language Guidelines
- Literal, concrete language
- No condescending phrases
- Direct, honest feedback
- Respectful celebration messages

## 📊 API Reference

### Netlify Functions

#### Generate Steps (Self-Advocacy)
```typescript
POST /.netlify/functions/generate-steps
{
  "goalInput": "What do you want to get done?",
  "preferences": {
    "textSize": "normal" | "large" | "xlarge"
  }
}
```

#### Analyze Goal (Professional)
```typescript
POST /.netlify/functions/analyze-goal
{
  "goalInput": "Goal description",
  "context": {
    "skillLevel": "Current abilities",
    "communicationStyle": "verbal|minimally-verbal|nonverbal|AAC"
  }
}
```

## 🔒 Security & Privacy

- API keys encrypted in serverless functions
- No personal data stored in databases
- FERPA compliance for educational use
- GDPR considerations for EU users

## 🧪 Testing

### Development Testing
```bash
npm run dev          # Start development server
npm run type-check   # TypeScript validation
npm run lint         # ESLint code quality
```

### Accessibility Testing
- WCAG AA compliance validation
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing
- Color contrast verification

## 📈 Performance Metrics

- **Page Load**: < 2 seconds
- **AI Response**: < 3 seconds (Haiku), < 5 seconds (Sonnet)
- **Mobile Responsive**: 100%
- **Lighthouse Score**: > 90
- **Accessibility Score**: > 95

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Autistic Self Advocacy Network** for neurodiversity-affirming guidelines
- **Behavior Analyst Certification Board** for ethical standards
- **National Professional Development Center** for evidence-based practices
- **Anthropic** for AI assistance in development

## 📞 Support

For support and questions:
- Email: support@luvler.com
- GitHub Issues: [Report bugs and feature requests](https://github.com/your-username/luvler/issues)

---

**Made with ❤️ for the autism community**

*"Love to learn, step by step"* - Luvler Team
