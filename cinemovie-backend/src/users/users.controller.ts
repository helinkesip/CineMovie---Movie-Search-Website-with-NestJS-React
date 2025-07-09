import { Controller, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private readonly usersService: UsersService) {} 

    @Get(':email')
    async findByEmail(@Param('email') email : string){ //async fonksiyon promise döndürür
        return await this.usersService.findByEmail(email);
    }
}
