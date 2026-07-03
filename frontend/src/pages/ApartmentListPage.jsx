import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

function ApartmentListPage() {
    const [apartments, setApartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        api.get('/api/apartments/')
            .then(res => {
                setApartments(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const filteredApartments = apartments.filter(apt => {
        if (filter === 'available') return apt.is_available
        if (filter === 'unavailable') return !apt.is_available
        return true
    })

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading apartments...</div>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Apartments</h1>

            <div className="mb-6 flex gap-2">
                {['all', 'available', 'unavailable'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1 rounded border text-sm ${
                            filter === f
                                ? 'bg-blue-700 text-white border-blue-700'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {filteredApartments.length === 0 ? (
                <p className="text-gray-500">No apartments found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApartments.map(apt => (
                        <div key={apt.id} className="bg-white rounded shadow overflow-hidden">
                            {apt.image ? (
                                <img
                                    src={apt.image}
                                    alt={apt.title}
                                    className="w-full h-56 object-cover"
                                />
                            ) : (
                                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                    No Image
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="font-semibold text-lg">{apt.title}</h2>
                                <p className="text-gray-500 text-sm mb-2">{apt.location}</p>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-700 font-bold">₹{apt.rent}/month</span>
                                    <span className="text-sm text-gray-500">{apt.bhk} BHK</span>
                                </div>
                                <span
                                    className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                                        apt.is_available
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {apt.is_available ? 'Available' : 'Not Available'}
                                </span>
                                <Link
                                    to={`/apartments/${apt.id}`}
                                    className="block mt-3 text-center bg-blue-700 text-white py-1.5 rounded hover:bg-blue-800 text-sm font-medium"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ApartmentListPage
