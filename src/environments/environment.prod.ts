import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'http://127.0.0.1:8080/auth',
  realm: 'campaign-users',
  clientId: 'tutorial-frontend',
  "credentials": {
    "secret": "your-client-secret"
  }
};

export const environment = {
  keycloak: keycloakConfig,
  serviceURL: 'http://127.0.0.1:8197/api/v1/campaign/manager',
  pageSize:10,
  production: true
};
