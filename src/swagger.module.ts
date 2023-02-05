import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

@Module({})
export class SwaggerUiModule {
    static setup(app, document) {
        SwaggerModule.setup('api', app, document);
    }
}