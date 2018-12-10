import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <Row>
            <Col>
              Hello world
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
