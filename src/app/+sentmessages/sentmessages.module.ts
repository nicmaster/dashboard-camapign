import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentMessagesRoutingModule } from './sentmessages-routing.module';
import { SentMessagesComponent } from './sentmessages.component';

import { AlertModule as MkAlertModule, BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    SentMessagesRoutingModule,
    MkAlertModule,
    BoxModule
  ],
  declarations: [SentMessagesComponent]
})
export class AlertModule { }
