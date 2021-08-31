import { Controller, Get, HttpCode } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('texto')
  @HttpCode(201)
  getTexto(): string {
    return 'Hola Texto';
  }
  @Get('html')
  @HttpCode(200)
  getHtml(): string {
    return '<h1>Hola HTML</h1><button>Click</button>';
  }
  @Get('json')
  @HttpCode(200)
  getJSON(): string {
    return '{mensaje: "hola json"}';
  }
}
