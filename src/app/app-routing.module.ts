import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

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
      loadChildren: './+accordion/accordion.module#AccordionModule',
      data: {
        title: 'Send SMS'
      }
    }, {
      path: 'sent-messages',
      loadChildren: './+alert/alert.module#AlertModule',
      data: {
        title: 'Sent Messages',
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
