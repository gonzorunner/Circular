/* eslint-disable max-len */
import React from 'react';
// import List from '@mui/material/List';
// import Slide from '@mui/material/Slide';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';
// import Grid from '@mui/material/Unstable_Grid2';
// import {Box} from '@mui/system';
import OfferCard from './OfferCard';
// import Offer from './OfferPage';

// import ListingCard from './ListingCard';
// import ListingDialog from './ListingDialog';

// import {postOffer} from '../../server/backend/src/offer';

// List of offers associated with a particular listing
// props:
//  listingId - the id of the associated listing
//  listingOwner - the email of the owner of the listing
const OfferList = (props) => {
  const listingId = props.listingId;
  const listingOwner = props.listingOwner;
  const [offers, setOffers] = React.useState([]);

  const fetchOffersByListingId = () => {
    if (!listingId) {
      return;
    }
    fetch('http://localhost:3010/v0/offers/' + listingId, {
      method: 'GET',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((json) => {
      setOffers(json);
    })
    .catch((error) => {
      console.error('Error fetching listings:', error);
      setOffers([]);
    });
  };

  React.useEffect(() => {
    fetchOffersByListingId();
  }, [listingId, setOffers]);

  return (
    <div>
      <h2>
        Offers
      </h2>
          {offers.map((item) => (
            <OfferCard
              item={item}
              listingOwner={listingOwner}>
            </OfferCard>
          ))}
    </div>
    /*
    <div>
      <h2>
        Offers
      </h2>
      <Box>
        <List sx={{width: '100%', maxWidth: 700, bgcolor: 'background.paper'}}>
          {offers.map((item) => (
            <ListItem>
              <ListItemText primary={item.title}/>
              <ListItemText primary={item.description}/>
              <div>
                {sessionStorage.getItem('user') == listingOwner ? (
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                ) : (
                  <ListItemText primary={""}/>
                )}
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
    */
    /*
    <Box sx={{p: 3}}>
      <Grid container spacing={2}>
        {offers.map((item) => (
          <Grid xs={6} md={3} key={item.id}>
            <ListingCard
              item={item}
              handleClickOpen={handleClickOpen}
              setListing={setListing}
              postTest={postTest}/>
          </Grid>
        ))}
      </Grid>
      <ListingDialog
        open={open}
        handleClose={handleClose}
        Transition={Transition}
        listingSingle={listingSingle}
      />
    </Box>
    */
  );
};

export default OfferList;
