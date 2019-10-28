BEGIN TRANSACTION;

INSERT into users ( name, surname, email, joined, age) values ('Jan', 'Kowalski', 'jankowalski@gmail.com', '2018-01-01', 18);
INSERT into login (hash, email) values ('$2a$10$TXHbg2FSk/GRTMkhWDCJKOGZ/VFEJ/xMf/wXSCyqZAwl8qfXSpPQa','jankowalski@gmail.com');

COMMIT;