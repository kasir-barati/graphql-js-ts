import { InternalServerErrorException } from '@nestjs/common';
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Void')
export class VoidScalar implements CustomScalar<number, number> {
  description = `Represents no return value for mutations.`;

  parseValue(): number {
    return 0;
  }

  serialize(): number {
    return 0;
  }

  parseLiteral(ast: ValueNode): number {
    if (ast.kind === Kind.INT) {
      return 0;
    }

    throw new InternalServerErrorException(
      `cannot parse node type ${ast.kind}`,
    );
  }
}
