-- Update existing products to use the new color structure
-- This script converts the old string array to the new object array format

-- First, let's see the current structure
SELECT slug, colors FROM products LIMIT 3;

-- Update products to use the new color-index structure
-- This assumes your current colors are in order and maps them to sequential image indices

UPDATE products SET colors = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'name', color_name,
      'imageIndex', color_index
    )
  )
  FROM (
    SELECT 
      unnest(colors) as color_name,
      generate_series(0, array_length(colors, 1) - 1) as color_index
  ) as color_mapping
)
WHERE colors IS NOT NULL AND array_length(colors, 1) > 0;

-- Verify the update
SELECT slug, colors FROM products LIMIT 3;

-- Example of manually setting specific color-image mappings for a product:
-- UPDATE products 
-- SET colors = '[
--   {"name": "Black", "imageIndex": 0},
--   {"name": "White", "imageIndex": 1},
--   {"name": "Gray", "imageIndex": 2}
-- ]'::jsonb
-- WHERE slug = 'your-product-slug';
