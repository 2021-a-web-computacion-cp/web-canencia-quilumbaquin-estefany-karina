import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private usuarioservice;
    constructor(usuarioservice: UsuarioService);
    listaUsuarios(responses: any): void;
    obtenerUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").EPN_USUARIO>;
}
