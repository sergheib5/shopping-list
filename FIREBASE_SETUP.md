# Firebase Setup Guide

This guide will walk you through setting up Firebase for your Shopping List PWA.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "shopping-list-2026")
4. Click **"Continue"**
5. (Optional) Enable Google Analytics - you can skip this for now
6. Click **"Create project"**
7. Wait for the project to be created, then click **"Continue"**

## Step 2: Enable Firestore Database

1. In your Firebase project dashboard, click on **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll update security rules later)
4. Select a location for your database (choose the closest to your users)
5. Click **"Enable"**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to the **"Your apps"** section
4. Click the web icon (`</>`) to add a web app
5. Register your app:
   - App nickname: "Shopping List Web App" (or any name)
   - (Optional) Check "Also set up Firebase Hosting"
   - Click **"Register app"**
6. Copy the Firebase configuration object that appears. It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 4: Set Up Environment Variables

1. In your project root directory, copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and fill in your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=AIzaSy... (your actual API key)
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**Important**: Replace all placeholder values with your actual Firebase config values!

## Step 5: Configure Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. Replace the default rules with these (for now, allowing public read/write):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Shopping List Collection
    match /shoppingList/{document=**} {
      allow read, write: if true;
    }
    
    // Menu Collection
    match /menu/{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

**⚠️ Security Note**: These rules allow anyone with the link to read and write. For production use, consider:
- Adding authentication
- Using link-based access tokens
- Implementing user-specific collections

## Step 6: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser (usually `http://localhost:5173`)

3. Test the Shopping List page:
   - Try adding a new item
   - Check if it appears in Firebase Console > Firestore Database
   - Try editing an item
   - Try deleting an item
   - Try checking/unchecking items

4. Test the Menu page:
   - Switch to the Menu tab
   - Add a daily menu item
   - Add a salad
   - Add a snack
   - Add a drink
   - Verify all items appear in Firestore

5. Check Firebase Console:
   - Go to Firestore Database
   - You should see two collections: `shoppingList` and `menu`
   - Verify that items you add appear there in real-time

## Step 7: Verify Real-time Sync (Optional)

1. Open the app in two different browser windows/tabs
2. Add an item in one window
3. It should appear instantly in the other window (real-time sync!)

## Troubleshooting

### Error: "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Project Settings > General
- Scroll to "Authorized domains"
- Add your domain (e.g., `localhost` for development)

### Error: "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure you published the rules
- Verify the rules allow read/write access

### Items not appearing
- Check browser console for errors
- Verify your `.env` file has correct values
- Make sure you restarted the dev server after creating `.env`
- Check Firestore Database in Firebase Console to see if data is being saved

### Environment variables not loading
- Make sure your `.env` file is in the project root (same level as `package.json`)
- Restart your dev server after creating/modifying `.env`
- Variable names must start with `VITE_` for Vite to expose them

## Next Steps

Once Firebase is set up and working:
1. Test all functionality on both Shopping List and Menu pages
2. Consider setting up Firebase Hosting for deployment
3. (Optional) Add authentication for better security
4. (Optional) Set up Firebase Analytics to track usage

## Collections Structure

Your Firestore will have two main collections:

### `shoppingList` Collection
Each document contains:
- `id` (auto-generated)
- `item` (string) - item name
- `store` (string) - store name
- `quantity` (string) - quantity
- `notes` (string) - additional notes
- `checked` (boolean) - whether item is checked
- `createdAt` (timestamp) - creation date

### `menu` Collection
Each document contains:
- `id` (auto-generated)
- `type` (string) - 'daily', 'salad', 'snack', or 'drink'
- `date` (string) - for daily menu items
- `lunch` (string) - for daily menu items
- `dinner` (string) - for daily menu items
- `name` (string) - for salads, snacks, drinks
- `preparedBy` (string) - for salads
- `createdAt` (timestamp) - creation date

