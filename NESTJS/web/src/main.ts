import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { copyFileSync } from "fs";
const cookieParser = require('cookie-parser'); // Importar cosas en JS
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
//iMportar cosas en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); // Servidor Web Estatico
  app.use(cookieParser('Me agradan los poliperros')); // Secreto Cookies
  app.use(// Session
    session({
      name: 'server-session-id',
      secret: 'No sera de tomar un traguito',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );
  await app.listen(3000);
}
bootstrap();
/*
//tipos de variables
//MUTABLES ->reasignar -> =
var variableUno = 1; //NO USAMOS VAR !
let variableDos = 2;

variableUno=3;
variableDos = 4;

//INMUTABLES (No se pueden reasignar X-> !=)
const variableTres = 5;
//variableTres = 2; ERROR!


//PRIMITIVAS PRIMITIVAS
const texto: string = ''; //"" ´´
const numeroEntero: number = 1;
const numeroFlotante: number = 1.2;
const soyEstudinte: boolean = true;
const noDefinido: undefined;
const noHayNada: null;
const fecha: Date = new Date();

//Duck Typing
const textoDos = 'Kari';
let cualquierCosa: any = 'Estefany';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

class Usuario{
    contructor(
      public nombre: string,
    public apellido: string
){

}
}

const usuario: Usuario = new Usuario('kari', 'Canencia');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface{
    nombre: string;
    apellido: string;
    edad?: number; //? => Opcional // valor por defecto undefined
}

//PUNTEROS REFERENCIAS
//PRIMITIVAS
let edadAntigua = 22;
let otraEdad = edadAntigua;
otraEdad -= 1;

//Objeto
let objetoEdad = {
    edad: 22;
};

let otraEdadObjeto = objetoEdad; //REFERENCIA
otraEdadObjeto.edad = otraEdad.edad+1; //23
console.log(otraEdadObjeto.edad);
objetoEdad.edad; // 23
console.log(otraEdadObjeto.edad);
objetoEdad.edad=objetoEdad.edad+1;
otraEdadObjeto.edad; //24

//ARREGLOS
let otraEdadObjetoClonado = {...objetoEdad}; //Clonación Objetos
const  arregloEjemplo = [1,2,3]
let arregloClonado = [...arregloEjemplo];//Clonacion Arreglos


// ARREGLOS
const  arregloTodo = [1,'',true,null,new Date()];
const arregloNumeros: number[] = [1,2,3,4,5];

function funcionConNombre(){

}

const indice = arregloNumeros
  .findIndex(
    (numero) => { //Funcion anonima xq no tiene nombre
        const elValorIgualAtres: boolean = numero === 3; //
        return elValorIgualAtres //Condicion -> boolean
    },
    //function () {-> fucnion anonima por q no tiene nombre
    //
    //}
  );

arregloNumeros[indice] = 6
//agregar al final
arregloNumeros.push(6)
//agragar al principio
arregloNumeros.unshift(0)


//CONDICIONALES truty y falsy
const numeroOrden = 0;
if (numeroOrden){
    console.log('Truty');
}else {
    console.log('Falsy');
}

//string
if (""){
    console.log('Truty');
}else{
    console.log('Falsy');
}
if ("a"){
    console.log('Truty');
}else{
    console.log('Falsy');
}

//OBJETOS
if ({}){
    console.log('Truty');
}else{
    console.log('Falsy');
}

if ({a:1}){
    console.log('Truty');
}else{
    console.log('Falsy');
}

//Arreglos
if ([1]){
    console.log('Truty');
}else{
    console.log('Falsy');
}

//null
if (null){
    console.log('Truty');
}else{
    console.log('Falsy');
}

//no definido
if (undefined){
    console.log('Truty');
}else{
    console.log('Falsy');
}*/
/*
abstract class Nombre {
  public nombrePropiedad?: string; //undefined
  private apellidoPropiedad: string = 'Canencia';
  protected edad = 1; // number (Duck Typing)
  static comun: number = 10;
  propiedadPublica: string;
  constructor(
    propiedadPublicaParametros: string, //parametro
    public propiedadedadRapido: string, //transformar la propiedad
  ) {
    this.propiedadedadRapido = propiedadPublicaParametros;
    this.propiedadedadRapido;
  }
}*/
