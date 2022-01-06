import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerTag } from './libs/swaggers/swagger-tag';
import extraModels from './libs/swaggers/extra-models';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

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

    const swaggerPath = `${globalPrefix}/swagger-ui`;
    SwaggerModule.setup(swaggerPath, app, document);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
