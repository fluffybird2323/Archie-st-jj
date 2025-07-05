-- Verify that the rollback was successful

-- Check table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Check that colors is back to text[]
SELECT 
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- Check sample products
SELECT 
  slug, 
  name, 
  price, 
  category,
  colors,
  array_length(colors, 1) as color_count
FROM products 
ORDER BY created_at DESC;

-- Verify we have the expected number of products
SELECT 
  COUNT(*) as total_products,
  COUNT(DISTINCT category) as categories
FROM products;
