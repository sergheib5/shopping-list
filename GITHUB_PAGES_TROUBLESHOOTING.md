# GitHub Pages Troubleshooting Guide

## Current Issue: White Screen / 404 Errors

If you're seeing:
- White screen on GitHub Pages
- Console errors like `GET https://sergheib5.github.io/src/main.jsx 404`
- `GET https://sergheib5.github.io/manifest.json 404`

This means GitHub Pages is serving the **source files** instead of the **built files**.

## Solution Steps

### Step 1: Verify GitHub Pages Configuration

1. Go to your repository: `https://github.com/sergheib5/shopping-list`
2. Click **Settings** → **Pages**
3. Under **Source**, make sure it says **"GitHub Actions"** (NOT "Deploy from a branch")
4. If it's set to "Deploy from a branch", change it to **"GitHub Actions"**
5. Save the settings

### Step 2: Verify the Workflow File

The workflow file (`.github/workflows/deploy.yml`) should:
- Build with `VITE_BASE_PATH: /shopping-list/`
- Upload the `dist` folder as artifact
- Deploy via GitHub Actions

**Important**: Make sure the repository name in the workflow matches your actual repo name:
- If your repo is `sergheib5/shopping-list`, use `VITE_BASE_PATH: /shopping-list/`
- If your repo is `sergheib5.github.io` (user pages), use `VITE_BASE_PATH: /`

### Step 3: Trigger the Workflow

1. Go to **Actions** tab in your repository
2. If you see a failed workflow, click on it to see the error
3. If no workflow is running, push a commit to trigger it:
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push origin main
   ```

### Step 4: Check the Workflow Logs

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Check the **build** job:
   - Should show "Build" step completing successfully
   - Should show "Upload artifact" step
4. Check the **deploy** job:
   - Should show "Deploy to GitHub Pages" step completing

### Step 5: Verify the Deployment

After deployment completes:
1. Wait 1-2 minutes for GitHub Pages to update
2. Visit: `https://sergheib5.github.io/shopping-list/`
3. Open browser console (F12) and check for errors
4. The built HTML should reference `/shopping-list/assets/...` not `/src/main.jsx`

## Common Issues

### Issue: "GitHub Actions" option not available in Pages settings

**Solution**: 
- Make sure you have the workflow file at `.github/workflows/deploy.yml`
- Make sure it has the correct permissions (pages: write, id-token: write)
- Try refreshing the Settings page

### Issue: Workflow runs but deployment fails

**Solution**:
- Check the workflow logs for specific errors
- Make sure `VITE_BASE_PATH` matches your repository name
- Verify the build completes successfully

### Issue: Still seeing source files

**Solution**:
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that GitHub Pages Source is set to "GitHub Actions"
- Verify the workflow actually deployed (check Actions tab)
- Try accessing in incognito/private mode

### Issue: Assets load but app is blank

**Solution**:
- Check browser console for JavaScript errors
- Verify Firebase configuration (check `.env` file)
- Make sure `VITE_BASE_PATH` is set correctly in the workflow

## Manual Verification

To verify the build locally matches what should be deployed:

```bash
# Build with the same settings as GitHub Actions
VITE_BASE_PATH=/shopping-list/ npm run build

# Check the built HTML
cat dist/index.html

# Should show paths like:
# /shopping-list/assets/index-XXXXX.js
# NOT: /src/main.jsx
```

## Alternative: Use HashRouter (Simpler)

If you continue having issues, you can switch to `HashRouter` which doesn't require base path configuration:

1. Update `src/App.jsx`:
   ```jsx
   import { HashRouter as Router, Routes, Route } from 'react-router-dom';
   // Remove basename prop
   <Router>
   ```

2. Update `vite.config.js`:
   ```js
   base: '/', // Always use root
   ```

3. Update workflow:
   ```yaml
   VITE_BASE_PATH: /
   ```

This will make URLs like `https://sergheib5.github.io/shopping-list/#/menu` instead of `https://sergheib5.github.io/shopping-list/menu`, but it's more reliable.

## Still Having Issues?

1. Check the **Actions** tab for workflow errors
2. Check browser console (F12) for specific error messages
3. Verify the repository name matches the base path
4. Try deploying to Vercel as an alternative (see `GITHUB_PAGES_SETUP.md`)

