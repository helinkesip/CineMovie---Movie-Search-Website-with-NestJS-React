import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common'; //bu hata tipi http 500 değil de 401 dönecek 
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}


    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto){
    const user = await this.authService.register(registerUserDto.email,registerUserDto.password);
    return user;

    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email,loginUserDto.password);
    if(user){
        return await this.authService.login(user);
    }else{
        throw new UnauthorizedException(' Invalid credentials')
    }
  }

    @UseGuards(AuthGuard('jwt')) //sadece tokenı geçerli olan kişiler bu routa erişebilir 
    @Get('profile')
    getProfile(@Request() req){
        return {email: req.user.email, userId: req.user.id};
    }

    
}
