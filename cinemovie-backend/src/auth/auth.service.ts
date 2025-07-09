import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';



@Injectable()
export class MoviesService {
  private baseUrl = 'https://rest.imdbapi.dev';

  async searchTitles(query: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/v2/search/titles`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      // Hata yakala ve işle
      throw new Error('IMDb API çağrısında hata oluştu');
    }
  }
}


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if( user && await bcrypt.compare(pass, user.password)){
        const {password, ...result} = user;
        return result;
    }
    return null; 
  }

  async login(user: any) {
    const payload = {sub: user.id};
    return {
        access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }

  async register(email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser){
            throw new Error('User already exists');
        }

          const hashedPassword = await bcrypt.hash(password,10); 
          const user = await this.usersService.create({
            email,
            password: hashedPassword,
            role  : 'user',
          });
          const payload = { email: user.email, sub: user.id};
          const token = this.jwtService.sign(payload);
          return {access_token: token};
    }
  
}
