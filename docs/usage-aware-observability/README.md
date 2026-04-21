# Usage-aware Observability

When designing a GraphQL API it is a common need to know:

<details><summary>If a query/mutation is still in use.</summary>

Signal: emit low‑cardinality metrics such as **Operation name**, **operation type**, and **status**.

- This way OTel won't be a beast, devouring resources.
- Do NOT use things like full query text, argument values.
  - But then we **cannot** know when a deprecated API ain't used anymore.
  - Maybe I should emit when a separate metrics solly for the deprecated field resolvers? A separate signal?

</details>

> [!TIP]
>
> For detecting sequences (mutations/queries) justifiable to have their bulk version we need to have: traces or sessionized logs grouped by client\* and short time windows to find frequent call n‑grams.
>
> \*IDK their user ID in their JWT token, IP address, or something similar to that

<details><summary>Do I need GraphQL Hive or can we use plain OTel?</summary>

tl;dr **YES**, but you might end up having to do some stuff which is builtin in GraphQL Hive.

<table>
  <thead>
    <tr>
      <th>What OpenTelemetry Gives You</th>
      <th>What GraphQL Hive Adds (GraphQL-Specific)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        ✅ <strong>Operation-level metrics:</strong>
        <ul>
          <li>Latency.</li>
          <li>Error rates.</li>
          <li>Status codes.</li>
          <li>Request count per GraphQL operation.</li>
        </ul>
      </td>
      <td>
        ✅ <strong>Native GraphQL awareness:</strong>
        <ul>
          <li><strong>Field-level usage tracking</strong> out of the box</li>
          <li><strong>Argument usage tracking</strong> (which args are actually used vs defined)</li>
          <li><strong>Schema registry</strong> with versioning</li>
          <li><strong>Breaking change detection</strong></li>
          <li><strong>Unused operation detection</strong> with nice UI (operations with 0 hits in N days)</li>
          <li><strong>GraphQL-specific analytics dashboard</strong></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        ✅ <strong>Distributed tracing:</strong>
        <ul>
          <li>Full request traces in Jaeger</li>
          <li>Sequence detection (n-grams of API calls)</li>
          <li>Client grouping (with custom attributes)</li>
        </ul>
      </td>
      <td>
        ✅ <strong>Less custom work:</strong>
        <ul>
          <li>Automatic schema reporting</li>
          <li>Built-in GraphQL metrics collection</li>
          <li>Purpose-built UI for GraphQL APIs</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        ✅ <strong>Custom metrics:</strong>
        <ul>
          <li>You can instrument to track specific fields/arguments</li>
          <li>Export to Prometheus + Grafana for visualization</li>
        </ul>
      </td>
      <td></td>
    </tr>
  </tbody>
</table>
