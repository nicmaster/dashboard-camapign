import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    NgxPaginationModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
