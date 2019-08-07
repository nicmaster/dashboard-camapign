import { Component, OnInit } from '@angular/core';

import * as Prism from 'prismjs';
import { KeycloakService} from 'keycloak-angular';
import { promise } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  /**
   * @method ngAfterViewInit
   */

  constructor(protected keycloak: KeycloakService) {
  }

  ngOnInit() {
    Prism.highlightAll();
    this.getUserInfoFromToken();
  }

    username: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: any[];

  getUserInfoFromToken(): void {
    try{
          this.firstName = this.keycloak.getKeycloakInstance().profile.firstName;
          this.username = this.keycloak.getKeycloakInstance().profile.username;
          this.lastName = this.keycloak.getKeycloakInstance().profile.lastName;
          this.email = this.keycloak.getKeycloakInstance().profile.email;
          this.roles = this.keycloak.getUserRoles();
          console.log(this.roles)
      } catch(e){
        console.log('=failed cto load user')
      }
  }
 
}
