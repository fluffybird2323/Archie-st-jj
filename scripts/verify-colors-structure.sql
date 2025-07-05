-- Check the current table structure
\d products;

-- Check the colors column specifically
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- View sample color data
SELECT slug, name, colors FROM products LIMIT 3;

-- Test querying specific color information
SELECT 
  slug, 
  name,
  jsonb_array_length(colors) as color_count,
  colors
FROM products 
WHERE jsonb_array_length(colors) > 1;

-- Extract individual color names and indices
SELECT 
  slug,
  name,
  color_obj->>'name' as color_name,
  (color_obj->>'imageIndex')::int as image_index
FROM products,
jsonb_array_elements(colors) as color_obj
ORDER BY slug, (color_obj->>'imageIndex')::int;
