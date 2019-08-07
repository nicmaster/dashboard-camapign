import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AccordionRoutingModule } from './accordion-routing.module';
import { AccordionComponent } from './accordion.component';
//import { RestService} from "../services/rest.service"

import { AccordionModule as MkAccordionModule, BoxModule } from 'angular-admin-lte';
import { from } from 'rxjs';


@NgModule({
  imports: [
    CommonModule,
    AccordionRoutingModule,
    MkAccordionModule,
    ReactiveFormsModule,
    FormsModule,
    //RestService,
    BoxModule
  ],
  declarations: [AccordionComponent]
})
export class AccordionModule { }
