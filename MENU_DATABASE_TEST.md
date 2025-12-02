# Menu Page Database Testing Guide

This guide helps you verify that the Menu page is correctly saving and retrieving data from Firebase Firestore.

## Quick Test Checklist

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test Daily Menu Items

1. **Navigate to Menu page** (click Menu tab in bottom navigation)

2. **Add a Daily Menu item:**
   - Click "+ Add" button in Daily Menu section
   - Fill in:
     - Date: "Dec 30"
     - Lunch: "Pasta"
     - Dinner: "Pizza"
   - Click "Save"

3. **Verify:**
   - ✅ Item appears in Daily Menu table immediately
   - ✅ Item appears in Firebase Console > Firestore > `menu` collection
   - ✅ Document has fields: `type: "daily"`, `date`, `lunch`, `dinner`, `createdAt`

4. **Test Edit:**
   - Click on the item row
   - Modify the lunch or dinner
   - Click "Update"
   - ✅ Changes appear immediately

5. **Test Delete:**
   - Click the 🗑️ button
   - Confirm deletion
   - ✅ Item disappears from list and Firestore

### 3. Test Salad Items

1. **Add a Salad:**
   - Click "+ Add" in Salads section
   - Fill in:
     - Salad Name: "Caesar Salad"
     - Prepared By: "John"
   - Click "Save"

2. **Verify:**
   - ✅ Item appears in Salads table
   - ✅ In Firestore: `type: "salad"`, `name`, `preparedBy`, `createdAt`
   - ✅ No `date`, `lunch`, `dinner` fields (correctly cleaned up)

3. **Test Edit and Delete** (same as Daily Menu)

### 4. Test Snack Items

1. **Add a Snack:**
   - Click "+ Add" in Snacks section
   - Fill in:
     - Snack Name: "Chips"
   - Click "Save"

2. **Verify:**
   - ✅ Item appears in Snacks list
   - ✅ In Firestore: `type: "snack"`, `name`, `createdAt`
   - ✅ Only relevant fields are saved

### 5. Test Drink Items

1. **Add a Drink:**
   - Click "+ Add" in Drinks section
   - Fill in:
     - Drink Name: "Coca Cola"
   - Click "Save"

2. **Verify:**
   - ✅ Item appears in Drinks list
   - ✅ In Firestore: `type: "drink"`, `name`, `createdAt`

### 6. Test Real-time Sync

1. **Open app in two browser windows**
2. **Add an item in one window**
3. **Verify it appears instantly in the other window** ✅

### 7. Test Data Persistence

1. **Add several items** (different types)
2. **Refresh the page**
3. **Verify all items load correctly** ✅

## Using Firebase CLI to Verify

### View All Menu Items

```bash
firebase firestore:get menu
```

### View Specific Menu Item

```bash
# Get a specific document ID from Firebase Console, then:
firebase firestore:get menu/{document-id}
```

### Check Collection Structure

The `menu` collection should have documents like:

```json
{
  "type": "daily",
  "date": "Dec 30",
  "lunch": "Pasta",
  "dinner": "Pizza",
  "createdAt": "2024-12-01T..."
}
```

```json
{
  "type": "salad",
  "name": "Caesar Salad",
  "preparedBy": "John",
  "createdAt": "2024-12-01T..."
}
```

```json
{
  "type": "snack",
  "name": "Chips",
  "createdAt": "2024-12-01T..."
}
```

```json
{
  "type": "drink",
  "name": "Coca Cola",
  "createdAt": "2024-12-01T..."
}
```

## Browser Console Debugging

Open browser DevTools (F12) and check the Console tab. You should see:

### When Adding Items:
```
Saving menu item: {dataToSave: {...}, itemId: undefined}
Menu handleAddItem: {itemData: {...}, itemId: undefined}
Adding new menu item
Adding menu item to Firestore: {...}
Menu item added with ID: abc123...
```

### When Updating Items:
```
Saving menu item: {dataToSave: {...}, itemId: "abc123"}
Menu handleAddItem: {itemData: {...}, itemId: "abc123"}
Updating menu item: abc123
Updating menu item in Firestore: {id: "abc123", updates: {...}}
Menu item updated successfully
```

### When Deleting Items:
```
Deleting menu item from Firestore: abc123
Menu item deleted successfully
```

## Troubleshooting

### Items Not Appearing in Firestore

1. **Check browser console for errors:**
   - Look for red error messages
   - Check if Firebase connection is working

2. **Verify .env file:**
   ```bash
   cat .env
   ```
   Make sure all Firebase values are filled in

3. **Check Firestore rules:**
   - Go to Firebase Console > Firestore > Rules
   - Should allow read/write for `menu` collection

4. **Verify Firestore is enabled:**
   - Go to Firebase Console
   - Firestore Database should show "Active"

### Type Field Missing

- The `type` field should always be present in saved documents
- Check console logs to see what data is being saved
- Verify the form is setting the type correctly

### Items Not Grouping Correctly

- Each item should have a `type` field: `"daily"`, `"salad"`, `"snack"`, or `"drink"`
- Items are filtered by type in the Menu component
- Check Firestore to verify `type` field is saved

### Real-time Updates Not Working

- Check browser console for subscription errors
- Verify `subscribeToMenu` is working
- Check network tab for WebSocket connections to Firestore

## Expected Behavior

✅ All menu item types save correctly  
✅ Items appear in correct sections  
✅ Edit functionality works  
✅ Delete functionality works  
✅ Real-time sync works  
✅ Data persists after refresh  
✅ No console errors  
✅ Items appear in Firestore with correct structure  

## Success Criteria

If all these work, your Menu page database integration is successful! 🎉

- [ ] Daily menu items save and display
- [ ] Salad items save and display
- [ ] Snack items save and display
- [ ] Drink items save and display
- [ ] Edit functionality works for all types
- [ ] Delete functionality works for all types
- [ ] Real-time sync works
- [ ] Data persists after refresh
- [ ] All items appear in Firestore with correct structure

