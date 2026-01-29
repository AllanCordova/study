TRUNCATE TABLE persons RESTART IDENTITY;

INSERT INTO persons (name, level, image_path) VALUES 
('Batman', 0, '/assets/persons/batman.webp'),
('Dracula', 10, '/assets/persons/dracula.webp');