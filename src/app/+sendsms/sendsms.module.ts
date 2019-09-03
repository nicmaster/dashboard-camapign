import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { SendSmsRoutingModule } from './sendsms-routing.module';
import { SendSmsComponent } from './sendsms.component';
//import { RestService} from "../services/rest.service"

import { AccordionModule as MkAccordionModule, BoxModule } from 'angular-admin-lte';
import { from } from 'rxjs';


@NgModule({
  imports: [
    CommonModule,
    SendSmsRoutingModule,
    MkAccordionModule,
    ReactiveFormsModule,
    FormsModule,
    //RestService,
    BoxModule
  ],
  declarations: [SendSmsComponent]
})
export class SendSmsModule { }
