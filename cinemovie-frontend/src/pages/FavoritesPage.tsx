import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Fade
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface FavoritesPageProps {
  favorites: any[];
  onFavoriteToggle: (movie: any) => void;
  isMovieFavorite: (movieId: string) => boolean;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onFavoriteToggle, isMovieFavorite }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #23243a 0%, #3a2d5c 100%)',
        py: 8,
        px: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: '#fff',
            mb: 4,
            letterSpacing: 2,
            textAlign: 'center',
            textShadow: '0 2px 16px #0008',
          }}
        >
          Your Favorite Movies
        </Typography>

        {favorites.length === 0 && (
          <Fade in={true}>
            <Typography sx={{ color: '#bbb', textAlign: 'center', mt: 8, fontSize: 22 }}>
              No favorites yet. Start adding some movies!
            </Typography>
          </Fade>
        )}

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
            mt: 2,
          }}
        >
          {favorites.map((favorite: any) => (
            <Card
              key={favorite.movieId}
              sx={{
                background: 'rgba(40, 35, 60, 0.85)',
                borderRadius: 4,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1.5px solid rgba(120, 80, 220, 0.25)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 12px 40px 0 rgba(120, 80, 220, 0.25)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={favorite.posterUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={favorite.title}
                sx={{ objectFit: 'cover', filter: 'brightness(0.85)' }}
              />
              <CardContent sx={{ position: 'relative', pb: 6 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#fff',
                    fontWeight: 600,
                    letterSpacing: 1,
                  }}
                >
                  {favorite.title}
                </Typography>
                <IconButton
                  onClick={() => onFavoriteToggle({
                    id: favorite.movieId,
                    primary_title: favorite.title,
                    primary_image: { url: favorite.posterUrl }
                  })}
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    background: 'linear-gradient(135deg, #7c4dff 40%, #ff6ec4 100%)',
                    boxShadow: '0 2px 12px #7c4dff55',
                    color: '#fff',
                    borderRadius: '50%',
                    p: 1.2,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff6ec4 0%, #7c4dff 100%)',
                      boxShadow: '0 4px 20px #ff6ec488',
                    },
                  }}
                  aria-label="remove from favorites"
                >
                  <FavoriteIcon sx={{ fontSize: 30, filter: 'drop-shadow(0 0 6px #ff6ec4cc)' }} />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FavoritesPage;
