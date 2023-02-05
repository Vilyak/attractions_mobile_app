import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import * as md5 from 'md5';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (user.password !== md5(password)) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
