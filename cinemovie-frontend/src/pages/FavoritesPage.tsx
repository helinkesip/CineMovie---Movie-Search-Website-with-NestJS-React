import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface FavoritesPageProps {
  favorites: any[];
  onFavoriteToggle: (movie: any) => void;
  isMovieFavorite: (movieId: string) => boolean;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onFavoriteToggle, isMovieFavorite }) => {
  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>

      {favorites.length === 0 && <Typography>No favorites yet.</Typography>}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: 'center' }}>
        {favorites.map((favorite: any) => (
          <Card key={favorite.movieId} sx={{ width: 345, height: 'fit-content' }}>
            <CardMedia
              component="img"
              height="400"
              image={favorite.posterUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
              alt={favorite.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ position: 'relative' }}>
              <Typography variant="h6" component="div" sx={{ 
                mb: 1, 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
              }}>
                {favorite.title}
              </Typography>
              <IconButton
                onClick={() => onFavoriteToggle({
                  id: favorite.movieId,
                  primary_title: favorite.title,
                  primary_image: { url: favorite.posterUrl }
                })}
                sx={{ position: 'absolute', top: 8, right: 8 }}
                color="primary"
              >
                <FavoriteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default FavoritesPage;
