import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// import { Login, Signup } from './components/Login';
import Login from './screens/Login/LoginScreen';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container fluid style={{ paddingTop: '100px' }}>
					<Container>
						{/* <Row>
							<Col xs>First, but unordered</Col>
							<Col xs={{ order: 12 }}>Second, but last</Col>
							<Col xs={{ order: 1 }}>Third, but second</Col>
						</Row> */}

						<Login></Login>
					</Container>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
