import axios from 'axios';

import { AlertTypeBuilderResponse } from '../types/alert-type.type';

export class AlertTypeBuilder {
  private _name: string;
  private _description?: string;

  constructor() {
    this._name = 'alert-type-name-' + Math.random();
    this._description =
      'Description for alert type, it is not long. ' + Date.now();
  }

  setName(name: string) {
    this._name = name;
    return this;
  }
  setDescription(description: string) {
    this._description = description;
    return this;
  }
  async build() {
    const query = `#graphql
      mutation CreateAlertType($alertType: AlertTypeCreateManyInput!) {
        createAlertType(alertType: $alertType) {
          id
        }
      }
    `;
    const {
      data: {
        data: {
          createAlertType: { id },
        },
      },
    } = await axios.post<AlertTypeBuilderResponse>('/graphql', {
      query,
      variables: {
        alertType: {
          name: this._name,
          description: this._description,
        },
      },
    });

    return id;
  }
}
