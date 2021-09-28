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
    Suma(queryParams, result, request) {
        if (request.signedCookies['total'] == undefined) {
            result.cookie('total', 100, {
                signed: true,
            });
            result.sendStatus(200);
            return 100;
        }
        else {
            if (request.signedCookies['total'] <= 0) {
                result.cookie('total', 100, {
                    signed: true,
                });
                return 'TERMINASTE EL JUEGO';
            }
            else {
                const number = Number(request.signedCookies['total']) -
                    Number(queryParams.uno) -
                    Number(queryParams.dos);
                result.cookie('total', number, {
                    signed: true,
                });
                return number;
            }
        }
    }
    Resta(bodyParams, result, request, header) {
        if (request.signedCookies['total'] == undefined) {
            result.cookie('total', 100, {
                signed: true,
            });
            result.header('result', '100');
            return 100;
        }
        else {
            if (request.signedCookies['total'] <= 0) {
                result.cookie('total', 100, {
                    signed: true,
                });
                result.header('resultado', '100');
                return 'TERMINASTE EL JUEGO';
            }
            else {
                const number = Number(request.signedCookies['total']) -
                    (Number(bodyParams.uno) - Number(bodyParams.dos));
                result.cookie('total', number, {
                    signed: true,
                });
                result.header('result', number.toString());
                return number;
            }
        }
    }
    Multiplicacion(routeParams, result, request) {
        if (request.signedCookies['total'] == undefined) {
            result.cookie('total', 100, {
                signed: true,
            });
            return 100;
        }
        else {
            if (request.signedCookies['total'] <= 0) {
                result.cookie('total', 100, {
                    signed: true,
                });
                return 'TERMINASTE EL JUEGO';
            }
            else {
                const numero = Number(request.signedCookies['total']) -
                    Number(routeParams.uno) * Number(routeParams.dos);
                result.cookie('total', numero, {
                    signed: true,
                });
                return numero;
            }
        }
    }
    Division(params, result, request) {
        if (request.signedCookies['total'] == undefined) {
            result.cookie('total', 100, {
                signed: true,
            });
            return 100;
        }
        else {
            if (request.signedCookies['total'] <= 0) {
                result.cookie('total', 100, {
                    signed: true,
                });
                return 'TERMINASTE EL JUEGO';
            }
            else {
                const number = Number(request.signedCookies['total']) -
                    Number(params.uno) / Number(params.dos);
                result.cookie('total', number, {
                    signed: true,
                });
                return number;
            }
        }
    }
    getHello() {
        return this.appService.getHello();
    }
    helloText() {
        return 'Hola Texto';
    }
    HelloHTML() {
        return '<h1>Hola HTML</h1> <button>Click</button>';
    }
    helloJson() {
        return '{mensaje: "Hola JSON"}';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('cookieInsegura', 'esto esta inseguro');
        res.cookie('cookieSegura', 'esto esta seguro :)', { secure: true });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
};
__decorate([
    common_1.Get('suma'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Suma", null);
__decorate([
    common_1.Post('resta'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Req()),
    __param(3, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Resta", null);
__decorate([
    common_1.Put('multiplicacion/:uno/:dos'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Multiplicacion", null);
__decorate([
    common_1.Put('division/:uno/:dos'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Division", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('texto'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloText", null);
__decorate([
    common_1.Get('html'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "HelloHTML", null);
__decorate([
    common_1.Get('json'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloJson", null);
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
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map