import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';

interface MovieCardProps {
  movie: {
    id: string;
    primary_title: string;
    original_title: string;
    genres: string[];
    rating: { aggregate_rating: number };
    start_year: number;
    primary_image: { url: string };
  };
  onFavoriteToggle: (movieId: string) => void;
  isFavorite: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle, isFavorite }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <CardMedia
        component="img"
        height="450"
        image={movie.primary_image?.url || 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.primary_title}
      />
      <CardContent>
        <Typography variant="h6">{movie.primary_title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.genres?.join(', ')} | {movie.start_year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.rating?.aggregate_rating || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant={isFavorite ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => onFavoriteToggle(movie.id)}
          fullWidth
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
