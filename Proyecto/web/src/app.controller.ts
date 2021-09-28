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
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // -------------------------------------------------------------------------------------
  // INICIO DEBER 03 CALCULADORA COOKIES
  @Get('suma') // QUERY PARAMS
  @HttpCode(200)
  Suma(
    @Query() queryParams,
    @Res({ passthrough: true }) result,
    @Req() request,
  ) {
    if (request.signedCookies['total'] == undefined) {
      result.cookie('total', 100, {
        signed: true,
      });
      result.sendStatus(200);
      return 100;
    } else {
      if (request.signedCookies['total'] <= 0) {
        result.cookie('total', 100, {
          signed: true,
        });
        return 'TERMINASTE EL JUEGO';
      } else {
        const number =
          Number(request.signedCookies['total']) -
          Number(queryParams.uno) -
          Number(queryParams.dos);

        result.cookie('total', number, {
          signed: true,
        });

        return number;
      }
    }
  }

  @Post('resta') //BODY PARAMS
  @HttpCode(201)
  Resta(
    @Body() bodyParams,
    @Res({ passthrough: true }) result,
    @Req() request,
    @Headers() header,
  ) {
    if (request.signedCookies['total'] == undefined) {
      result.cookie('total', 100, {
        signed: true,
      });
      result.header('result', '100');
      return 100;
    } else {
      if (request.signedCookies['total'] <= 0) {
        result.cookie('total', 100, {
          signed: true,
        });
        result.header('resultado', '100');

        return 'TERMINASTE EL JUEGO';
      } else {
        const number =
          Number(request.signedCookies['total']) -
          (Number(bodyParams.uno) - Number(bodyParams.dos));
        result.cookie('total', number, {
          signed: true,
        });
        result.header('result', number.toString());
        return number;
      }
    }
  }

  @Put('multiplicacion/:uno/:dos') //ROUTE PARAMS
  @HttpCode(201)
  Multiplicacion(
    @Param() routeParams,
    @Res({ passthrough: true }) result,
    @Req() request,
  ) {
    if (request.signedCookies['total'] == undefined) {
      result.cookie('total', 100, {
        signed: true,
      });
      return 100;
    } else {
      if (request.signedCookies['total'] <= 0) {
        result.cookie('total', 100, {
          signed: true,
        });

        return 'TERMINASTE EL JUEGO';
      } else {
        const numero =
          Number(request.signedCookies['total']) -
          Number(routeParams.uno) * Number(routeParams.dos);
        result.cookie('total', numero, {
          signed: true,
        });
        return numero;
      }
    }
  }

  @Put('division/:uno/:dos') //HEADERS
  @HttpCode(201)
  Division(
    @Param() params,
    @Res({ passthrough: true }) result,
    @Req() request,
  ) {
    if (request.signedCookies['total'] == undefined) {
      result.cookie('total', 100, {
        signed: true,
      });
      return 100;
    } else {
      if (request.signedCookies['total'] <= 0) {
        result.cookie('total', 100, {
          signed: true,
        });

        return 'TERMINASTE EL JUEGO';
      } else {
        const number =
          Number(request.signedCookies['total']) -
          Number(params.uno) / Number(params.dos);
        result.cookie('total', number, {
          signed: true,
        });
        return number;
      }
    }
  }
  // FIN DEBER 03 CALCULADORA COOKIES
  // -------------------------------------------------------------------------------------
  @Get() //IMPLICITO HACIA LA RAIZ
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
  @HttpCode(200)
  helloText(): string {
    return 'Hola Texto';
  }
  @Get('html')
  @HttpCode(201)
  HelloHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }
  @Get('json')
  @HttpCode(200)
  helloJson(): string {
    return '{mensaje: "Hola JSON"}';
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
    @Req() req, //request - PETICION
    @Res() res, //response - RESPUESTA
  ) {
    //nombre            valor
    res.cookie('cookieInsegura', 'esto esta inseguro');
    res.cookie('cookieSegura', 'esto esta seguro :)', { secure: true });
    res.send('ok');
  }
  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje;
  }
}
