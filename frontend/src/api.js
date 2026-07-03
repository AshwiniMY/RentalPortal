import axios from 'axios'

function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            cookie = cookie.trim()
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true,
})

api.interceptors.request.use(function (config) {
    const csrfToken = getCookie('csrftoken')
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
    }
    return config
})

export default api
