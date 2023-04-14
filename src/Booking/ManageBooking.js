import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import AppNavBar from "../BasicUI/AppNavBar";
import Footer from "../BasicUI/Footer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react'
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { customizedSelector } from "../UserManagement/UserReducer"
import { ButtonGroup, Container, Table } from 'reactstrap';
import Card from 'react-bootstrap/Card';
import '../Styling/ManageBooking.css'

function GetBookingManagement() {
    const { userid } = useParams();
    return (
        <div>
            <BookingManagement userid={userid} />
        </div>
    );
}


class BookingManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingInfo: [
            ],
            seatInfo: []
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await fetch('/app/user/management/' + this.props.userid.toString(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            })
            let responseData = await response.json();
            if (response.status === 200) {
                this.setState({
                    bookingInfo: responseData
                });
            } else {
                console.log('Error');
            }
        } catch (e) {
            console.log('Error');
        }
    }

    onClickCancel(seatId) {
        fetch('/app/user/cancel', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seatId)
        }).then(res => res.json())
            .then(res => console.log(res));
    }


    render() {
        if (localStorage.getItem("token") == null) {
            return <Navigate to='/login' />
        }
        this.fetchData();
        return (
            <div className='content'>
                <AppNavBar />
                <Container fluid className='card-outline bodyColor'>
                    <Row xs={1} md={1} lg={2}>
                        {Array.from({ length: this.state.bookingInfo.length }).map((_, idx) => (
                            <Col>
                                <Card className='m-4'>
                                    <Card.Header className='h4'>Order {idx + 1}</Card.Header>
                                    <Row>
                                        <Col xs={7} md={7} lg={7}>
                                            <Card.Body>
                                                <Card.Title>Movie: {this.state.bookingInfo[idx].movieName}</Card.Title>
                                                <Card.Text>Time: {this.state.bookingInfo[idx].movieTime}</Card.Text>
                                                <Card.Text>Seat Number:
                                                    {Array.from({ length: this.state.bookingInfo[idx].seat.split(" ").length }).map((_, seatIdx) => (
                                                        <span key={seatIdx} >R{Math.floor(parseInt(this.state.bookingInfo[idx].seat.split(" ")[seatIdx]) / 6) + 1}C{Math.floor(parseInt(this.state.bookingInfo[idx].seat.split(" ")[seatIdx]) % 6) + 1}&nbsp;&nbsp;&nbsp;</span>
                                                    ))}

                                                </Card.Text>
                                                <Card.Text>Theater: {this.state.bookingInfo[idx].theater}</Card.Text>
                                                <Card.Text>Location: {this.state.bookingInfo[idx].location}</Card.Text>
                                            </Card.Body>
                                        </Col>

                                        <Col className='text-center pt-2'><img src={this.state.bookingInfo[idx].imgUrl} height="180px" /></Col>
                                    </Row>
                                    <div className='text-center pb-3'>
                                        <Button variant="success" onClick={e => this.onClickCancel(this.state.bookingInfo[idx].seatId)}>Cancel Booking</Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}




export default GetBookingManagement;