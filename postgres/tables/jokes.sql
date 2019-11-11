BEGIN TRANSACTION;

CREATE TABLE jokes (
    id serial PRIMARY KEY,
    type VARCHAR(10),
    joke text,
    setup text,
    delivery text,
    category VARCHAR(20)
);

COMMIT;