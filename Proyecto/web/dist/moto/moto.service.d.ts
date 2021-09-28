import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class MotoService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): any;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): any;
    crearUno(moto: Prisma.MotoCreateInput): any;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.MotoUpdateInput;
    }): any;
    eliminarUno(id: number): any;
}
