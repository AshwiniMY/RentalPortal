import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ user, adminOnly, children }) {
    if (!user) {
        return <Navigate to="/login" />
    }
    if (adminOnly && !user.is_staff) {
        return <Navigate to="/" />
    }
    return children
}

export default PrivateRoute
