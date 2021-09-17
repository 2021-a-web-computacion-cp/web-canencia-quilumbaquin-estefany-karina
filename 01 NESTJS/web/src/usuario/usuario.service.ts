import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(
    //Inyectar dependecias
    private prisma: PrismaService,
  ) {}

  buscarUno(id: number) {
    return this.prisma.ePN_USUARIO.findUnique({
      where: {
        Id: id,
      },
    });
  }

  crearUno(usuario: Prisma.EPN_USUARIOCreateInput) {
    return this.prisma.ePN_USUARIO.create({
      data: usuario,
    });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.EPN_USUARIOUpdateInput;
  }) {
    return this.prisma.ePN_USUARIO.update({
      data: parametrosActualizar.data,
      where: {
        Id: parametrosActualizar.id,
      },
    });
  }

  eliminarUno(id: number) {
    return this.prisma.ePN_USUARIO.delete({
      where: { Id: id },
    });
  }
}
