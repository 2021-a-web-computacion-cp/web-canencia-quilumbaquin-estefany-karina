import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EstudianteService } from './estudiante.service';
import {EstudianteController} from "./estudiante.controller";

@Module({
    imports: [
        // modulos importados
    ],
    providers: [
        // declaramos servicio
        EstudianteService,
        PrismaService,
    ],
    exports: [
        // exportamos servicio
        EstudianteService,
    ],
    controllers: [
        // declaramos controladores
        EstudianteController,
    ],
})
export class EstudianteModule {}
