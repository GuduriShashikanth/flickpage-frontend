# Getting Started with FlickPage Frontend

## 🚀 Quick Start (5 Minutes)

### 1. Start the Development Server

The server is already running at **http://localhost:5174**

If you need to restart:
```bash
cd flickpage-frontend
npm run dev
```

### 2. Open in Browser

Visit: **http://localhost:5174**

### 3. Try These Features

#### As a Guest:
1. **Browse Movies** - Scroll through featured movies on home page
2. **Search** - Click "Search" in navbar, try "action thriller"
3. **View Details** - Click any movie to see details
4. **View Recommendations** - Click "Recommendations" to see popular movies

#### Create an Account:
1. Click "Sign up" in navbar
2. Enter email, password, and name
3. Click "Sign up" button
4. You'll be auto-logged in!

#### As a Logged-In User:
1. **Rate Movies** - Click any movie, use star rating
2. **View Your Ratings** - Click "My Ratings" in navbar
3. **Get Personalized Recommendations** - After rating 3+ movies, visit "Recommendations"
4. **Explore Similar Movies** - On any movie detail page, scroll to "Similar Movies"

---

## 📱 Pages Overview

### Home Page (`/`)
- **What you'll see:** Hero section + Featured movies grid
- **What you can do:** Browse movies, click to view details
- **Navigation:** Navbar with all main links

### Search Page (`/search`)
- **What you'll see:** Search bar + Results grid
- **What you can do:** 
  - Type any query (e.g., "romantic comedy", "space adventure")
  - Toggle between AI Semantic Search and Text Search
  - Click results to view details
- **Try these searches:**
  - "action thriller"
  - "romantic comedy"
  - "sci-fi adventure"
  - "mystery detective"

### Movie Detail Page (`/movies/:id`)
- **What you'll see:** Large poster, title, description, rating widget
- **What you can do:**
  - Read movie overview
  - Rate the movie (if logged in)
  - View similar movies
  - Click similar movies to explore

### Recommendations Page (`/recommendations`)
- **What you'll see:**
  - "For You" section (if you have 3+ ratings)
  - "Popular Now" section (always visible)
- **What you can do:**
  - Discover personalized recommendations
  - Explore trending movies
  - Sign up to get personalized recommendations

### My Ratings Page (`/my-ratings`)
- **What you'll see:** Statistics + List of all your ratings
- **What you can do:**
  - View all your ratings
  - Filter by Movies or Books
  - Delete ratings
  - See your average rating

---

## 🎯 Key Features to Test

### 1. Authentication Flow
```
1. Click "Sign up"
2. Enter: email@example.com, password123, Your Name
3. Click "Sign up"
4. ✅ You're logged in! Notice navbar changed
5. Click "Logout" to test logout
6. Click "Sign in" to log back in
```

### 2. Rating System
```
1. Go to home page
2. Click any movie
3. Scroll to "Your Rating" section
4. Click stars to rate (try 4.5 stars)
5. ✅ Rating saved! Refresh page to verify
6. Go to "My Ratings" to see it listed
```

### 3. Search Functionality
```
1. Click "Search" in navbar
2. Type "action" (wait 500ms for debounce)
3. ✅ See results appear
4. Toggle to "Text Search"
5. Try different queries
6. Click any result to view details
```

### 4. Recommendations
```
1. Rate at least 3 movies (any ratings)
2. Go to "Recommendations" page
3. ✅ See "For You" section appear
4. Scroll to "Popular Now" section
5. Click any recommendation
```

### 5. Similar Movies
```
1. Go to any movie detail page
2. Scroll to bottom
3. ✅ See "Similar Movies" section
4. Click any similar movie
5. Notice it loads new similar movies
```

---

## 🔧 Development Tips

### Hot Module Replacement (HMR)
- Edit any file in `src/`
- Save the file
- ✅ Browser auto-updates (no refresh needed!)

### Useful Commands
```bash
# Development server (already running)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit

# Install new package
npm install package-name
```

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (routes)
├── services/       # API calls
├── store/          # Global state (Zustand)
├── types/          # TypeScript types
├── hooks/          # Custom React hooks
└── App.tsx         # Main app with routes
```

---

## 🐛 Troubleshooting

### Port Already in Use
If you see "Port 5173 is in use":
```bash
# Kill the process
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or just use the next available port (5174, 5175, etc.)
```

### API Errors
If you see "Failed to fetch":
1. Check backend is running: https://amateur-meredithe-shashikanth-45dbe15b.koyeb.app
2. Check browser console for errors
3. Verify your token is valid (logout and login again)

### Styles Not Loading
If Tailwind CSS isn't working:
```bash
# Restart dev server
npm run dev
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit

# Most errors are in the editor, check VS Code problems panel
```

---

## 📚 Learning Resources

### React
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [TypeScript with React](https://react.dev/learn/typescript)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/components)

### State Management
- [Zustand Docs](https://docs.pmnd.rs/zustand)

### API Integration
- [Axios Docs](https://axios-http.com/docs/intro)

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add link in `src/components/Navbar.tsx`

### Add New API Endpoint
1. Add function in `src/services/api.ts`
2. Create types in `src/types/index.ts`
3. Use in your component

---

## 🚀 Next Steps

### Immediate
1. ✅ Test all features
2. ✅ Rate some movies
3. ✅ Get personalized recommendations
4. ✅ Explore similar movies

### Short Term
- Add more movies to database
- Invite friends to test
- Collect feedback
- Fix bugs

### Long Term
- Add dark mode
- Add watchlist feature
- Add social sharing
- Deploy to production

---

## 📞 Need Help?

### Check These First
1. Browser console (F12) for errors
2. Network tab for API calls
3. React DevTools for component state
4. VS Code problems panel for TypeScript errors

### Documentation
- `README.md` - Project overview
- `FEATURES.md` - Complete feature list
- `API_REFERENCE.md` - Backend API docs
- `FRONTEND_REQUIREMENTS.md` - Original requirements

---

## ✨ Pro Tips

1. **Use React DevTools** - Install browser extension to inspect components
2. **Check Network Tab** - See all API calls and responses
3. **Use TypeScript** - Hover over variables to see types
4. **Hot Reload** - Save files to see instant updates
5. **Console Logs** - Check browser console for debug info

---

## 🎉 You're Ready!

The app is fully functional and ready to use. Start by:
1. Creating an account
2. Rating a few movies
3. Getting personalized recommendations
4. Exploring similar movies

**Have fun discovering your next favorite movie!** 🎬

---

**Current Status:**
- ✅ Dev server running on http://localhost:5174
- ✅ All features implemented
- ✅ Backend connected
- ✅ Ready for testing

**Version:** 1.0.0
**Last Updated:** January 14, 2026
