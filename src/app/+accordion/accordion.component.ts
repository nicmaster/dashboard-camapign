import {Component, OnInit, ElementRef} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'
import * as Prism from 'prismjs';
import Inputmask from "inputmask";
import { KeycloakService} from 'keycloak-angular';
import { RestService} from "../services/rest.service"

import { SendSmsModel } from '../model/sendsms';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  sendsms: SendSmsModel;

  constructor(element: ElementRef, protected keycloak: KeycloakService, private restService: RestService) {
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
    Inputmask().mask(document.querySelectorAll("input"));
    this.smsData = new FormGroup({
      cellNumber: new FormControl('', Validators.compose([
        Validators.required
     ])),
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
  
}
