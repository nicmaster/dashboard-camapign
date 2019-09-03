import { Component, OnInit } from '@angular/core';
import { RestService} from "../services/rest.service";
import { PersonSearch} from '../model/PersonSearch'
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public campaignsData: {};
  public campaignPagingData: any = {};
  public pagingConfig: any;
  personSearch: PersonSearch;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getCampaignsData();
    this.listScheduledRunnableCampaign(0);
    this.personSearch ={partyId:"",idNo: "",memberNo: "", employeeNo: "", passportNo: "", isn: "2800832"}
    ///this.personSearchData();

    this.pagingConfig = {
      itemsPerPage: this.campaignPagingData.itemsInPage,
      currentPage: this.campaignPagingData.currentPageNumber,
      totalItems: this.campaignPagingData.totalItems
    };

  }

  getCampaignsData(){
    this.restService.listOfCampaigns()
    .subscribe(data =>{
      this.campaignsData = data;
    },
      (error)=>{
        console.log(error.error.message)
      }
    );

  }

  selectCompaign(){
    console.log('Selected');
  }

  listScheduledRunnableCampaign(defaultPageNo:number){

      this.restService.listPagingScheduleCampaignByPageAndSize(defaultPageNo)
      .subscribe(data =>{
          this.campaignPagingData = data;
      },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

  personSearchData(){
    this.restService.personSearch(this.personSearch)
      .subscribe(data =>{
        console.log(data);
      },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

  pageChanged(event){
    console.log("event page================"+event);
    event = event -1;
    this.listScheduledRunnableCampaign(event);
  }

}
