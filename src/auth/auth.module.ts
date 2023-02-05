import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => ({
                uri: 'mongodb://45.156.23.232:27017/db',
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }),
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        PassportModule,
    ],
    controllers: [UserController],
    providers: [UserService, LocalStrategy],
})
export class AuthModule {}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB server!');
});