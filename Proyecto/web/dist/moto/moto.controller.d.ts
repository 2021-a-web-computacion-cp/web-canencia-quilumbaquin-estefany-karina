import { MotoService } from './moto.service';
export declare class MotoController {
    private motoService;
    constructor(motoService: MotoService);
    inicio(response: any): void;
    vistaCrear(response: any, qqueryParams: any): void;
    crearUsuario(response: any, bodyParams: any): Promise<void>;
    listaMotos(response: any, parametrosConsulta: any): Promise<void>;
    elminarMoto(response: any, routeParams: any): Promise<void>;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    actualizarMoto(response: any, bodyParams: any, parametrosRuta: any): Promise<any>;
    obtenerUno(parametroRuta: any): any;
    crearUno(parametrosCuerpo: any): Promise<any>;
    actualizarUno(parametroRuta: any): any;
    borrarUno(parametroRuta: any): any;
}
