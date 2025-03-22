import axios from 'axios';

import { AlertTypeBuilder } from '../support/builders/alert-type.builder';
import { AlertBuilder } from '../support/builders/alert.builder';
import {
  AlertTypesResponse,
  CreateAlertTypeResponse,
} from '../support/types/alert-type.type';

describe('POST /graphql', () => {
  it('should return all the alarm types with the "leak" inside their name', async () => {
    const query = `#graphql
      query(
        $where: AlertTypeWhereInput!,
        $first: Int!
      ) {
        alertTypes(where: $where) {
          id
          name
          # If we change "alerts" to "Alerts" it is not gonna work, it will crash.
          # We've inserted 1 million alerts
          # Pagination is implemented for "Alerts"
          alertsConnection(
            first: $first
          ) {
            edges {
              cursor
              node {
                id
                title
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `;

    const { status, data } = await axios.post<AlertTypesResponse>(
      `/graphql`,
      {
        query,
        variables: {
          where: {
            name: {
              contains: 'leak',
            },
          },
          first: 3,
        },
      },
    );

    expect(status).toBe(200);
    expect(data).toEqual({
      data: {
        alertTypes: [
          {
            id: expect.any(String),
            name: 'leak-detection',
            // Alerts: expect.anything(),
            alertsConnection: {
              edges: expect.arrayContaining([
                {
                  cursor: expect.any(String),
                  node: {
                    id: '00048674-b8af-4079-b858-202c85c9adac',
                    title: 'alert title 409141',
                  },
                },
              ]),
              pageInfo: expect.objectContaining({
                endCursor:
                  'eyJpZCI6ImZmZmVhMWVhLTQ3OGUtNDMyZS05YmM4LTQwM2I1NTljYzljZSJ9',
                hasNextPage: true,
              }),
            },
          },
        ],
      },
    });
  });

  it('should return the alarm type & paginate through its alerts forward', async () => {
    const alertTypeId = await new AlertTypeBuilder().build();
    const firstAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const secondAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const thirdAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const forthAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const fifthAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const where = { id: { equals: alertTypeId } };
    const first = 2;
    const query1 = `#graphql
      query(
        $where: AlertTypeWhereInput!,
        $first: Int!
      ) {
        alertTypes(where: $where) {
          id
          name
          alertsConnection(
            first: $first
          ) {
            edges {
              cursor
              node {
                id
                title
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              startCursor
              hasPreviousPage
            }
          }
        }
      }
    `;
    const query2 = `#graphql
      query(
        $where: AlertTypeWhereInput!,
        $first: Int!,
        $after: String!
      ) {
        alertTypes(where: $where) {
          id
          name
          alertsConnection(
            first: $first,
            after: $after
          ) {
            edges {
              cursor
              node {
                id
                title
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              startCursor
              hasPreviousPage
            }
          }
        }
      }
    `;
    const {
      data: { data },
    } = await axios.post<AlertTypesResponse>(`/graphql`, {
      query: query1,
      variables: {
        where,
        first,
      },
    });
    const idOfEdgesInQuery1 =
      data.alertTypes[0].alertsConnection.edges.map(
        (edge) => edge.node.id,
      );
    const cursor =
      data.alertTypes[0].alertsConnection.edges[
        data.alertTypes[0].alertsConnection.edges.length - 1
      ].cursor;

    const { data: paginatedAlerts } =
      await axios.post<AlertTypesResponse>(`/graphql`, {
        query: query2,
        variables: {
          where,
          first,
          after: cursor,
        },
      });
    const idOfEdgesInQuery2 =
      paginatedAlerts.data.alertTypes[0].alertsConnection.edges.map(
        (edge) => edge.node.id,
      );

    expect(idOfEdgesInQuery1).toStrictEqual([
      firstAlertId,
      secondAlertId,
    ]);
    expect(idOfEdgesInQuery2).toStrictEqual([
      thirdAlertId,
      forthAlertId,
    ]);
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .hasNextPage,
    ).toBeTrue();
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .hasPreviousPage,
    ).toBeTrue();
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .endCursor,
    ).toBeString();
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .startCursor,
    ).toBeString();
  });

  it('should return the alarm type & paginate through its alerts backward', async () => {
    const alertTypeId = await new AlertTypeBuilder().build();
    const firstAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const secondAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const thirdAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const forthAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const fifthAlertId = await new AlertBuilder()
      .setAlertTypeId(alertTypeId)
      .build();
    const where = { id: { equals: alertTypeId } };
    const last = 2;
    const query1 = `#graphql
      query(
        $where: AlertTypeWhereInput!,
        $last: Int!
      ) {
        alertTypes(where: $where) {
          id
          name
          alertsConnection(
            last: $last
          ) {
            edges {
              cursor
              node {
                id
                title
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              startCursor
              hasPreviousPage
            }
          }
        }
      }
    `;
    const query2 = `#graphql
      query(
        $where: AlertTypeWhereInput!,
        $last: Int!,
        $before: String!
      ) {
        alertTypes(where: $where) {
          id
          name
          alertsConnection(
            last: $last,
            before: $before
          ) {
            edges {
              cursor
              node {
                id
                title
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              startCursor
              hasPreviousPage
            }
          }
        }
      }
    `;
    const {
      data: { data },
    } = await axios.post<AlertTypesResponse>(`/graphql`, {
      query: query1,
      variables: {
        where,
        last,
      },
    });
    const idOfEdgesInQuery1 =
      data.alertTypes[0].alertsConnection.edges.map(
        (edge) => edge.node.id,
      );
    const cursor =
      data.alertTypes[0].alertsConnection.edges[0].cursor;

    const { data: paginatedAlerts } =
      await axios.post<AlertTypesResponse>(`/graphql`, {
        query: query2,
        variables: {
          where,
          last,
          before: cursor,
        },
      });
    const idOfEdgesInQuery2 =
      paginatedAlerts.data.alertTypes[0].alertsConnection.edges.map(
        (edge) => edge.node.id,
      );

    console.dir(data.alertTypes, { depth: null });

    expect(idOfEdgesInQuery1).toStrictEqual([
      forthAlertId,
      fifthAlertId,
    ]);
    expect(idOfEdgesInQuery2).toStrictEqual([
      secondAlertId,
      thirdAlertId,
    ]);
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .hasNextPage,
    ).toBeTrue();
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .hasPreviousPage,
    ).toBeTrue();
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .endCursor,
    ).toBeString();
    expect(
      paginatedAlerts.data.alertTypes[0].alertsConnection.pageInfo
        .startCursor,
    ).toBeString();
  });

  it('should create an alarm type', async () => {
    const query = `#graphql
      mutation CreateAlertType($alertType: AlertTypeCreateManyInput!) {
        createAlertType(alertType: $alertType) {
          id
          name
          description
        }
      }
    `;

    const {
      data: { data },
    } = await axios.post<CreateAlertTypeResponse>('/graphql', {
      query,
      variables: {
        alertType: {
          name: 'Random-Pandora-Axe',
          description: 'Described alert type',
        },
      },
    });

    expect(data.createAlertType.name).toBe('Random-Pandora-Axe');
    expect(data.createAlertType.description).toBe(
      'Described alert type',
    );
  });
});
