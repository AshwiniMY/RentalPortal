import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/admin/stats/')
            .then(res => {
                setStats(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading...</div>
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                <div className="bg-blue-700 text-white p-6 rounded shadow text-center">
                    <p className="text-3xl font-bold">{stats?.total_apartments ?? 0}</p>
                    <p className="text-sm mt-1">Apartments</p>
                </div>
                <div className="bg-green-600 text-white p-6 rounded shadow text-center">
                    <p className="text-3xl font-bold">{stats?.total_bookings ?? 0}</p>
                    <p className="text-sm mt-1">Total Bookings</p>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded shadow text-center">
                    <p className="text-3xl font-bold">{stats?.pending_bookings ?? 0}</p>
                    <p className="text-sm mt-1">Pending</p>
                </div>
                <div className="bg-purple-600 text-white p-6 rounded shadow text-center">
                    <p className="text-3xl font-bold">{stats?.total_users ?? 0}</p>
                    <p className="text-sm mt-1">Users</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                    to="/admin/apartments"
                    className="bg-white border p-5 rounded shadow hover:bg-gray-50 text-center font-medium text-blue-700"
                >
                    Manage Apartments
                </Link>
                <Link
                    to="/admin/bookings"
                    className="bg-white border p-5 rounded shadow hover:bg-gray-50 text-center font-medium text-blue-700"
                >
                    Manage Bookings
                </Link>
                <Link
                    to="/admin/amenities"
                    className="bg-white border p-5 rounded shadow hover:bg-gray-50 text-center font-medium text-blue-700"
                >
                    Manage Amenities
                </Link>
            </div>
        </div>
    )
}

export default AdminDashboard
