import type { Resolvers } from '../../__generated__/resolvers-types';
import { getRedisPubSub } from '../services/pubsub.service';

const redisPubSub = getRedisPubSub();

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
