import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

function ApartmentDetailPage({ user }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [apartment, setApartment] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`/api/apartments/${id}/`)
            .then(res => {
                setApartment(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    function handleBooking(e) {
        e.preventDefault()
        setSuccessMessage('')
        setErrorMessage('')
        if (!user) {
            navigate('/login')
            return
        }
        api.post('/api/bookings/', {
            apartment: id,
            start_date: startDate,
            end_date: endDate,
        })
            .then(() => {
                setSuccessMessage('Booking request submitted! The admin will review it shortly.')
                setStartDate('')
                setEndDate('')
            })
            .catch(err => {
                setErrorMessage(err.response?.data?.error || 'Failed to submit booking. Please try again.')
            })
    }

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading...</div>
    }

    if (!apartment) {
        return <div className="text-center py-20 text-gray-500">Apartment not found.</div>
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {apartment.image ? (
                <img
                    src={apartment.image}
                    alt={apartment.title}
                    className="w-full h-64 object-cover rounded mb-6"
                />
            ) : (
                <div className="w-full h-64 bg-gray-200 rounded mb-6 flex items-center justify-center text-gray-400">
                    No Image
                </div>
            )}

            <h1 className="text-3xl font-bold mb-1">{apartment.title}</h1>
            <p className="text-gray-500 mb-4">{apartment.location}</p>

            <div className="flex flex-wrap gap-6 mb-4 text-gray-700">
                <span><strong>BHK:</strong> {apartment.bhk}</span>
                <span><strong>Rent:</strong> ₹{apartment.rent}/month</span>
                <span
                    className={`font-semibold ${
                        apartment.is_available ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {apartment.is_available ? 'Available' : 'Not Available'}
                </span>
            </div>

            <p className="text-gray-700 mb-6">{apartment.description}</p>

            {apartment.amenities && apartment.amenities.length > 0 && (
                <div className="mb-6">
                    <h2 className="font-semibold text-lg mb-2">Amenities</h2>
                    <div className="flex flex-wrap gap-2">
                        {apartment.amenities.map(amenity => (
                            <span
                                key={amenity.id}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                                {amenity.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {apartment.is_available && (
                <div className="bg-gray-50 border rounded p-6">
                    <h2 className="font-semibold text-lg mb-4">Request Booking</h2>
                    {successMessage && (
                        <p className="text-green-600 text-sm mb-3 bg-green-50 border border-green-200 px-3 py-2 rounded">
                            {successMessage}
                        </p>
                    )}
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 px-3 py-2 rounded">
                            {errorMessage}
                        </p>
                    )}
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-medium"
                        >
                            {user ? 'Submit Booking Request' : 'Login to Book'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ApartmentDetailPage
