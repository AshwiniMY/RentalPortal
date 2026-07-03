import React, { useState, useEffect } from 'react'
import api from '../../api'

function ManageBookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    function loadBookings() {
        api.get('/api/admin/bookings/')
            .then(res => {
                setBookings(res.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        loadBookings()
    }, [])

    function handleStatusChange(bookingId, newStatus) {
        api.put(`/api/admin/bookings/${bookingId}/`, { status: newStatus })
            .then(() => loadBookings())
    }

    function getStatusStyle(status) {
        if (status === 'approved') return 'bg-green-100 text-green-700'
        if (status === 'rejected') return 'bg-red-100 text-red-700'
        return 'bg-yellow-100 text-yellow-700'
    }

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading...</div>
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border rounded shadow text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">User</th>
                                <th className="px-4 py-3 text-left font-medium">Apartment</th>
                                <th className="px-4 py-3 text-left font-medium">Start Date</th>
                                <th className="px-4 py-3 text-left font-medium">End Date</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-left font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id} className="border-t">
                                    <td className="px-4 py-3">{booking.username}</td>
                                    <td className="px-4 py-3">{booking.apartment_title}</td>
                                    <td className="px-4 py-3">{booking.start_date}</td>
                                    <td className="px-4 py-3">{booking.end_date}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(booking.status)}`}
                                        >
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {booking.status === 'pending' ? (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleStatusChange(booking.id, 'approved')}
                                                    className="text-green-600 hover:underline text-sm font-medium"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(booking.id, 'rejected')}
                                                    className="text-red-600 hover:underline text-sm font-medium"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs">—</span>
                                        )}
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

export default ManageBookings
