import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface FavoriteMovie {
  movieId: string;
  title: string;
  posterUrl: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  favorites: FavoriteMovie[];
  addFavorite: (movie: FavoriteMovie) => Promise<void>;
  removeFavorite: (movieId: string) => Promise<void>;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  const isAuthenticated = Boolean(token);

  // Token değiştiğinde localStorage güncelle
  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(newToken);
  };

  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }
    // Favorileri backend'den çek
    axios
      .get<FavoriteMovie[]>('/favorites', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setFavorites(res.data))
      .catch(err => {
        console.error('Failed to fetch favorites:', err);
        setFavorites([]);
      });
  }, [token]);

  const addFavorite = async (movie: FavoriteMovie) => {
    if (!token) return;
    if (favorites.some(fav => fav.movieId === movie.movieId)) {
      // Zaten favoride varsa ekleme
      return;
    }
    try {
      const res = await axios.post<FavoriteMovie>(
        '/favorites',
        movie,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add favorite:', err);
    }
  };

  const removeFavorite = async (movieId: string) => {
    if (!token) return;
    try {
      await axios.delete(`/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(prev => prev.filter(fav => fav.movieId !== movieId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  const logout = () => {
    setToken(null);
    setFavorites([]);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        favorites,
        addFavorite,
        removeFavorite,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
