import { Controller, Get, Post, Put, HttpCode, Query, Param, Res, Req, Header, Headers, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello() {
    return "Hello World"
  }

  // SUMA
  @Get('suma')
  @HttpCode(200)
  suma(
    @Query() values,
    @Req() request,
    @Res({passthrough: true}) response,
  ): string {
    let parametersResult = Number(values.first_value) + Number(values.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
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
          newValue,
          {
            signed: true
          }
        )
        return "El nuevo valor es: "+newValue;
      }
    } else {
      response.cookie(
        'total',
        100,
        {
          signed: true
        }
      )
      response.send('Cookie seteada por primera vez')
    }
  }


  // RESTA
  @Post('resta')
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
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
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
          newValue,
          {
            signed: true,
          }
        )
        return "El nuevo valor es: "+newValue;
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

  // Multiplicacion
  @Put('multiplicacion/:first_value/:second_value')
  @HttpCode(200)
  multiplicacion(
    @Param() values,
    @Req() request,
    @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(values.first_value) * Number(values.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
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
          newValue,
          {
            signed: true,
          }
        )
        return "El nuevo valor es: "+newValue;
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

  // DIVISION
  @Get('division')
  @HttpCode(201)
  division(
    @Headers() headers,
    @Req() request,
    @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(headers.first_value) / Number(headers.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
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
          newValue,
          {
            signed: true,
          }
        )
        return "El nuevo valor es: "+newValue;
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
