# Setup Checklist

Use this checklist to verify your setup is complete and working.

## ✅ GitHub Setup

- [ ] Created GitHub repository
- [ ] Connected local repository to GitHub remote
- [ ] Pushed initial commit to GitHub
- [ ] Verified files appear on GitHub

## ✅ Firebase Setup

- [ ] Created Firebase project
- [ ] Enabled Firestore Database
- [ ] Created `.env` file from `.env.example`
- [ ] Filled in all Firebase configuration values in `.env`
- [ ] Set Firestore security rules
- [ ] Published security rules

## ✅ Development Environment

- [ ] Installed dependencies (`npm install`)
- [ ] Started dev server (`npm run dev`)
- [ ] App loads without errors in browser
- [ ] No console errors related to Firebase

## ✅ Shopping List Page Testing

- [ ] Can add new shopping items
- [ ] Items appear in the list immediately
- [ ] Items appear in Firestore Database (check Firebase Console)
- [ ] Can edit existing items
- [ ] Can check/uncheck items (strikethrough appears)
- [ ] Can delete items
- [ ] Changes sync in real-time (test with two browser windows)

## ✅ Menu Page Testing

- [ ] Can add daily menu items (date, lunch, dinner)
- [ ] Daily menu items appear in the list
- [ ] Can add salad items (name, prepared by)
- [ ] Salad items appear in the list
- [ ] Can add snack items
- [ ] Snack items appear in the list
- [ ] Can add drink items
- [ ] Drink items appear in the list
- [ ] Can edit all menu item types
- [ ] Can delete menu items
- [ ] All items appear in Firestore Database (check Firebase Console)
- [ ] Changes sync in real-time (test with two browser windows)

## ✅ Firebase Console Verification

- [ ] Can see `shoppingList` collection in Firestore
- [ ] Can see `menu` collection in Firestore
- [ ] Documents appear when items are added
- [ ] Documents update when items are edited
- [ ] Documents delete when items are removed

## ✅ Error Handling

- [ ] Error messages appear if Firebase connection fails
- [ ] App handles missing environment variables gracefully
- [ ] No JavaScript errors in browser console

## 🎉 All Done!

If all items are checked, your Shopping List PWA is fully set up and ready to use!

