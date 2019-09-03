import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendSmsComponent } from './sendsms.component';

const routes: Routes = [{
  path: '',
  component: SendSmsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendSmsRoutingModule { }
