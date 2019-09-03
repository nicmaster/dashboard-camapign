import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentMessagesComponent } from './sentmessages.component';

const routes: Routes = [{
  path: '',
  component: SentMessagesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentMessagesRoutingModule { }
