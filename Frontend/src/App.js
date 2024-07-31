import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
// import Dummy from './components/Dummy';
// import Emoji from './components/Emoji';

import Home from './Home';
// import Login from './Login';
import Layout from './Layout';
import NoPage from './NoPage';
import Offer from './OfferPage';
import Messaging from './Messaging';
// import Post from './Post';
import {ThemeOptions} from './ThemeOptions';
import InformationPage from './InformationPage';
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const theme = createTheme(ThemeOptions);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post" element={<InformationPage />} />
          <Route path="*" element={<NoPage/>} />
          <Route path="offer" element={<Offer/>} />
          <Route path="messages" element={<Messaging />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
