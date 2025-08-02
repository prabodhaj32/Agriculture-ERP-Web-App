import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';
import { environment } from '../../../../environments/environment';

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

  private clientId = environment.googleClientId;
  private apiKey = environment.googleApiKey;

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

  // -------------------- Load External Scripts --------------------

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        // Script already loaded
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

  private async loadExternalScripts(): Promise<void> {
    await this.loadScript('https://apis.google.com/js/api.js');
    await this.loadScript('https://earthengine.googleapis.com/earthengine/load.js');

    // Wait for globals to be defined
    await this.waitForGlobals();
  }

  private waitForGlobals(): Promise<void> {
    return new Promise((resolve, reject) => {
      const maxWait = 10000; // 10 seconds max wait
      const intervalTime = 100;
      let waited = 0;

      const check = () => {
        if (window.gapi && window.ee) {
          resolve();
        } else {
          waited += intervalTime;
          if (waited >= maxWait) {
            reject(new Error('Timeout waiting for Google API or Earth Engine globals.'));
          } else {
            setTimeout(check, intervalTime);
          }
        }
      };

      check();
    });
  }

  // -------------------- Google Earth Engine Initialization --------------------

  async init(): Promise<void> {
    try {
      await this.loadExternalScripts();

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

            // Sign in user
            const authInstance = window.gapi.auth2.getAuthInstance();
            const user = await authInstance.signIn();

            const token = window.gapi.auth.getToken().access_token;

            // Authenticate Earth Engine
            window.ee.data.authenticateViaOauth(
              token,
              () => {
                // Initialize EE
                window.ee.initialize(
                  null,
                  null,
                  () => {
                    console.log('Earth Engine initialized.');
                    resolve();
                  },
                  (err: any) => {
                    console.error('Earth Engine init error:', err);
                    reject(err);
                  }
                );
              },
              (authErr: any) => {
                console.error('EE authentication error:', authErr);
                reject(authErr);
              }
            );
          } catch (error) {
            console.error('Google API initialization failed:', error);
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Failed to initialize FieldService:', error);
      throw error;
    }
  }
}
