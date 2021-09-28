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
exports.CalcuController = void 0;
const common_1 = require("@nestjs/common");
let CalcuController = class CalcuController {
    sumar(queryParams, request, response) {
        const cookieTemporal = request.cookies;
        const userName = queryParams.nombre;
        let cookieValue = cookieTemporal[userName];
        if (!userName || cookieTemporal[userName] == undefined) {
            return 'Error en envio del nombre de usario o crear uno nuevo';
        }
        const result = parseInt(queryParams.numUno) + parseInt(queryParams.numDos);
        cookieValue = cookieValue - result;
        if (cookieValue < 0) {
            this.deleteCookie(response, userName);
            return 'TERMINASTE EL JUEGO';
        }
        else {
            response.cookie(userName, cookieValue);
            return 'SUMA = ' + result + ', te quedan: ' + cookieValue + ' puntos';
        }
    }
    restar(bodyParams, response, headers, request) {
        const cookieTemporal = request.cookies;
        const userName = bodyParams.nombre;
        let cookieValue = cookieTemporal[userName];
        if (!userName || cookieTemporal[userName] == undefined) {
            return 'Error en envio del nombre de usario o crear uno nuevo';
        }
        const result = bodyParams.numeroUno - bodyParams.numeroDos;
        cookieValue = cookieValue - result;
        if (cookieValue < 0) {
            this.deleteCookie(response, userName);
            return 'TERMINASTE EL JUEGO';
        }
        else {
            response.cookie(userName, cookieValue);
            response.header('Resultado', result);
            return 'RESTA = ' + result + ', te quedan: ' + cookieValue + ' puntos';
        }
    }
    multiplicar(routeParams, response, request) {
        const cookieTemporal = request.cookies;
        const userName = routeParams.nombre;
        let cookieValue = cookieTemporal[userName];
        if (!userName || cookieTemporal[userName] == undefined) {
            return 'Error en envio del nombre de usario o crear uno nuevo';
        }
        const result = parseInt(routeParams.numeroUno) * parseInt(routeParams.numeroDos);
        cookieValue = cookieValue - result;
        if (cookieValue < 0) {
            this.deleteCookie(response, userName);
            return 'TERMINASTE EL JUEGO';
        }
        else {
            response.cookie(userName, cookieValue);
            return ('MULTIPLICACION = ' + result + ', te quedan: ' + cookieValue + ' puntos');
        }
    }
    dividir(request, hearderParams, response) {
        const cookieTemporal = request.cookies;
        const userName = hearderParams.nombre;
        let cookieValue = cookieTemporal[userName];
        if (!userName || cookieTemporal[userName] == undefined) {
            return 'Error en envio del nombre de usario o crear uno nuevo';
        }
        const result = hearderParams.numero1 / hearderParams.numero2;
        cookieValue = cookieValue - result;
        if (cookieValue < 0) {
            this.deleteCookie(response, userName);
            return 'TERMINASTE EL JUEGO';
        }
        else {
            response.cookie(userName, cookieValue);
            return 'DIVISION = ' + result + ', te quedan: ' + cookieValue + ' puntos';
        }
    }
    setUserName(parametrosRuta, request, response) {
        console.log(response.cookie.nombre);
        response.cookie();
        response.cookie(parametrosRuta.nombre, 100);
        response.cookie('nombre', parametrosRuta.nombre);
        return 'Cookie: ' + parametrosRuta.nombre + ' seteada';
    }
    borrarCookie(parametrosRuta, request, response) {
        const date = new Date();
        date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
        response.clearCookie(parametrosRuta.nombre);
        return 'Cookie: ' + parametrosRuta.nombre + ' eliminada';
    }
    deleteCookie(response, nombre) {
        const date = new Date();
        date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
        response.clearCookie(nombre);
    }
};
__decorate([
    common_1.Get('suma'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalcuController.prototype, "sumar", null);
__decorate([
    common_1.Post('resta'),
    common_1.HttpCode(201),
    common_1.Header('Resultado', 'valor'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Headers()),
    __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalcuController.prototype, "restar", null);
__decorate([
    common_1.Put('multiplicar/:numeroUno/:numeroDos/:nombre'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalcuController.prototype, "multiplicar", null);
__decorate([
    common_1.Get('dividir'),
    common_1.HttpCode(201),
    __param(0, common_1.Req()),
    __param(1, common_1.Headers()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalcuController.prototype, "dividir", null);
__decorate([
    common_1.Get('configurarUsuario/:nombre'),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalcuController.prototype, "setUserName", null);
__decorate([
    common_1.Get('deleteCookie/:nombre'),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalcuController.prototype, "borrarCookie", null);
__decorate([
    __param(0, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CalcuController.prototype, "deleteCookie", null);
CalcuController = __decorate([
    common_1.Controller('calculadora')
], CalcuController);
exports.CalcuController = CalcuController;
//# sourceMappingURL=calcu.controller.js.map