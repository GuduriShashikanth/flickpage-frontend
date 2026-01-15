# FlickPage Frontend

React + TypeScript frontend for FlickPage - AI-powered movie and book recommendation system.

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - API calls
- **Lucide React** - Icons

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

### ✅ Authentication
- User registration and login
- JWT token management
- Protected routes

### ✅ Movie & Book Discovery
- AI-powered semantic search
- TMDB fallback (auto-adds movies to database)
- Default listings with filters
- Detailed pages with cast, crew, genres

### ✅ Recommendations
- Personalized (collaborative filtering)
- Popular (community ratings)
- Similar items (content-based)

### ✅ Ratings & Interactions
- 5-star rating system
- Interaction tracking (view, click, search)
- My Ratings page with statistics

### ✅ TMDB Integration
- Automatic movie discovery
- Cast & crew information
- Genres, runtime, budget, revenue
- High-quality posters

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.tsx
│   ├── StarRating.tsx
│   └── Footer.tsx
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Search.tsx
│   ├── Books.tsx
│   ├── MovieDetail.tsx
│   ├── BookDetail.tsx
│   ├── Recommendations.tsx
│   ├── MyRatings.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── About.tsx
│   └── HowItWorks.tsx
├── services/        # API services
│   ├── api.ts
│   ├── auth.service.ts
│   └── interaction.service.ts
├── store/           # State management
│   └── useStore.ts
├── types/           # TypeScript types
│   └── index.ts
├── hooks/           # Custom hooks
│   └── useDebounce.ts
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## API Configuration

Update the API base URL in `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'https://your-api-url.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Environment Variables

Create `.env` file (optional):

```env
VITE_API_URL=https://your-api-url.com
```

## Key Features Implementation

### Interaction Tracking
Automatically tracks user behavior:
- **View**: When viewing movie/book details
- **Click**: When clicking on cards
- **Search**: When items appear in search results

Features:
- Debouncing (1 second)
- Offline queue support
- UUID validation
- Fire-and-forget (non-blocking)

### TMDB Fallback
When searching for movies not in database:
1. Searches local database first
2. Falls back to TMDB API if no results
3. Automatically adds movies to database
4. Shows blue notification banner

### Cast & Crew Display
Movie detail pages fetch additional data:
- Genres as colored badges
- Cast with character names
- Crew with job titles
- Runtime, budget, revenue
- Vote average and count

## Testing

See `TESTING_GUIDE.md` for comprehensive testing instructions.

### Quick Test
1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:5173`
3. Open DevTools console (F12)
4. Login and browse movies
5. Check console for interaction logs

## Building for Production

```bash
# Build
npm run build

# Output in dist/ folder
# Deploy dist/ to your hosting service
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Quick Deploy**:
```bash
npm install -g vercel
vercel login
vercel
```

2. **Or via GitHub**:
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Deploy automatically

See `DEPLOYMENT.md` for detailed instructions.

### Other Platforms
The app can also be deployed to:
- Netlify
- GitHub Pages
- Any static hosting service

Just deploy the `dist/` folder after building.

## Documentation

- `DEPLOYMENT.md` - Vercel deployment guide
- `TESTING_GUIDE.md` - Comprehensive testing guide
- `GETTING_STARTED.md` - Initial setup guide
- `FEATURES.md` - Feature list

## License

MIT
