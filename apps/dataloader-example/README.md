# Reproduce

1. ```shell
   pnpm i --frozen-lockfile
   ```
2. ```shell
   nx seed dataloader-example
   ```
3. ```shell
   nx serve dataloader-example
   ```
4. Open GraphQL IDE in your browser.
5. ```graphql
   query {
     getPosts {
       id
       author {
         posts {
           id
         }
       }
     }
   }
   ```
6. Error message:
   ```json
   {
     "errors": [
       {
         "locations": [
           {
             "line": 5,
             "column": 7
           }
         ],
         "path": ["getPosts", 0, "author", "posts"],
         "extensions": {
           "code": "INTERNAL_SERVER_ERROR",
           "stacktrace": [
             "TypeError: DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys.",
             "",
             "Keys:",
             "cd952d75-55de-4f85-b021-d2b9c5b91911",
             "",
             "Values:",
             "    at /home/kasir/projects/graphql-js-ts/node_modules/.pnpm/dataloader@2.2.3/node_modules/dataloader/index.js:306:13",
             "    at processTicksAndRejections (node:internal/process/task_queues:105:5)"
           ]
         }
       }
     ],
     "data": null
   }
   ```