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
    movieInfo.length === 20 ? setShowMovieCard(true) : setShowMovieCard(false);
  }, [movieInfo])

  const handlechange = (event) => {
    setQueryInput(event.target.value)
  }

  const handleSubmit = () => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?api_key=7fe59f88be383a3675b8713834c00c73&language=en-US&page=1&include_adult=false&query=${queryInput}`
    })
    .then(res => {
      setMovieInfo(res.data.results)
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
            <Col lg={4}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movieInfo[0].poster_path}`} />
                <Card.Body>
                  <Card.Title>{movieInfo[0].title}</Card.Title>
                  <Card.Text>
                    {movieInfo[0].overview}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movieInfo[1].poster_path}`} />
                <Card.Body>
                  <Card.Title>{movieInfo[1].title}</Card.Title>
                  <Card.Text>
                    {movieInfo[1].overview}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movieInfo[2].poster_path}`} />
                <Card.Body>
                  <Card.Title>{movieInfo[2].title}</Card.Title>
                  <Card.Text>
                    {movieInfo[2].overview}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
          </Row>
        ) : null
      }
    </Container>
  );
}

export default App;
