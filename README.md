# Football Dashboard

A football dashboard built with Next.js displaying league standings, team information, and player statistics with interactive data visualizations.

## API Choice

**Selected API:** [TheSportsDB.com](https://thesportsdb.com)

Chosen for its comprehensive football data, free tier availability, and reliable service. Provides leagues, teams, players, standings, and match information without cost barriers.

## Key Features

- **League Standings**: Interactive tables with season selection
- **Team Pages**: Detailed information with player squads and social media links
- **League Pages**: Featured teams section and recent matches with smart fallback to weekends
- **Search**: Real-time search for teams and leagues with smart caching
- **Data Visualization**: Position and nationality distribution charts using Recharts
- **Recent Matches**: Live match results with intelligent date range selection
- **Responsive Design**: Mobile-first approach with shadcn/ui components

## Technology Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS with shadcn/ui components
- Recharts for data visualization
- Deployed on Vercel

## Getting Started

```bash
npm install
npm run dev
```

## Testing the App

**Exploring Team Pages:**

- Search for "Arsenal" or "Manchester United" in the search bar
- Click any team name in the league standings tables
- View player squads with position and nationality distribution charts

**Exploring League Pages:**

- Search for leagues like "Premier League" or "La Liga"
- Click featured league cards on the homepage
- Browse standings with season selection functionality
- View top teams section showing current league leaders
- Check recent matches with automatic weekend fallback during weekdays

**Key Features to Test:**

- Interactive charts showing player position and nationality data
- Real-time search with smart caching
- Recent matches with intelligent date range (recent vs. weekend matches)
- Featured teams section on league pages with clickable navigation
- Responsive design across different screen sizes
- Social media links and team information on team pages

## Future Improvements

- **Enhanced Data**: Premium API integration for live scores and detailed statistics
- **User Features**: Favorite teams, personalized dashboards, dark mode
- **Advanced Visualizations**: Performance trends, heat maps, league comparisons
- **Design & UX**: Improved visual design, animations, accessibility enhancements
- **Testing**: Unit tests, integration tests
