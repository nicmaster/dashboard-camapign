import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'
import { RestService} from "../../services/rest.service";
import { Router  , ActivatedRoute } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  userForm: FormGroup;
  public campaignsData: any = {};
  public campaignsConfigsType: any = {};
  public campaignsConfigsPeriod: any = {};
  public campaignsConfigsAudience: any = {};
  public campaignsConfigsPlatforms: any = {};
  public processSms: boolean;
  public processEmail: boolean;
  
  //form data
  createCampaignData;
  documentTypeDropList;
  campaignDesc;


  private CampId: number;
  isTaxCertificate = false;

  constructor(private restService: RestService, 
    private route: ActivatedRoute,  private router: Router) {}

  ngOnInit() {
    //this.userForm = this.formBuilder.group({
      //firstName: ['', [Validators.required, Validators.email]]
    //});

    this.route.params.subscribe((parmas) => {
      console.log(parmas['id'])
      this.CampId = parmas['id'];
      this.getCampaignsData(this.CampId);
      //this.getCampaignsDataConfigsDashboard(this.CampId)

      this.createCampaignData = new FormGroup({
        campaignDesc: new FormControl('', Validators.compose([
          Validators.required
       ])),
      
       documentTypeDropList: new FormControl('', Validators.compose([
          Validators.required
       ]))
        //if(this.campaignsConfigsType.active == true){}
     });

    });
  }

  getCampaignsData(CallID:number){
    this.restService.campaignById(CallID)
    .subscribe(data =>{
      console.log(data)
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

  getEventDetails(option:string){
    console.log("==========option======"+option)
    if(option == "EMAIL ONLY"){
      this.processEmail = true;
    } else if(option == "EMAIL AND SMS"){
      this.processEmail = true;
      this.processSms = true;
    } else{
      this.processEmail = false;
      this.processSms = false;
    }

  }

  getCampaignsDataConfigsDashboard(CallID:number){
    console.log("CallID===="+CallID);

  
    this.restService.ConfigDashboardCampaignById(CallID)
    .subscribe(data =>{
      console.log(data)
      this.campaignsConfigsType = data['documentType'];
      this.campaignsConfigsPeriod = data['documentPeriod'];
      this.campaignsConfigsAudience = data['targetAudience'];
      this.campaignsConfigsPlatforms = data['availablePlatforms'];
      console.log(this.campaignsConfigsType.active)
      console.log(this.campaignsConfigsPeriod.active)
      console.log(this.campaignsConfigsAudience.active)
      console.log(this.campaignsConfigsPlatforms.active)
      console.log(this.campaignsConfigsType.listOptions)


    },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

  onSubmitForm() {
    console.log(this.userForm);
  }
}
