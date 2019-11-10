-- Deploy fresh database tables

\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/favourites.sql'
\i '/docker-entrypoint-initdb.d/tables/jokes.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'