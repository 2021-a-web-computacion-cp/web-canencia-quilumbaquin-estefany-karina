import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post, Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { validate } from 'class-validator';

// http://localhost:3000/usuario/......
@Controller( 'usuario')
export class UsuarioController{

  constructor(
      //inyeccion de dependencias
      private usuarioservice: UsuarioService
  ) {}

  @Get('lista-usuarios')
  listaUsuarios(@Res() responses){
    responses.render('inicio');
  }

  @Get(':idUsuario')
  obtenerUno(@Param() parametroRuta) {
    return this.usuarioservice.buscarUno(+parametroRuta.idUsuario);
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo){
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = parametrosCuerpo.nombre;
    usuarioCrearDto.apellido = parametrosCuerpo.apellido;
    usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;

    try{
      const errores = await validate(usuarioCrearDto);

      if(errores.length > 0){
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien los parametross');
      }
      else{
        return this.usuarioservice.crearUno(usuarioCrearDto);
      }

    }catch (error){
      console.error({error: error, mensaje: 'Errores en crear usuario'});
      throw new InternalServerErrorException('error de servidor');
    }
  }
}
