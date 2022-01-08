import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@libs/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { SwaggerTag } from '@libs/swaggers/swagger-tag';
import extraModels from '@libs/swaggers/extra-models';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.GLOBAL_PREFIX;
  if (globalPrefix) app.setGlobalPrefix(globalPrefix);

  if (process.env.NODE_ENV !== 'production') {
    const documentBuilder = new DocumentBuilder()
      .setTitle('Recipe4m Auth API')
      .setDescription(`Recipe4m Auth API for ${process.env.NODE_ENV}`)
      .setVersion('1.0')
      .setExternalDoc('JSON Specification', `/${globalPrefix}/swagger-ui-json`)
      .addBearerAuth();

    Object.values(SwaggerTag).forEach((value) => documentBuilder.addTag(value));

    const config = documentBuilder.build();

    const document = SwaggerModule.createDocument(app, config, {
      extraModels,
    });

    let swaggerPath = `auth/swagger-ui`;
    if (globalPrefix) swaggerPath = `${globalPrefix}/auth/swagger-ui`;
    SwaggerModule.setup(swaggerPath, app, document);
  }

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
