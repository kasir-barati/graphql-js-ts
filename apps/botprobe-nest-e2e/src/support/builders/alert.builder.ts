import axios from 'axios';
import { randomUUID } from 'crypto';
import { AlertBuilderResponse } from '../types/alert.type';

export class AlertBuilder {
  private _title: string;
  private _userId: string;
  private _alertTypeId: string;
  private _description?: string;

  constructor() {
    this._title = 'Some title ' + Date.now();
    this._userId = randomUUID();
    this._alertTypeId = '8f55cefb-402d-4615-9025-548f76362c27';
    this._description = 'Some random desc ' + Date.now();
  }

  setTitle(title: string) {
    this._title = title;
    return this;
  }
  setUserId(userId: string) {
    this._userId = userId;
    return this;
  }
  setAlertTypeId(alertTypeId: string) {
    this._alertTypeId = alertTypeId;
    return this;
  }
  setDescription(description: string) {
    this._description = description;
    return this;
  }
  async build() {
    const query = `#graphql
      mutation CreateAlert($alert: AlertCreateManyInput!) {
        createAlert(alert: $alert) {
          id
        }
      }
    `;
    const {
      data: {
        data: {
          createAlert: { id },
        },
      },
    } = await axios.post<AlertBuilderResponse>('/graphql', {
      query,
      variables: {
        alert: {
          title: this._title,
          userId: this._userId,
          description: this._description,
          alertTypeId: this._alertTypeId,
        },
      },
    });

    return id;
  }
}
