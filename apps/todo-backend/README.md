# Todo -- backend

1. `nx g @nx/node:application apps/todo-backend --framework express`.
2. `pnpm add graphql-http`.
3. `touch apps/todo-backend/src/global.d.ts` and then copy and paste what is written in [this Stackoverflow answer](https://stackoverflow.com/a/76096021/8784518). I wrote [a post about declaration modules](https://dev.to/kasir-barati/module-declaration-in-ts-49b2).
4. The I started with writing my API's schema in [`schema.graphql`](./src/schema.graphql).
5. Then I moved to define their [resolver](./src/resolvers/) bodies.
6. Initialize Prisma + PostgreSQL:

   1. `nx add @nx-tools/nx-prisma`.
   2. `nx g @nx-tools/nx-prisma:configuration --project todo-backend --database postgresql`.

      [Learn more about `@nx-tools/nx-prisma`](https://www.npmjs.com/package/@nx-tools/nx-prisma).

   3. Define my tables and used [docker compose to have a postgres instance](https://github.com/kasir-barati/docker/blob/main/docker-compose-files/postgres/postgres-pgadmin/compose.yml).
   4. Prepared service layer, and repository layer + seeding some data.
   5. Add docker compose related scripts in `apps/todo-backend/project.json`.
   6. Ran `nx prisma-migrate todo-backend --name init` to generate the migration files.
   7. Wrote E2E tests.
   8. Implement queries.
