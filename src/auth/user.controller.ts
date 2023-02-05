import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';

class CreateUserDto {
    username: string;
    password: string;
}

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiBody({
        type: CreateUserDto,
    })
    async register(@Body() user: User) {
        return this.userService.signUp(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiBody({
        type: CreateUserDto,
    })
    async login(@Request() req) {
        return req.user;
        //return this.userService.login(req.user.username, req.user.password);
    }
}
