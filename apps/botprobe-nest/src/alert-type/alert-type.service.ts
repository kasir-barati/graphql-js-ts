import { Injectable } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { PrismaService } from '@shared';
import { GraphQLResolveInfo } from 'graphql';
import { AlertTypeWhereInput } from '../@generated/alert-type/alert-type-where.input';

@Injectable()
export class AlertTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  alertTypes(where: AlertTypeWhereInput, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;

    console.log('select');
    console.group();
    console.dir(select, { depth: null });
    console.groupEnd();

    return this.prismaService.alertType.findMany({
      where,
      ...select,
    });
  }
}
