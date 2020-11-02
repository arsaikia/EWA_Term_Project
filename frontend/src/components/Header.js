import React, { useState } from 'react';
import {
	Navbar,
	Nav,
	Container,
	Image,
	FormControl,
	Button,
	Form,
} from 'react-bootstrap';
import { LinkContainer, Row, Col } from 'react-router-bootstrap';
import logo from '../Images/eatFreshLogo.png';

const Header = () => {
	const [searchKey, setSearchKey] = useState('');

	return (
		<header>
			<Navbar
				bg='dark'
				variant='dark'
				expand='md'
				collapseOnSelect
				fixed='top'
				fluid>
				<Container fluid>
					<LinkContainer to='/'>
						<Navbar.Brand>
							<Image
								src={logo}
								alt='eatFreshLogo..'
								style={{ width: '80px' }}
							/>
						</Navbar.Brand>
					</LinkContainer>

					<Form inline className='mr rounded p-1'>
						<FormControl
							// style={{ marginLeft: '500px' }}
							type='text'
							placeholder='Search Products'
							className='mr-sm-2'
							onChange={(e) => setSearchKey(e.target.value)}
						/>
						<Button
							variant='outline-primary'
							onClick={() => console.log(searchKey)}>
							Search
						</Button>
					</Form>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i>Cart
								</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user'></i>Link
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
