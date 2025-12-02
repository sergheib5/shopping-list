# GitHub Pages Deployment Guide

This guide will help you deploy your shopping list app to GitHub Pages.

## Why the White Screen?

The white screen on GitHub Pages is typically caused by:
1. **Base path issues**: GitHub Pages serves from a subdirectory (e.g., `/shopping-list/`), but the app was configured for root (`/`)
2. **React Router**: `BrowserRouter` needs a `basename` prop to work with subdirectories
3. **Missing 404.html**: GitHub Pages needs a fallback file for SPA routing
4. **Service worker paths**: Absolute paths don't work with subdirectories

All of these issues have been fixed! ✅

## Setup Steps

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Update the workflow file** (if needed):
   - Open `.github/workflows/deploy.yml`
   - Find the line: `VITE_BASE_PATH: /shopping-list/`
   - Replace `shopping-list` with your actual repository name
   - If your repo is at the root of your GitHub Pages (username.github.io), use `/` instead

3. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

4. **Wait for deployment**:
   - Go to **Actions** tab in your GitHub repository
   - You'll see the deployment workflow running
   - Once complete, your site will be available at:
     - `https://YOUR_USERNAME.github.io/shopping-list/` (if repo is `shopping-list`)
     - `https://YOUR_USERNAME.github.io/` (if repo is `YOUR_USERNAME.github.io`)

### Option 2: Manual Deployment

If you prefer to deploy manually:

1. **Build with the correct base path**:
   ```bash
   # For a repository named 'shopping-list'
   VITE_BASE_PATH=/shopping-list/ npm run build
   
   # For a repository at root (username.github.io)
   npm run build
   ```

2. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/dist** folder
   - Click **Save**

3. **Push the dist folder**:
   ```bash
   # Build first
   VITE_BASE_PATH=/shopping-list/ npm run build
   
   # Add and commit dist folder (if not in .gitignore)
   git add dist
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

## Important: Repository Name Matters!

The `VITE_BASE_PATH` must match your repository structure:

- **If your repo is `shopping-list`**: Use `VITE_BASE_PATH=/shopping-list/`
- **If your repo is `YOUR_USERNAME.github.io`**: Use `VITE_BASE_PATH=/` (root)
- **If your repo is in an organization**: Use `VITE_BASE_PATH=/repo-name/`

## Testing Locally

To test the GitHub Pages build locally:

```bash
# Build with base path
VITE_BASE_PATH=/shopping-list/ npm run build

# Preview the build
npm run preview
```

Then visit `http://localhost:4173/shopping-list/` (or whatever base path you used)

## Troubleshooting

### Still seeing a white screen?

1. **Check the browser console** (F12) for errors
2. **Verify the base path** matches your repository name
3. **Clear browser cache** and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check the Network tab** to see if assets are loading (look for 404 errors)

### Assets not loading?

- Make sure `VITE_BASE_PATH` in the workflow matches your repo name
- Check that all asset paths in the HTML are relative or use the base path

### Routes not working?

- The `404.html` file should handle this automatically
- If direct navigation to routes fails, try accessing via the home page first

## Alternative: Deploy to Vercel

If you prefer Vercel (which handles SPAs better out of the box):

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** - Vercel will auto-detect Vite and configure everything

Vercel advantages:
- ✅ No base path configuration needed
- ✅ Automatic HTTPS
- ✅ Better SPA support
- ✅ Preview deployments for PRs
- ✅ Custom domains

## Files Changed for GitHub Pages

- ✅ `vite.config.js` - Added base path support
- ✅ `src/App.jsx` - Added `basename` to BrowserRouter
- ✅ `src/main.jsx` - Fixed service worker registration path
- ✅ `public/sw.js` - Updated cache paths for base path
- ✅ `public/manifest.json` - Changed start_url to relative
- ✅ `404.html` - Created fallback for SPA routing
- ✅ `.github/workflows/deploy.yml` - Created automatic deployment workflow

Your app should now work on GitHub Pages! 🎉

