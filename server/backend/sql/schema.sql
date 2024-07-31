-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
-- User Account table schema
DROP TABLE IF EXISTS user_account;
CREATE TABLE user_account(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), user_account jsonb);
-- listing table schema
-- title, description, image, date, requests, state, giveaway, user
DROP TABLE IF EXISTS listing;
CREATE TABLE listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), listing jsonb);
-- image table schema
DROP TABLE IF EXISTS images;
CREATE TABLE images(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, data BYTEA NOT NULL);
-- offer table schema
-- title, description, image, date, requestedListingId, user, seen, accepted
DROP TABLE IF EXISTS offer;
CREATE TABLE offer(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), offer jsonb);

DROP TABLE IF EXISTS test;
CREATE TABLE test(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), test jsonb);


DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	UserID VARCHAR(20) NOT NULL,
	Username VARCHAR(20) NOT NULL,
	PRIMARY KEY (UserID, Username)
);

DROP TABLE IF EXISTS Listings;
CREATE TABLE Listings (
	ListingID INTEGER NOT NULL,
	ItemName VARCHAR(20) NOT NULL,
	Username VARCHAR(20) NOT NULL,
	UserID VARCHAR(20) NOT NULL,
	ItemDescription VARCHAR(200) NOT NULL,
	ItemState VARCHAR(20) NOT NULL DEFAULT 0,
	RequestedItem VARCHAR(500) NOT NULL,
	IsGiveaway BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (ListingID),
	FOREIGN KEY (UserID, Username) REFERENCES Users(UserID, Username)
);
