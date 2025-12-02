# Firebase CLI Guide

This guide shows you how to use Firebase CLI to manage your database and project.

## Initial Setup

### 1. Login to Firebase (if not already logged in)

```bash
firebase login
```

This will open a browser window for authentication.

### 2. Initialize Firebase in Your Project

```bash
firebase init
```

When prompted:
- Select **Firestore** (use arrow keys and spacebar to select)
- Select **Hosting** (optional, for deployment later)
- Choose **Use an existing project**
- Select **shopping-list-2026**
- For Firestore rules file: `firestore.rules` (or press Enter for default)
- For Firestore indexes file: `firestore.indexes.json` (or press Enter for default)
- For hosting: `dist` (this is where Vite builds your app)

## Managing Firestore Database

### View Your Data

```bash
# View all collections and documents
firebase firestore:get --all-collections

# View a specific collection
firebase firestore:get shoppingList
firebase firestore:get menu
```

### Export Data

```bash
# Export all Firestore data
firebase firestore:export gs://shopping-list-2026.appspot.com/backup

# Or export to local file (requires gcloud CLI)
firebase firestore:export ./backup
```

### Import Data

```bash
# Import from backup
firebase firestore:import gs://shopping-list-2026.appspot.com/backup
```

## Managing Firestore Security Rules

### View Current Rules

```bash
firebase firestore:rules:get
```

### Deploy Rules

After editing `firestore.rules`, deploy with:

```bash
firebase deploy --only firestore:rules
```

### Test Rules Locally

```bash
# Start emulator
firebase emulators:start --only firestore

# Test rules (in another terminal)
firebase firestore:rules:test
```

## Firestore Emulator (Local Development)

### Start Emulator

```bash
firebase emulators:start --only firestore
```

This starts a local Firestore instance at `http://localhost:8080`

### Connect App to Emulator

Add this to your `.env` file for local development:

```env
VITE_USE_FIREBASE_EMULATOR=true
```

Then update `src/firebase/config.js` to connect to emulator when in development mode.

## Useful Commands

### Check Project Status

```bash
# List all projects
firebase projects:list

# Get current project info
firebase use

# Switch projects
firebase use shopping-list-2026
```

### View Logs

```bash
# View Firestore logs
firebase functions:log --only firestore

# View all logs
firebase functions:log
```

### Database Operations via CLI

While you can't directly insert/update via CLI easily, you can:

1. **Use Firebase Console** (web interface) - easiest for manual operations
2. **Use Node.js script** with Firebase Admin SDK
3. **Use your app** - the recommended way!

## Quick Reference

```bash
# Login
firebase login

# Initialize project
firebase init

# Deploy rules
firebase deploy --only firestore:rules

# Start emulator
firebase emulators:start --only firestore

# View collections
firebase firestore:get --all-collections

# Check project
firebase use

# Deploy everything
firebase deploy
```

## Next Steps

1. Initialize Firebase in your project: `firebase init`
2. Set up Firestore security rules
3. Test your app to verify data is saving
4. (Optional) Set up Firebase Hosting for deployment

