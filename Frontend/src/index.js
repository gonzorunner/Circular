import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import App from './App';
/* eslint-disable */
ReactDOM.render(
	<GoogleOAuthProvider clientId="892676991669-egqg8qg47ja1inqveodpeaoknst76r6i.apps.googleusercontent.com">
	   <React.StrictMode>
	      <App />
	   </React.StrictMode>
	</GoogleOAuthProvider>,
	document.getElementById('root'));
/* eslint-disable */
