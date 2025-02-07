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
  "description" VARCHAR(2000)
);

INSERT INTO "items" ( name, owner_user_id, holder_user_id, category, term, status, description )
VALUES 
('Heat Gun', 1, 1, 'tool', 'Long Term Borrow', 'available', 'Useful tool for embossing, melting thermoplastic, or curing polymer clay!'),
('Animal Crossing', 1, 1, 'video-game', 'Short Term Borrow', 'available', 'Such a cozy little game!'),
('Game of Thrones: Full Series on DVD', 2, 2, 'DVD', 'Giveaway', 'available', 'I never want to watch this again, so anyone can keep it, or burn it if you want.');

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(1000) NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "item_id" INT,
  "user_id" INT
);

-- JUNCTION TABLE
CREATE TABLE "items_images" (
  "id" SERIAL PRIMARY KEY,
  "item_id" INT REFERENCES "items"
  "image_id" INT REFERENCES "images"
);

CREATE TABLE "messages" {
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(50) NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "body" VARCHAR(2000) NOT NULL,
  "sent_by" INT REFERENCES "user",
  "sent_to" INT REFERENCES "user"
}


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
