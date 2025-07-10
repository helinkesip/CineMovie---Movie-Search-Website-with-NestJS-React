import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFavorite, removeFavorite, getFavorites } from './api';
import { toast } from 'react-toastify';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<any[]>([]); // tipini ihtiyacına göre özelleştirebilirsin

  // Favorileri ilk yükle
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return;
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const favs = await getFavorites(token);
        setFavorites(favs);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  // Film favori mi kontrolü
  const isMovieFavorite = (movieId: string) => {
    return favorites.some((fav) => fav.movieId === movieId);
  };

  // Favori ekle/çıkar işlemi
  const handleFavoriteToggle = async (movie: {
    id: string;
    primary_title: string;
    primary_image: { url: string };
  }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('Lütfen giriş yapınız');
      navigate('/login');
      return;
    }

    const movieId = movie.id;
    const isFav = isMovieFavorite(movieId);

    try {
      if (isFav) {
        await removeFavorite(token, movieId);
        setFavorites((prev) => prev.filter((fav) => fav.movieId !== movieId));
      } else {
        await addFavorite(token, movieId, movie.primary_title, movie.primary_image?.url || '');
        setFavorites((prev) => [
          ...prev,
          {
            movieId,
            title: movie.primary_title,
            posterUrl: movie.primary_image?.url || '',
          },
        ]);
      }
    } catch (err) {
      console.error('Favorite toggle failed:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 2 }}>
            CineMovie
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Search
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>
          <Box sx={{ ml: 2 }}>
            {isAuthenticated ? (
              <Button color="secondary" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="secondary" variant="outlined" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sayfa yönlendirmeleri */}
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            isMovieFavorite={isMovieFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            isAuthenticated ? (
              <FavoritesPage
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
                isMovieFavorite={isMovieFavorite}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer aria-label="toast" />
    </>
  );
}

export default App;
