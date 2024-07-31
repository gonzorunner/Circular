/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Box} from '@mui/system';
import ListingCard from './ListingCard';
import ListingDialog from './ListingDialog';
// import {Map, Autocomplete} from 'google-maps-react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';

// import {postOffer} from '../../server/backend/src/offer';

const Home = () => {
  const [listings, setListings] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [listingSingle, setListing] = React.useState({
    title: '',
    id: '',
    description: '',
    requests: '',
    giveaway: false,
    state: '',
    image: '',
    date: '',
  });
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const handleClickOpen = (id) => {
    fetchListing(setListing, id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const obj = {
      title: '',
      id: '',
      description: '',
      requests: '',
      giveaway: false,
      state: '',
      image: '',
      date: '',
    };
    setListing(obj);
    // setReply('');
    // setSend('');
  };

  const fetchListing = (setListing, id) => {
    fetch('http://localhost:3010/v0/listing/' + id, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setListing(json);
      });
  };

  const postTest = (id) => {
    fetch('http://localhost:3010/v0/test',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        return response.json();
      });
  };

  const fetchListings = () => {
    fetch('http://localhost:3010/v0/listings', {
      method: 'GET',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((json) => {
      setListings(json);
    })
    .catch((error) => {
      console.error('Error fetching listings:', error);
      setListings([]);
    });
  };

  React.useEffect(() => {
    fetchListings();
  }, []);

  const containerStyle = {
    width: '400px',
    height: '400px',
  };
  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  return (
    <>
      <Box sx={{p: 3}}>
        <Grid container spacing={2}>
          {listings.map((item) => (
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
          listingSingle={listingSingle}
        />
      </Box>
    </>
  );
};

export default Home;
