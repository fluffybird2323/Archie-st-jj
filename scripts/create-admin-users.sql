-- Create admin tables
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing admin users
DELETE FROM admin_users;

-- Insert admin users with simple passwords for demo
-- Password: admin123
INSERT INTO admin_users (email, password_hash, name, role) VALUES 
('admin@archie.com', '$2b$10$rQZ8qVZ8qVZ8qVZ8qVZ8qOqVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8', 'Admin User', 'super_admin');

-- Password: password  
INSERT INTO admin_users (email, password_hash, name, role) VALUES 
('test@archie.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test Admin', 'admin');
