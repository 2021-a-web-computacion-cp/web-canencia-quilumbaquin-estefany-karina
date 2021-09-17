import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post, Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

// npm i cookie-parser express-session session-file-store

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('suma')
  @HttpCode(200)
  sumar(
      @Query() queryParams,
      @Req() req,
      @Res({passthrough: true}) res,
  ){

    var resultado = Number(queryParams.numeroUno) + Number(queryParams.numeroDos);
    var sinFirmar = req.cookies;
    var valor = sinFirmar["valor"];

    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo,);
      if(valor_nuevo < 0){
        res.cookie('valor', 100,);
        return "Ha ganadao resetearemso el valor de la cookie a 100";
      }else{
        return "El valor de la suma es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor',100,);
      res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo'); // return de antes
    }

    /* return{
       resultado: resultado,
       cookie: sinFirmar,
       operacion: valor_nuevo,
     }*/

  }

  @Post('resta')
  @HttpCode(201)
  @Header('Result','Value')
  restar(
      @Body() bodyParams,
      @Headers() headers,
      @Req() req,
      @Res({passthrough: true}) res,
  ){
    var resultado = Number(bodyParams.numeroUno) - Number(bodyParams.numeroDos);
    res.header("Valor",resultado);
    var sinFirmar = req.cookies;
    var valor = sinFirmar["valor"];
    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo,);
      if(valor_nuevo < 0){
        res.cookie('valor', 100,);
        return "Ha ganadao resetearemso el valor de la cookie a 100";
      }else{
        return "El valor de la suma es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor',100,);
      res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo'); // return de antes
    }
    /* return {
       parametrosCuerpo: bodyParams,
       cabeceras: headers,
       resultado:resultado

     };*/
  }

  @Put('multiplicar/:numeroUno/:numeroDos')
  @HttpCode(200)
  multiplicar(
      @Param() params,
      @Req() req,
      @Res({passthrough: true}) res,
  ) {
    var resultado = Number(params.numeroUno) * Number(params.numeroDos);
    var sinFirmar = req.cookies;
    var valor = sinFirmar["valor"];
    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo,);
      if(valor_nuevo < 0){
        res.cookie('valor', 100,);
        return "Ha ganadao resetearemso el valor de la cookie a 100";
      }else{
        return "El valor de la suma es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor',100,);
      res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo'); // return de antes
    }

    /*return{
      resultado: resultado,
      cookie: sinFirmar,
      operacion: valor_nuevo,
    }*/
  }


  @Get('dividir')
  @HttpCode(201)
  dividir(
      @Headers() headers,
      @Req() req,
      @Res({passthrough: true}) res,
  ){
    var resultado = Number(headers.numerouno) / Number(headers.numerodos);
    var sinFirmar = req.cookies;
    var valor = sinFirmar["valor"];
    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo,);
      if(valor_nuevo < 0){
        res.cookie('valor', 100,);
        return "Ha ganadao resetearemso el valor de la cookie a 100";
      }else{
        return "El valor de la suma es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor',100,);
      res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo'); // return de antes
    }
    /* return {
       cabeceras: headers,
       resultado: resultado,
     };*/
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
        'galletaSeguraYFirmada', // nombre
        'Web :3', // valor
        {
          secure: true, // solo se transfiera por canales confiables https
          signed: true, // Encriptacion
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
    // req.signedCookies.total
    return mensaje;
  }

  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') // Cabeceras de respuesta (response headers)
  @Header('EPN', 'SISTEMAS') // Cabeceras de respuesta (response headers)
  parametrosConsulta(
      @Query() queryParams,
      @Param() params,
  ) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('parametros-cuerpo') // 201
  @HttpCode(200)
  parametrosCuerpo(
      @Body() bodyParams,
      @Headers() cabecerasPeticion,
  ) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
}
