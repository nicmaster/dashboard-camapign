import { Component, OnInit } from '@angular/core';
import { KeycloakService} from 'keycloak-angular';
import { RestService} from "../services/rest.service"
import {NgxPaginationModule} from 'ngx-pagination';
import Swal from 'sweetalert2';​

@Component({
  selector: 'app-sentmessages',
  templateUrl: './sentmessages.component.html',
  styleUrls: ['./sentmessages.component.css']
})
export class SentMessagesComponent implements OnInit {
  private userid:string;
  private page:number=1;
  public smsHistoryData: any={};
  public SmsStats: any={};

  constructor(private restService:RestService, protected keycloak: KeycloakService){}

  ngOnInit() {
    this.getSmsDataByUserID(this.page);
    this.getSmsHistoryStatsByUserID();
  }

  getSmsDataByUserID(pageNo:number){
    this.userid = this.keycloak.getKeycloakInstance().profile.username;
    this.restService.smsHistoryListByUserID(this.userid, pageNo-this.page)
    .subscribe(data =>{
      //console.log(data)
      this.smsHistoryData = data;
      console.log(this.smsHistoryData)
    },
      (error)=>{
        console.log(error.error.message)
      }
    );

  }

  getSmsHistoryStatsByUserID(){
    this.userid = this.keycloak.getKeycloakInstance().profile.username;

    this.restService.getSmsHistoryStatsByUserID(this.userid)
    .subscribe(data =>{
      this.SmsStats = data;
      console.log(this.SmsStats)
    },
      (error)=>{
        console.log(error.error.message)
      }
    );

  }

  pageChanged(event){
    console.log("event page================"+event);
    this.getSmsDataByUserID(event);
    this.getSmsHistoryStatsByUserID();
  }

  resendSmsEvent(eventID:number){
    console.log("eventID================"+eventID);
    this.restService.resendSmsEventRest(eventID)
    .subscribe(data =>{
      console.log(data)
      if(data == "OK"){
        Swal.fire({
          position: 'top-end',
          width: '30%',
          type: 'success',
          title: 'SMS has been sent!',
          showConfirmButton: false,
          timer: 1900
        })
        this.getSmsDataByUserID(this.page);
        this.getSmsHistoryStatsByUserID();
      }
    },
      (error)=>{
        console.log(error.error.message)
      }
    );
    }
}
