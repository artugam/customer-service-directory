# Customer Service Platform Directory

A comprehensive directory for comparing customer service platforms, help desks, live chat solutions, chatbots, and ticketing systems. Built with Next.js 16, Tailwind CSS 4, and Shadcn UI components.

## Features

- **Browse Platforms**: View a curated list of 10 popular customer service platforms with detailed information
- **Advanced Filtering**: Filter by category (All-in-One, Help Desk, Live Chat, Chatbot, etc.)
- **Search Functionality**: Search platforms by name, description, or features
- **Detailed Platform Pages**: View comprehensive information about each platform including:
  - Pricing plans with features
  - Key features and capabilities
  - Integrations
  - Pros and cons
  - Ratings and reviews
  - Best use cases
- **Side-by-Side Comparison**: Compare up to 3 platforms simultaneously
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Static Site Generation**: Fast page loads with pre-rendered content

## Technologies

- **Next.js 16**: Latest React framework with App Router and Turbopack
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Modern utility-first CSS framework
- **Shadcn UI**: Beautiful, accessible component library
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd customer-service-directory
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
customer-service-directory/
├── app/                      # Next.js app directory
│   ├── compare/             # Comparison page
│   ├── platform/[id]/       # Dynamic platform detail pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   ├── platform-card.tsx    # Platform card component
│   └── platform-filters.tsx # Filter component
├── data/                    # Static data
│   └── platforms.ts         # Platform data
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
├── types/                   # TypeScript types
│   └── platform.ts          # Platform type definitions
└── public/                  # Static assets
```

## Available Platforms

The directory currently includes information about:

1. **Zendesk** - Complete customer service solution
2. **Intercom** - Modern customer communication platform
3. **Freshdesk** - User-friendly help desk software
4. **Help Scout** - Email-based customer support platform
5. **LiveChat** - Dedicated live chat software
6. **Drift** - Conversational marketing and sales platform
7. **Tidio** - Affordable live chat and chatbot platform
8. **Kustomer** - CRM-focused customer service platform
9. **Chatbot.com** - All-in-one chatbot platform
10. **Crisp** - Modern customer messaging platform

## Adding New Platforms

To add a new platform, edit `data/platforms.ts` and add a new platform object:

```typescript
{
  id: "platform-id",
  name: "Platform Name",
  description: "Platform description",
  category: "All-in-One", // or other category
  website: "https://platform.com",
  pricing: [
    {
      name: "Plan Name",
      price: "$XX",
      billingPeriod: "per user/month",
      features: ["Feature 1", "Feature 2"]
    }
  ],
  features: ["Feature 1", "Feature 2"],
  integrations: ["Integration 1", "Integration 2"],
  rating: 4.5,
  reviewCount: 1000,
  bestFor: ["Use case 1", "Use case 2"],
  pros: ["Pro 1", "Pro 2"],
  cons: ["Con 1", "Con 2"]
}
```

## Customization

### Adding Categories

Edit `types/platform.ts` to add new categories to the `PlatformCategory` type.

### Styling

- Global styles: `app/globals.css`
- Component styles: Use Tailwind utility classes
- Theme colors: Modify CSS variables in `app/globals.css`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Future Enhancements

- [ ] Add user reviews and ratings
- [ ] Implement database integration
- [ ] Add authentication for user accounts
- [ ] Create admin panel for managing platforms
- [ ] Add more detailed comparison metrics
- [ ] Implement email notifications for platform updates
- [ ] Add API for programmatic access
- [ ] Create mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
