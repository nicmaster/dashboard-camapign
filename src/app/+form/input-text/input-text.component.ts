import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'
import { RestService} from "../../services/rest.service";
import { Router  , ActivatedRoute } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';
import { EventActive} from '../../model/EventActive'
import { ListProfiles} from '../../model/ListProfiles'
import { CreateRunnableCampaign} from '../../model/CreateRunnableCampaign'
import { stringify } from '@angular/core/src/util';

@Component({
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  userForm: FormGroup;
  createRunnableCampaign: CreateRunnableCampaign;
  public campaignsData: any = {};
  public campaignsConfigsType: any = {};
  public campaignsConfigsPeriod: any = {};
  public campaignsConfigsAudience: any = {};
  public campaignsConfigsPlatforms: any = {};
  public createdRunnableCampaigns: any = {};
  public memberPagingData: any = {};
  public processSms: boolean;
  public processEmail: boolean;
  public listProfiles: boolean;
  public platformDropDown: boolean;

  //form data
  createCampaignData;
  campaignAudience;
  campaignPlatforms;
  campaignDesc;
  campaignCreateTap;


  private CampId: number;
  isTaxCertificate = false;
  public selectedOption: {};

  constructor(private restService: RestService, 
    private route: ActivatedRoute,  private router: Router, private location: Location) {}

  ngOnInit() {
    //this.userForm = this.formBuilder.group({
      //firstName: ['', [Validators.required, Validators.email]]
    //});
    this.createRunnableCampaign = {campaignId: 0, campaignDesc: "", audienceId: 0, platformId: 0}

    this.route.params.subscribe((parmas) => {
      console.log("================Id============="+parmas['id'])
      this.CampId = parmas['id'];
      this.getCampaignsData(this.CampId);
      //this.getCampaignsDataConfigsDashboard(this.CampId)

      this.createCampaignData = new FormGroup({
        campaignDesc: new FormControl('', Validators.compose([
          Validators.required
       ])),
      
       campaignAudience: new FormControl(''),
       campaignPlatforms: new FormControl(''),
       campaignCreateTap: new FormControl('')

     });

    });


  }

  getCampaignsData(CallID:number){
    this.restService.campaignById(CallID)
    .subscribe(data =>{
      //console.log(data)
      this.campaignsData = data;
      //console.log(this.campaignsData)

      this.getCampaignsDataConfigsDashboard(this.campaignsData.id)
    },
      (error)=>{
        console.log(error.error.message)
      }
    );

    console.log(this.isTaxCertificate);

  }

  getEventDetails(option:any){
    console.log("==========Event Active option======"+option);
    const result = this.campaignsConfigsPlatforms.listOptions.find(item => item.id == option);
    if(result.listValue == EventActive.EmailOnly){
      this.processEmail = true;
      this.processSms = false;
    } else if(result.listValue == EventActive.SmsAndEmail){
      this.processEmail = true;
      this.processSms = true;
    } else if(result.listValue == EventActive.SmsOnly){
      this.processEmail = false;
      this.processSms = true;
    }else{
      this.processEmail = false;
      this.processSms = false;
    }

  }

  getEventListProfiles(option:any){
    console.log("==========List Profile option======"+option)
    const result = this.campaignsConfigsAudience.listOptions.find(item => item.id == option);
    if(result.listValue == ListProfiles.MembersOnly){
      this.listProfiles = true;
      this.getMembetByPageNoAndSize(0);
    } else if(result.listValue == ListProfiles.PensionersOnly){
      this.getMembetByPageNoAndSize(0);
      this.listProfiles = true;
    }else{
      this.listProfiles = false;
    }
  }

  getMembetByPageNoAndSize(defaultPageNo:number){
    console.log("==========defaultPageNo======"+defaultPageNo)

    this.restService.pagingMeberByPageAndSize(defaultPageNo)
    .subscribe(data =>{
      console.log(data);
      this.memberPagingData = data;
    },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  getCampaignsDataConfigsDashboard(CallID:number){
    console.log("CallID===="+CallID);

  
    this.restService.ConfigDashboardCampaignById(CallID)
    .subscribe(data =>{
      //console.log(data)
      //this.campaignsConfigsType = data['documentType'];
      //this.campaignsConfigsPeriod = data['documentPeriod'];
      this.campaignsConfigsAudience = data['configsAudience'];
      this.campaignsConfigsPlatforms = data['availablePlatforms'];
      //console.log(this.campaignsConfigsType.active)
      //console.log(this.campaignsConfigsPeriod.active)
      console.log(this.campaignsConfigsAudience.active)
      console.log(this.campaignsConfigsPlatforms.active)
      //console.log(this.campaignsConfigsType.listOptions)


    },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

  onSubmitForm() {
    console.log(this.campaignDesc);
  }

  onClickSubmit(campaignID:number){

    console.log(this.campaignsData.campaignType);

    this.createRunnableCampaign.campaignId = campaignID;
    this.createRunnableCampaign.campaignDesc = this.createCampaignData.value.campaignDesc;
    this.createRunnableCampaign.audienceId = parseInt(this.createCampaignData.value.campaignAudience);
    this.createRunnableCampaign.platformId = parseInt(this.createCampaignData.value.campaignPlatforms);

    console.log(this.createRunnableCampaign);

    this.restService.createARunableCampaign(campaignID, this.createRunnableCampaign)
    .subscribe(data =>{
      console.log(data)
      this.createdRunnableCampaigns = data;
      this.location.go( '/campaign-setup/id/'+campaignID+'/campaign-code/'+this.campaignsData.campaignType+'/setupid/'+this.createdRunnableCampaigns.id);
    },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

}
