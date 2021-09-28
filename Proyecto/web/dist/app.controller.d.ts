import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    Suma(queryParams: any, result: any, request: any): number | "TERMINASTE EL JUEGO";
    Resta(bodyParams: any, result: any, request: any, header: any): number | "TERMINASTE EL JUEGO";
    Multiplicacion(routeParams: any, result: any, request: any): number | "TERMINASTE EL JUEGO";
    Division(params: any, result: any, request: any): number | "TERMINASTE EL JUEGO";
    getHello(): string;
    helloText(): string;
    HelloHTML(): string;
    helloJson(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
}
