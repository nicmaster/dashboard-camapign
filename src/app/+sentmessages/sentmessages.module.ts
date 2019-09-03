import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentMessagesRoutingModule } from './sentmessages-routing.module';
import { SentMessagesComponent } from './sentmessages.component';

import { AlertModule as MkAlertModule, BoxModule } from 'angular-admin-lte';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    SentMessagesRoutingModule,
    MkAlertModule,
    BoxModule,
    NgxPaginationModule
  ],
  declarations: [SentMessagesComponent]
})
export class AlertModule { }
