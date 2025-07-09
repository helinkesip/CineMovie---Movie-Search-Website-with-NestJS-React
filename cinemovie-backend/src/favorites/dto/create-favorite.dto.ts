import { IsString, Matches } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @Matches(/^tt\d{7,}$/, {
    message: 'IMDb ID must be valid (e.g., tt1234567)',
  })
  movieId: string;

  @IsString()
  title: string;

  @IsString()
  posterUrl: string;
}

