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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const usuario_crear_dto_1 = require("./dto/usuario-crear.dto");
const class_validator_1 = require("class-validator");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    inicio(response) {
        response.render('inicio');
    }
    vistaCrear(response, qqueryParams) {
        response.render('usuario/crear', {
            datos: {
                mensaje: qqueryParams.mensaje,
            },
        });
    }
    async crearUsuario(response, bodyParams) {
        try {
            const userRes = await this.usuarioService.crearUno({
                nombre: bodyParams.nombre,
                apellido: bodyParams.apellido,
            });
            response.redirect('/usuario/vista-crear' +
                '?mensaje=Se creo el usuario ' +
                bodyParams.nombre);
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async listaUsuarios(response, parametrosConsulta) {
        try {
            const respuesta = await this.usuarioService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log(respuesta);
            response.render('usuario/lista', {
                datos: {
                    usuarios: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    async elminarUsuario(response, routeParams) {
        try {
            await this.usuarioService.eliminarUno(+routeParams.idUsuario);
            response.redirect('/usuario/lista-usuarios' + '?mensaje=Se elimino el usuario');
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    obtenerUno(parametroRuta) {
        return this.usuarioService.buscarUno(+parametroRuta.idUsuario);
    }
    async crearUno(parametrosCuerpo) {
        const usuarioCrearDTO = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioCrearDTO.nombre = parametrosCuerpo.nombre;
        usuarioCrearDTO.apellido = parametrosCuerpo.apellido;
        usuarioCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const error = await class_validator_1.validate(usuarioCrearDTO);
            if (error.length > 0) {
                console.log(JSON.stringify(error));
                throw new common_1.BadRequestException('no envia bien parametros');
            }
            else {
                return this.usuarioService.crearUno(usuarioCrearDTO);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear usuario' });
            throw new common_1.InternalServerErrorException('error servidor');
        }
    }
    actualizarUno(parametroRuta) {
        return this.usuarioService.actualizarUno(parametroRuta.idUsuario);
    }
    borrarUno(parametroRuta) {
        return this.usuarioService.eliminarUno(parametroRuta.idUsuario);
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-usuario-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('lista-usuarios'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listaUsuarios", null);
__decorate([
    common_1.Post('eliminar-usuario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "elminarUsuario", null);
__decorate([
    common_1.Get(':idUsuario'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(':idUsuario'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUno", null);
__decorate([
    common_1.Put(':idUsuario'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "actualizarUno", null);
__decorate([
    common_1.Delete(':idUsuario'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "borrarUno", null);
UsuarioController = __decorate([
    common_1.Controller('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map