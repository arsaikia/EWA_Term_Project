import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({ showHeader }) => {
    return (
        showHeader && (
            <footer>
                <Container
                    className='py-2'
                    style={{
                        backgroundColor: showHeader ? '#2c4053' : '#eff7fa',
                        color: '#eff7fa',
                        fontWeight: '500',
                        position: 'relative',
                        bottom: '0',
                    }}
                    fluid>
                    <Row>
                        <Col className='text-center py-1'>
                            Copyright {'\u00A9'} 2020 Eat Fresh
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    );
};

export default Footer;
