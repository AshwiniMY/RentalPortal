import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

function MyBookingsPage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/my-bookings/')
            .then(res => {
                setBookings(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="text-center py-20 text-black">Loading...</div>
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-white text-black">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
            {bookings.length === 0 ? (
                <div>
                    <p className="mb-4">You haven't requested any apartments yet.</p>
                    <Link
                        to="/apartments"
                        className="inline-block border border-gray-300 px-4 py-2 hover:bg-gray-50"
                    >
                        Browse Apartments
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 text-left">
                        <thead className="border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 font-normal">Apartment</th>
                                <th className="px-4 py-3 font-normal">Location</th>
                                <th className="px-4 py-3 font-normal">Requested On</th>
                                <th className="px-4 py-3 font-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id} className="border-b border-gray-100">
                                    <td className="px-4 py-3">{booking.apartment_title}</td>
                                    <td className="px-4 py-3">{booking.apartment_location}</td>
                                    <td className="px-4 py-3">{new Date(booking.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 font-medium">
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default MyBookingsPage
