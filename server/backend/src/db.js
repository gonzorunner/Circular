const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectListings = async (keyword) => {
    let select = 'SELECT * FROM listing';
    let query
    query = {
        text: select,
    };
    const {rows} = await pool.query(query);
    const listings = [];
    for (const row of rows) {
      obj = {
        id: row.id,
        title: row.listing.title,
        state: row.listing.state,
        image: row.listing.image,
        requests: row.listing.requests,
        giveaway: row.listing.giveaway,
        state: row.listing.state,
      };
      listings.push(obj);
    }
    return listings;
};

exports.findListingsById = async (id) => {
  const select = 'SELECT * FROM listing WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1 ? {id: rows[0].id, ...rows[0].listing} : null;
};

exports.selectOffersByListingId = async (id) => {
  const select = 'SELECT * FROM offer o WHERE o.offer ->> \'requestedListingId\'=$1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  const offers = [];
  for (const row of rows) {
    obj = {
      id: row.id,
      title: row.offer.title,
      description: row.offer.description,
      image: row.offer.image,
      date: row.offer.date,
      requestedListingId: row.offer.requestedListingId,
      user: row.offer.user,
      seen: row.offer.seen,
      accepted: row.offer.accepted,
    };
    offers.push(obj);
  }
  return offers;
}

exports.deleteOffersByListingId = async (id) => {
  const select = 'DELETE FROM offer o WHERE o.offer ->> \'requestedListingId\'=$1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0];
}


exports.inputListing = async (listing) => {
  const input = 'INSERT INTO listing(listing) VALUES ($1) RETURNING id';
  const query = {
    text: input,
    values: [listing],
  };
  const {rows} = await pool.query(query);
  return rows[0];
}

exports.deleteListing = async (id) => {
  const input = "DELETE FROM listing l WHERE l.id = $1 RETURNING id";
  const query = {
    text: input,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0];
}

exports.inputOffer = async (offer) => {
  const input = 'INSERT INTO offer(offer) VALUES ($1) RETURNING id';
  const query = {
    text: input,
    values: [offer],
  };
  const {rows} = await pool.query(query);
  return rows[0];
}

exports.deleteOffer = async (id) => {
  const input = "DELETE FROM offer o WHERE o.id = $1 RETURNING id";
  const query = {
    text: input,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0];
}

// Updates the value of the seen key for the JSON of an offer in the offer table to true.
// This signifies that the user has read the notification of the offer
exports.updateOffer_JSONSeenKeyToTrue = async (offer_id) => {
  const input = `UPDATE offer
                 SET offer = JSONB_SET(offer, '{seen}', 'true', false)
                 WHERE id = $1::UUID RETURNING *`;
  const query = {
    text: input,
    values: [offer_id]
  };
  const {rows} = await pool.query(query);
  return rows[0];
}

exports.postImg = async (data, name) => {
  let post = 'INSERT INTO images(name, data) VALUES($1, $2) RETURNING id';
  let query = {
    text: post,
    values: [name, data],
  };
  const result = await pool.query(query);
  return result.rows[0];
}

exports.inputTest = async (id) => {
  const post = 'INSERT INTO test(test) VALUES($1) RETURNING id';
  let query = {
    text: post,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0];
}

exports.findNotificationsForUser = async (user) => {
  /*Some explanation of the query

    Basic Overview: User is searched for in the listing table (user names are
    unique), and for each listing the user appears in, the corresponding
    listing id is searched for in the offer table.
    This is basically how all the offers for all of the user's listings are found.

    ROW_NUMBER() OVER (): generates a sequential number for each row returned in the query result
    o.offer ->> 'user': selects the value of the "user" key in the offer JSON object
    (o.offer ->> 'seen')::BOOL: casts the data type of the result to a bool instead of the default string
  */
  const input = `SELECT
                   ROW_NUMBER() OVER () AS id,
                   o.offer ->> 'user' AS user,
                   l.listing ->> 'title' AS item,
                   o.offer ->> 'date' AS date,
                   (o.offer ->> 'seen')::BOOL AS seen,
                   o.id AS offer_id
                 FROM listing l, offer o
                 WHERE l.listing ->> 'user' = $1
                   AND (o.offer ->> 'requestedListingId')::UUID = l.id;`
  const query = {
    text: input,
    values: [user]
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
}
  