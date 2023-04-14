import React, { Component } from 'react';
import { ButtonGroup, Container, Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AppNavBar from "../BasicUI/AppNavBar";
import Footer from "../BasicUI/Footer";
import '../Styling/Movie.css'

function GetMovie() {
    const { id } = useParams();
    return (
        <div>
            <MovieList theaterId={id} />
        </div>
    );
}

class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = { movieList: [] };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        fetch('/app/' + this.props.theaterId.toString())
            .then(response => response.json())
            .then(data => this.setState({ movieList: data }));
    }

    render() {
        window.scrollTo(0, 0);
        const { movieList } = this.state;
        return (
            <div>
                <AppNavBar />
                <Container fluid className='card-outline bodyColor'>
                    {localStorage.getItem("token") ? <div className='text-center mb-5'></div> : <div className='text-center mb-3 pt-3'>Login to Buy Tickets</div>}
                    <Row xs={1} md={2} lg={4} className="g-5 mx-5 pb-4">
                        {Array.from({ length: movieList.length }).map((_, idx) => (
                            <Col>
                                <Card className='movie-card-component'>
                                    <div className='text-center'><img src={movieList[idx].image} width="100%" /></div>
                                    <Card.Body>
                                        <Card.Title>{movieList[idx].name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{movieList[idx].language} | {movieList[idx].movieType} | {movieList[idx].duration} min</Card.Subtitle>
                                        <Card.Text>
                                            {movieList[idx].description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Movie Time</Card.Subtitle>
                                        <Card.Link href={"/" + movieList[idx].id.toString() + "/reserve/0"}>{movieList[idx].tickets[0].ticketTime}</Card.Link>
                                        <Card.Link href={"/" + movieList[idx].id.toString() + "/reserve/1"}>{movieList[idx].tickets[1].ticketTime}</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }



}

export default GetMovie;