import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'http://spcl-wls-dev01.sc.gpaatest.gov.za:8080/auth',
  realm: 'campaign-users',
  clientId: 'tutorial-frontend',
  "credentials": {
    "secret": "your-client-secret"
  }
};

export const environment = {
  keycloak: keycloakConfig,
  serviceURL: 'http://vip-web-pre01.sc.gpaatest.gov.za:7778/gpaa-campaign-manager-rest/api/v1/campaign/manager',
  pageSize:10,
  production: true
};
