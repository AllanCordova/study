DROP TABLE IF EXISTS persons CASCADE;

CREATE TABLE persons (
    id SERIAL PRIMARY KEY,             
    name VARCHAR(255) NOT NULL,        
    level INTEGER NOT NULL DEFAULT 1,   
    image_path VARCHAR(255)             
);