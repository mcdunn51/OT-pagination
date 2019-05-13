import React from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

const Header = () => {
    return (
    <Container>
        <Row>
            <Col>
                <Jumbotron>
                    <h1>OnTrack Front-End Developer Test</h1>
                </Jumbotron>
            </Col>
        </Row>
    </Container>
    )
}

export default Header;