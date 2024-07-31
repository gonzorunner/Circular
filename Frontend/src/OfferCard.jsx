import React from 'react';
import {Card, CardHeader, IconButton, Collapse,
  CardActions, Typography, CardMedia, CardContent} from '@mui/material';
  import {styled} from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';

const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function OfferCard(props) {
  const {item, listingOwner} = props;
  const [state, updateState] = React.useState();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3010/v0/offer/" + item.id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <Card sx={{minWidth: 500}} elevation={3}>
      {sessionStorage.getItem('user') == listingOwner ? (
        <CardHeader
        title={item.title}
        subheader={item.user}
      />
      ) : (
        <CardHeader
        title={item.title}
      />
      )}
      <CardActions disableSpacing>
        <div>
          {sessionStorage.getItem('user') != item.user &&
          sessionStorage.getItem('user') == listingOwner ? (
            <IconButton edge="end" aria-label="comments">
              <CommentIcon />
            </IconButton>
          ) : (
            <div></div>
          )}
          {sessionStorage.getItem('user') == item.user &&
          sessionStorage.getItem('user') != listingOwner ? (
            <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <div></div>
          )}
        </div>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CardMedia
            component="img"
            height="194"
            image={item.image}
            alt={'Image of ' + item.title}
          />
          <Typography paragraph>
            {item.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
} export default OfferCard;
