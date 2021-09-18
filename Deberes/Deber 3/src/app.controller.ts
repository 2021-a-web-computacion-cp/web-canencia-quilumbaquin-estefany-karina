import { Controller, Get, Post, Put, HttpCode, Query, Param, Res, Req, Header, Headers, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello() {
    return "Hello World"
  }

  // REALIZAR SUMA
  @Get('sumar')
  @HttpCode(200)
  suma(
    @Query() values,
    @Req() request,
    @Res({passthrough: true}) response,
  ): string {
    let parametersResult = Number(values.first_value) + Number(values.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let resultadoCookie = actualValue - parametersResult;
      if (resultadoCookie<=0) {
        response.cookie(
          'total',
          100,
          {
            signed: true
          }
        )
        return "Terminaste el juego"
      } else {
        response.cookie(
          'total',
          resultadoCookie,
          {
            signed: true
          }
        )
        return "Nuevo valor: "+resultadoCookie;
      }
    } else {
      response.cookie(
        'total',
        100,
        {
          signed: true
        }
      )
      response.send('la Cookie ha sido seteada por primera vez')
    }
  }


  // REALIZAR RESTA
  @Post('restar')
  @HttpCode(201)
  @Header('RESULTADO','VALUE')
  resta(
    @Body() values,
    @Req() request,
    @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(values.first_value) - Number(values.second_value);
    response.header['RESULTADO']=parametersResult.toString()
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let resultadoCookie = actualValue - parametersResult;
      if (resultadoCookie<=0) {
        response.cookie(
          'total',
          100,
          {
            signed: true,
          }
        )
        return "Terminaste el juego";
      } else {
        response.cookie(
          'total',
          resultadoCookie,
          {
            signed: true,
          }
        )
        return "Nuevo valor: "+resultadoCookie;
      }
    } else {
      response.cookie(
        'total',
        100,
        {
          signed: true,
        }
      )
      response.send('Cookie seteada por primera vez')
    }
  }

  // REALIZAR MULTIPLICACIÓN
  @Put('multiplicar/:valor1/:valor2')
  @HttpCode(200)
  multiplicacion(
    @Param() values,
    @Req() request,
    @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(values.valor1) * Number(values.valor2);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let resultadoCookie = actualValue - parametersResult;
      if (resultadoCookie<=0) {
        response.cookie(
          'total',
          100,
          {
            signed: true,
          }
        )
        return "Terminaste el juego";
      } else {
        response.cookie(
          'total',
          resultadoCookie,
          {
            signed: true,
          }
        )
        return "El nuevo valor es: "+resultadoCookie;
      }
    } else {
      response.cookie(
        'total',
        100,
        {
          signed: true,
        }
      )
      response.send('Cookie seteada por primera vez')
    }
  }

  // REALIZAR DIVISION
  @Get('dividir')
  @HttpCode(201)
  division(
    @Headers() headers,
    @Req() request,
    @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(headers.first_value) / Number(headers.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let ResutadoCookie = actualValue - parametersResult;
      if (ResutadoCookie<=0) {
        response.cookie(
          'total',
          100,
          {
            signed: true,
          }
        )
        return "Terminaste el juego";
      } else {
        response.cookie(
          'total',
          ResutadoCookie,
          {
            signed: true,
          }
        )
        return "El nuevo valor es: "+ResutadoCookie;
      }
    } else {
      response.cookie(
        'total',
        100,
        {
          signed: true,
        }
      )
      response.send('Cookie seteada por primera vez')
    }
  }

}
