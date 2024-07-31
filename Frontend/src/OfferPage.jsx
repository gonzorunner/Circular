/* eslint-disable */
//import './style.css';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

// TODO: This component will need to be passed a prop or something in order to know about the listing item that someone is making an offer for
function Offer(props) {
	const navigate = useNavigate();
	const [clicked, setClicked] = useState(false);
	const [item, setItem] = useState(null);
	const [description, setDescription] = useState(null);
	const [imageURL, setImageURL] = useState(null);

	const handleClick = () => {
		setClicked(true);
	}

	async function handleSubmit(e) {
		e.preventDefault(); // prevent page from being reloaded
		setClicked(false);


		try {
			
			const response = await fetch('http://localhost:3010/v0/offer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: item,
					description: description,
					image: imageURL,
					requestedListingId: props.listing_id,
					user: sessionStorage.getItem('user')
				})
			});
			if (!response.ok) throw response;
			//const json = await response.json();
			// console.log(json);
			
			navigate('/'); // navigates to homepage
			
		} catch (err) {
			console.log(err);
		}
	};

  	return (
		<>
			{sessionStorage.getItem('user') ? (
				<div>
				{clicked ? (
					<div>
						<h2>Make Offer</h2>
						<label>Item</label>
						<input type="text" onChange={(e) => setItem(e.target.value)}></input>
						<br />
						<label>Description</label>
						<input type="text" onChange={(e) => setDescription(e.target.value)} ></input>
						<br />
						<label>Image URL</label>
						<input type="text" onChange={(e) => setImageURL(e.target.value)}></input>
						<br />
						<button type="submit" onClick={handleSubmit}>Submit</button>
						<br />
					</div>
				) : (
					<button 
						onClick={handleClick}
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
						Make Offer
					</button>
				)}
				</div>
			) : (
				<div>
					<h3>To make an offer, please login first</h3>
				</div>
			)}
		</>
  );
}

export default Offer;

