TRUNCATE TABLE persons RESTART IDENTITY;

INSERT INTO persons (name, level, image_path) VALUES 
('Batman', 10, '/assets/persons/batman.webp'),
('Sherlock Holmes', 20, '/assets/persons/sherlock.webp'),
('Hermione Granger', 30, '/assets/persons/hermione.webp'),
('Spock', 40, '/assets/persons/spock.webp'),
('Yoda', 50, '/assets/persons/yoda.webp'),
('Rick Sanchez', 60, '/assets/persons/rick_sanchez.webp'),
('L (Death Note)', 70, '/assets/persons/l_death_note.webp'),
('Tony Stark', 80, '/assets/persons/ironman.webp'),
('Gandalf', 90, '/assets/persons/gandalf.webp'),
('The Doctor (Doctor Who)', 100, '/assets/persons/the_doctor.webp');