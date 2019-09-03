import { Component, OnInit} from '@angular/core';
import { KeycloakService} from 'keycloak-angular';
import { KeyCloackOauth } from '../../model/KeyCloackOauth';
import { RestService} from "../../services/rest.service";

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent {
  keyCloackOauth: KeyCloackOauth;

  constructor(protected keycloak: KeycloakService, private restService:RestService) {
  }

  ngOnInit() {
    this.getUserInfoFromToken();
    this.keyCloackOauth = {idToken:"", clientId:"", refreshToken:""}
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

  keycloackLogout(){
    this.keyCloackOauth.idToken = this.keycloak.getKeycloakInstance().idToken.toString();
    this.keyCloackOauth.refreshToken = this.keycloak.getKeycloakInstance().refreshToken;
    this.restService.userKeycloakLogout(this.keyCloackOauth)
    .subscribe(data =>{
      console.log(data);
      window.location.reload();
    },
    (error)=>{
      console.log(error.error.message)
    }
    
  );
}​

}
