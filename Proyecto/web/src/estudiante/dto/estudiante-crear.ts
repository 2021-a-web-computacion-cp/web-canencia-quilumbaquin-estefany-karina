import {
    IsEmpty,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    IsDecimal,
    IsInt,
} from 'class-validator';

export class EstudianteCrear {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    apellido: string;

    @IsNotEmpty()
    @IsDecimal()
    calificacion: number;

    @IsNotEmpty()
    @IsInt()
    edad: number;

    @IsNotEmpty()
    @IsInt()
    anio: number;

    @IsEmpty()
    fechaCreacion: string;
}
