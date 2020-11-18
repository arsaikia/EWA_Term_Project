import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginScreen from './LoginScreen';

const LoginController = ({ showHeader, setShowHeader, ...props }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// On Load/Page refresh,  make sure header is hidden
	useEffect(() => {
		setShowHeader(false);
	}, [])

	// Get All Users
	const getAllUsers = () => {
		axios({
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			method: 'GET',
			mode: 'cors',
			url: 'http://localhost:5005/users',
		}).then((response) => {
			console.log(response);
		});
	};

	// Get All Users
	const createUser = async () => {
		const response = await axios({
			data: {
				userName: email,
				password: password,
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			mode: 'cors',
			url: 'http://localhost:5005/users',
		});

		console.log(response);
	};

	const getUsersHandler = () => {
		setShowHeader(true);
		createUser();
	};

	/*
	* On Browser Back 
	*/
	window.onpopstate = e => {
		setShowHeader(true);
	 }

	return (
		<LoginScreen
			setEmail={setEmail}
			setPassword={setPassword}
			getUsersHandler={getUsersHandler}
			showHeader={showHeader}
		/>
	);
};

export { LoginController };
