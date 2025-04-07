import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './views/homePage';
import DashboardPage from './views/dashboardPage';
import ManageMovies from './views/manageMovies';
import Movies from './views/movies';
import Privacy from './views/privacy';
import ProductDetailPage from './views/productDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/homePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'

// Protected route component for admin-only access
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

// Protected route component for authenticated users
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/movie/:id" element={<ProductDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/managemovies"
                        element={
                            <AdminRoute>
                                <ManageMovies />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;