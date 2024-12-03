import axios from 'axios';
import { AlertBuilder } from '../support/builders/alert.builder';
import {
  CreateAlertResponse,
  SearchAlertResponse,
} from '../support/types/alert.type';

describe('POST /graphql', () => {
  const userId = 'fe7c9735-6bf4-42a1-b4b1-e5d9273518d8';
  let alertId: string;
  const alertTitle = 'leak alarm in the pipeline #4gh2oil';
  const alertDescription = 'Why pipeline 4gh2 i leaking oil again?';

  beforeAll(async () => {
    alertId = await new AlertBuilder()
      .setUserId(userId)
      .setTitle(alertTitle)
      .setDescription(alertDescription)
      .setAlertTypeId('8f55cefb-402d-4615-9025-548f76362c27')
      .build();
  });

  it('should create a new alert', async () => {
    const query = `#graphql
      mutation Create($alert: AlertCreateManyInput!) {
        create(alert: $alert) {
          id
          title
          AlertType {
            id
            name
          }
        }
      }
    `;
    const title = 'Some random alert' + Math.random().toString();

    const { data } = await axios.post<CreateAlertResponse>(
      '/graphql',
      {
        query,
        variables: {
          alert: {
            title,
            userId: '4ac0240d-85f8-4279-8a0a-ce69d3cd2b73',
            description: 'description',
            alertTypeId: '6faf44db-10bb-4a15-8e81-29b1beaee5c6',
          },
        },
      },
      {
        validateStatus(status) {
          return true;
        },
      },
    );

    expect(data).toStrictEqual({
      data: {
        create: {
          id: expect.any(String),
          title,
          AlertType: {
            id: '6faf44db-10bb-4a15-8e81-29b1beaee5c6',
            name: 'corrosion',
          },
        },
      },
    } satisfies CreateAlertResponse);
  });

  it.each([
    { title: { equals: alertTitle } },
    {
      OR: [
        {
          title: { contains: 'pipeline' },
        },
        {
          description: { in: [alertDescription] },
        },
      ],
    },
    {
      AND: [
        {
          id: { equals: alertId },
        },
        {
          userId: { equals: userId },
        },
      ],
    },
  ])('should return all the alarms', async (where) => {
    const query = `#graphql
      query($where: AlertWhereInput!) {
        search(where: $where) {
          id
          title
          AlertType {
            id
            name
          }
        }
      }
    `;

    const { status, data } = await axios.post<SearchAlertResponse>(
      `/graphql`,
      {
        query,
        variables: {
          where,
        },
      },
    );

    expect(status).toBe(200);
    expect(data).toEqual({
      data: {
        search: expect.arrayContaining([
          {
            id: alertId,
            title: alertTitle,
            AlertType: {
              id: '8f55cefb-402d-4615-9025-548f76362c27',
              name: 'leak-detection',
            },
          },
        ]),
      },
    } satisfies SearchAlertResponse);
  });
});
