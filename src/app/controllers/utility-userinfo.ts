import { Injectable } from '@angular/core';
import { KeycloakService} from 'keycloak-angular';


@Injectable()
export class UtilityUserInfo {

  constructor(private keycloakService: KeycloakService) {
    keycloakService = keycloakService;
  }

    static isTokenCardVisible: boolean = false;

    static username: string;
    static fullName: string;
    static firstName: string;
    static lastName: string;
    static email: string;
    static roles: string[];
    static usersArray = [];
    static userCountry: string;
 
}