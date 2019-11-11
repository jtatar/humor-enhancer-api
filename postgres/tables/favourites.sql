BEGIN TRANSACTION;

CREATE TABLE favourites(
    id serial PRIMARY KEY,
    userid INT NOT NULL,
    jokeid INT NOT NULL
);

COMMIT;