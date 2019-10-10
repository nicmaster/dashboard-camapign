import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoxDefaultRoutingModule } from './box-default-routing.module';
import { BoxDefaultComponent } from './box-default.component';
import { MyDatePickerModule } from 'mydatepicker';
import { BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BoxDefaultRoutingModule,
    MyDatePickerModule,
    BoxModule
  ],
  declarations: [BoxDefaultComponent]
})
export class BoxDefaultModule { }
