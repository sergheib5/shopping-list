# Testing Database Connection

This guide helps you verify that your app is correctly saving data to Firebase Firestore.

## Quick Test Steps

### 1. Start Your Development Server

```bash
npm run dev
```

### 2. Open the App

Open `http://localhost:5173` in your browser.

### 3. Test Shopping List

1. **Add an item:**
   - Type an item name (e.g., "Milk")
   - Add store, quantity, notes if desired
   - Click save or press Enter
   - The item should appear in the list immediately

2. **Verify in Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select project: **shopping-list-2026**
   - Go to **Firestore Database**
   - You should see a `shoppingList` collection
   - Click on it to see your item

3. **Test other operations:**
   - ✅ Check/uncheck an item (should update `checked` field)
   - ✅ Edit an item (click on it, modify, save)
   - ✅ Delete an item (hover, click delete button)

### 4. Test Menu Page

1. **Switch to Menu tab** (bottom navigation)

2. **Add a Daily Menu item:**
   - Click "+ Add" in Daily Menu section
   - Fill in date, lunch, dinner
   - Save
   - Verify in Firestore `menu` collection

3. **Add other menu items:**
   - Add a salad (name, prepared by)
   - Add a snack
   - Add a drink
   - All should appear in the `menu` collection

### 5. Test Real-time Sync

1. Open the app in **two different browser windows**
2. Add an item in one window
3. It should appear **instantly** in the other window (real-time sync!)

## Using Firebase CLI to Verify

### View Collections

```bash
# See all collections
firebase firestore:get --all-collections
```

### View Specific Collection Data

```bash
# View shopping list items
firebase firestore:get shoppingList

# View menu items
firebase firestore:get menu
```

### Check Firestore Rules

```bash
# View current rules
firebase firestore:rules:get

# Deploy rules (if you modified firestore.rules)
firebase deploy --only firestore:rules
```

## Troubleshooting

### Items Not Appearing in Firestore

1. **Check browser console** for errors:
   - Open DevTools (F12)
   - Look for red error messages
   - Common issues:
     - Missing environment variables
     - Firestore not enabled
     - Security rules blocking access

2. **Verify .env file:**
   ```bash
   cat .env
   ```
   Make sure all values are filled in (not "your-api-key-here")

3. **Check Firestore is enabled:**
   - Go to Firebase Console
   - Firestore Database should show "Active"

4. **Verify security rules:**
   - Go to Firestore Database > Rules
   - Should allow read/write for both collections
   - Click "Publish" if you made changes

### Connection Errors

If you see "Firebase: Error (auth/unauthorized-domain)":
- Go to Firebase Console > Project Settings > General
- Scroll to "Authorized domains"
- Add `localhost` if not present

### Environment Variables Not Loading

1. **Restart dev server** after creating/modifying `.env`
2. Make sure variable names start with `VITE_`
3. Check that `.env` is in project root (same level as `package.json`)

## Expected Firestore Structure

### shoppingList Collection
```
shoppingList/
  └── {document-id}/
      ├── item: "Milk"
      ├── store: "Walmart"
      ├── quantity: "2"
      ├── notes: "Organic"
      ├── checked: false
      └── createdAt: Timestamp
```

### menu Collection
```
menu/
  └── {document-id}/
      ├── type: "daily" | "salad" | "snack" | "drink"
      ├── date: "2026-01-01" (for daily)
      ├── lunch: "Pasta" (for daily)
      ├── dinner: "Pizza" (for daily)
      ├── name: "Caesar Salad" (for salad/snack/drink)
      ├── preparedBy: "John" (for salad)
      └── createdAt: Timestamp
```

## Success Indicators

✅ Items appear in Firestore immediately after adding  
✅ Changes sync in real-time across multiple browsers  
✅ No errors in browser console  
✅ All CRUD operations work (Create, Read, Update, Delete)  
✅ Data persists after page refresh  

If all these work, your database connection is successful! 🎉

