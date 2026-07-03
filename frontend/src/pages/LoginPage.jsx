import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

function LoginPage({ setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setError('')
        api.post('/api/login/', { username, password })
            .then(res => {
                setUser(res.data)
                if (res.data.is_staff) {
                    navigate('/admin/dashboard')
                } else {
                    navigate('/')
                }
            })
            .catch(() => {
                setError('Invalid username or password.')
            })
    }

    return (
        <div className="py-24 bg-[#F7F7F7] flex items-center justify-center px-4 min-h-[75vh]">
            <div className="bg-white p-10 rounded shadow-sm w-full max-w-[440px]">
                <h1 className="text-[34px] font-semibold mb-8 text-center text-[#222]">Login</h1>
                {error && (
                    <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 px-3 py-2 rounded">
                        {error}
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
                        Login
                    </button>
                </form>

                <div className="mt-6 p-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[14px] text-[#666]">
                    <p className="mb-2"><strong className="text-[#222]">User:</strong> Username: ashwini, Password: ashwini1234</p>
                    <p><strong className="text-[#222]">Admin:</strong> Username: admin, Password: admin1234</p>
                </div>

                <p className="mt-6 text-[15px] text-center text-[#666]">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#234A84] hover:underline font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
