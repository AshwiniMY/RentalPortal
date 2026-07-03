import React, { useState, useEffect } from 'react'
import api from '../../api'

function ManageApartments() {
    const [apartments, setApartments] = useState([])
    const [amenities, setAmenities] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [message, setMessage] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [form, setForm] = useState({
        title: '',
        location: '',
        rent: '',
        bhk: '',
        description: '',
        is_available: true,
        amenity_ids: [],
    })

    function loadApartments() {
        api.get('/api/admin/apartments/')
            .then(res => setApartments(res.data))
    }

    useEffect(() => {
        loadApartments()
        api.get('/api/admin/amenities/')
            .then(res => setAmenities(res.data))
    }, [])

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    function handleAmenityToggle(amenityId) {
        setForm(prev => {
            const alreadySelected = prev.amenity_ids.includes(amenityId)
            return {
                ...prev,
                amenity_ids: alreadySelected
                    ? prev.amenity_ids.filter(id => id !== amenityId)
                    : [...prev.amenity_ids, amenityId],
            }
        })
    }

    function resetForm() {
        setForm({
            title: '',
            location: '',
            rent: '',
            bhk: '',
            description: '',
            is_available: true,
            amenity_ids: [],
        })
        setImageFile(null)
        setEditingId(null)
        setShowForm(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('location', form.location)
        formData.append('rent', form.rent)
        formData.append('bhk', form.bhk)
        formData.append('description', form.description)
        formData.append('is_available', form.is_available)
        form.amenity_ids.forEach(id => formData.append('amenity_ids', id))
        if (imageFile) {
            formData.append('image', imageFile)
        }

        const requestConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
        const request = editingId
            ? api.put(`/api/admin/apartments/${editingId}/`, formData, requestConfig)
            : api.post('/api/admin/apartments/', formData, requestConfig)

        request
            .then(() => {
                setMessage(editingId ? 'Apartment updated successfully.' : 'Apartment added successfully.')
                loadApartments()
                resetForm()
            })
            .catch(() => {
                setMessage('Error saving apartment. Please check the form.')
            })
    }

    function handleEdit(apt) {
        setForm({
            title: apt.title,
            location: apt.location,
            rent: apt.rent,
            bhk: apt.bhk,
            description: apt.description,
            is_available: apt.is_available,
            amenity_ids: apt.amenities.map(a => a.id),
        })
        setEditingId(apt.id)
        setShowForm(true)
        setMessage('')
    }

    function handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this apartment?')) {
            api.delete(`/api/admin/apartments/${id}/`)
                .then(() => {
                    setMessage('Apartment deleted.')
                    loadApartments()
                })
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Apartments</h1>
                <button
                    onClick={() => {
                        resetForm()
                        setShowForm(!showForm)
                    }}
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm font-medium"
                >
                    {showForm ? 'Cancel' : 'Add Apartment'}
                </button>
            </div>

            {message && (
                <p className="text-green-600 mb-4 text-sm bg-green-50 border border-green-200 px-3 py-2 rounded">
                    {message}
                </p>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-50 border p-6 rounded mb-8 space-y-4">
                    <h2 className="font-semibold text-lg">
                        {editingId ? 'Edit Apartment' : 'Add New Apartment'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Rent (₹/month)</label>
                            <input
                                name="rent"
                                type="number"
                                value={form.rent}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">BHK</label>
                            <input
                                name="bhk"
                                type="number"
                                value={form.bhk}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setImageFile(e.target.files[0])}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_available"
                            name="is_available"
                            checked={form.is_available}
                            onChange={handleChange}
                        />
                        <label htmlFor="is_available" className="text-sm">Available for booking</label>
                    </div>
                    {amenities.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Amenities</label>
                            <div className="flex flex-wrap gap-3">
                                {amenities.map(amenity => (
                                    <label key={amenity.id} className="flex items-center gap-1 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={form.amenity_ids.includes(amenity.id)}
                                            onChange={() => handleAmenityToggle(amenity.id)}
                                        />
                                        {amenity.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 font-medium"
                    >
                        {editingId ? 'Update Apartment' : 'Add Apartment'}
                    </button>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white border rounded shadow text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Title</th>
                            <th className="px-4 py-3 text-left font-medium">Location</th>
                            <th className="px-4 py-3 text-left font-medium">BHK</th>
                            <th className="px-4 py-3 text-left font-medium">Rent</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apartments.map(apt => (
                            <tr key={apt.id} className="border-t">
                                <td className="px-4 py-3">{apt.title}</td>
                                <td className="px-4 py-3">{apt.location}</td>
                                <td className="px-4 py-3">{apt.bhk} BHK</td>
                                <td className="px-4 py-3">₹{apt.rent}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs ${
                                            apt.is_available
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {apt.is_available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEdit(apt)}
                                            className="text-blue-700 hover:underline text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(apt.id)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {apartments.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    No apartments yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageApartments
