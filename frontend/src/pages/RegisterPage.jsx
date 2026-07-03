import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

function RegisterPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSuccess('')
        api.post('/api/register/', { username, email, password })
            .then(() => {
                setSuccess('Account created! Redirecting to login...')
                setTimeout(() => navigate('/login'), 1500)
            })
            .catch(err => {
                const data = err.response?.data
                if (data) {
                    const messages = Object.values(data).flat().join(' ')
                    setError(messages)
                } else {
                    setError('Registration failed. Please try again.')
                }
            })
    }

    return (
        <div className="py-24 bg-[#F7F7F7] flex items-center justify-center px-4 min-h-[75vh]">
            <div className="bg-white p-10 rounded shadow-sm w-full max-w-[440px]">
                <h1 className="text-[34px] font-semibold mb-8 text-center text-[#222]">Register</h1>
                {error && (
                    <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 px-3 py-2 rounded">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-green-600 text-sm mb-6 bg-green-50 border border-green-200 px-3 py-2 rounded">
                        {success}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[16px] font-medium mb-2 text-[#222]">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full border border-[#E5E5E5] px-4 h-12 text-[16px] rounded focus:outline-none focus:border-[#234A84]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[16px] font-medium mb-2 text-[#222]">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border border-[#E5E5E5] px-4 h-12 text-[16px] rounded focus:outline-none focus:border-[#234A84]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[16px] font-medium mb-2 text-[#222]">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-[#E5E5E5] px-4 h-12 text-[16px] rounded focus:outline-none focus:border-[#234A84]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#222] text-white h-[50px] text-[16px] rounded hover:bg-[#333] font-medium transition-colors"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-8 text-[15px] text-center text-[#666]">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#234A84] hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
