import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService) {}

  async searchMovies(title: string) {
    const url = `https://rest.imdbapi.dev/v2/search/titles?query=${encodeURIComponent(title)}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
