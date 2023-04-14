import Button from 'react-bootstrap/Button';
import React from 'react';
import AppNavBar from "../BasicUI/AppNavBar";
import Footer from "../BasicUI/Footer";
import toast, { Toaster } from 'react-hot-toast';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams, Navigate, useLocation} from "react-router-dom";
import '../Styling/Booking.css'

function GetBooking() {
    const { movieid, ticketid } = useParams();
    const prevLocation = useLocation();
    return (
        <div>
            <Booking movieid={movieid} ticketid={ticketid} userId={localStorage.getItem("userId")} prevLocation={prevLocation.pathname}/>
        </div>
    );
}


class Booking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seat: [
            ],
            seatBooked: [
            ],
            seatAvailable: [
            ],
            seatReserved: [
            ],
            movieName: "",
            movieTime: "",
            isSubmit: false
        }
    }

    componentWillMount() {
        // Add token info in header for backend authentication
        fetch('/app/' + this.props.movieid.toString() + '/booking/' + this.props.ticketid.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then(response => response.json())
            .then(data => {
                const temp = data;
                this.setState({
                    seat: data.Total,
                    seatBooked: data.Booked,
                    seatAvailable: data.Available,
                });
            })

        fetch('/app/' + this.props.movieid.toString() + '/booking/info/' + this.props.ticketid.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })
            .then(response => response.json()
            ).then(data => {
                const temp = data;
                this.setState({
                    movieName: data.movieName,
                    movieTime: data.movieTime,
                });
            })

    }

    classfySeat(row, idx) {
        const temp = this.state.seatAvailable;
        if (this.state.seatBooked.some(e => e.id === row.id)) {
            return (<div className='booked seat' key={row}>R{Math.floor(idx / 6) + 1}C{Math.floor(idx % 6) + 1}</div>);
        } else {
            return (<div
                className={this.state.seatReserved.some(e => e.id === row.id) ? "reserved seat" : "available seat"}
                key={row} onClick={e => this.onClickSeat(row, idx)}>R{Math.floor(idx / 6) + 1}C{Math.floor(idx % 6) + 1}
            </div>);
        }
    }

    onClickSeat(seat, idx) {
        const index = this.state.seatReserved.indexOf(seat);
        seat.seatInfo = idx.toString();
        if (index > -1) {
            this.setState({
                seatAvailable: this.state.seatAvailable.concat([seat]),
                seatReserved: this.state.seatReserved.filter(res => res.id != seat.id)
            })
        } else {
            this.setState({
                seatReserved: this.state.seatReserved.concat([seat]),
                seatAvailable: this.state.seatAvailable.filter(res => res.id !== seat.id)
            })
        }
    }

    onClickSubmit() {
        if (this.state.seatReserved.length == 0) {
            return toast.error("Please make a selection");
        }
        this.setState({ isSubmit: true });
        const temp = '/app/' + this.props.movieid.toString() + '/booking/update/' + this.props.userId.toString();
        fetch('/app/' + this.props.movieid.toString() + '/booking/update/' + this.props.userId.toString(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(this.state.seatReserved)
        }).then(res => res.json())
            .then(res => console.log(res));
    }

    checkBookingSubmit() {
        if (this.state.isSubmit) {
            window.scrollTo(0, 0);
            return (
                <div className='content'>
                    <AppNavBar />
                    <div className='card-outline bodyColor'>
                        <div className='text-center py-5'>
                            <img src="https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif" width="600px" />
                        </div>
                        <h1>Your seats are reserved successfully!</h1>
                        <Row className='text-center m-5'>
                            <Col lg={6}><Button variant="success" href={"/" + this.props.userId.toString() + "/reserve_manage"}>Manage Booking</Button></Col>
                            <Col lg={6}><Button variant="success" href={"/"}>Return to Home Page</Button></Col>
                        </Row>
                    </div>
                    <Footer />
                </div>)
        } else {
            return (
                <div className='content'>
                    <AppNavBar />
                    <div className="card-outline bodyColor">
                        <h1 className='seatHeader pt-4'>Seat Reservation for {this.state.movieName} ({this.state.movieTime})</h1>
                        <Toaster />
                        <Row className="m-0">
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "between" }}>
                                    <div className='seat-sample-available'>
                                    </div>
                                    <div >
                                        &nbsp;Available
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "between" }}>
                                    <div className='seat-sample-booked'>
                                    </div>
                                    <div >
                                        &nbsp;Booked
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "between" }}>
                                    <div className='seat-sample-selected'>
                                    </div>
                                    <div >
                                        &nbsp;Selected
                                    </div>
                                </div>
                            </Col>
                            <Col></Col>
                        </Row>
                        <div className='screen-outer'><div className='screen'>Screen</div></div>
                        <div className="container">
                            <Row>
                                <Col>
                                    <Row className="g-4 mx-5 px-5 seatHeader">
                                        <Col xs={1} md={1} lg={1} className="text-center h5"></Col>
                                        <Col>
                                            <Row xs={6} md={6}>
                                                {Array.from({ length: 6 }).map((_, idx) => (
                                                    <Col className='text-center h5'>{idx + 1}</Col>
                                                ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                    {Array.from({ length: 5 }).map((_, rowIdx) => (
                                        <Row className="g-4 mx-5 px-5 seatHeader">
                                            <Col xs={1} md={1} lg={1} className="text-center h5">{rowIdx + 1}</Col>
                                            <Col>
                                                <Row xs={6} md={6}>
                                                    {Array.from({ length: 6 }).map((_, colIdx) => (
                                                        <Col className='text-center'>
                                                            {this.classfySeat(this.state.seat[rowIdx * 6 + colIdx], rowIdx * 6 + colIdx)}
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Col>

                                        </Row>

                                    ))}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="right">
                                        <h4>Reserved Seats: ({this.state.seatReserved.length})</h4>
                                        {Array.from({ length: this.state.seatReserved.length }).map((_, idx) => (
                                            <span key={idx} >R{Math.floor(parseInt(this.state.seatReserved[idx].seatInfo) / 6) + 1}C{parseInt(this.state.seatReserved[idx].seatInfo) % 6 + 1}&nbsp;&nbsp;&nbsp;</span>
                                        ))}
                                    </div>
                                </Col>
                                <Col lg={3}><Button variant="success" onClick={e => this.onClickSubmit()}>Submit Booking</Button></Col>
                            </Row>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
    }

    render() {
        
        if (localStorage.getItem("token") == null) {
            return <Navigate to={'/login?redirectTo=' + this.props.prevLocation} />
        } else {
            return (
                <div>
                    {this.checkBookingSubmit()}
                </div>
            )
        }

    }
}




export default GetBooking;