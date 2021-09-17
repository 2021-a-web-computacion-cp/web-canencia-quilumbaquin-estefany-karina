"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    sumar(queryParams, req, res) {
        var resultado = Number(queryParams.numeroUno) + Number(queryParams.numeroDos);
        var sinFirmar = req.cookies;
        var valor = sinFirmar["valor"];
        if (valor != undefined) {
            var valor_nuevo = Number(valor) - resultado;
            res.cookie('valor', valor_nuevo);
            if (valor_nuevo < 0) {
                res.cookie('valor', 100);
                return "Ha ganadao resetearemso el valor de la cookie a 100";
            }
            else {
                return "El valor de la suma es igual a " + resultado + " te quedan: " + valor_nuevo + " puntos";
            }
        }
        else {
            res.cookie('valor', 100);
            res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo');
        }
    }
    restar(bodyParams, headers, req, res) {
        var resultado = Number(bodyParams.numeroUno) - Number(bodyParams.numeroDos);
        res.header("Valor", resultado);
        var sinFirmar = req.cookies;
        var valor = sinFirmar["valor"];
        if (valor != undefined) {
            var valor_nuevo = Number(valor) - resultado;
            res.cookie('valor', valor_nuevo);
            if (valor_nuevo < 0) {
                res.cookie('valor', 100);
                return "Ha ganadao resetearemso el valor de la cookie a 100";
            }
            else {
                return "El valor de la suma es igual a " + resultado + " te quedan: " + valor_nuevo + " puntos";
            }
        }
        else {
            res.cookie('valor', 100);
            res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo');
        }
    }
    multiplicar(params, req, res) {
        var resultado = Number(params.numeroUno) * Number(params.numeroDos);
        var sinFirmar = req.cookies;
        var valor = sinFirmar["valor"];
        if (valor != undefined) {
            var valor_nuevo = Number(valor) - resultado;
            res.cookie('valor', valor_nuevo);
            if (valor_nuevo < 0) {
                res.cookie('valor', 100);
                return "Ha ganadao resetearemso el valor de la cookie a 100";
            }
            else {
                return "El valor de la suma es igual a " + resultado + " te quedan: " + valor_nuevo + " puntos";
            }
        }
        else {
            res.cookie('valor', 100);
            res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo');
        }
    }
    dividir(headers, req, res) {
        var resultado = Number(headers.numerouno) / Number(headers.numerodos);
        var sinFirmar = req.cookies;
        var valor = sinFirmar["valor"];
        if (valor != undefined) {
            var valor_nuevo = Number(valor) - resultado;
            res.cookie('valor', valor_nuevo);
            if (valor_nuevo < 0) {
                res.cookie('valor', 100);
                return "Ha ganadao resetearemso el valor de la cookie a 100";
            }
            else {
                return "El valor de la suma es igual a " + resultado + " te quedan: " + valor_nuevo + " puntos";
            }
        }
        else {
            res.cookie('valor', 100);
            res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo');
        }
    }
    holaTexto() {
        return 'HOLA TEXTO';
    }
    holaHTML() {
        return '<h1>Hola HTML</h1> <button>Click</button>';
    }
    holaJSON() {
        return '{mensaje: "Hola json" }';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galletaSeguraYFirmada', 'Web :3', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('suma'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sumar", null);
__decorate([
    common_1.Post('resta'),
    common_1.HttpCode(201),
    common_1.Header('Result', 'Value'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers()),
    __param(2, common_1.Req()),
    __param(3, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "restar", null);
__decorate([
    common_1.Put('multiplicar/:numeroUno/:numeroDos'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicar", null);
__decorate([
    common_1.Get('dividir'),
    common_1.HttpCode(201),
    __param(0, common_1.Headers()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "dividir", null);
__decorate([
    common_1.Get('texto'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaTexto", null);
__decorate([
    common_1.Get('html'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaHTML", null);
__decorate([
    common_1.Get('json'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaJSON", null);
__decorate([
    common_1.Get('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    common_1.Get('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    common_1.Get('setear-cookie-insegura'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    common_1.Get('mostrar-cookies'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    common_1.Get('parametros-consulta/:nombre/:apellido'),
    common_1.HttpCode(200),
    common_1.Header('Cache-Control', 'none'),
    common_1.Header('EPN', 'SISTEMAS'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    common_1.Post('parametros-cuerpo'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map