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
import { UsuarioService } from './usuario.service';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { validate } from 'class-validator';

// hpttp://localhost:3000/usuario/
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() qqueryParams) {
    response.render('usuario/crear', {
      datos: {
        mensaje: qqueryParams.mensaje,
      },
    });
  }

  @Post('crear-usuario-formulario')
  async crearUsuario(@Res() response, @Body() bodyParams) {
    try {
      const userRes = await this.usuarioService.crearUno({
        nombre: bodyParams.nombre,
        apellido: bodyParams.apellido,
      });
      //response.send(userRes); -> ENVIA LA BASE LOS DATOS PERO DEVUELVE JSON
      response.redirect(
        '/usuario/vista-crear' +
          '?mensaje=Se creo el usuario ' +
          bodyParams.nombre,
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get('lista-usuarios')
  async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
    try {
      //Validar parametros de consulta con un DTO (TODO)
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
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Post('eliminar-usuario/:idUsuario')
  async elminarUsuario(@Res() response, @Param() routeParams) {
    try {
      await this.usuarioService.eliminarUno(+routeParams.idUsuario);
      response.redirect(
        '/usuario/lista-usuarios' + '?mensaje=Se elimino el usuario',
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get(':idUsuario')
  obtenerUno(@Param() parametroRuta) {
    return this.usuarioService.buscarUno(+parametroRuta.idUsuario);
  }

  @Post(':idUsuario')
  async crearUno(@Body() parametrosCuerpo) {
    const usuarioCrearDTO = new UsuarioCrearDto();
    usuarioCrearDTO.nombre = parametrosCuerpo.nombre;
    usuarioCrearDTO.apellido = parametrosCuerpo.apellido;
    usuarioCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
    try {
      const error = await validate(usuarioCrearDTO);
      if (error.length > 0) {
        console.log(JSON.stringify(error));
        throw new BadRequestException('no envia bien parametros');
      } else {
        return this.usuarioService.crearUno(usuarioCrearDTO);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear usuario' });
      throw new InternalServerErrorException('error servidor');
    }
  }

  @Put(':idUsuario')
  actualizarUno(@Param() parametroRuta) {
    //se utiliza los parametros de cuerpo y de ruta
    return this.usuarioService.actualizarUno(parametroRuta.idUsuario);
  }

  @Delete(':idUsuario')
  borrarUno(@Param() parametroRuta) {
    //se utiliza los parametros de ruta
    return this.usuarioService.eliminarUno(parametroRuta.idUsuario);
  }
}
