import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//DECORADOR -> FUNCIONES
@Module({
  imports: [], //MODULOS IMPORTADOS
  controllers: [ //CONTROLADORES DE ESTE MÓDULO
    AppController],
  providers: [AppService], //SERVICOS DE ESTE MÓDULO
  exports: [AppService], //SERVCICIOS EXPORTADOS
})
export class AppModule {}
