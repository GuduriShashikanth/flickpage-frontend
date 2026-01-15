# Deploying FlickPage to Vercel

## Quick Deploy

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd flickpage-frontend
vercel
```

4. **Follow prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **flickpage** (or your choice)
   - Directory? **./flickpage-frontend**
   - Override settings? **N**

5. **Deploy to production**:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Go to Vercel**:
   - Visit https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `flickpage-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (if needed):
   - Add any environment variables
   - Example: `VITE_API_URL=https://your-api.com`

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

## Custom Domain

### Add Custom Domain

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `flickpage.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### Recommended Domain Names
- `flickpage.com`
- `flickpage.app`
- `flickpage.io`
- `myflickpage.com`

## Environment Variables

If your API requires environment variables, add them in Vercel:

1. Go to Project Settings
2. Click "Environment Variables"
3. Add variables:
   ```
   VITE_API_URL=https://amateur-meredithe-shashikanth-45dbe15b.koyeb.app
   ```

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you push to other branches or open PRs

## Build Settings

The `vercel.json` file is already configured:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ React Router works correctly
- ✅ All routes redirect to index.html
- ✅ SPA navigation works properly

## Post-Deployment

### 1. Test Your Site
- Visit your Vercel URL
- Test all features:
  - Login/Register
  - Search movies
  - View details
  - Rate movies
  - Recommendations

### 2. Update API CORS

Make sure your backend API allows requests from your Vercel domain:

```python
# In your backend
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://your-project.vercel.app",
    "https://flickpage.com",  # Your custom domain
]
```

### 3. Monitor Performance

Vercel provides:
- Analytics
- Performance metrics
- Error tracking
- Deployment logs

Access these in your Vercel dashboard.

## Troubleshooting

### Build Fails

**Check**:
- All dependencies in `package.json`
- No TypeScript errors: `npm run build` locally
- Environment variables are set

### Routes Don't Work

**Solution**:
- Ensure `vercel.json` has rewrites configuration
- Check that `dist/index.html` exists after build

### API Requests Fail

**Check**:
- API URL is correct
- CORS is configured on backend
- Environment variables are set in Vercel

### Slow Build Times

**Optimize**:
- Use `npm ci` instead of `npm install`
- Enable caching in Vercel settings
- Remove unused dependencies

## Vercel Features

### Preview Deployments
Every branch and PR gets a unique preview URL:
- Test changes before merging
- Share with team for review
- Automatic cleanup after merge

### Analytics
Track:
- Page views
- User sessions
- Performance metrics
- Core Web Vitals

### Edge Functions (Optional)
Add serverless functions if needed:
```
flickpage-frontend/
└── api/
    └── hello.ts
```

## Cost

Vercel Free Tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments

Perfect for FlickPage! 🚀

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

## Next Steps

1. Deploy to Vercel
2. Add custom domain
3. Configure environment variables
4. Test all features
5. Share with users! 🎉
