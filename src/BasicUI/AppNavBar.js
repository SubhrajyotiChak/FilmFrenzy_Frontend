import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom'
import { customizedSelector } from "../UserManagement/UserReducer"
import { getLoginInfo } from '../UserManagement/PostMessage'
import '../Styling/BasicUI.css'


function AppNavBar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// redirect to previous page after login or registration complete
	// https://stackoverflow.com/a/72163324/11334745
	const prevLocation = useLocation();

	useEffect(() => {
		const response = getLoginInfo({ token: localStorage.getItem("token") });
		dispatch(response);
	}, [])

	const { userInfo, fulfilled, rejected } = useSelector(customizedSelector);

	const onLogOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		navigate('/')
	}

	const json = require('../imgUrl.json');

	return (
		<Navbar className="nav-bar" expand="lg">
			<Container fluid>
				<Navbar.Brand href="/">
					<img className="rounded-circle px-2" src="img.jpg" height="55px" />
				</Navbar.Brand>
				<Navbar.Brand href="/" className="textColor">Film Frenzy</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: '100px' }}
						navbarScroll>
						{localStorage.getItem("token") ? <Nav.Link href={"/" + localStorage.getItem("userId") + "/reserve_manage"} className="px-3 link-success">Manage Booking</Nav.Link> : null}
					</Nav>
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
					{fulfilled ? (<Nav.Link href="#" className="px-3 link-success">{userInfo.username}</Nav.Link>) : (<Nav.Link href={"/login?redirectTo=" + prevLocation.pathname} className="px-3 link-success">Login</Nav.Link>)}
					{fulfilled ? (<Nav.Link href={prevLocation.pathname} onClick={onLogOut} className="px-3 link-success">Sign Out</Nav.Link>) : (<Nav.Link href={"/registration?redirectTo=" + prevLocation.pathname} className="px-3 link-success">Sign Up</Nav.Link>)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default AppNavBar;