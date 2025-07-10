import React, { useState, useEffect } from 'react';
import {
  TextField,
  Container,
  CircularProgress,
  Typography,
  Box,
  InputAdornment,
  Paper,
  Fade,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Movie as MovieIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import MovieCard from '../components/MovieList';
import { toast } from 'react-toastify';
import { imdbApi } from '../api';

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

    const timeoutId = setTimeout(() => {
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
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18192a 0%, #1a1333 100%)',
        position: 'relative',
        pb: 8,
      }}
    >
      {/* Optional: Star/Bokeh overlay for cinematic effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(circle at 20% 30%, #7c4dff22 0%, transparent 60%),
                      radial-gradient(circle at 80% 70%, #ff6ec422 0%, transparent 60%)`,
        }}
      />
      {/* Hero Section */}
      <Box
        sx={{
          background: 'transparent',
          py: 8,
          mb: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', color: '#fff' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <MovieIcon sx={{ fontSize: 48, mr: 2, color: '#a084ff', filter: 'drop-shadow(0 0 8px #7c4dff88)' }} />
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  letterSpacing: 2,
                  color: '#fff',
                  textShadow: '0 0 16px #7c4dff88, 0 2px 8px #000a',
                }}
              >
                Discover Amazing Movies
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.95,
                color: '#e0e0ff',
                fontWeight: 500,
                textShadow: '0 0 8px #7c4dff44',
              }}
            >
              Your favorite films, remembered forever.
            </Typography>
            {/* Search Input */}
            <Paper
              elevation={16}
              sx={{
                maxWidth: 600,
                mx: 'auto',
                borderRadius: 4,
                overflow: 'hidden',
                background: 'rgba(30, 25, 50, 0.85)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 32px #7c4dff33',
                border: '1.5px solid #7c4dff44',
              }}
            >
              <TextField
                fullWidth
                placeholder="Search for movies, actors, or genres..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ ml: 2 }}>
                      <SearchIcon sx={{ fontSize: 28, color: '#a084ff' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    background: 'transparent',
                    color: '#fff',
                    borderRadius: 2,
                    fontSize: '1.2rem',
                    boxShadow: 'none',
                    '& input': {
                      color: '#fff',
                      background: 'transparent',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: '#b39ddb',
                    fontWeight: 500,
                  },
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                    background: 'transparent',
                    color: '#fff',
                    boxShadow: 'none',
                    border: '1.5px solid #7c4dff44',
                    '&:hover': {
                      borderColor: '#a084ff',
                    },
                    '&.Mui-focused': {
                      borderColor: '#ff6ec4',
                      boxShadow: '0 0 8px #ff6ec488',
                    },
                  },
                  '& input': {
                    color: '#fff',
                    background: 'transparent',
                  },
                }}
              />
            </Paper>
          </Box>
        </Container>
      </Box>
      {/* Content Section */}
      <Container maxWidth="lg" sx={{ pb: 6, zIndex: 2, position: 'relative' }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} thickness={4} sx={{ color: '#a084ff' }} />
              <Typography variant="h6" sx={{ mt: 2, color: '#b39ddb' }}>
                Searching for movies...
              </Typography>
            </Box>
          </Box>
        )}
        {/* Error State */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              background: 'rgba(60, 30, 80, 0.95)',
              color: '#fff',
              border: '1.5px solid #ff6ec4',
              '& .MuiAlert-message': { fontSize: '1rem', color: '#fff' },
            }}
          >
            {error}
          </Alert>
        )}
        {/* Empty State */}
        {!loading && !error && query.length > 0 && movies.length === 0 && (
          <Fade in={true}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <SearchIcon sx={{ fontSize: 80, color: '#7c4dff', mb: 2, filter: 'drop-shadow(0 0 12px #7c4dff88)' }} />
              <Typography variant="h5" sx={{ color: '#b39ddb' }} gutterBottom>
                No movies found
              </Typography>
              <Typography variant="body1" sx={{ color: '#b39ddb' }}>
                Try searching with different keywords
              </Typography>
            </Box>
          </Fade>
        )}
        {/* Initial State */}
        {!loading && !error && query.length === 0 && (
          <Fade in={true}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <TrendingIcon sx={{ fontSize: 80, color: '#a084ff', mb: 2, filter: 'drop-shadow(0 0 12px #7c4dff88)' }} />
              <Typography variant="h5" sx={{ color: '#fff' }} gutterBottom>
                Start Your Movie Journey
              </Typography>
              <Typography variant="body1" sx={{ color: '#b39ddb', maxWidth: 600, mx: 'auto' }}>
                Search for your favorite movies, discover new ones, and build your personal collection of favorites.
              </Typography>
            </Box>
          </Fade>
        )}
        {/* Results */}
        {!loading && !error && movies.length > 0 && (
          <Fade in={true}>
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ mb: 3, color: '#fff', textShadow: '0 0 8px #7c4dff44' }}
              >
                Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)'
                  },
                  gap: 4,
                  justifyContent: 'center',
                }}
              >
                {movies.map((movie) => (
                  <Box key={movie.id}>
                    <MovieCard
                      movie={movie}
                      onFavoriteToggle={() => onFavoriteToggle(movie)}
                      isFavorite={isMovieFavorite(movie.id)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default SearchPage;
