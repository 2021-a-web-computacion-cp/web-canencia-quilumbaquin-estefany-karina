import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class EstudianteService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__EstudianteClient<import(".prisma/client").Estudiante>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Estudiante[]>;
    crearUno(estudiante: Prisma.EstudianteCreateInput): Prisma.Prisma__EstudianteClient<import(".prisma/client").Estudiante>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.EstudianteUpdateInput;
    }): Prisma.Prisma__EstudianteClient<import(".prisma/client").Estudiante>;
    eliminarUno(id: number): Prisma.Prisma__EstudianteClient<import(".prisma/client").Estudiante>;
}
