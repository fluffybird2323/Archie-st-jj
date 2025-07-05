-- Fix any existing products that might have invalid color data

-- First, let's see what we have
SELECT slug, name, colors, pg_typeof(colors) as color_type FROM products;

-- Update any products that might have null or invalid colors
UPDATE products 
SET colors = ARRAY['Black'] 
WHERE colors IS NULL OR colors = '{}' OR array_length(colors, 1) IS NULL;

-- If there are any products with object-like data, we'll need to fix them manually
-- Let's check for any problematic entries
SELECT slug, name, colors 
FROM products 
WHERE NOT (colors::text ~ '^{[^{}]*}$' OR colors = '{}');

-- Example of how to fix a specific product if needed:
-- UPDATE products 
-- SET colors = ARRAY['Black', 'White', 'Gray'] 
-- WHERE slug = 'your-product-slug';

-- Verify all products have valid color arrays
SELECT 
  slug, 
  name, 
  colors,
  array_length(colors, 1) as color_count
FROM products 
ORDER BY slug;
