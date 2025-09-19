-- Clear existing products first
DELETE FROM products;

-- Add sample products with the new color-index mapping
INSERT INTO products (slug, name, price, category, description, images, sizes, colors, created_at, updated_at) VALUES

-- T-Shirt with multiple color options mapped to specific images
('artie-essential-tee', 'ARTIE Essential Tee', 39.99, 'T-Shirts', 
 'Our signature essential tee crafted from 100% organic cotton. Available in multiple colors.',
 ARRAY[
   'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop'
 ],
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
 '[
   {"name": "Black", "imageIndex": 0},
   {"name": "White", "imageIndex": 1},
   {"name": "Gray", "imageIndex": 2}
 ]'::jsonb,
 NOW() - (random() * interval '30 days'),
 NOW() - (random() * interval '7 days')),

-- Hoodie with color mapping
('artie-signature-hoodie', 'ARTIE Signature Hoodie', 89.99, 'Hoodies',
 'Premium heavyweight hoodie with brushed fleece interior. Multiple color options available.',
 ARRAY[
   'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 '[
   {"name": "Black", "imageIndex": 0},
   {"name": "Gray", "imageIndex": 1},
   {"name": "Navy", "imageIndex": 2}
 ]'::jsonb,
 NOW() - (random() * interval '30 days'),
 NOW() - (random() * interval '7 days')),

-- Shorts with color mapping
('artie-performance-shorts', 'ARTIE Performance Shorts', 54.99, 'Shorts',
 'Athletic shorts designed for movement. Available in versatile colors.',
 ARRAY[
   'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 '[
   {"name": "Black", "imageIndex": 0},
   {"name": "Navy", "imageIndex": 1}
 ]'::jsonb,
 NOW() - (random() * interval '30 days'),
 NOW() - (random() * interval '7 days')),

-- Joggers with color mapping
('artie-comfort-joggers', 'ARTIE Comfort Joggers', 69.99, 'Pants',
 'Premium joggers with tapered fit and ribbed cuffs. Multiple color options.',
 ARRAY[
   'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1506629905607-d9b1f5e5e6e5?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 '[
   {"name": "Black", "imageIndex": 0},
   {"name": "Gray", "imageIndex": 1}
 ]'::jsonb,
 NOW() - (random() * interval '30 days'),
 NOW() - (random() * interval '7 days')),

-- Single color products (for variety)
('artie-premium-tank', 'ARTIE Premium Tank', 29.99, 'T-Shirts',
 'Lightweight tank top perfect for workouts and summer days.',
 ARRAY[
   'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop'
 ],
 ARRAY['XS', 'S', 'M', 'L', 'XL'],
 '[
   {"name": "Black", "imageIndex": 0}
 ]'::jsonb,
 NOW() - (random() * interval '30 days'),
 NOW() - (random() * interval '7 days'));

-- Verify the data was inserted correctly
SELECT slug, name, colors FROM products;
