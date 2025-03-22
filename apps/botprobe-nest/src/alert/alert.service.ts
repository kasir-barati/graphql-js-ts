import { Injectable } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { PrismaService } from '@shared';
import { GraphQLResolveInfo } from 'graphql';

import { AlertCreateManyInput } from '../@generated/alert/alert-create-many.input';
import { AlertWhereInput } from '../@generated/alert/alert-where.input';

@Injectable()
export class AlertService {
  constructor(private readonly prismaService: PrismaService) {}

  search(where: AlertWhereInput, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;

    console.log('select');
    console.group();
    console.dir(select, { depth: null });
    console.groupEnd();

    return this.prismaService.alert.findMany({
      where,
      ...select,
    });
  }

  create(alert: AlertCreateManyInput, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;

    return this.prismaService.alert.create({
      data: alert,
      ...select,
    });
  }
}
