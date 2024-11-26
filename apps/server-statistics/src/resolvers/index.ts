import {
  GigabyteConvertor,
  KilobyteConvertor,
  MegabyteConvertor,
  MemoryUnitConvertor,
} from '@shared';
import { withFilter } from 'graphql-subscriptions';
import {
  HTop,
  HTopMemoryArgs,
  Resolvers,
  Unit,
} from '../../__generated__/resolvers-types';
import { getRedisPubSub } from '../services/pubsub.service';

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
        (...args) => {
          console.dir(args, { depth: null }); // Logs a crazy long string but at the very bottom I can see my whole query in string format and I can see clearly that GB is inside it but why GraphQL is not parsing it as an arg?
          return redisPubSub.asyncIterator('htop');
        },
        (payload: { htop: HTop }, args: HTopMemoryArgs) => {
          const convertor: MemoryUnitConvertor | undefined =
            unitToConvertorMap[args.unit];

          console.log(args); // logs {}

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