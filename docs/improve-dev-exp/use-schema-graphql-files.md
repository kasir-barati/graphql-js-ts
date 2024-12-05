# Use a `schema.graphql` file

The very first thing that I wanted so badly from the very beginning was the ability to separate my schema from TS code. So here is how you can do it:

1. I told esbuild to copy my graphql file to the where it should. Note that [my first attempt](https://github.com/luckycatfactory/esbuild-graphql-loader/issues/35#issuecomment-2480544794) was OK, I just did not know one more thing.

   **NOTE**, esbuild might copy your schema to the wrong place, so to prevent a runtime error saying that it cannot not find `schema.graphql` make sure it is copying it to the right place. E.g. in the `server-statistics` app I learned that `Nx` generate a `main.js` and in that file it is importing your `main.ts` (of course the transpiled version which is also called `main.js`). Thus the reason for this in my `project.json`:

   ```json
   {
     "input": "{projectRoot}/src/",
     "glob": "schema.graphql",
     "output": "apps/server-statistics/src"
   }
   ```

2. Then I read it with [`fs.readFileSync`](https://nodejs.org/api/fs.html#fsreadfilesyncpath):
   ```ts
   const schema = readFileSync(join(__dirname, 'schema.graphql'), {
     encoding: 'utf8',
   });
   ```
3. Lastly I passed it as my schema.

You can see a working example here:

https://github.com/kasir-barati/graphql/blob/8dc88c57d2ba98af3a8d6619bdf153e2f912c3a1/apps/server-statistics/src/main.ts#L1-L17
