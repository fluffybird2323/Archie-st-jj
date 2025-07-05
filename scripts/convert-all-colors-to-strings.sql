-- Convert all color objects back to simple string arrays

-- First, let's see what we currently have
SELECT slug, name, colors, pg_typeof(colors) as color_type FROM products;

-- Update products that have JSONB color objects to convert them to text arrays
UPDATE products 
SET colors = (
  CASE 
    WHEN pg_typeof(colors) = 'jsonb'::regtype THEN
      -- Convert JSONB array of objects to text array
      ARRAY(
        SELECT jsonb_extract_path_text(color_obj, 'name')
        FROM jsonb_array_elements(colors) AS color_obj
        WHERE jsonb_extract_path_text(color_obj, 'name') IS NOT NULL
        AND jsonb_extract_path_text(color_obj, 'name') != ''
      )
    ELSE 
      -- Keep existing text arrays as they are
      colors::text[]
  END
)::text[]
WHERE colors IS NOT NULL;

-- Clean up any products that ended up with empty color arrays
UPDATE products 
SET colors = ARRAY['Black'] 
WHERE colors IS NULL OR colors = '{}' OR array_length(colors, 1) IS NULL;

-- Verify the conversion worked
SELECT 
  slug, 
  name, 
  colors,
  pg_typeof(colors) as color_type,
  array_length(colors, 1) as color_count
FROM products 
ORDER BY slug;
