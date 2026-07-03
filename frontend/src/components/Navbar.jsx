import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

function Navbar({ user, setUser }) {
    const navigate = useNavigate()

    function handleLogout() {
        api.post('/api/logout/').then(() => {
            setUser(null)
            navigate('/login')
        })
    }

    return (
        <nav className="bg-[#234A84] text-white px-8 h-[76px] flex justify-between items-center">
            <Link to="/" className="text-[22px] font-bold tracking-wide">
                Rental Portal
            </Link>
            <div className="flex gap-8 items-center text-[17px]">
                <Link to="/" className="hover:text-blue-200 transition-colors">
                    Home
                </Link>
                <Link to="/apartments" className="hover:text-blue-200 transition-colors">
                    Apartments
                </Link>
                {user && !user.is_staff && (
                    <Link to="/my-bookings" className="hover:text-blue-200 transition-colors">
                        My Bookings
                    </Link>
                )}
                {user && user.is_staff && (
                    <>
                        <Link to="/admin/dashboard" className="hover:text-blue-200 transition-colors">Dashboard</Link>
                        <Link to="/admin/bookings" className="hover:text-blue-200 transition-colors">Bookings</Link>
                        <Link to="/admin/amenities" className="hover:text-blue-200 transition-colors">Amenities</Link>
                    </>
                )}
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="hover:text-blue-200 transition-colors ml-2"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-200 transition-colors ml-2">Login</Link>
                        <Link to="/register" className="hover:text-blue-200 transition-colors">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
