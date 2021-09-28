import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  app.set('view engine', 'ejs');
  app.use(express.static('publico')); //servidor web estático
  app.use(cookieParser('cookie secreta')); //secreto cookies
  app.use(
    //session
    session({
      name: 'server-session-id',
      secret: 'Yaff ponte ponte',
      resave: true,
      saveUnitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );

  await app.listen(3000); //puerto
}
bootstrap();

/*
// package.json ;
// npm run start -> levantar servidor ;
// node js command prompt

//CLASES
abstract class Nombre {
  public nombrePropiedad?: string; //undefined
  private apellidoPropiedad = 'Taco';
  protected edad = 1; //number Duck Typing
  static comun = 10;
  propiedadPublica: string;
  constructor(
    propiedadPublicaParametro: string,
    public propiedadRapido: string,
  ) {
    this.propiedadPublica = propiedadPublicaParametro; //parametro
    this.propiedadRapido; // transformo una propiedad
  }
  public funcionPublica(
    parametroString: string, //? = puede ser undefined
    parametroNumber?: number,
  ) {
    // omitir :void por defecto
    //no hay return = undefined
  }
  private funcionPrivada(
    parametroString: string, //puede ser undefinde
    parametroNumber: number,
  ) {
    //no hay return
  }
  protected funcionPublica2(): number {
    return 1;
  }
  static funcionEstatica(): string {
    return 'string';
  }
}

// VARIABLES PRIMITIVAS
// TIPOS DE VARIABLES
// MUTABLES (reasignar -> =)
let variable1 = 1; // NO USAMOS VAR
let variable2 = 2;
variable1 = 3;
variable2 = 4;
// INNMUTABLES (no se pueden reasignar Z -> !=)
const var3 = 5;
// var3 = 2; //ERROR!

//PRIMITIVAS PRIMITIVAS (typescript)

const texto = ''; // ""
const numEntero = 1;
const numFlotante = 1.3;
const soyestudiante = true; // false
const noDefinido = undefined;
const noHayNada = null; // no se lo suele utilizar mucho
const fecha: Date = new Date();
// Duck Typing
const text2 = 'César';
let cualquierCosa: any = 'Paolo';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

class Usuario {
  constructor(public nombre: string, public apellido: string) {}
}

const usuario: Usuario = new Usuario('Cesar', 'Taco');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface {
  nombre: string;
  apellido: string;
  edad?: number; // ? -> opcional // valor por defecto ((undefined))
}

const objetoUsuario: UsuarioInterface = { nombre: 'Cesar', apellido: 'Taco' };
objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;
console.log(usuario);
console.log(objetoUsuario);

// PUNTEROS REFERENCIAS
// PRIMITIVAS

let edadAntigua = 22;
let otraEdad = edadAntigua; //VALOR
edadAntigua += 1; //23
otraEdad += 1; //21

//OBJETO
const objetoEdad = {
  edad: 22,
};

const otraEdadObjeto = objetoEdad; // REFERENCIA
otraEdadObjeto.edad = otraEdadObjeto.edad + 1; //23
console.log(otraEdadObjeto.edad);
objetoEdad.edad; //23
console.log(otraEdadObjeto.edad + 1); //24
otraEdadObjeto.edad; //24
const otraEdadObejtoClonado = { ...objetoEdad }; //CLONACION DE OBJETOS

//ARREGLOS
const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1, 2, 3, 4, 5];

// eslint-disable-next-line @typescript-eslint/no-empty-function
function funcionConNombre() {}

const indice = arregloNumeros.findIndex((numero) => {
  // FUNCION ANONIMA POR QUE NO TIENE NOMBRE
  const elValorEsIgualATres: boolean = numero === 3;
  return elValorEsIgualATres; // CONDICION BOOLEANA
});

arregloNumeros[indice] = 6;
//agregar al final
arregloNumeros.push(6);
//agregar al principio
arregloNumeros.unshift(0);

// CONDICIONES (TRUTY Y FALSY)
const numero = 0;
if (numero) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (-1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
//STRINGS
if ('') {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ('a') {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ({}) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ({ a: 1 }) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
//ARREGLOS
if ([]) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ([1]) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (null) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (undefined) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
*/
