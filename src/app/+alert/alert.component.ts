import { Component, OnInit } from '@angular/core';
import { KeycloakService} from 'keycloak-angular';
import { RestService} from "../services/rest.service"

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private userid:string;
  private page:number=1;
  public smsHistoryData: any[];

  constructor(private restService:RestService, protected keycloak: KeycloakService){}

  ngOnInit() {
    this.getSmsDataByUserID();
  }

  getSmsDataByUserID(){
    this.userid = this.keycloak.getKeycloakInstance().profile.username;
    this.restService.smsHistoryListByUserID(this.userid, this.page)
    .subscribe(data =>{
      //console.log(data)
      this.smsHistoryData = data['smsHistoryContents'];
      console.log(this.smsHistoryData)
    },
      (error)=>{
        console.log(error.error.message)
      }
    );

  }
}
