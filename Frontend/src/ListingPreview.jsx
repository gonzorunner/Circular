import {
  AppBar, Toolbar, Typography, List,
  ListItem, ListItemText, Divider, IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function ListingPreview(props) {
  const {title, user, imageURL, requests, description, giveaway} = props;
  const date = '00:00 0/0/0';

  return (
    <Paper sx={{minWidth: 300}}>
      <AppBar sx={{position: 'relative'}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="deleteListing"
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <img
        width={300}
        height={250}
        src={`${imageURL}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${imageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={title}
        loading="lazy"
      />
      <List>
        <ListItem>
          <ListItemText
            primary={giveaway ?
              'Gift - no exchange necessary':
              'Requesting: ' + requests}
            secondary={
              'Posted: ' + date + ' by ' + user
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={description}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
export default ListingPreview;
