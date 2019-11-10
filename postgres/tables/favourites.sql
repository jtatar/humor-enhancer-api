BEGIN TRANSACTION;

CREATE TABLE favourites(
    id serial PRIMARY KEY,
    email  text UNIQUE NOT NULL,
    joke INT NOT NULL
);

COMMIT;