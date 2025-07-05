-- Ensure the colors column is properly set as text[] type

-- Check current column type
SELECT column_name, data_type, udt_name 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- If the column is still JSONB, convert it to text[]
DO $$
BEGIN
  -- Check if colors column is JSONB
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'colors' 
    AND data_type = 'jsonb'
  ) THEN
    -- First convert JSONB data to text arrays
    UPDATE products 
    SET colors = (
      ARRAY(
        SELECT jsonb_extract_path_text(color_obj, 'name')
        FROM jsonb_array_elements(colors) AS color_obj
        WHERE jsonb_extract_path_text(color_obj, 'name') IS NOT NULL
        AND jsonb_extract_path_text(color_obj, 'name') != ''
      )
    )::text[]
    WHERE colors IS NOT NULL AND jsonb_typeof(colors) = 'array';
    
    -- Then change the column type
    ALTER TABLE products ALTER COLUMN colors TYPE text[] USING colors::text[];
    
    RAISE NOTICE 'Converted colors column from JSONB to text[]';
  ELSE
    RAISE NOTICE 'Colors column is already text[] type';
  END IF;
END $$;

-- Set default value
ALTER TABLE products ALTER COLUMN colors SET DEFAULT '{}';

-- Verify the final state
SELECT 
  column_name, 
  data_type, 
  udt_name,
  column_default
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- Show sample data
SELECT slug, name, colors, array_length(colors, 1) as color_count FROM products LIMIT 5;
