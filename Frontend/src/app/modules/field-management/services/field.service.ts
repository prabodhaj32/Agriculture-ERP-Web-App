import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';
import { environment } from '../../../../environments/environment';

declare global {
  interface Window {
    gapiLoaded: boolean;
    gapi: any;
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

  private clientId = environment.googleClientId;
  private apiKey = environment.googleApiKey;

  constructor() {}

  // -------------------- Field Data Methods --------------------

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

  // -------------------- Load Google API --------------------

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.head.appendChild(script);
    });
  }

  private waitForGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      const maxWait = 10000;
      const intervalTime = 100;
      let waited = 0;

      const check = () => {
        if (window.gapi) {
          resolve();
        } else {
          waited += intervalTime;
          if (waited >= maxWait) {
            reject(new Error('Timeout waiting for gapi.'));
          } else {
            setTimeout(check, intervalTime);
          }
        }
      };
      check();
    });
  }

  // -------------------- Init Google OAuth --------------------

  async init(): Promise<void> {
    try {
      await this.loadScript('https://apis.google.com/js/api.js');
      await this.waitForGapi();

      await new Promise<void>((resolve, reject) => {
        window.gapi.load('client:auth2', async () => {
          try {
            await window.gapi.client.init({
              apiKey: this.apiKey,
              clientId: this.clientId,
              scope: 'https://www.googleapis.com/auth/earthengine.readonly',
              discoveryDocs: [
                'https://earthengine.googleapis.com/$discovery/rest?version=v1',
              ],
            });

            const authInstance = window.gapi.auth2.getAuthInstance();
            await authInstance.signIn();

            console.log('User signed in with Google.');
            resolve();
          } catch (err) {
            console.error('Google API init error:', err);
            reject(err);
          }
        });
      });
    } catch (err) {
      console.error('Failed to initialize Google API:', err);
      throw err;
    }
  }
}
