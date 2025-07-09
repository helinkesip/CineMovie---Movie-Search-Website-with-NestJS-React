import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    const userId = Number(req.user.userId || req.user.sub);
    return this.favoritesService.create(userId, createFavoriteDto);
  }

  @Get()
  findAll(@Request() req) {
    const userId = Number(req.user.userId || req.user.sub);
    return this.favoritesService.findAll(userId);
  }

  @Delete(':movieId')
  remove(@Request() req, @Param('movieId') movieId: string) {
    const userId = Number(req.user.userId || req.user.sub);
    return this.favoritesService.remove(userId, movieId);
  }
}