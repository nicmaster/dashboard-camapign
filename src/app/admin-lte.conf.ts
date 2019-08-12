import { KeycloakService} from 'keycloak-angular';

export class MenuConfigs{
  public jsonMenu: any;
  constructor() {
    this.getLeftSideMenuByRole();
  }

   getLeftSideMenuByRole():any{
    this.jsonMenu = {
        skin: 'black',
        // isSidebarLeftCollapsed: false,
        // isSidebarLeftExpandOnOver: false,
        // isSidebarLeftMouseOver: false,
        // isSidebarLeftMini: true,
        // sidebarRightSkin: 'dark',
        // isSidebarRightCollapsed: true,
        // isSidebarRightOverContent: true,
         //layout: this.getLeftSideMenuByRole(),
        sidebarLeftMenu: [
          {label: 'MAIN NAVIGATION', separator: true},
          {label: 'User Profile', route: '/', iconClasses: 'fa fa-road', pullRights: [{text: 'Profile', classes: 'label pull-right bg-green'}]},
          {label: 'Send SMS', route: 'send-sms', iconClasses: 'fa fa-tasks'},
          {label: 'Sent Messages', route: 'sent-messages', iconClasses: 'fa fa-user-plus', pullRights: [{text: 'SMS', classes: 'label pull-right bg-green'}]},
          {label: 'Campaign Manager', route: 'campaign-manager', iconClasses: 'fa fa-keyboard-o', active: false},
          //this.getLeftSideMenuByRole(),
        ]
      };
  return this.jsonMenu;
  }
}


export const adminLteConf = new MenuConfigs();  
adminLteConf.getLeftSideMenuByRole();
//console.log(adminLteConf.getLeftSideMenuByRole());



