-- Create a simple products table without is_active column
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product translations table
CREATE TABLE IF NOT EXISTS product_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, locale)
);

-- Clear any existing products to avoid conflicts
DELETE FROM products;

-- Insert sample products with real images
INSERT INTO products (slug, name, price, category, description, images, sizes, colors) VALUES

-- T-Shirts
('artie-essential-tee-black', 'ARTIE Essential Tee - Black', 39.99, 'T-Shirts', 
 'Our signature essential tee crafted from 100% organic cotton. Features a relaxed fit with reinforced seams for durability. Perfect for everyday wear or layering.',
 ARRAY[
   'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop'
 ],
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Black']),

('artie-essential-tee-white', 'ARTIE Essential Tee - White', 39.99, 'T-Shirts',
 'Clean, minimalist white tee made from premium cotton blend. Pre-shrunk and garment-washed for the perfect fit that lasts.',
 ARRAY[
   'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop'
 ],
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['White']),

-- Hoodies
('artie-signature-hoodie-black', 'ARTIE Signature Hoodie - Black', 89.99, 'Hoodies',
 'Premium heavyweight hoodie with brushed fleece interior. Features kangaroo pocket, adjustable drawstrings, and our signature logo embroidery.',
 ARRAY[
   'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Black']),

('artie-signature-hoodie-gray', 'ARTIE Signature Hoodie - Gray', 89.99, 'Hoodies',
 'Comfortable oversized hoodie in heather gray. Made with sustainable materials and designed for maximum comfort and style.',
 ARRAY[
   'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Gray']),

-- Shorts
('artie-performance-shorts-black', 'ARTIE Performance Shorts - Black', 54.99, 'Shorts',
 'Athletic shorts designed for movement. Features moisture-wicking fabric, side pockets, and a comfortable elastic waistband with drawstring.',
 ARRAY[
   'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Black']),

('artie-performance-shorts-navy', 'ARTIE Performance Shorts - Navy', 54.99, 'Shorts',
 'Versatile navy shorts perfect for workouts or casual wear. Quick-dry technology and anti-odor treatment keep you fresh all day.',
 ARRAY[
   'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Navy']),

-- Pants
('artie-joggers-black', 'ARTIE Comfort Joggers - Black', 69.99, 'Pants',
 'Premium joggers with tapered fit and ribbed cuffs. Made from soft cotton blend with side pockets and back pocket for essentials.',
 ARRAY[
   'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1506629905607-d9b1f5e5e6e5?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Black']),

('artie-joggers-gray', 'ARTIE Comfort Joggers - Gray', 69.99, 'Pants',
 'Relaxed-fit joggers in versatile heather gray. Perfect for lounging or casual outings with a modern streetwear aesthetic.',
 ARRAY[
   'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop',
   'https://images.unsplash.com/photo-1506629905607-d9b1f5e5e6e5?w=800&h=800&fit=crop'
 ],
 ARRAY['S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Gray']);

-- Update the created_at and updated_at timestamps to make them look realistic
UPDATE products SET 
  created_at = NOW() - (random() * interval '30 days'),
  updated_at = NOW() - (random() * interval '7 days');
