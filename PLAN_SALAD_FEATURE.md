# Plan: Add Salad Selection Column to Shopping List

## Overview
Add a new column to the shopping list that allows users to select a salad from the menu page. This will help categorize shopping items by which salad they belong to.

## Feature Requirements
1. Add a dropdown column similar to the store selection dropdown
2. Populate dropdown with salads from the Menu page (type='salad')
3. Default value: "General" (for items not associated with a specific salad)
4. Display the selected salad in the shopping list rows
5. Support both adding new items and editing existing items

## Implementation Plan

### 1. Data Model Updates
- **Field Name**: `salad` (or `saladName` - to be decided)
- **Type**: String
- **Default Value**: "General"
- **Firebase**: No migration needed - field will be added automatically when items are created/updated

### 2. Components to Update

#### A. `InlineAddRow.jsx` (Quick Add Form)
- Add `salad: 'General'` to initial form state
- Add new column in the grid layout
- Add dropdown select element populated with salads
- Update form submission to include salad field

#### B. `EditableShoppingRow.jsx` (Item Display/Edit)
- Add `salad` field to editData state
- Add new column in both display and edit modes
- Add dropdown in edit mode
- Display salad name/badge in view mode

#### C. `ShoppingItemForm.jsx` (Modal Form - if still used)
- Add salad dropdown field
- Include salad in form state

### 3. Data Fetching
- Create a hook or utility function to fetch salads from menu collection
- Filter menu items where `type === 'salad'`
- Extract salad names for dropdown options
- Handle loading state and empty salad list

### 4. CSS Updates

#### A. `InlineAddRow.css`
- Update grid-template-columns to include new salad column
- Add styles for `.col-salad-compact` class
- Ensure responsive design (mobile/tablet)

#### B. `EditableShoppingRow.css`
- Update grid-template-columns to include salad column
- Add styles for `.col-salad` class
- Style salad badge similar to store badge
- Update responsive breakpoints

#### C. `ShoppingList.css` (if needed)
- Ensure table layout accommodates new column

### 5. Constants/Utilities
- Consider adding salad-related constants if needed
- Create helper function to get salads list (or use hook)

### 6. Implementation Steps

#### Step 1: Create Salad Data Hook
- Create `useSalads.js` hook to fetch and return salad list
- Subscribe to menu collection
- Filter for type='salad'
- Return array of salad names

#### Step 2: Update InlineAddRow Component
- Import useSalads hook
- Add salad to form state
- Add dropdown column in grid
- Update handleSubmit to include salad

#### Step 3: Update EditableShoppingRow Component
- Import useSalads hook
- Add salad to editData state
- Add salad column in grid layout
- Add dropdown in edit mode
- Display salad badge in view mode

#### Step 4: Update CSS Files
- Update grid layouts for both components
- Add responsive styles
- Style salad badge/display

#### Step 5: Update ShoppingItemForm (if used)
- Add salad field to form

#### Step 6: Testing
- Test adding new items with salad selection
- Test editing existing items
- Test default "General" value
- Test with empty salad list
- Test responsive design

## Design Decisions

### Naming Convention
- **Field Name**: `salad` (simple, matches the menu type)
- **Default Value**: `"General"` (user preference)
- **Display Label**: "Salad" or "For Salad"

### UI/UX Considerations
- Salad dropdown should be similar in style to store dropdown
- Salad badge in display mode should be visually distinct from store badge
- Consider color coding or icon for salad column
- Ensure mobile responsiveness (may need to hide on very small screens)

### Data Structure
```javascript
// Shopping item structure
{
  name: "Lettuce",
  store: "Fresh Farm",
  quantity: "1 head",
  salad: "Caesar Salad", // or "General"
  notes: "",
  checked: false
}
```

## Files to Modify

1. `src/components/InlineAddRow.jsx` - Add salad dropdown
2. `src/components/InlineAddRow.css` - Update grid layout
3. `src/components/EditableShoppingRow.jsx` - Add salad field
4. `src/components/EditableShoppingRow.css` - Update grid layout
5. `src/components/ShoppingItemForm.jsx` - Add salad field (if still used)
6. `src/hooks/useSalads.js` - NEW: Hook to fetch salads
7. `src/pages/ShoppingList.jsx` - May need to pass salads data

## Optional Enhancements (Future)
- Filter shopping list by salad
- Group items by salad
- Visual indicators for salad-specific items
- Bulk assign salad to multiple items

## Notes
- No database migration needed - Firestore will accept new fields automatically
- Existing items without salad field will default to "General" when displayed
- Consider backward compatibility when reading items without salad field
