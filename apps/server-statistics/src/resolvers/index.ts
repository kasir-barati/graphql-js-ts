import {
  GigabyteConvertor,
  KilobyteConvertor,
  MegabyteConvertor,
  MemoryUnitConvertor,
} from '@shared';
import { GraphQLResolveInfo } from 'graphql';
import { withFilter } from 'graphql-subscriptions';
import {
  HTop,
  Resolvers,
  Unit,
} from '../__generated__/resolvers-types.js';
import { getRedisPubSub } from '../services/pubsub.service.js';

const redisPubSub = getRedisPubSub();
const unitToConvertorMap: Record<Unit, MemoryUnitConvertor> = {
  [Unit.Gb]: new GigabyteConvertor(),
  [Unit.Mb]: new MegabyteConvertor(),
  [Unit.Kb]: new KilobyteConvertor(),
};

export const resolvers: Resolvers = {
  // Each field inside this MUST return an subscribe function!
  Subscription: {
    top: {
      // Each subscribe method MUST return an AsyncIterator object.
      subscribe(_parent, _args, _context, _info) {
        // An AsyncIterator object listens for events that are associated with a particular label/s and adds them to a queue for processing. Here we're creating an AsyncIterator by calling the asyncIterator method + names of the event labels that this AsyncIterator is interested in.
        // Apollo Server uses the payloads of events to push updated values for the top field.
        // Your payload MUST look like: { top: { cpu: 12.123 } }
        // This is exactly how we encoded the response for this Subscription field in our schema.
        return redisPubSub.asyncIterator([
          'server-statistics-changed',
        ]) as any;
      },
    },
    htop: {
      subscribe: withFilter(
        () => redisPubSub.asyncIterator('htop'),
        (
          payload: { htop: HTop },
          _args,
          _context,
          info: GraphQLResolveInfo,
        ) => {
          const unit = info.variableValues.unit as Unit;
          const convertor: MemoryUnitConvertor | undefined =
            unitToConvertorMap[unit];

          if (convertor) {
            payload.htop.memory = convertor.convert(
              payload.htop.memory,
            );
          }

          return true;
        },
      ),
    },
    greet: {
      subscribe: async function* () {
        for await (const word of [
          'سلام',
          'Hi',
          'Hallo',
          'Grüß Gott',
          'Moin',
          'Ciao',
          'こにちは',
        ]) {
          yield { greet: word };
        }
      },
    },
  },
};
