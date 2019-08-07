import { Component, OnInit} from '@angular/core';
import { KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent {

  constructor(protected keycloak: KeycloakService) {
  }

  ngOnInit() {
    this.getUserInfoFromToken();
  }

  firstName: string;
  lastName: string;

  getUserInfoFromToken(): void {
    try{
          this.firstName = this.keycloak.getKeycloakInstance().profile.firstName;
          this.lastName = this.keycloak.getKeycloakInstance().profile.lastName;
      } catch(e){
        console.log('=failed cto load user')
      }
  }

}
