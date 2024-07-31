import React, {useState, useEffect} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import {Popover, IconButton} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/* eslint-disable */
function Login() {
  const [user, setUser] = useState(null);
  // const [profile, setProfile] = useState(sessionStorage.getItem('profile'));
  const [email, setEmail] = useState(sessionStorage.getItem('user'));
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  /* eslint-disable */

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(
    () => {
      if (user) {
        axios
        // in JS, use backticks ` to do ${} in-string substitution
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          })

          .then((res) => {
            // stores the user's email in their sessionStorage. This will be retrieved later
            // when they make posts or offers. Note this is extremely insecure as users can
            // simply write whatever value they want into their session "user" field. If time
            // permits, find a more secure solution.
            // setProfile(res.data);
            sessionStorage.setItem('user', res.data.email);
            setEmail(sessionStorage.getItem('user'));
          })
          .catch((err) => console.log(err));
      }
    },
    [user],
  );

  const logOut = () => {
    googleLogout();
    setEmail(null);
    sessionStorage.removeItem('user');
  };
/* eslint-disable */
  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  /* eslint-disable */

  return (
    <>
        <IconButton 
          onClick={handleClick} >
              <AccountCircleIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
            {email ? (
                      <div>
                        <p>Email Address: {email}</p>
                        <br />
                        <br />
                        <button onClick={logOut}>Log out</button>
                      </div>
                    ) : (
                      <button onClick={() => login()}>Sign in with Google</button>
                    )}
        </Popover>
        
      </>
  );
} export default Login;
