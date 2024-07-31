import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FormControlLabel, TextField, Switch,
  Button, Paper, Typography, Stack} from '@mui/material';
import Geocode from 'react-geocode';
import GoogleAutoComplete from 'react-google-autocomplete';
import {InputLabel} from '@mui/material';
import {Box} from '@mui/system';
import ListingPreview from './ListingPreview';
import ListingCard from './ListingCard';


function InformationPage() {
  Geocode.setApiKey('AIzaSyAv1rEnbIviSPmo6QFp9mo1hwwWu1pAfS4');
  // used for navigating to specific webpage in Circular
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [requests, setRequests] = useState(""); // give an empty string so that open api doesn't complain about not being given a string value (null) if user doesn't enter requests
  const [giveaway, setGiveaway] = useState(false); // give a default boolean value of false, so api doesn't complain about null not being a boolean
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);


  /* const fetchData = () => {
    return fetch("http://localhost:3010/v0/offer")
          .then((response) => response.json())
          .then((data) => console.log(data));}

    useEffect(() => {
      fetchData();
    },[])*/

  const fetchCoordinates = () => {
    fetch(`/v0/geocode/${location}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setCoordinates(data.results[0].geometry.location);
        console.log(coordinates);
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
      });
  };


  const updateLocation = async (address) => {
    try {
      const response = await Geocode.fromAddress(address);
      const {lat, lng} = response.results[0].geometry.location;
      setLocation({lat, lng});
    } catch (error) {
      console.log(error);
    }
  };


  const submit = async (event) => {
    try {
      const userEmail = sessionStorage.getItem('user');
      event.preventDefault();
      const response = await fetch('http://localhost:3010/v0/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            title: title,
            description: description,
            image: imageURL,
            requests: requests,
            giveaway: giveaway,
            user: userEmail,
            address: location,
          }),
      });
      if (!response.ok) throw response;
      navigate('/'); // navigate to homepage 
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Box sx={{padding: 3}}>
      <Typography variant='h6'>Create a Listing</Typography>
      {sessionStorage.getItem('user') ? (
        <Stack
          direction={{xs: 'column', md: 'row'}}
          alignItems='center'
          spacing={6}>
          <Paper
            sx={{
              padding: 3,
              maxWidth: 500,
              alignSelf: 'center',
            }}>
            <form onSubmit={submit}>
              <Stack
                spacing={2}
                alignItems="left"
              >
                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title"
                  variant="outlined"
                ></TextField>

                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={2}
                ></TextField>

                <TextField
                  onChange={(e) => setImageURL(e.target.value)}
                  label="Image URL"
                  variant="outlined"
                  helperText="link to an image of your item"
                ></TextField>

                <TextField
                  onChange={(e) => setRequests(e.target.value)}
                  label="Item Requests"
                  variant="outlined"
                  helperText="looking for anything in particular?"
                  disabled={giveaway}
                ></TextField>

                <Box>
                  <FormControlLabel
                    control={<Switch onChange={
                      (e) => setGiveaway(e.target.checked)}/>}
                    label="Giving Away?"
                    labelPlacement="top"
                  />
                </Box>

                <TextField
                  onChange={(e) => setLocation(e.target.value)}
                  label="Exchange Spot"
                  variant="outlined"
                  helperText=
                    "address to the place you'd prefer to make the trade"
                ></TextField>
                <Button type="submit" variant="contained">Submit</Button>
              </Stack>

            </form>
          </Paper>
          <Box>
            <Typography variant='h8'>Listing Preview</Typography>
            <ListingPreview
              title={title}
              user="user"
              imageURL={imageURL}
              requests={requests}
              description={description}
              giveaway={giveaway}
            />
          </Box>

          <Box>
            <Typography variant='h8'>Card Preview</Typography>
            <ListingCard
              item={{
                title, requests, giveaway,
                image: imageURL,
              }}
              handleClickOpen={() => {}}
            />
          </Box>

        </Stack>
      ) : (
        <Typography>Please login to post a listing</Typography>
      )}
    </Box>
  );
}

export default InformationPage;
