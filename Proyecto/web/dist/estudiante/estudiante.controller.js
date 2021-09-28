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
exports.EstudianteController = void 0;
const common_1 = require("@nestjs/common");
const estudiante_service_1 = require("./estudiante.service");
const class_validator_1 = require("class-validator");
const estudiante_editar_1 = require("./dto/estudiante-editar");
const estudiante_crear_1 = require("./dto/estudiante-crear");
let EstudianteController = class EstudianteController {
    constructor(estudianteService) {
        this.estudianteService = estudianteService;
    }
    inicio(response) {
        response.render('inicio');
    }
    vistaCrear(response, qqueryParams) {
        response.render('estudiante/crear-estudiante', {
            datos: {
                mensaje: qqueryParams.mensaje,
            },
        });
    }
    async crearUsuario(response, bodyParams) {
        try {
            await this.estudianteService.crearUno({
                nombre: bodyParams.nombre,
                apellido: bodyParams.apellido,
                calificacion: +bodyParams.calificacion,
                edad: +bodyParams.edad,
                anio: +bodyParams.anio,
            });
            response.redirect('/estudiante/vista-crear' +
                '?mensaje=Se creo el registro del estudiante:  ' +
                bodyParams.nombre);
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async listaEstudiantes(response, parametrosConsulta) {
        try {
            const respuesta = await this.estudianteService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log(respuesta);
            response.render('estudiante/lista-estudiantes', {
                datos: {
                    estudiante: respuesta,
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
            await this.estudianteService.eliminarUno(+routeParams.idEstudiante);
            response.redirect('/estudiante/lista-estudiantes' + '?mensaje=Se elimino el registro');
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const estudianteEditar = await this.estudianteService.buscarUno(+parametrosRuta.idEstudiante);
            response.render('estudiante/editar-estudiante', {
                datos: {
                    estudiante: estudianteEditar,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Editar');
        }
    }
    async actualizarEstudiante(response, bodyParams, parametrosRuta) {
        const estudianteEditar = new estudiante_editar_1.estudianteEditarDto();
        estudianteEditar.nombre = bodyParams.nombre;
        estudianteEditar.apellido = bodyParams.apellido;
        estudianteEditar.calificacion = +bodyParams.calificacion;
        estudianteEditar.edad = +bodyParams.edad;
        estudianteEditar.anio = +bodyParams.anio;
        console.log(estudianteEditar);
        console.log(parametrosRuta.idEstudiante);
        console.log(bodyParams.idEstudiante);
        try {
            const errores = await class_validator_1.validate(estudianteEditar);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                return response.redirect('/estudiante/lista-estudiante/' + '?mensaje=Error validando datos');
            }
            else {
                await this.estudianteService.actualizarUno({
                    id: +parametrosRuta.idEstudiante,
                    data: estudianteEditar,
                });
                response.redirect('/estudiante/vista-crear' +
                    '?mensaje=Se editó el registro: ' +
                    bodyParams.nombre);
                console.log(parametrosRuta.idEstudiante);
                console.log(bodyParams.idEstudiante);
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    obtenerUno(parametroRuta) {
        return this.estudianteService.buscarUno(+parametroRuta.idEstudiante);
    }
    async crearUno(parametrosCuerpo) {
        const estudianteCrearDTO = new estudiante_crear_1.EstudianteCrear();
        estudianteCrearDTO.nombre = parametrosCuerpo.nombre;
        estudianteCrearDTO.apellido = parametrosCuerpo.apellido;
        estudianteCrearDTO.calificacion = parametrosCuerpo.calificacion;
        estudianteCrearDTO.edad = parametrosCuerpo.edad;
        estudianteCrearDTO.anio = parametrosCuerpo.anio;
        estudianteCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const error = await class_validator_1.validate(estudianteCrearDTO);
            if (error.length > 0) {
                console.log(JSON.stringify(error));
                throw new common_1.BadRequestException('no envia bien parametros');
            }
            else {
                return this.estudianteService.crearUno(estudianteCrearDTO);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear estudiante' });
            throw new common_1.InternalServerErrorException('error servidor');
        }
    }
    actualizarUno(parametroRuta) {
        return this.estudianteService.actualizarUno(parametroRuta.idEstudiante);
    }
    borrarUno(parametroRuta) {
        return this.estudianteService.eliminarUno(parametroRuta.idEstudiante);
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-estudiante-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('lista-estudiantes'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "listaEstudiantes", null);
__decorate([
    common_1.Post('eliminar-estudiante/:idEstudiante'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "elminarMoto", null);
__decorate([
    common_1.Post('vista-editar/:idEstudiante'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "vistaEditar", null);
__decorate([
    common_1.Post('editar-estudiante-formulario/:idEstudiante'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "actualizarEstudiante", null);
__decorate([
    common_1.Get(':idEstudiante'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(':idEstudiante'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "crearUno", null);
__decorate([
    common_1.Put(':idEstudiante'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "actualizarUno", null);
__decorate([
    common_1.Delete(':idEstudiante'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "borrarUno", null);
EstudianteController = __decorate([
    common_1.Controller('estudiante'),
    __metadata("design:paramtypes", [estudiante_service_1.EstudianteService])
], EstudianteController);
exports.EstudianteController = EstudianteController;
//# sourceMappingURL=estudiante.controller.js.map