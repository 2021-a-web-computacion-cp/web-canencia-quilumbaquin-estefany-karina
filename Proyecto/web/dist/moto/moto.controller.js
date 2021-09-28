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
exports.MotoController = void 0;
const common_1 = require("@nestjs/common");
const moto_service_1 = require("./moto.service");
const moto_crear_dto_1 = require("./dto/moto-crear.dto");
const class_validator_1 = require("class-validator");
const moto_editar_dto_1 = require("./dto/moto-editar.dto");
let MotoController = class MotoController {
    constructor(motoService) {
        this.motoService = motoService;
    }
    inicio(response) {
        response.render('inicio');
    }
    vistaCrear(response, qqueryParams) {
        response.render('moto/crear-moto', {
            datos: {
                mensaje: qqueryParams.mensaje,
            },
        });
    }
    async crearUsuario(response, bodyParams) {
        try {
            const motoRes = await this.motoService.crearUno({
                nombre: bodyParams.nombre,
                marca: bodyParams.marca,
                cilindraje: +bodyParams.cilindraje,
                kilometraje: +bodyParams.kilometraje,
                anio: +bodyParams.anio,
                precio: +bodyParams.precio,
            });
            response.redirect('/moto/vista-crear' +
                '?mensaje=Se creo el registro: ' +
                bodyParams.nombre);
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async listaMotos(response, parametrosConsulta) {
        try {
            const respuesta = await this.motoService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log(respuesta);
            response.render('moto/lista-moto', {
                datos: {
                    moto: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    async elminarMoto(response, routeParams) {
        try {
            await this.motoService.eliminarUno(+routeParams.idMoto);
            response.redirect('/moto/lista-motos' + '?mensaje=Se elimino el registro');
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const motoEditar = await this.motoService.buscarUno(+parametrosRuta.idMoto);
            response.render('moto/editar-moto', {
                datos: {
                    moto: motoEditar,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Editar');
        }
    }
    async actualizarMoto(response, bodyParams, parametrosRuta) {
        const motoEditar = new moto_editar_dto_1.MotoEditarDto();
        motoEditar.nombre = bodyParams.nombre;
        motoEditar.marca = bodyParams.marca;
        motoEditar.cilindraje = +bodyParams.cilindraje;
        motoEditar.kilometraje = +bodyParams.kilometraje;
        motoEditar.anio = +bodyParams.anio;
        motoEditar.precio = +bodyParams.precio;
        console.log(motoEditar);
        console.log(parametrosRuta.idMoto);
        console.log(bodyParams.idMoto);
        try {
            const errores = await class_validator_1.validate(motoEditar);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                return response.redirect('/moto/lista-motos/' + '?mensaje=Error validando datos');
            }
            else {
                await this.motoService.actualizarUno({
                    id: +parametrosRuta.idMoto,
                    data: motoEditar,
                });
                response.redirect('/moto/vista-crear' +
                    '?mensaje=Se editó el registro: ' +
                    bodyParams.nombre);
                console.log(parametrosRuta.idMoto);
                console.log(bodyParams.idMoto);
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    obtenerUno(parametroRuta) {
        return this.motoService.buscarUno(+parametroRuta.idMoto);
    }
    async crearUno(parametrosCuerpo) {
        const motoCrearDTO = new moto_crear_dto_1.MotoCrearDto();
        motoCrearDTO.nombre = parametrosCuerpo.nombre;
        motoCrearDTO.marca = parametrosCuerpo.marca;
        motoCrearDTO.cilindraje = parametrosCuerpo.cilindraje;
        motoCrearDTO.kilometraje = parametrosCuerpo.kilometraje;
        motoCrearDTO.anio = parametrosCuerpo.anio;
        motoCrearDTO.precio = parametrosCuerpo.precio;
        motoCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const error = await class_validator_1.validate(motoCrearDTO);
            if (error.length > 0) {
                console.log(JSON.stringify(error));
                throw new common_1.BadRequestException('no envia bien parametros');
            }
            else {
                return this.motoService.crearUno(motoCrearDTO);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear moto' });
            throw new common_1.InternalServerErrorException('error servidor');
        }
    }
    actualizarUno(parametroRuta) {
        return this.motoService.actualizarUno(parametroRuta.idMoto);
    }
    borrarUno(parametroRuta) {
        return this.motoService.eliminarUno(parametroRuta.idMoto);
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MotoController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MotoController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-moto-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MotoController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('lista-motos'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MotoController.prototype, "listaMotos", null);
__decorate([
    common_1.Post('eliminar-moto/:idMoto'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MotoController.prototype, "elminarMoto", null);
__decorate([
    common_1.Post('vista-editar/:idMoto'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MotoController.prototype, "vistaEditar", null);
__decorate([
    common_1.Post('editar-moto-formulario/:idMoto'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MotoController.prototype, "actualizarMoto", null);
__decorate([
    common_1.Get(':idMoto'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MotoController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(':idMoto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MotoController.prototype, "crearUno", null);
__decorate([
    common_1.Put(':idMoto'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MotoController.prototype, "actualizarUno", null);
__decorate([
    common_1.Delete(':idMoto'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MotoController.prototype, "borrarUno", null);
MotoController = __decorate([
    common_1.Controller('moto'),
    __metadata("design:paramtypes", [moto_service_1.MotoService])
], MotoController);
exports.MotoController = MotoController;
//# sourceMappingURL=moto.controller.js.map