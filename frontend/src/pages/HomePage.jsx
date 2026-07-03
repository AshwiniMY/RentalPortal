import React from 'react'
import { Link } from 'react-router-dom'

function HomePage({ user }) {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <div 
                className="relative flex flex-col justify-center items-center text-center px-4 min-h-[440px]"
                style={{ 
                    backgroundImage: "url('/hero.jpg')", 
                    backgroundSize: "cover", 
                    backgroundPosition: "center" 
                }}
            >
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="relative z-10 max-w-[1200px] w-full mx-auto">
                    <h1 className="text-[48px] font-bold mb-4 text-white leading-tight">Find Your Perfect Apartment</h1>
                    <p className="text-[20px] mb-8 text-white/90 max-w-2xl mx-auto">
                        Search and book verified rental flats across Bengaluru.
                    </p>
                    <div className="mb-6">
                        <Link
                            to="/apartments"
                            className="bg-[#222] text-white font-medium px-8 py-3 rounded-sm hover:bg-[#333] transition-colors inline-block text-[17px]"
                        >
                            Browse Apartments
                        </Link>
                    </div>

                    {!user && (
                        <div className="mt-4">
                            <p className="text-white/80 mb-3 text-[15px]">New here?</p>
                            <div className="flex justify-center gap-3">
                                <Link
                                    to="/register"
                                    className="bg-white/20 border border-white/50 text-white px-5 py-2 rounded hover:bg-white/30 transition-colors text-[15px] font-medium"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-white/20 border border-white/50 text-white px-5 py-2 rounded hover:bg-white/30 transition-colors text-[15px] font-medium"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* About Section */}
            <div className="max-w-[1200px] mx-auto py-12 px-6">
                <h2 className="text-[34px] font-bold mb-4 text-[#222]">About Us</h2>
                <p className="text-[17px] text-[#666] leading-relaxed max-w-3xl">
                    We make finding rental apartments in Bengaluru easy. You can search for verified flats and book them online directly through our website. Our platform helps both tenants and property admins manage everything in one simple dashboard.
                </p>
            </div>

            {/* Features Section */}
            <div className="bg-[#F7F7F7] py-12 mt-6">
                <div className="max-w-[1200px] mx-auto px-6 mb-12">
                    <h2 className="text-[34px] font-bold mb-8 text-[#222]">Why Choose Us</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white border border-[#E5E5E5] rounded p-6 shadow-sm">
                            <h3 className="font-bold text-[#222] mb-2 text-[17px]">Verified Flats</h3>
                            <p className="text-[#666] text-[15px]">We only list real apartments with correct details.</p>
                        </div>
                        <div className="bg-white border border-[#E5E5E5] rounded p-6 shadow-sm">
                            <h3 className="font-bold text-[#222] mb-2 text-[17px]">Quick Booking</h3>
                            <p className="text-[#666] text-[15px]">Send a booking request in just one click.</p>
                        </div>
                        <div className="bg-white border border-[#E5E5E5] rounded p-6 shadow-sm">
                            <h3 className="font-bold text-[#222] mb-2 text-[17px]">Top Locations</h3>
                            <p className="text-[#666] text-[15px]">Find flats in Whitefield, HSR Layout, Electronic City and more.</p>
                        </div>
                        <div className="bg-white border border-[#E5E5E5] rounded p-6 shadow-sm">
                            <h3 className="font-bold text-[#222] mb-2 text-[17px]">Easy Dashboard</h3>
                            <p className="text-[#666] text-[15px]">Track all your apartment bookings easily from your account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
