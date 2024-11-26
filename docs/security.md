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
> - [Learn how to implement it in AWS, ExpressJS, and with GitHub self-hosted runners here](https://github.com/kasir-barati/cloud/blob/main/deploying-exercises/expressjs-cors/github-pipeline.md).
