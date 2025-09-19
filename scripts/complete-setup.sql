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

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name, role) 
VALUES (
  'admin@archie.com',
  '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ',
  'Admin User',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (slug, name, price, category, description, images, sizes, colors) VALUES
('artie-hoodie-black', 'ARTIE Hoodie', 59.99, 'Hoodies', 'Premium cotton hoodie with modern fit', 
 ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Black', 'White', 'Gray']),

('artie-tee-white', 'ARTIE T-Shirt', 29.99, 'T-Shirts', 'Classic cotton t-shirt with premium quality', 
 ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['White', 'Black', 'Gray']),

('artie-joggers-gray', 'ARTIE Joggers', 49.99, 'Pants', 'Comfortable joggers for everyday wear', 
 ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Gray', 'Black', 'Navy']),

('artie-shorts-navy', 'ARTIE Shorts', 34.99, 'Shorts', 'Athletic shorts with moisture-wicking fabric', 
 ARRAY['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Navy', 'Black', 'Gray'])

ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security (optional but recommended)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to products
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Product translations are viewable by everyone" ON product_translations FOR SELECT USING (true);

-- Admin users can only be accessed by service role
CREATE POLICY "Admin users are private" ON admin_users FOR ALL USING (false);
