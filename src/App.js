import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function App() {

  const [queryInput, setQueryInput] = useState('');
  const [movieInfo, setMovieInfo] = useState({});
  const [showMovieCard, setShowMovieCard] = useState(false);
  
  // RUN THIS (useEffect) EVERY TIME THE movieInfo STATE IS UPDATED (INCLUDING AT INITIALIZATION)
  useEffect(() => {
    movieInfo.Title ? setShowMovieCard(true) : setShowMovieCard(false);
  }, [movieInfo])

  const handlechange = (event) => {
    setQueryInput(event.target.value)
  }

  const handleSubmit = () => {
    axios({
      method: 'get',
      url: `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&t=${queryInput}`,
    })
    .then(res => {
      setMovieInfo(res.data)
    })
    .catch(err => console.log(err))

    setQueryInput('');
  }

  return (
    <Container id="app">
      <Row id="title">
        <h1>Movie Search App</h1>
      </Row>
      <Row>
          <Col lg={2}></Col> {/* empty to keep the search bar small and centered */}
          <Col lg={7}>
            <Form>
              <Form.Group controlId="formBasicQuery">
                
                <Form.Control type="text" placeholder="Movie Title" value={queryInput} onChange={handlechange} />
                
              </Form.Group>
            </Form>
          </Col>
          <Col lg={1}>
            <Button variant="primary" type="button" onClick={handleSubmit}>Search</Button>
          </Col>
          <Col lg={2}></Col> {/* empty to keep the search bar small and centered */}
      </Row>

      {
        showMovieCard ? (
          <Row>
          <Col lg={4}></Col>
            <Col lg={4}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movieInfo.Poster} />
                <Card.Body>
                  <Card.Title>{movieInfo.Title}</Card.Title>
                  <Card.Text>
                    {movieInfo.Plot}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}></Col>
          </Row>
        ) : null
      }
    </Container>
  );
}

export default App;
