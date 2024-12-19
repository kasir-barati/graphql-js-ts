import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private graphqlSchemaHost: GraphQLSchemaHost) {}

  /**
   * @description
   * - A hook called in parallel rather than in series.
   * - This event fires whenever Apollo Server begins fulfilling a GraphQL request.
   *
   * @link https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference#requestdidstart
   */
  async requestDidStart(): Promise<
    GraphQLRequestListener<BaseContext>
  > {
    // What is this?
    const maxComplexity = 20;
    const { schema } = this.graphqlSchemaHost;

    return {
      async didResolveOperation({ request, document }) {
        /**
         * @description
         * `getComplexity` calculate the complexity outside of the validation phase and we're storing it in this variable.
         */
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            // the last estimator in your chain to define a default value.
            simpleEstimator({ defaultComplexity: 0 }),
          ],
        });

        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }

        console.log('Query Complexity:', complexity);
      },
    };
  }
}
