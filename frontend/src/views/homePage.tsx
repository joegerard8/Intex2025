import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';


const HomePage: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is already authenticated, redirect to the user's home page
    // or dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-900 text-white">
                <div className="container mx-auto py-10 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-8 mb-10 flex flex-col items-center">
                            <div className="mb-6">
                                <img
                                    src="/cine-niche-barcode-large.png"
                                    alt="CineNiche"
                                    className="h-12"
                                    onError={(e) => {
                                        // Fallback if image doesn't load
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.style.fontFamily = 'monospace';
                                        target.style.letterSpacing = '2px';
                                        target.outerHTML = '<div style="font-family: monospace; letter-spacing: 2px; font-size: 24px; color: black;">CineNiche</div>';
                                    }}
                                />
                            </div>

                            <p className="text-center text-gray-800 mb-4">
                                Discover the films mainstream platforms don't offer. CineNiche curates cult classics, international gems, and indie treasures for true film enthusiasts.
                            </p>
                        </div>

                        <div className="flex justify-center gap-4 mb-10">
                            <Link
                                to="/register"
                                className="py-2 px-6 rounded bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="py-2 px-6 rounded bg-gray-600 text-white hover:bg-gray-500 border border-gray-500"
                            >
                                Login
                            </Link>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-6">Top Films</h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {/* This would be populated from API in a real application */}
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="overflow-hidden rounded-md">
                                        <img
                                            src={`/movie-poster-${item}.jpg`}
                                            alt={`Movie ${item}`}
                                            className="w-full h-auto object-cover aspect-[2/3]"
                                            onError={(e) => {
                                                // Fallback placeholder
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = "https://via.placeholder.com/200x300?text=Movie+Poster";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;