import cors from 'cors';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import 'reflect-metadata';
import { ruruHTML } from 'ruru/server';
import { AppDataSource } from './data-source';
import { Post } from './entities/post.entity';
import { RootQuery } from './queries/root.query';

const app = express();

app.use(cors());

(async () => {
  const dataSource = await AppDataSource.initialize();
  const postRepository = dataSource.getRepository(Post);
  const schema = new GraphQLSchema({
    description: 'DoS attack example',
    query: RootQuery,
  });

  app.get('/graphql', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
  });
  app.post(
    '/graphql',
    createHandler({
      schema: schema,
      context(req) {
        return { ...req.raw, postRepository };
      },
      formatError: (e) => {
        console.error(e);
        return e;
      },
    }),
  );
  app.listen(3000);

  return 'server listening at http://localhost:3000/graphql';
})()
  .then(console.log)
  .catch(console.error);
