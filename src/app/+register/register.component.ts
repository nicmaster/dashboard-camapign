import { Component, OnInit } from '@angular/core';
import { RestService} from "../services/rest.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public campaignsData: any[];

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getCampaignsData();
  }

  getCampaignsData(){
    this.restService.listOfCampaigns()
    .subscribe(data =>{
      this.campaignsData = data['campaigns'];
    },
      (error)=>{
        console.log(error.error.message)
      }
    );

  }

  selectCompaign(){
    console.log('Selected');
  }

}
