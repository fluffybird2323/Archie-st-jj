-- Check if products table exists and has data
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Check product data
SELECT * FROM products LIMIT 5;

-- Check if we have the specific product
SELECT * FROM products WHERE slug = 'artie-joggers-black';
