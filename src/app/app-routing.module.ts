import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Role } from './model/role';
import { AppAuthGuard } from './app.authguard';
const routes: Routes = [
  {
  path: '',
  data: {
      title: 'Home'
  },
  children: [
    {
      path: '',
      component: HomeComponent
    }, {
      path: 'send-sms',
      loadChildren: './+sendsms/sendsms.module#SendSmsModule',
      canActivate: [AppAuthGuard],
      data: {
        title: 'Send SMS',
        roles: [Role.SmsUser]
      }
    }, {
      path: 'sent-messages',
      loadChildren: './+sentmessages/sentmessages.module#AlertModule',
      canActivate: [AppAuthGuard],
      data: {
        title: 'Sent Messages',
        roles: [Role.SmsUser]
      }
    },
    {
      path: 'campaign-manager',
      loadChildren: './+register/register.module#RegisterModule',
      data: {
        title: 'Campaign Manager',
      }
    },
    {
      path: 'campaign-setup/id/:id/campaign-code/:campcode',
      loadChildren: './+form/input-text/input-text.module#InputTextModule',
      data: {
        title: 'Campaign Setup',
      }
    },
    {
      path: 'campaign-setup/id/:id/campaign-code/:campcode/setupid/:setupid',
      loadChildren: './+form/input-text/input-text.module#InputTextModule',
      data: {
        title: 'Campaign Setup',
      }
    },
    {
      path: 'boxs',
      data: {
        title: 'Boxs',
      },
      children: [
        {
          path: 'box',
          loadChildren: './+boxs/box-default/box-default.module#BoxDefaultModule',
          data: {
            title: 'Box'
          }
        }, {
          path: 'info-box',
          loadChildren: './+boxs/box-info/box-info.module#BoxInfoModule',
          data: {
            title: 'Info Box'
          }
        }, {
          path: 'small-box',
          loadChildren: './+boxs/box-small/box-small.module#BoxSmallModule',
          data: {
            title: 'Small Box'
          }
        }
      ]}, {
        path: 'dropdown',
        loadChildren: './+dropdown/dropdown.module#DropdownModule',
        data: {
          title: 'Dropdown',
        }
      }, {
        path: 'tabs',
        loadChildren: './+tabs/tabs.module#TabsModule',
        data: {
          title: 'Tabs',
        }
      }
    ]
  }, {
    path: 'form',
    data: {
      title: 'Form',
    },
    children: [
      {
        path: 'input-text',
        loadChildren: './+form/input-text/input-text.module#InputTextModule',
        data: {
          title: 'Input Text',
        }
      }
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
