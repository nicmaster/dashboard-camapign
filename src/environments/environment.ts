// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  //url: 'http://spcl-wls-dev01.sc.gpaatest.gov.za:8080/auth',
  url: 'http://127.0.0.1:8080/auth',
  realm: 'campaign-users',
  clientId: 'tutorial-frontend',
  "credentials": {
    "secret": "your-client-secret"
  }  
};

export const environment = {
  keycloak: keycloakConfig,
  serviceURL: 'http://spcl-wls-dev01.sc.gpaatest.gov.za:8003/gpaa-campaign-manager-rest/api/v1/campaign/manager',
  pageSize:20,
  production: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
