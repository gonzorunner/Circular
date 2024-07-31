import {
  Dialog, AppBar, Toolbar, Typography, List,
  ListItem, ListItemText, Divider, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Offer from './OfferPage';
import OfferList from './OfferList';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ListingDialog(props) {
  const {open, handleClose, listingSingle} = props;

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    const response1 = await fetch("http://localhost:3010/v0/offers/" + listingSingle.id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response2 = await fetch("http://localhost:3010/v0/listing/" + listingSingle.id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{position: 'relative'}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
            {listingSingle.title}
          </Typography>
          {sessionStorage.getItem('user') == listingSingle.user ? (
            <IconButton
            edge="start"
            color="inherit"
            onClick={handleDeleteClick}
            aria-label="deleteListing"
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
      <img
        src={`${listingSingle.image}?w=248&fit=crop&auto=format`}
        // eslint-disable-next-line max-len
        srcSet={`${listingSingle.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={listingSingle.title}
        loading="lazy"
      />
      <List>
        <ListItem>
          <ListItemText
            primary=
              {listingSingle.giveaway ?
                'Gift - no exchange necessary':
                'Requesting: ' + listingSingle.requests}
            secondary={
              // eslint-disable-next-line max-len
              'Posted: ' + listingSingle.date + ' by ' + listingSingle.user
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={listingSingle.description}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <OfferList
            listingId={listingSingle.id}
            listingOwner={listingSingle.user}
          />
        </ListItem>
        <ListItem>
          <div>
            {sessionStorage.getItem('user') == listingSingle.user ? (
              <Divider />
            ) : (
              <Offer listing_id={listingSingle.id}/>
            )}
          </div>
        </ListItem>
      </List>
    </Dialog>
  );
  /* TODO: the listing_id is merely the title right now, which needn't be
  unique, change to unique ID if time permits.*/
} export default ListingDialog;
