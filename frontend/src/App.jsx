import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import api from './api'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ApartmentListPage from './pages/ApartmentListPage'
import ApartmentDetailPage from './pages/ApartmentDetailPage'
import MyBookingsPage from './pages/MyBookingsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageApartments from './pages/admin/ManageApartments'
import ManageBookings from './pages/admin/ManageBookings'
import ManageAmenities from './pages/admin/ManageAmenities'

function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/csrf/').then(() => {
            api.get('/api/me/')
                .then(res => {
                    setUser(res.data)
                    setLoading(false)
                })
                .catch(() => {
                    setUser(null)
                    setLoading(false)
                })
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Navbar user={user} setUser={setUser} />
                <div className="flex-grow">
                    <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
                <Route path="/apartments" element={<ApartmentListPage />} />
                <Route path="/apartments/:id" element={<ApartmentDetailPage user={user} />} />
                <Route
                    path="/my-bookings"
                    element={
                        <PrivateRoute user={user}>
                            <MyBookingsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute user={user} adminOnly={true}>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/apartments"
                    element={
                        <PrivateRoute user={user} adminOnly={true}>
                            <ManageApartments />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/bookings"
                    element={
                        <PrivateRoute user={user} adminOnly={true}>
                            <ManageBookings />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/amenities"
                    element={
                        <PrivateRoute user={user} adminOnly={true}>
                            <ManageAmenities />
                        </PrivateRoute>
                    }
                />
            </Routes>
            </div>
            <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
