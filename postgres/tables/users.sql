BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
    email text UNIQUE NOT NULL,
    joined TIMESTAMP NOT NULL,
    age INT NOT NULL
);

COMMIT;