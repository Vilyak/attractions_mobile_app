import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';

class CreateUserDto {
    username: string;
    password: string;
}

class ChangePasswordDto {
    username: string;
    oldPassword: string;
    newPassword: string;
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
    }

    @Post('change-password')
    @ApiBody({
        type: ChangePasswordDto,
    })
    async changePassword(@Body() body) {
        const { username, oldPassword, newPassword } = body;
        await this.userService.updatePassword(username, oldPassword, newPassword);
    }
}
