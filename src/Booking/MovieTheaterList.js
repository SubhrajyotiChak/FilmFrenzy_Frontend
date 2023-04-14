import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import AppNavBar from "../BasicUI/AppNavBar";
import Footer from "../BasicUI/Footer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Styling/MovieTheaterList.css'

const styles = {
    card: {
        borderRadius: 55,
        padding: '1.5rem',
    }
}

class MovieTheaterList extends Component {

    constructor(props) {
        super(props);
        this.state = { movieTheaters: [] };
    }

    componentDidMount() {
        fetch('/app')
            .then(response => response.json())
            .then(data => this.setState({ movieTheaters: data }));
    }


    render() {
        window.scrollTo(0, 0);
        const { movieTheaters } = this.state;
        const theaterList = movieTheaters.map(theater => {
            return <CardGroup className="pt-5" key={theater.id}>
                <Card className="mx-5 mb-4 border-0 shadow " style={styles.card}>
                    <Row>
                        <Col xs={12} md={4} lg={7} className=" text-center px-5">
                            <Card.Body className='bodyColor py-4'>
                                <h2>{theater.name}</h2>
                                <Card.Text>
                                    {theater.location} {theater.city}
                                </Card.Text>
                                <q>
                                    {theater.description}
                                </q>

                            </Card.Body>
                            <Button variant="outline-success"><Link to={"/" + theater.id.toString()} className="link">See a Movie</Link></Button>
                        </Col>
                        <Col className='text-center'>
                            <Card.Title variant="top" className='text-center bodyColor'>Now Showing</Card.Title>
                            <Row>
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <Col>
                                        <div className='text-center'><img src={theater.movieList[idx].image} height="200px" /></div>
                                        <div className='text-center bodyColor'>{theater.movieList[idx].name}</div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </CardGroup>
        });

        return (

            <div>
                <AppNavBar />
                <Container fluid className='card-outline'>
                    {theaterList}
                </Container>
                <Footer />
            </div>

        );
    }



}

export default MovieTheaterList;