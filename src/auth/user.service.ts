import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, History, Route } from './interfaces/user.interface';
import * as md5 from 'md5';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('History') private readonly historyModel: Model<History>,
        @InjectModel('Route') private readonly routeModel: Model<Route>
    ) {}

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

    async search(username: string, text: string): Promise<User> {
        const history = await this.historyModel.findOne({ username });

        let nHistory;
        if (history) {
            history.states = [text, ...history.states];
            nHistory = await history.save();
        }
        else {
            const newHistory = new this.historyModel({username, states: [text]});
            nHistory = await newHistory.save();
        }

        return nHistory;
    }

    async getPoints(username: string) {
        const route = await this.routeModel.findOne({username});

        return route?.state || [];
    }

    async addPoint(username: string, point: {state: string, name: string, w: number, h: number}) {
        const route = await this.routeModel.findOne({ username });

        if (route) {
            const item = route.state.find(item => item.state.toLowerCase() === point.state.toLowerCase() && item.name === point.name);

            if (!item) {
                route.state = [...route.state, point];
                await route.save();
                return [...route.state, point];
            }
        }
        else {
            const newRoute = new this.routeModel({username, state: [point]});
            await newRoute.save();
            return [point];
        }

        return [];
    }

    async removePoint(username: string, state: string, pointName: string) {
        const route = await this.routeModel.findOne({ username });

        if (route) {
            const newState = route.state.filter(item => !(item.state.toLowerCase() === state.toLowerCase() && item.name === pointName));
            route.state = newState;

            await route.save();
            return newState;
        }

        return [];
    }
}