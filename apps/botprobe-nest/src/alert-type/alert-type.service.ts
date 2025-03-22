import { Injectable, Logger } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import {
  CursorBasedConnectionsPagination,
  cursorDecoder,
  cursorEncoder,
  hasAtLeastOneOfTheseProperties,
  hasExactlyOneProperty,
  PrismaService,
} from '@shared';
import { GraphQLResolveInfo } from 'graphql';

import { AlertTypeCreateManyInput } from '../@generated/alert-type/alert-type-create-many.input';
import { AlertTypeWhereInput } from '../@generated/alert-type/alert-type-where.input';
import { AlertTypeRepository } from './alert-type.repository';
import { AlertEdge } from './dto/alert.edge';
import { AlertsConnection } from './dto/alerts.connection';
import { CursorInput } from './dto/cursor.input';

@Injectable()
export class AlertTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly alertTypeRepository: AlertTypeRepository,
  ) {}

  alertTypes(
    where: AlertTypeWhereInput,
    info: GraphQLResolveInfo,
    pagination: CursorBasedConnectionsPagination,
  ) {
    const select = new PrismaSelect(info).value;
    const decodedCursor = !pagination.after
      ? undefined
      : cursorDecoder(pagination.after, CursorInput);

    console.log('select');
    console.group();
    console.dir(select, { depth: null });
    console.groupEnd();

    return this.prismaService.alertType.findMany({
      where,
      ...select,
      take: pagination.first,
      cursor: decodedCursor,
    });
  }

  async alertsOf(
    alertTypeId: string,
    pagination: CursorBasedConnectionsPagination,
  ): Promise<AlertsConnection> {
    if (pagination.first && pagination.last) {
      Logger.warn({
        message:
          'Client specified both "first" and "last", but our GraphQL service is going to only use the "first"',
        timestamp: Date.now(),
        // TODO: How to incorporate the idea of request ID?
        requestId: '',
      });
    }

    if (hasExactlyOneProperty(pagination, 'after', 'before')) {
      if (pagination.first && !pagination.after) {
        throw 'You need to use first and after arguments at the same time';
      }
      if (pagination.last && !pagination.before) {
        throw 'You need to use first and after arguments at the same time';
      }
    }

    const { alerts, hasNextPage, hasPreviousPage } =
      pagination.after && pagination.before
        ? await this.alertTypeRepository.findManyWithForwardAndBackwardPagination(
            { alertTypeId },
            pagination,
          )
        : hasAtLeastOneOfTheseProperties(pagination, [
              'before',
              'last',
            ])
          ? await this.alertTypeRepository.findManyWithBackwardPagination(
              { alertTypeId },
              pagination,
            )
          : await this.alertTypeRepository.findManyWithForwardPagination(
              { alertTypeId },
              pagination,
            );
    const { startCursor, endCursor } =
      await this.alertTypeRepository.findStartAndEndCursor({
        alertTypeId,
      });
    const edges: AlertEdge[] = [];

    for (const alert of alerts) {
      edges.push({
        cursor: await cursorEncoder(
          {
            id: alert.id,
          },
          CursorInput,
        ),
        node: alert,
      });
    }

    return {
      pageInfo: {
        endCursor,
        startCursor,
        hasNextPage,
        hasPreviousPage,
      },
      edges,
    };
  }

  create(
    alertType: AlertTypeCreateManyInput,
    info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;

    return this.prismaService.alertType.create({
      data: alertType,
      ...select,
    });
  }
}
