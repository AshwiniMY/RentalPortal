import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-[#234A84] border-t border-[#E5E5E5] mt-auto text-white">
            <div className="max-w-[1200px] mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h2 className="text-[20px] font-bold mb-4">Rental Portal</h2>
                        <p className="text-[15px] text-white/90 leading-relaxed">
                            Helping you find the best rental flats in Bengaluru.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-[17px] mb-4">Quick Links</h3>
                        <div className="flex flex-col space-y-2 text-[15px] text-white/90">
                            <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
                            <Link to="/apartments" className="hover:text-blue-200 transition-colors">Apartments</Link>
                            <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
                            <Link to="/register" className="hover:text-blue-200 transition-colors">Register</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-[17px] mb-4">Contact</h3>
                        <div className="flex flex-col space-y-2 text-[15px] text-white/90">
                            <p>support@rentalportal.in</p>
                            <p>+91 98765 43210</p>
                            <p>Bengaluru, Karnataka</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/20 text-center text-[15px] text-white/70">
                    © 2026 Rental Portal. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
