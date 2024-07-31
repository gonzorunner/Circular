import React from 'react';
import {Card, CardMedia, CardHeader,
  CardActionArea, IconButton, Tooltip} from '@mui/material';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

function ListingCard(props) {
  const {item, handleClickOpen} = props;
  return (
    <Card sx={{minWidth: 175}} elevation={3}>
      <CardActionArea
        onClick={() => handleClickOpen(item.id)}
      >
        <CardMedia
          component="img"
          height="194"
          image={item.image}
          alt={'image of ' + item.title}
        />
      </CardActionArea>
      <CardHeader
        title={item.title}
        subheader={
          item.giveaway ?
            'Gift - no exchange necessary':
            'Requesting: ' + item.requests}
        action={
          <Tooltip title="Make an offer on this item">
            <IconButton
              aria-label='make offer'
            >
              <SwapHorizontalCircleIcon />
            </IconButton>
          </Tooltip>
        }
      />
    </Card>
  );
} export default ListingCard;
