import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer>
			<Container
				className='py-2'
				style={{
					backgroundColor: '#2c4053',
					color: '#eff7fa',
					fontWeight: '500',
				}}
				fluid>
				<Row>
					<Col className='text-center' py-3>
						Copyright {'\u00A9'} 2020 Eat Fresh
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
