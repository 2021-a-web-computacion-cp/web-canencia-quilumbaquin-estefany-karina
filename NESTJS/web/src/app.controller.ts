import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Headers,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // import {Controller, Get, HttpCode} from '@nestjs/common';
  @Get('texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'HOLA TEXTO';
  }
  @Get('html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }
  @Get('json')
  @HttpCode(200)
  holaJSON(): string {
    return '{mensaje: "Hola json" }';
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //  request - PETICION
    @Res() res, //  response - RESPUESTA
  ) {
    res.cookie(
      'galletaInsegura', // nombre
      'Tengo hambre', // valor
    );
    res.cookie(
      'galletaSegura', // nombre
      'Web :3', // valor
      {
        secure: true,
      },
    );
    res.send('ok'); // return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje;
  }

  @Get('/parametros-consulta/nombre/apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') //cabecera de respuestas
  @Header('EPN', 'SISTEMAS')
  parametrosConsulta(@Query() queryParams, @Param() params) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('Parametros-cuerpo') //201
  @HttpCode(200)
  parametrosCuerpo(@Body() bodyParams, @Headers() cabeceraPeticion) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabeceraPeticion,
    };
  }
}
