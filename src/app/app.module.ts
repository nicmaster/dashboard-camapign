import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { adminLteConf } from './admin-lte.conf';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from 'angular-admin-lte';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import Inputmask from "inputmask";
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-initilizer';
import { RestService } from "./services/rest.service"
import { NgxPaginationModule } from 'ngx-pagination';
import { SessionExpirationAlert, SessionInteruptService } from 'session-expiration-alert';
import { AppSessionInteruptService } from './services/app-session-interupt.service';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    KeycloakAngularModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule,
    NgxPaginationModule,
    MyDatePickerModule,
    SessionExpirationAlert.forRoot({totalMinutes: 30})
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: SessionInteruptService,
      useClass: AppSessionInteruptService
    },
    RestService,
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
