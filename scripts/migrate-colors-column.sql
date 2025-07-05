-- Step 1: First, let's see the current column type
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- Step 2: Create a backup of current colors data (optional but recommended)
CREATE TABLE IF NOT EXISTS products_backup AS 
SELECT id, slug, colors FROM products;

-- Step 3: Drop the existing colors column
ALTER TABLE products DROP COLUMN IF EXISTS colors;

-- Step 4: Add the new colors column as JSONB
ALTER TABLE products ADD COLUMN colors JSONB DEFAULT '[]'::jsonb;

-- Step 5: Verify the new column structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- Step 6: Update existing products with default color structure
-- This assumes you want to convert old text array colors to the new format
-- You can customize this based on your existing data

UPDATE products SET colors = '[]'::jsonb WHERE colors IS NULL;

-- If you had existing color data and want to restore it manually, you can do:
-- UPDATE products SET colors = '[{"name": "Black", "imageIndex": 0}]'::jsonb WHERE slug = 'your-product-slug';
