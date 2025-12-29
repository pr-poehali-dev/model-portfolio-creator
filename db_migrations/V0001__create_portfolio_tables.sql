-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolio_items table for photos
CREATE TABLE IF NOT EXISTS portfolio_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT,
    thumbnail_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create profile table for model info
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    height INTEGER,
    bust INTEGER,
    waist INTEGER,
    hips INTEGER,
    clothing_size VARCHAR(50),
    shoe_size VARCHAR(50),
    dress_size VARCHAR(50),
    jeans_size VARCHAR(50),
    hair_color VARCHAR(100),
    eye_color VARCHAR(100),
    age INTEGER,
    experience_years INTEGER,
    main_photo_url TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default profile data
INSERT INTO profile (full_name, bio, height, bust, waist, hips, clothing_size, shoe_size, dress_size, jeans_size, hair_color, eye_color, age, experience_years)
VALUES ('Анастасия Волкова', 'Опыт работы с ведущими брендами и фотографами', 178, 86, 62, 92, '42-44 (RU)', '38 (EU)', 'S-M', 'W26-27', 'Светло-русый', 'Голубые', 24, 5);

-- Insert sample portfolio items
INSERT INTO portfolio_items (title, category, image_url, display_order) VALUES
('Studio Editorial', 'fashion', 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/6e539968-6a0a-4234-88df-11d4653e11c8.jpg', 1),
('Natural Light', 'outdoor', 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/af92bad2-5921-4b2e-bc16-e4b2c3483b5d.jpg', 2),
('Beauty Shot', 'beauty', 'https://cdn.poehali.dev/projects/17b51b10-9fe4-4140-a920-ac8517675a1a/files/2480b63e-661d-4193-86a0-b4fcee3e605a.jpg', 3);

-- Insert sample videos
INSERT INTO videos (title, description, display_order) VALUES
('Fashion Week 2024', 'Показ коллекции весна-лето', 1),
('Behind the Scenes', 'Закулисье фотосессии', 2);
