import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favourite from './pages/Favourite'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const isAdminRoute=useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster />
    {!isAdminRoute && <Navbar />}
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies/>} />
      <Route path="/movies/:id" element={<MovieDetails/>} />
      <Route path="/book/:id/:date" element={<SeatLayout />} />
      <Route path="/my-bookings" element={<MyBooking />} />
      <Route path="/favourite" element={<Favourite />} />
    </Routes>
    {!isAdminRoute && <Footer />}
    </>                                     
  )
}

export default App