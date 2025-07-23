import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';

declare global {
  interface Window {
    gapiLoaded: boolean;
    eeLoaded: boolean;
    gapi: any;
    ee: any;
  }
}

@Injectable({ providedIn: 'root' })
export class FieldService {
  private fields: Field[] = [
    {
      id: 1,
      name: 'Field 1',
      size: 10,
      location: 'Nuwara Eliya',
      soilType: 'Loamy',
      cropType: 'Tea',
      status: 'Planted',
      lat: 6.9705,
      lng: 80.7820,
    },
  ];

  private clientId = '332216686858-1b1ouldkfr4d9krkq1ee8ahl3tbv8hl3.apps.googleusercontent.com';
  private tokenClient: any;
  

  // -------------------- FIELD DATA METHODS --------------------
  getFields(): Field[] {
    return this.fields;
  }

  getFieldById(id: number): Field | undefined {
    return this.fields.find(f => f.id === id);
  }

  addField(field: Field): void {
    field.id = this.fields.length ? Math.max(...this.fields.map(f => f.id)) + 1 : 1;
    this.fields.push(field);
  }

  updateField(field: Field): void {
    const index = this.fields.findIndex(f => f.id === field.id);
    if (index !== -1) {
      this.fields[index] = field;
    }
  }

  deleteField(id: number): void {
    this.fields = this.fields.filter(f => f.id !== id);
  }

  // -------------------- GEE INITIALIZATION --------------------

  async init(): Promise<void> {
    await this.waitForScripts();

    return new Promise((resolve, reject) => {
      window.gapi.load('client', async () => {
        try {
          await window.gapi.client.init({
            clientId: this.clientId,
            scope: 'https://www.googleapis.com/auth/earthengine.readonly',
          });

          await window.gapi.auth2.getAuthInstance().signIn();

          const token = window.gapi.auth.getToken().access_token;

          window.ee.data.authenticateViaOauth(
            token,
            () => {
              window.ee.initialize(
                null,
                null,
                () => {
                  console.log(' Earth Engine initialized.');
                  resolve();
                },
                (err: any) => {
                  console.error(' Earth Engine init error:', err);
                  reject(err);
                }
              );
            },
            (authError: any) => {
              console.error(' EE authentication error:', authError);
              reject(authError);
            }
          );
        } catch (error) {
          console.error('Initialization failed:', error);
          reject(error);
        }
      });
    });
  }

  private waitForScripts(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (window.gapiLoaded && window.eeLoaded) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }
}
