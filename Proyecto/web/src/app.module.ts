import { Get, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsuarioModule } from './usuario/usuario.module';
import { EstudianteModule } from './estudiante/estudiante.module';

//DECORADOR -> FUNCIONES
@Module({
  imports: [UsuarioModule, EstudianteModule], // MODULOS IMPORTADOS
  controllers: [AppController], //CONTROLADORES DE ESTE MODULO
  providers: [AppService, PrismaService], //SERVICIOS DE ESTE MODULO
  exports: [AppService], // SERVICIOS EXPORTADOS (SE PUEDEN USAR FUERA DE ESTE MODULO)
})
export class AppModule {}
