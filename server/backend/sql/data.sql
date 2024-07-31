-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --

-- User Account table data
DELETE FROM user_account;
INSERT INTO user_account(id, user_account) VALUES ('d9ec7011-26e7-46f9-8319-bc847d0fedc3', '{"first_name":"John","last_name": "Doe","email":"john@doe.com"}');
INSERT INTO user_account(id, user_account) VALUES ('152cf45a-7690-423d-8072-ab97b475fbbd', '{"first_name":"Smith","last_name": "Doe","email":"smith@doe.com"}');
-- Listing table data
INSERT INTO listing(id, listing) VALUES ('7af85236-491c-49f4-a5d6-cace1994d6f2','{"title":"PSV","description":"brand new play station 5","user":"albert@ucsc.edu","date":"2020-01-27T00:10:43Z","image":"https://i.imgur.com/DebpKZa.png","state":"traded","requests":"","giveaway":true}');
INSERT INTO listing(id, listing) VALUES ('31517e33-1289-4d26-90b8-fe03ae933254','{"title":"XBOSX","description":"brand new xbox series x","user":"avg@ucsc.edu","date":"2020-01-27T00:10:43Z","image":"https://i.imgur.com/RF60kEg.jpeg","state":"traded","requests":"Gaming chair","giveaway":false}');
INSERT INTO listing(id, listing) VALUES ('d0f84c15-59aa-473e-a56c-a3f88934cd97','{"title":"Headphones","description":"new Senheiser headphones","user":"keegee@ucsc.edu","date":"2020-01-27T00:10:43Z","image":"https://i.imgur.com/dsab5j1.jpeg","state":"not traded","requests":"A nice computer keyboard","giveaway":false}');
-- Categpru table data

-- Offer table data
INSERT INTO offer(id, offer) VALUES ('7bd083dc-965c-4cd6-80be-a6ff5566485c','{"title":"Sega Genesis","description":"Collector game console","image":"https://i.imgur.com/Ctd6lvC.jpeg","date":"2020-01-28T00:10:43Z","requestedListingId":"7af85236-491c-49f4-a5d6-cace1994d6f2","user":"keegee@ucsc.edu","seen":false,"accepted":false}');
INSERT INTO offer(id, offer) VALUES ('0b5e218f-a093-44bd-acbf-c28b28648e78','{"title":"Silverware Collection","description":"Fancy silverware collection","image":"https://i.imgur.com/ydZ6ePo.jpeg","date":"2020-01-28T00:10:43Z","requestedListingId":"7af85236-491c-49f4-a5d6-cace1994d6f2","user":"gonzo@ucsc.edu","seen":false,"accepted":false}');
INSERT INTO offer(id, offer) VALUES ('64840ea0-c9f9-4733-baae-14f196089a4f','{"title":"Nintendo 64","description":"Classic game console comes bundled with other games","image":"https://i.imgur.com/keEoNpa.jpeg","date":"2020-01-28T00:10:43Z","requestedListingId":"31517e33-1289-4d26-90b8-fe03ae933254","user":"keegee@ucsc.edu","seen":false,"accepted":false}');
INSERT INTO offer(id, offer) VALUES ('8859a121-2ad5-41ff-9302-c603558700ec','{"title":"Razer Keyboard","description":"with RGB lights","image":"https://i.imgur.com/AdulXTt.jpeg","date":"2020-01-28T00:10:43Z","requestedListingId":"d0f84c15-59aa-473e-a56c-a3f88934cd97","user":"umbridge@ucsc.edu","seen":false,"accepted":false}');
INSERT INTO offer(id, offer) VALUES ('d935c03d-a796-41a8-b7f5-d8b36a2ca5f3','{"title":"Logitech Keyboard","description":"solid and reliable","image":"https://i.imgur.com/AuHU4Hc.jpeg","date":"2020-01-28T00:10:43Z","requestedListingId":"d0f84c15-59aa-473e-a56c-a3f88934cd97","user":"icowan@ucsc.edu","seen":false,"accepted":false}');


INSERT INTO test(test) VALUES ('{"id":"d9ec7011-26e7-46f9-8319-bc847d0fed45"}');
