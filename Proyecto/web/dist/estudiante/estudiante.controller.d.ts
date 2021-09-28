import { EstudianteService } from './estudiante.service';
export declare class EstudianteController {
    private estudianteService;
    constructor(estudianteService: EstudianteService);
    inicio(response: any): void;
    vistaCrear(response: any, qqueryParams: any): void;
    crearUsuario(response: any, bodyParams: any): Promise<void>;
    listaEstudiantes(response: any, parametrosConsulta: any): Promise<void>;
    elminarMoto(response: any, routeParams: any): Promise<void>;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    actualizarEstudiante(response: any, bodyParams: any, parametrosRuta: any): Promise<any>;
    obtenerUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EstudianteClient<import(".prisma/client").Estudiante>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").Estudiante>;
    actualizarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EstudianteClient<import(".prisma/client").Estudiante>;
    borrarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EstudianteClient<import(".prisma/client").Estudiante>;
}
