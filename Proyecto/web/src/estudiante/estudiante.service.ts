import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EstudianteService {
    constructor(private prisma: PrismaService) {}
    buscarUno(id: number) {
        return this.prisma.estudiante.findUnique({ where: { id: id } });
    }
    buscarMuchos(parametrosBusqueda: {
        skip?: number; //Registros que te saltas
        take?: number; //Registros que tomas
        busqueda?: string; // Lo que el usuario busca
    }) {
        const or = parametrosBusqueda.busqueda
            ? {
                OR: [
                    { nombre: { contains: parametrosBusqueda.busqueda } },
                    { apellido: { contains: parametrosBusqueda.busqueda } },
                ],
            }
            : {};
        return this.prisma.estudiante.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }
    crearUno(estudiante: Prisma.EstudianteCreateInput) {
        return this.prisma.estudiante.create({ data: estudiante });
    }
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.EstudianteUpdateInput;
    }) {
        return this.prisma.estudiante.update({
            data: parametrosActualizar.data,
            where: {
                id: +parametrosActualizar.id,
            },
        });
    }
    eliminarUno(id: number) {
        return this.prisma.estudiante.delete({
            where: { id: id },
        });
    }
}
