import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  private favorites: Favorite[] = [];
  private idCounter = 1;

  create(userId: number, createFavoriteDto: CreateFavoriteDto) {
    if (this.favorites.some(fav => fav.userId === userId && fav.movieId === createFavoriteDto.movieId)) {
      return { message: 'Already in favorites' };
    }

    const favorite: Favorite = {
      id: this.idCounter++,
      userId,
      movieId: createFavoriteDto.movieId,
      title: createFavoriteDto.title,
      posterUrl: createFavoriteDto.posterUrl,
    };

    this.favorites.push(favorite);
    return favorite;
  }

  findAll(userId: number) {
    return this.favorites.filter(fav => fav.userId === userId);
  }

  remove(userId: number, movieId: string) {
    const before = this.favorites.length;
    this.favorites = this.favorites.filter(fav => !(fav.userId === userId && fav.movieId === movieId));
    return { removed: before !== this.favorites.length };
  }
}
