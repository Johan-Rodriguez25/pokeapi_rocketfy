import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

const SWAGGER_ENVS = ['local', 'dev', 'staging']

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Poke API')
      // .addBasicAuth()
      .setDescription('Poke API with CRUD functionality')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, document, {
      explorer: true,
      swaggerOptions: {
        filter: true,
        showRequestDuration: true
      }
    })

    await app.listen(process.env.PORT || 3000)
  }
}
bootstrap()
