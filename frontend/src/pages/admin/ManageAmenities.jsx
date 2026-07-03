import React, { useState, useEffect } from 'react'
import api from '../../api'

function ManageAmenities() {
    const [amenities, setAmenities] = useState([])
    const [newName, setNewName] = useState('')
    const [message, setMessage] = useState('')

    function loadAmenities() {
        api.get('/api/admin/amenities/')
            .then(res => setAmenities(res.data))
    }

    useEffect(() => {
        loadAmenities()
    }, [])

    function handleAdd(e) {
        e.preventDefault()
        api.post('/api/admin/amenities/', { name: newName })
            .then(() => {
                setNewName('')
                setMessage('Amenity added successfully.')
                loadAmenities()
            })
            .catch(() => {
                setMessage('Failed to add amenity.')
            })
    }

    function handleDelete(id) {
        if (window.confirm('Delete this amenity?')) {
            api.delete(`/api/admin/amenities/${id}/`)
                .then(() => {
                    setMessage('Amenity deleted.')
                    loadAmenities()
                })
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Manage Amenities</h1>

            {message && (
                <p className="text-green-600 text-sm mb-4 bg-green-50 border border-green-200 px-3 py-2 rounded">
                    {message}
                </p>
            )}

            <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="e.g. Gym, Swimming Pool, Parking"
                    className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-medium"
                >
                    Add
                </button>
            </form>

            <div className="bg-white border rounded shadow">
                {amenities.length === 0 ? (
                    <p className="text-gray-500 p-4 text-sm">No amenities added yet.</p>
                ) : (
                    amenities.map(amenity => (
                        <div
                            key={amenity.id}
                            className="flex justify-between items-center px-4 py-3 border-b last:border-b-0"
                        >
                            <span className="text-sm">{amenity.name}</span>
                            <button
                                onClick={() => handleDelete(amenity.id)}
                                className="text-red-600 hover:underline text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ManageAmenities
