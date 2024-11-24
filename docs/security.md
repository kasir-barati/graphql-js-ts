# Security in a GraphQL service

- Auth: Authentication & authorization.
- Operation safe-listing.
  - Or alternatively:
    - Depth-limiting.
    - Breadth-limiting.
    - Alias limits.
    - Cycle rejection.
    - Cost analysis.
- Execution timeouts.

## Cross Site Request Forgery -- CSRF

- Client must:
  - Send operations via `GET`.
  - Multipart upload requests must include `Apollo-Require-Preflight`.

## Cross-Origin Resource Sharing -- CORS

- An extra layer of protection.
- An HTTP-header-based protocol that enables a server to dictate:
  - Which [origin](./glossary.md#originInCorsAttackDefinition)s can access its resources.
  - Which types of HTTP requests are allowed.
- <a href="#sopDefinition" id="sopDefinition">#</a> Same-origin policy (SOP):
  - A security mechanism.
  - Restricts scripts on one origin from interacting with resources from another origin.
- If two URLs differ in their domain, protocol, or port, then those URLs come from two different origins.

> [!TIP]
>
> - CORS is a new protocol to relax [SOP](#sopDefinition) and safely share resources across different origins.
> - Related to browser security: cannot prevent other softwares from making requests for resources on the server. Like [`cURL`](https://man7.org/linux/man-pages/man1/curl.1.html) that can by pass the CORS configurations.

### CORS intricacies

1. Our client needs to be whitelisted.

   In other word tell your server that you want it to allow requests from a specific origin to get through.

   To do this we need to add `Access-Control-Allow-Origin` to our response which also includes the client's origin. It is an array:

   ```shell
   Access-Control-Allow-Origin: https://website-host.domain
   ```

2. For `PUT`/`DELETE`/`PATCH` requests

   1. Client will make a preflight request with:

      - `OPTION` http method.
      - `Access-Control-Request-Method: PUT` in request headers.

        **Note** that the value can be any other HTTP verb.

   2. Server responses, and inside the response header we have:

      `Access-Control-Allow-Method: GET,POST,PUT` header. Note that this list can contain more HTTP verbs.

3. For credentials and passing cookies:
   1. Client will make a preflight request with:
      - `OPTION` http method.
      - And `Access-Control-Allow-Method: PUT` in request header.
        - **Note** that the value can be any other HTTP verb.
        - **IMPORTANT**: We do not have `Access-Control-Allow-Credentials` in the request though.
   2. Your server's response should have a `Access-Control-Allow-Credentials` header.

[Here](https://gist.github.com/kasir-barati/4ecaf458fed2bce299de783448233d18) you can see a very simple implementation of it in ExpressJS.

### Enabling cross-origin cookie passing for authentication
