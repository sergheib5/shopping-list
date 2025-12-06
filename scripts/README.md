# Data Population Script

This script populates your Firestore database with the shopping list and menu data from your spreadsheet.

## Usage

Run the script using npm:

```bash
npm run populate-data
```

## What it does

The script will add:

### Shopping List Items (12 items)
- Salad Mix (Fresh Farm)
- Mandarins (Fresh Farm, 15 lb)
- Avocado (Fresh Farm, 2)
- Shaved Parmesan (Fresh Farm)
- Shrimps (Fresh Farm)
- Red Onion or Shallot (Fresh Farm)
- Vanilla Vodka 750 (Binny's)
- Chinola Passion fruit liquor 750 (Binny's) - checked
- Dole Pinappple Juice 46oz (Binny's)
- Prosecco (Costco, 5 x 750)
- Lime Juice (Binny's)
- Wine for Mulled wine (Binny's, 2 L)

### Menu Items (11 items)
- **Daily Menu (5 items):**
  - December 30: Lunch N/A, Dinner Pizza
  - December 31, January 1, January 2, January 3 (empty entries)

- **Salads (4 items):**
  - Mandarin/Shrimp (Eve)
  - Seafood Salad (Anastasiia)
  - Olivie (Natasha)
  - Stuffed Mushroom (Elena)

- **Drinks (2 items):**
  - Passion Fruit Martini (Pornstar Martini) by Eve
  - Mulled Wine

## Requirements

- Firebase configuration must be set up in `.env` file
- All `VITE_FIREBASE_*` environment variables must be configured
- Firebase project must have Firestore enabled

## Note

This script will add new documents to your database. If you run it multiple times, it will create duplicate entries. To avoid duplicates, you may want to clear your existing data first or modify the script to check for existing items.


