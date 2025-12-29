# Seeding Instructions

## Initial Seed

- `cd backend`
- run `node src/seeding/initial.js`

## Updating/removing restaurants

1. Find updates.js in datalog/

   - Make any updates (i.e. updateTwo will be a list of dicts, or removeTwo will be a list of strings)

2. Go to updateRest.js/removeRest.js

   - Update the import on line 6 (both files) to include the correct variable (i.e. updateTwo)
   - Update the variable "updates"/"deletes" on line 16 (both files)

3. Run desired file
   - `cd backend`
   - `node src/seeding/updateRest.js` or `node src/seeding/removeRest.js`
     - Any changes should be printed in the console
