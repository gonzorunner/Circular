import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";

const GoogleSignInButton = () => {
	useEffect(() => {
		gapi.load("auth2", () => {
			gapi.auth2.init({
				// is this a sensitive api key? should it be put somewhere more secure than here?
					client_id: "892676991669-egqg8qg47ja1inqveodpeaoknst76r6i.apps.googleusercontent.com",
					scope: "keegee@ucsc.edu",
				});
		});
	}, []);
	
	
	const onSuccess = (response) => {
		console.log("Successful sign in with Google:", response);
	};
	
	const onFailure = (error) => {
		console.error("Failed sign in with Google:", error);
	}
	
	return (
		<GoogleLogin
			clientId="892676991669-egqg8qg47ja1inqveodpeaoknst76r6i.apps.googleusercontent.com"
			buttonText="Sign in with Google"
			onSucess={onSuccess}
			onFailure={onFailure}
			cookiePolicy={"single_host_origin"}
		/>
	);
};

export default GoogleSignInButton;
