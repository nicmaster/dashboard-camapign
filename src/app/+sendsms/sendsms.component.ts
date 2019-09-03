import {Component, OnInit, ElementRef} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'
import * as Prism from 'prismjs';
import Inputmask from "inputmask";
import { KeycloakService} from 'keycloak-angular';
import { RestService} from "../services/rest.service"
import { Router, ActivatedRoute } from '@angular/router'
import { SendSmsModel } from '../model/sendsms';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sendsms',
  templateUrl: './sendsms.component.html',
  styleUrls: ['./sendsms.component.css']
})
export class SendSmsComponent implements OnInit {
  sendsms: SendSmsModel;
  public smsId: number;
  public HistoricalData: any={};
  
  constructor(element: ElementRef, protected keycloak: KeycloakService, private restService: RestService, private route: ActivatedRoute) {
    this.setInputMask(element);
  }

  private setInputMask(element: ElementRef) {
    // Get the value of the mask attribute
    const mask = element.nativeElement.getAttribute('mask');

    if (mask) {
        // Set the input mask and then mask the element the directive was used on
        Inputmask({ 'mask': mask }).mask(element);
    }
}

  smsData;
  cellNumber;
  smsMessage;

  ngOnInit() {
    this.route.params.subscribe((parmas) => {
    this.smsId = parmas['id'];
      if(this.smsId != null){
        console.log(this.smsId)
        this.retrieveSmsMetaData(this.smsId);
      }
      
      });

    Inputmask().mask(document.querySelectorAll("input"));
    this.smsData = new FormGroup({
      cellNumber: new FormControl('', [
        Validators.required, Validators.min(10)
     ]),
      smsMessage: new FormControl('', Validators.compose([
        Validators.required
     ]))
   });

   this.sendsms = {cellNumber: "", message: "", userId: ""}
  }

  onClickSubmit(data) {
    this.cellNumber = data.cellNumber;
    this.smsMessage = data.smsMessage;

    this.sendsms.cellNumber = this.cellNumber;
    this.sendsms.message = this.smsMessage;
    this.sendsms.userId = this.keycloak.getKeycloakInstance().profile.username;

    this.restService.sendSms(this.sendsms)
    .subscribe(response => {
      if(response != null) {
        Swal.fire({
          position: 'top-end',
          width: '30%',
          type: 'success',
          title: 'SMS has been sent!',
          showConfirmButton: false,
          timer: 1900
        })
        //reset form
        this.smsData.reset()
      
      } else {
        console.log("No response!!!");
      }
    });

  }

  retrieveSmsMetaData(eventId:number){
    this.restService.getSmsMetadatById(eventId)
    .subscribe(data =>{
      console.log(data)
      this.HistoricalData = data;

      this.smsData.setValue({
        cellNumber: ''+ this.HistoricalData.formattedCell+'',
        smsMessage: ''+ this.HistoricalData.message+''
        });​
    
    },
      (error)=>{
          console.log(error.error.message)
      }
    
    );
  }
  
}
