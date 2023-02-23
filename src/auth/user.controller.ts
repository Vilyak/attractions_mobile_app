import { Controller, Post, Body, UseGuards, Request, Param, Delete, Get } from "@nestjs/common";
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

class AddPointDto {state: string; name: string; w: number; h: number}

@Controller()
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

    @Post('search/:username/:text')
    async search(@Param('username') usr: string, @Param('text') text: string) {
        await this.userService.search(usr, text);
    }

    @Get('point/:username')
    async getPoints(@Param('username') usr: string) {
        return await this.userService.getPoints(usr);
    }

    @Post('point/:username')
    @ApiBody({
        type: AddPointDto,
    })
    async addPoint(@Param('username') usr: string, @Body() body) {
        return await this.userService.addPoint(usr, body);
    }

    @Delete('point/:username/:point')
    async removePoint(@Param('username') usr: string, @Param('point') point: string) {
        return await this.userService.removePoint(usr, point);
    }
}
