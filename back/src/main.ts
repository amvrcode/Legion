import { NestFactory, Reflector } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ResponceInterceptor } from './core/interceptors/responce.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.setGlobalPrefix("api")
  app.use(cookieParser())
  app.use(compression())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(3000)
}
bootstrap()
