import React, { useState, useEffect } from 'react';
import { TextField, Container, CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MovieCard from '../components/MovieList';
import { toast } from 'react-toastify';
import { imdbApi } from '../api';

// Props tiplerini tanımla
interface SearchPageProps {
  favorites: any[];
  onFavoriteToggle: (movie: any) => Promise<void> | void;
  isMovieFavorite: (movieId: string) => boolean;
}

const SearchPage: React.FC<SearchPageProps> = ({
  favorites,
  onFavoriteToggle,
  isMovieFavorite,
}) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    // Arama API isteği
    // Burada imdbApi çağrısını unutma veya kendi api çağrını yaz
    imdbApi
      .get('/search/titles', { params: { query } })
      .then((res) => {
        setMovies(res.data.titles || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch movies');
        setLoading(false);
      });
  }, [query]);

  return (
    <Container sx={{ pt: 4 }}>
      <TextField
        fullWidth
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        helperText="Type at least 3 characters"
      />

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && movies.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: 'center' }}>
          {movies.map((movie) => (
            <Box key={movie.id} sx={{ flex: '1 1 250px', maxWidth: 345 }}>
              <MovieCard
                movie={movie}
                onFavoriteToggle={() => onFavoriteToggle(movie)}
                isFavorite={isMovieFavorite(movie.id)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default SearchPage;
