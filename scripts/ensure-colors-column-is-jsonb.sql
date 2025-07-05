-- Ensure the colors column supports JSONB for color-index mapping

-- Check current column type
SELECT column_name, data_type, udt_name 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- Convert colors column to JSONB if it's not already
DO $$
BEGIN
  -- Check if colors column is text[]
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'colors' 
    AND data_type = 'ARRAY'
  ) THEN
    -- Convert text[] to JSONB with color-index structure
    UPDATE products 
    SET colors = (
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
    
    -- Change the column type to JSONB
    ALTER TABLE products ALTER COLUMN colors TYPE JSONB USING colors::text::jsonb;
    
    RAISE NOTICE 'Converted colors column from text[] to JSONB';
  ELSE
    RAISE NOTICE 'Colors column is already JSONB type or compatible';
  END IF;
END $$;

-- Set default value for JSONB
ALTER TABLE products ALTER COLUMN colors SET DEFAULT '[]'::jsonb;

-- Verify the final state
SELECT 
  column_name, 
  data_type, 
  udt_name,
  column_default
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'colors';

-- Show sample data with the new structure
SELECT 
  slug, 
  name, 
  colors,
  jsonb_array_length(colors) as color_count
FROM products 
LIMIT 3;
