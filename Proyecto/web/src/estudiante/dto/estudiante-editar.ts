import {
    IsEmpty,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    IsDecimal,
    IsInt,
} from 'class-validator';

export class estudianteEditarDto {
    nombre: string;

    apellido: string;

    calificacion: number;

    edad: number;

    anio: number;

}
