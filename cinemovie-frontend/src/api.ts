import axios from 'axios';

// For movie search and details
export const imdbApi = axios.create({
  baseURL: 'https://rest.imdbapi.dev/v2',
  timeout: 5000,
});

// For authentication and user-specific actions
export const authApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

export const loginUser = async (email: string, password: string) => {
  const response = await authApi.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await authApi.post('/auth/register', { email, password });
  return response.data;
};

// --- Favorites API ---
export const getFavorites = async (token: string) => {
  const response = await authApi.get('/favorites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addFavorite = async (
  token: string,
  movieId: string,
  title: string,
  posterUrl: string
) => {
  const response = await authApi.post(
    '/favorites',
    { movieId, title, posterUrl },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const removeFavorite = async (token: string, movieId: string) => {
  const response = await authApi.delete(`/favorites/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
