import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CursorBasedConnectionsPagination,
  cursorDecoder,
  cursorEncoder,
  PrismaService,
} from '@shared';

import { CursorInput } from './dto/cursor.input';

@Injectable()
export class AlertTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * @description
   * The edge closest to the cursor must come first.
   */
  async findManyWithForwardPagination(
    where: Prisma.AlertWhereInput,
    pagination: CursorBasedConnectionsPagination,
  ) {
    const { first = 10 } = pagination;
    const decodedCursor = !pagination.after
      ? undefined
      : await cursorDecoder(pagination.after, CursorInput);
    const alerts = await this.prismaService.alert.findMany({
      where,
      take: first + 1, // Fetch one more to determine if there's a next page
      cursor: decodedCursor,
      ...(decodedCursor && { skip: 1 }), // Skip the cursor
      orderBy: [{ createdAt: 'asc' }],
    });
    // if "after" exists, we have a previous page
    const hasPreviousPage = !!pagination.after;
    const hasNextPage = alerts.length > first;

    if (hasNextPage) {
      alerts.pop();
    }

    return { alerts, hasNextPage, hasPreviousPage };
  }

  /**
   * @description
   * The edge closest to the cursor must come last.
   */
  async findManyWithBackwardPagination(
    where: Prisma.AlertWhereInput,
    pagination: CursorBasedConnectionsPagination,
  ) {
    const decodedCursor = !pagination.before
      ? undefined
      : await cursorDecoder(pagination.before, CursorInput);
    const alerts = await this.prismaService.alert.findMany({
      where,
      take: (pagination.last + 1) * -1, // Fetch one more to determine if there's a "previous page"
      cursor: decodedCursor,
      ...(decodedCursor && { skip: 1 }), // Skip the cursor
      orderBy: [{ createdAt: 'asc' }],
    });
    // if "before" exists, we have a "next page"
    const hasNextPage = !!pagination.before;
    const hasPreviousPage = alerts.length > pagination.last;

    if (hasPreviousPage) {
      alerts.shift();
    }

    return { alerts, hasNextPage, hasPreviousPage };
  }

  async findManyWithForwardAndBackwardPagination(
    where: Prisma.AlertWhereInput,
    pagination: CursorBasedConnectionsPagination,
  ) {
    const { first = 10 } = pagination;
    const decodedAfterCursor = await cursorDecoder(
      pagination.after,
      CursorInput,
    );
    const decodedBeforeCursor = await cursorDecoder(
      pagination.before,
      CursorInput,
    );
    const alerts = await this.prismaService.alert.findMany({
      where: {
        AND: [
          { ...where },
          {
            id: {
              gt: decodedAfterCursor.id,
              lt: decodedBeforeCursor.id,
            },
          },
        ],
      },
      take: first + 1, // Fetch one more to determine if there's a "previous page"
      orderBy: [{ createdAt: 'asc' }],
    });
    const hasNextPage =
      alerts.length === 0
        ? false
        : Boolean(
            await this.prismaService.alert.findFirst({
              where,
              cursor: {
                id: alerts[alerts.length - 1].id,
              },
              skip: 1, // skip the cursor
              orderBy: [{ createdAt: 'asc' }],
            }),
          );
    const hasPreviousPage =
      alerts.length === 0
        ? false
        : Boolean(
            await this.prismaService.alert.findFirst({
              where,
              cursor: {
                id: alerts[0].id,
              },
              skip: 1, // skip the cursor
              orderBy: [{ createdAt: 'asc' }],
            }),
          );

    return { alerts, hasNextPage, hasPreviousPage };
  }

  async findStartAndEndCursor(where: Prisma.AlertWhereInput) {
    const startAlert = await this.prismaService.alert.findFirst({
      where,
      take: 1,
      skip: 1, // Skip the cursor
      orderBy: [{ createdAt: 'asc' }],
    });
    const endAlert = await this.prismaService.alert.findFirst({
      where,
      take: 1,
      skip: 1, // Skip the cursor
      orderBy: [{ createdAt: 'desc' }],
    });
    const endCursor = !endAlert
      ? undefined
      : await cursorEncoder(
          {
            id: endAlert.id,
          },
          CursorInput,
        );
    const startCursor = !startAlert
      ? undefined
      : await cursorEncoder(
          {
            id: startAlert.id,
          },
          CursorInput,
        );

    return {
      endCursor,
      startCursor,
    };
  }
}
