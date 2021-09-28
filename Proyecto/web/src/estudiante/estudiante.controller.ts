import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    Query,
    Res,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { validate } from 'class-validator';
import { estudianteEditarDto } from './dto/estudiante-editar';
import { EstudianteCrear } from './dto/estudiante-crear';

// hpttp://localhost:3000/estudiante/
@Controller('estudiante')
export class EstudianteController {
    constructor(private estudianteService: EstudianteService) {}

    @Get('inicio')
  inicio(@Res() response) {
        response.render('inicio');
  }

    @Get('vista-crear')
  vistaCrear(@Res() response, @Query() qqueryParams) {
        response.render('estudiante/crear-estudiante', {
            datos: {
                mensaje: qqueryParams.mensaje,
            },
        });
    }

    @Post('crear-estudiante-formulario')
    async crearUsuario(@Res() response, @Body() bodyParams) {
        try {
            await this.estudianteService.crearUno({
                nombre: bodyParams.nombre,
                apellido: bodyParams.apellido,
                calificacion: +bodyParams.calificacion,
                edad: +bodyParams.edad,
                anio: +bodyParams.anio,
            });
            response.redirect(
                '/estudiante/vista-crear' +
                '?mensaje=Se creo el registro del estudiante:  ' +
                bodyParams.nombre,
            );
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e);
        }
    }

    @Get('lista-estudiantes')
    async listaEstudiantes(@Res() response, @Query() parametrosConsulta) {
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
        } catch (error) {
            throw new InternalServerErrorException('Error del servidor');
        }
    }

    @Post('eliminar-estudiante/:idEstudiante')
    async elminarMoto(@Res() response, @Param() routeParams) {
        try {
            await this.estudianteService.eliminarUno(+routeParams.idEstudiante);
            response.redirect(
                '/estudiante/lista-estudiantes' + '?mensaje=Se elimino el registro',
            );
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e);
        }
    }

    @Post('vista-editar/:idEstudiante')
    async vistaEditar(@Res() response, @Param() parametrosRuta) {
        try {
            const estudianteEditar = await this.estudianteService.buscarUno(
                +parametrosRuta.idEstudiante,
            );
            response.render('estudiante/editar-estudiante', {
                datos: {
                    estudiante: estudianteEditar,
                },
            });
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error Editar');
        }
    }

    @Post('editar-estudiante-formulario/:idEstudiante')
    async actualizarEstudiante(
        @Res() response,
        @Body() bodyParams,
        @Param() parametrosRuta,
    ) {
        const estudianteEditar = new estudianteEditarDto();
        estudianteEditar.nombre = bodyParams.nombre;
        estudianteEditar.apellido = bodyParams.apellido;
        estudianteEditar.calificacion = +bodyParams.calificacion;
        estudianteEditar.edad = +bodyParams.edad;
        estudianteEditar.anio = +bodyParams.anio;
        console.log(estudianteEditar);
        console.log(parametrosRuta.idEstudiante);
        console.log(bodyParams.idEstudiante);
        try {
            const errores = await validate(estudianteEditar);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                return response.redirect(
                    '/estudiante/lista-estudiante/' + '?mensaje=Error validando datos',
                );
            } else {
                await this.estudianteService.actualizarUno({
                    id: +parametrosRuta.idEstudiante,
                    data: estudianteEditar,
                });
                response.redirect(
                    '/estudiante/vista-crear' +
                    '?mensaje=Se editó el registro: ' +
                    bodyParams.nombre,
                );
                console.log(parametrosRuta.idEstudiante);
                console.log(bodyParams.idEstudiante);
            }
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e);
        }
    }

    @Get(':idEstudiante')
    obtenerUno(@Param() parametroRuta) {
        return this.estudianteService.buscarUno(+parametroRuta.idEstudiante);
    }

    @Post(':idEstudiante')
    async crearUno(@Body() parametrosCuerpo) {
        const estudianteCrearDTO = new EstudianteCrear();
        estudianteCrearDTO.nombre = parametrosCuerpo.nombre;
        estudianteCrearDTO.apellido = parametrosCuerpo.apellido;
        estudianteCrearDTO.calificacion = parametrosCuerpo.calificacion;
        estudianteCrearDTO.edad = parametrosCuerpo.edad;
        estudianteCrearDTO.anio = parametrosCuerpo.anio;
        estudianteCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const error = await validate(estudianteCrearDTO);
            if (error.length > 0) {
                console.log(JSON.stringify(error));
                throw new BadRequestException('no envia bien parametros');
            } else {
                return this.estudianteService.crearUno(estudianteCrearDTO);
            }
        } catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear estudiante' });
            throw new InternalServerErrorException('error servidor');
        }
    }

    @Put(':idEstudiante')
    actualizarUno(@Param() parametroRuta) {
        //se utiliza los parametros de cuerpo y de ruta
        return this.estudianteService.actualizarUno(parametroRuta.idEstudiante);
    }

    @Delete(':idEstudiante')
    borrarUno(@Param() parametroRuta) {
        //se utiliza los parametros de ruta
        return this.estudianteService.eliminarUno(parametroRuta.idEstudiante);
    }
}
