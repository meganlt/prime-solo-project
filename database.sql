-------------------------------------------------------
--------------------------------------------------
-- START FROM SCRATCH:
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user";


-------------------------------------------------------
--------------------------------------------------
-- TABLE SCHEMAS:
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "avatar" VARCHAR(1000),
  "role" VARCHAR(50),
  "available_status" BOOLEAN
);



CREATE TABLE "items" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(1000) NOT NULL,
  "owner_user_id" INT,
  "holder_user_id" INT,
  "category" VARCHAR(100) NOT NULL,
  "term" VARCHAR(100) NOT NULL,
  "status" VARCHAR(100) NOT NULL,
  "description" VARCHAR(2000),
  "image" VARCHAR(255)
);

CREATE TABLE "requests" (
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(50) NOT NULL,
  "details" VARCHAR(2000) NOT NULL,
  "sent_by" INT REFERENCES "user",
  "sent_to" INT REFERENCES "user",
  "message_item" INT REFERENCES "items"
  "responded" BOOLEAN
);

-------------------------------------------------------
--------------------------------------------------
-- USER QUERIES:

-- GET all USER info
SELECT * from "user";

-- UPDATE USER avatar image
UPDATE "user"
	SET "avatar"='img/avatar-raccoon.png'
WHERE id = 1;	

-- GET all USERS from community:
SELECT id, role, username, avatar FROM "user";
-------------------------------------------------------
--------------------------------------------------
-- ITEM QUERIES:

INSERT INTO "items" ( name, owner_user_id, holder_user_id, category, term, status, description, image )
VALUES 
('1984', 1, 3, 'book', 'Long Term Borrow', 'borrowed', 'We already live in a totalitarian state, doesnt anyone read my blog, Britta Unfiltered??', 'https://placecats.com/300/250'),
('Natalie is Freezing', 1, 1, 'cd', 'Short Term Borrow', 'borrowed', 'This is my favorite cd. Walkmans are cool, because they are retro.', 'https://placecats.com/300/250'),
('Knitting Needles', 1, 1, 'craft-supply', 'Giveaway', 'available', 'Knitting is hip. Winona Ryder knits.', 'https://placecats.com/300/250');

-- Selecting USER'S trinkets
SELECT * from "items" WHERE "owner_user_id"= 1 ORDER BY id;

-- Selecting OTHER USER'S trinkets
SELECT * from "items" WHERE "owner_user_id"!=1 ORDER BY id;

-- Selecting all relevant ITEM and USER information for displaying all trinkets
SELECT items.id, items.image, items.name, items.category, items.term, items.description, "user".username, "user".avatar 
FROM "user"
JOIN "items" ON "user".id = items.owner_user_id;

-- Selecting all relevant ITEM and USER information for displaying all currently available trinkets, not owned by USER #1
SELECT items.id, items.image, items.name, items.category, items.term, items.description, items.owner_user_id, "user".username, "user".avatar 
FROM "user"
JOIN "items" ON "user".id = items.owner_user_id
WHERE items.status = 'available' AND items.owner_user_id !=1
ORDER BY items.id;

-- INSERT new ITEM
INSERT INTO "items" ( name, owner_user_id, holder_user_id, category, term, status, description, image )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 );
    
-- UPDATING ITEM for a specific USER with image included:
UPDATE "items" 
	SET "name"='Updated',
		"category"='book',
		"term"='Short Term Borrow',
		"status"='hidden',
		"description"='A bit of a longer description updated',
		"image"='Animal-Crossing-New-Horizons---Nintendo-Switch.jpeg'
WHERE id=1;

-- UPDATING ITEM for a specific USER with image NOT included:
UPDATE "items" 
	SET "name"='Updated',
		"category"='book',
		"term"='Short Term Borrow',
		"status"='hidden',
		"description"='A bit of a longer description updated'
WHERE id=1;

-- DELETING an ITEM
--- FIRST: Check and DELETE related rows in REQUESTS - must do this first!
--- CHECK: SELECT * FROM requests WHERE message_item = 39;
BEGIN;
DELETE FROM requests WHERE message_item = 60;
--- THEN: Check and DELETE the ITEM
--- CHECK: SELECT * FROM items WHERE id = 39;
DELETE FROM items WHERE id = 60;
COMMIT;

-------------------------------------------------------
--------------------------------------------------
-- REQUEST QUERIES:

-- INSERT into Requests:
INSERT into "requests" ( "type", "details", "sent_by", "sent_to", "message_item", "responded")
	VALUES ( 'borrow-request', 'Cannot wait to try this out', 1, 3, 1, 'FALSE');

-- Selecting all active requests for a specific user:
SELECT * from "requests" WHERE sent_to = 3 AND responded = 'FALSE';

-- Selecting all active requests and related item details for a specific user
SELECT * , requests.id AS "request_id" FROM "requests"
JOIN "items" ON "requests".message_item = items.id
WHERE sent_to = 1 AND responded = 'FALSE';

-- UPDATE REQUEST & ITEM after accepting a borrow
WITH
    A AS (UPDATE "items"
        SET status='borrowed',
            holder_user_id=1
    WHERE id = 34)

    UPDATE "requests"
        SET responded='TRUE'
    WHERE id = 11;

-- UPDATE REQUEST to end and dismiss acknowledgment-type request
UPDATE "requests" SET responded='TRUE' WHERE id=1;

-------------------------------------------------------
--------------------------------------------------
-- SEED DATA:
--   You'll need to actually register users via the application in order to get hashed
--   passwords. Once you've done that, you can modify this INSERT statement to include
--   your dummy users. Be sure to copy/paste their hashed passwords, as well.
--   This is only for development purposes! Here's a commented-out example:
-- INSERT INTO "user"
--   ("username", "password")
--   VALUES
--   ('unicorn10', '$2a$10$oGi81qjXmTh/slGzYOr2fu6NGuCwB4kngsiWQPToNrZf5X8hxkeNG'), --pw: 123
--   ('cactusfox', '$2a$10$8./c/6fB2BkzdIrAUMWOxOlR75kgmbx/JMrMA5gA70c9IAobVZquW'); --pw: 123


-------------------------------------------------------
--------------------------------------------------
-- AUTOMAGIC UPDATED_AT:

-- Did you know that you can make and execute functions
-- in PostgresQL? Wild, right!? I'm not making this up. Here
-- is proof that I am not making this up:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/

-- Create a function that sets a row's updated_at column
-- to NOW():
CREATE OR REPLACE FUNCTION set_updated_at_to_now() -- 👈
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user table that will execute
-- the set_update_at_to_now function on any rows that
-- have been touched by an UPDATE query:
CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
