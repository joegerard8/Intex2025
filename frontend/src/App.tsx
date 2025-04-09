import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './views/homePage.tsx';
import DashboardPage from './views/dashboardPage';
import ManageMovies from './views/manageMovies';
import Movies from './views/movies.tsx';
import Privacy from './views/privacy';
import ProductDetailPage from './views/productDetails';
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import Unauthorized from './pages/Unauthorized.tsx';
import AuthorizeView, { RequireAuth, RequireRole } from './AuthorizeView.tsx';
import Layout from './components/Layout.tsx';


function App() {
  return (
    <Router>
      <AuthorizeView>
        <Routes>
          {/* Public */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/privacy"
            element={
              <Layout>
                <Privacy />
              </Layout>
            }
          />
          <Route path="/movie/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Authenticated-only */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/movies"
            element={
              <RequireAuth>
                <Layout>
                  <Movies />
                </Layout>
              </RequireAuth>
            }
          />

          {/* Admin-only */}
          {/* <Route ADD THIS BACK LATER
            path="/managemovies"
            element={
              <RequireRole role="Administrator">
                <Layout>
                  <ManageMovies />
                </Layout>
              </RequireRole>
            }
          /> */}
          <Route
          path="/managemovies"
          element={<ManageMovies />}>
            
          </Route>
        </Routes>
      </AuthorizeView>
    </Router>
  );
}

export default App;