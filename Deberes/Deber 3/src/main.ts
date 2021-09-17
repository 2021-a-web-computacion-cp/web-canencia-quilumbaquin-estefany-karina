import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); //servidor web estático
  app.use(cookieParser('Secreto de las cookies'))
  app.use(
    session({
      name: 'sessionl',
      secret: 'Esto es un secreto',
      resave: true,
      saveUninitialized: true,
      cookie: {secure: false},
      store: new FileStore(),
    })
  );

  await app.listen(3000);
}

bootstrap();
