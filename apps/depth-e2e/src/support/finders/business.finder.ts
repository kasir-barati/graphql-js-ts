import axios from 'axios';
import { BusinessesResponse } from '../types/business.type';

export class BusinessFinder {
  async findAll() {
    const query = /* GraphQL */ `
      query {
        businesses {
          edges {
            cursor
            node {
              id
              name
            }
          }
        }
      }
    `;

    const {
      data: {
        data: { businesses },
      },
    } = await axios.post<BusinessesResponse>(`/`, {
      query,
    });

    return businesses;
  }
}
