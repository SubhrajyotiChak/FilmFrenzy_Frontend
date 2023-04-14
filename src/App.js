import React from "react";
import { Route, Routes } from 'react-router-dom';
import MovieTheaterList from "./Booking/MovieTheaterList"
import GetMovie from "./Booking/Movie"
import Login from "./UserManagement/Login";
import GetBooking from "./Booking/Booking";
import Registration from "./UserManagement/Registration";
import GetBookingManagement from "./Booking/ManageBooking"

function App() {
  return (
    <body className="body">
    <Routes>
        <Route path='/' element={<MovieTheaterList/>} />
        <Route path='/:id' element={<GetMovie/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Registration/>} />
        <Route path='/:movieid/reserve/:ticketid' element={<GetBooking/>} />
        <Route path='/:userid/reserve_manage' element={<GetBookingManagement/>} />
    </Routes>

    </body>
  );
}

export default App;