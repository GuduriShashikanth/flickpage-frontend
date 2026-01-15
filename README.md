# FlickPage

> AI-powered movie and book recommendation platform

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan.svg)](https://tailwindcss.com/)

## 🌐 Live Site

**[https://flickpage.vercel.app/](https://flickpage.vercel.app/)**

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cinelibre-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
```

The production build will be in the `dist/` folder.

## ✨ Features

### 🎬 Movie & Book Discovery
- **AI-Powered Semantic Search** - Find movies and books using natural language
- **TMDB Integration** - Automatic movie discovery with fallback to TMDB API
- **Rich Metadata** - Cast, crew, genres, runtime, budget, revenue
- **High-Quality Posters** - Beautiful movie and book covers
- **Detailed Pages** - Comprehensive information for each movie and book

### 🎯 Smart Recommendations
- **Personalized Recommendations** - Based on your ratings using collaborative filtering
- **Popular Items** - See what the community loves
- **Similar Content** - Discover movies and books similar to what you like
- **Content-Based Filtering** - Recommendations based on genres, cast, and themes

### ⭐ Ratings & Interactions
- **5-Star Rating System** - Rate movies and books you've watched/read
- **My Ratings Dashboard** - View all your ratings with statistics
- **Automatic Interaction Tracking** - Improves recommendations based on your behavior
- **Rating Statistics** - See your average rating, total ratings, and more

### 🔐 User Authentication
- **Secure Registration** - Create your account
- **JWT Authentication** - Secure token-based login
- **Protected Routes** - Access personalized features
- **Persistent Sessions** - Stay logged in across visits

### 🎨 User Experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Clean Interface** - MovieLens-inspired design
- **Fast Performance** - Optimized with Vite and React
- **Smooth Navigation** - React Router for seamless page transitions
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - Graceful error messages

### 🔍 Search & Browse
- **Semantic Search** - Search using natural language queries
- **Minimum 3 Characters** - Smart search with debouncing
- **Default Listings** - Browse popular movies and books
- **Filter by Type** - Separate pages for movies and books
- **Search Results** - Clear display with metadata

### 📊 Additional Features
- **About Page** - Learn about FlickPage's mission and technology
- **How It Works** - Understand the recommendation algorithms
- **TMDb Attribution** - Proper credit to The Movie Database
- **Offline Support** - Interaction queue for offline usage

## 📦 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

### Routing & State
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management

### API & Data
- **Axios** - HTTP client with interceptors
- **JWT** - Secure authentication tokens

### UI Components
- **Lucide React** - Beautiful icons
- **Custom Components** - Reusable UI elements

## 🎨 Key Features Explained

### Interaction Tracking
FlickPage automatically tracks your behavior to improve recommendations:
- **View Tracking** - When you visit movie/book detail pages
- **Click Tracking** - When you click on movie/book cards
- **Search Tracking** - When items appear in your search results

All tracking is:
- Non-blocking (doesn't slow down the UI)
- Debounced (1-second delay to prevent duplicates)
- Offline-ready (queues interactions when offline)
- Privacy-focused (only for authenticated users)

### TMDB Fallback Search
Smart movie discovery system:
1. Searches local database first (fast)
2. If no results, searches TMDB API (comprehensive)
3. Automatically adds found movies to database
4. Shows blue notification when results come from TMDB
5. Next search is instant (already in database)

### Cast & Crew Display
Enhanced movie details with:
- **Genres** - Displayed as colored badges
- **Cast** - Actor names with character names
- **Crew** - Directors, writers, producers with job titles
- **Financial Data** - Budget and revenue in millions
- **Ratings** - TMDb vote average and count
- **Runtime** - Movie duration in minutes



## 🛠️ Available Scripts

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🌐 Browser Support

FlickPage works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
- Open an issue on GitHub

---

**Made with ❤️ by the Shashi**

Visit the live site: **[https://flickpage.vercel.app/](https://flickpage.vercel.app/)**
