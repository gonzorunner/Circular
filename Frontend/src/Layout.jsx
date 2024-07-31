/* eslint-disable */
import { Outlet, Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Toolbar, CssBaseline, IconButton,
  Box, Fab, Link
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Login from './Login';
import NotificationBell from './NotificationBell';
import MessagingButton from './MessagingButton';

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position='relative' sx={{
        'gutterBottom': true,
      }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              component={RouterLink}
              underline='none'
              variant='h5'
              fontWeight={700}
              sx={{
                'flexGrow': 1,
                'color': 'secondary.main',
                '&:hover': {
                  color: 'secondary.dark',
                },
              }}>
              Circular
            </Link>
          </Box>
          <NotificationBell />
          <MessagingButton 
            messages='6'/>
          <Login />
        </Toolbar>
      </AppBar>
      <Fab
        aria-label='post item'
        to='/post'
        component={RouterLink}
        color='secondary'
        sx={{
          position: "fixed",
          bottom: 8,
          right: 8,
        }}
      >
        <AddIcon />
      </Fab>
      {/* <Link to="/Post">Post</Link> */}
      <Outlet />
    </>
  );
};

export default Layout;
