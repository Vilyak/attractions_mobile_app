import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import * as md5 from 'md5';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findByUsername(username: string): Promise<User> {
        return this.userModel.findOne({ username }).exec();
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username });
        if (user && user.password === password) {
            const { password, ...result } = user.toObject();

            // @ts-ignore
            return result;
        }
        return null;
    }

    async login(username: string, password: string): Promise<User> {
        const user = await this.validateUser(username, password);
        if (user) {
            return user;
        }
        throw new Error('Username or password is incorrect');
    }

    async signUp(userData: User): Promise<User> {
        const createdUser = new this.userModel({...userData, password: md5(userData.password)});
        return createdUser.save();
    }

    async updatePassword(username: string, oldPassword: string, newPassword: string) {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = md5(oldPassword) === user.password;
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        user.password = md5(newPassword);
        await user.save();
    }
}