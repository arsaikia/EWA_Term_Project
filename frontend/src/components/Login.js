import React, { Component } from 'react';

const Login = () => {
	return (
		<form>
			<h3>Sign In</h3>

			<div className='form-group'>
				<label>Email address</label>
				<input
					type='email'
					className='form-control'
					placeholder='Enter email'
				/>
			</div>

			<div className='form-group'>
				<label>Password</label>
				<input
					type='password'
					className='form-control'
					placeholder='Enter password'
				/>
			</div>

			<div className='form-group'>
				<div className='custom-control custom-checkbox'>
					<input
						type='checkbox'
						className='custom-control-input'
						id='customCheck1'
					/>
					<label className='custom-control-label' htmlFor='customCheck1'>
						Remember me
					</label>
				</div>
			</div>

			<button type='submit' className='btn btn-primary btn-block'>
				Submit
			</button>
			<p className='forgot-password text-right'>
				Forgot <a href='#'>password?</a>
			</p>
		</form>
	);
};

const Signup = () => {
	return (
		<form>
			<h3>Sign Up</h3>

			<div className='form-group'>
				<label>First name</label>
				<input type='text' className='form-control' placeholder='First name' />
			</div>

			<div className='form-group'>
				<label>Last name</label>
				<input type='text' className='form-control' placeholder='Last name' />
			</div>

			<div className='form-group'>
				<label>Email address</label>
				<input
					type='email'
					className='form-control'
					placeholder='Enter email'
				/>
			</div>

			<div className='form-group'>
				<label>Password</label>
				<input
					type='password'
					className='form-control'
					placeholder='Enter password'
				/>
			</div>

			<button type='submit' className='btn btn-primary btn-block'>
				Sign Up
			</button>
			<p className='forgot-password text-right'>
				Already registered <a href='#'>sign in?</a>
			</p>
		</form>
	);
};

export { Login, Signup };
