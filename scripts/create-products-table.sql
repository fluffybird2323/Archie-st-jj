-- Create products table
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
  is_active BOOLEAN DEFAULT true,
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

-- Insert sample products
INSERT INTO products (slug, name, price, category, description, images, sizes, colors) VALUES
('artie-classic-tshirt', 'tshirt', 49.99, 'T-Shirts', 'tshirtDesc', 
 ARRAY['https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg', 'https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Black', 'White', 'Gray']),
('artie-premium-shorts', 'shorts', 79.99, 'Shorts', 'shortsDesc',
 ARRAY['https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg', 'https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg'],
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Black', 'Navy', 'Khaki']),
('artie-signature-hoodie', 'hoodie', 149.99, 'Hoodies', 'hoodieDesc',
 ARRAY['https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg', 'https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg'],
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Black', 'Gray', 'Navy']),
('artie-essential-pants', 'pants', 119.99, 'Pants', 'pantsDesc',
 ARRAY['https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg', 'https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg'],
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
 ARRAY['Black', 'Charcoal', 'Olive']);

-- Insert English translations
INSERT INTO product_translations (product_id, locale, name, description) 
SELECT id, 'en', 
  CASE name 
    WHEN 'tshirt' THEN 'ARTIE Classic T-Shirt'
    WHEN 'shorts' THEN 'ARTIE Premium Shorts'
    WHEN 'hoodie' THEN 'ARTIE Signature Hoodie'
    WHEN 'pants' THEN 'ARTIE Essential Pants'
  END,
  CASE name 
    WHEN 'tshirt' THEN 'Premium cotton blend t-shirt with modern fit. Perfect for everyday wear with superior comfort and style.'
    WHEN 'shorts' THEN 'High-performance shorts designed for movement. Featuring moisture-wicking fabric and athletic cut.'
    WHEN 'hoodie' THEN 'Signature hoodie crafted from premium materials. Oversized fit with attention to detail and comfort.'
    WHEN 'pants' THEN 'Essential pants combining style and functionality. Tailored fit with premium fabric and modern design.'
  END
FROM products;
