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

SELECT * from "user";

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

INSERT INTO "items" ( name, owner_user_id, holder_user_id, category, term, status, description, image )
VALUES 
('1984', 1, 3, 'book', 'Long Term Borrow', 'borrowed', 'We already live in a totalitarian state, doesnt anyone read my blog, Britta Unfiltered??', 'https://placecats.com/300/250'),
('Natalie is Freezing', 1, 1, 'cd', 'Short Term Borrow', 'borrowed', 'This is my favorite cd. Walkmans are cool, because they are retro.', 'https://placecats.com/300/250'),
('Knitting Needles', 1, 1, 'craft-supply', 'Giveaway', 'available', 'Knitting is hip. Winona Ryder knits.', 'https://placecats.com/300/250');


SELECT * from "items" WHERE "owner_user_id"=1;

SELECT * 
FROM "user"
JOIN "items" ON "user".id = items.owner_user_id;

SELECT items.name, "user".username 
FROM "user"
JOIN "items" ON "user".id = items.owner_user_id;

SELECT * from "user";


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
