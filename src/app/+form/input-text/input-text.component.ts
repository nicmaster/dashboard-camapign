import { Component, OnInit, ElementRef } from '@angular/core';
import {Location} from '@angular/common'
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'
import { RestService} from "../../services/rest.service";
import { Router  , ActivatedRoute } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';
import { EventActive} from '../../model/EventActive';
import { EventTaps} from '../../model/EventTaps';
import { ListProfiles} from '../../model/ListProfiles';
import { CreateRunnableCampaign} from '../../model/CreateRunnableCampaign';
import { CreateFunctionalTaps} from '../../model/CreateFunctionalTaps';
import { SendSmsModel} from '../../model/sendsms';
import {SendMockTestSmsModel } from '../../model/SendMockTestSmsModel';
import Inputmask from "inputmask";
import { stringify } from '@angular/core/src/util';
import { FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload/ng2-file-upload';
import { environment} from '../../../environments/environment';
import { KeycloakService} from 'keycloak-angular';
import { CompleteModel} from '../../model/CompleteModel';
import { MockSendCampaignModel} from '../../model/MockSendCampaignModel';
const URL = environment.serviceURL+'/file/upload';

@Component({
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  public fileToUpload: File = null
  private addfile: Array<File> = [];

  userForm: FormGroup;
  createRunnableCampaign: CreateRunnableCampaign;
  createFunctionalTaps: CreateFunctionalTaps;
  sendSmsModel: SendSmsModel;
  sendMockSmsModel: SendMockTestSmsModel;
  completeModel: CompleteModel;
  mockSendCampaignModel: MockSendCampaignModel;

  public campaignsData: any = {};
  public scheduleCampaign: any = {};
  public campaignsConfigsType: any = {};
  public campaignsConfigsPeriod: any = {};
  public campaignsConfigsAudience: any = {};
  public campaignsConfigsPlatforms: any = {};
  public campaignsConfigsTemplates: {};
  public createdRunnableCampaigns: any = {};
  public memberPagingData: any = {};
  public UploadedmemberPagingData: any = {};
  public eventTapsCampaign: any = {};
  public testSmsCamData: any = {};
  public processSms: boolean;
  public processEmail: boolean;
  public processComplete: boolean;
  public processReport: boolean;
  public listProfiles: boolean;
  public listOfUploadedProfiles: boolean;
  public fileOptionUploader: boolean;
  public platformDropDown: boolean;
  public createButtonCampaign: boolean;
  public updateButtonCampaign: boolean;
  public showCreateTemplate: boolean;
  public showSmsTemplate: boolean;
  public showEmailTemplate: boolean;
  public showCompleteTemplate: boolean;
  public CampId: number;
  public setupid: number;
  public eventCreateCampaign: string;
  public eventSmsCampaign: string;
  public eventEmailCampaign: string;
  public eventCompleteCampaign: string;
  //form data
  createCampaignData;
  campaignAudience;
  campaignPlatforms;
  campaignDocumentType;
  campaignDesc;
  campaignCreateTap;
  testSmsMessage;
  testSmsNumber;
  fileUploadControl;
  emailSubjectMessage;

  isTaxCertificate = false;
  public selectedOption: {};

  constructor(private restService: RestService, 
    private route: ActivatedRoute,  private router: Router, private location: Location,private element: ElementRef, protected keycloak: KeycloakService) {
      this.setInputMask(element);
    }

    private setInputMask(element: ElementRef) {
      // Get the value of the mask attribute
      const mask = element.nativeElement.getAttribute('mask');
  
      if (mask) {
          // Set the input mask and then mask the element the directive was used on
          Inputmask({ 'mask': mask }).mask(element);
      }
  }
  ngOnInit() {
    this.createRunnableCampaign = {campaignId: 0, scheduleCampaignId: 0, campaignDesc: "", campaignName: "", audienceId: 0, platformId: 0, templateId: 0, campaignType: "", fileName: ""}
    this.createFunctionalTaps = {setUpId: 0, campaignId: 0, eventTaps: "", active: false}
    this.sendSmsModel = {cellNumber:"", message:"", userId: ""}
    this.sendMockSmsModel = {cellNumber:"", message:"", firstName: "", lastName:"", userId: ""}
    this.completeModel = {campaignDesc: "", firstName: "", lastName: "", smsMessage: "", emailSubject: ""}
    this.mockSendCampaignModel = {campaignId:0, scheduleCampaignId:0, email: "", initials: "", title: "", surname: ""}

    this.route.params.subscribe((parmas) => {
      this.CampId = parmas['id'];
      this.setupid = parmas['setupid'];
      if(this.setupid != null && this.CampId != null){
        console.log("================setupid============="+parmas['setupid'])
        this.updateCampaignSetup(this.setupid, this.CampId);​
      }else if(this.CampId != null){
        console.log("================Id============="+parmas['id'])
        this.createButtonCampaign = true;
        this.eventCreateCampaign = 'PROCESS CAMPAIGN';
        this.eventSmsCampaign ='INCOMPLETE';
        this.eventEmailCampaign = 'INCOMPLETE';
        this.eventCompleteCampaign = 'INCOMPLETE';
        this.showCreateTemplate = true;
        this.getCampaignsData(this.CampId);

      } else{
        this.router.navigate(['/']);
      }

      Inputmask().mask(document.querySelectorAll("input"));

      this.createCampaignData = new FormGroup({
        campaignDesc: new FormControl('', Validators.compose([
          Validators.required
       ])),
      
       campaignAudience: new FormControl(''),
       campaignPlatforms: new FormControl(''),
       campaignCreateTap: new FormControl(''),
       campaignDocumentType: new FormControl(''),
       testSmsMessage: new FormControl(''),
       testSmsNumber: new FormControl(''),
       emailSubjectMessage: new FormControl(''),
       fileUploadControl: new FormControl('')

     });

    });
    
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    console.log(data);
    if(data != null){
      this.listOfUploadedProfiles = true;
      this.UploadedmemberPagingData = data;
    }
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
      this.listOfUploadedProfiles = false;
      this.getMembetByPageNoAndSize(0);
    } else if(result.listValue == ListProfiles.PensionersOnly){
      this.getMembetByPageNoAndSize(0);
      this.listProfiles = true;
      this.listOfUploadedProfiles = false;
    } else if(result.listValue == ListProfiles.FileUpload){
      this.fileOptionUploader = true;
      console.log("==========File Upload func======"+result.listValue)
    }
      else{
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
      this.campaignsConfigsTemplates = data['configsTemplate']​

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
    if(this.createCampaignData.value.campaignDocumentType.length > 0){
      this.scheduleCampaignById(this.CampId, parseInt(this.createCampaignData.value.campaignDocumentType));
      }else{
      this.scheduleCampaignById(this.CampId, 0);
    }
    this.createRunnableCampaign.campaignId = campaignID;
    this.createRunnableCampaign.scheduleCampaignId = this.scheduleCampaign.id;
    this.createRunnableCampaign.campaignDesc = this.createCampaignData.value.campaignDesc;
    this.createRunnableCampaign.audienceId = parseInt(this.createCampaignData.value.campaignAudience);
    this.createRunnableCampaign.platformId = parseInt(this.createCampaignData.value.campaignPlatforms);
    this.createRunnableCampaign.campaignName = this.campaignsData.campaignName;
    this.createRunnableCampaign.campaignType = this.campaignsData.campaignType;

    if(this.createCampaignData.value.campaignDocumentType.length > 0){
      this.createRunnableCampaign.templateId = parseInt(this.createCampaignData.value.campaignDocumentType);
      }else{
      this.createRunnableCampaign.templateId = 0;
    }

    if(this.addfile.length > 0 && this.addfile != null){
      this.createRunnableCampaign.fileName = this.addfile[0].name;
    }


    console.log(this.createRunnableCampaign);

    this.restService.createARunableCampaign(campaignID, this.createRunnableCampaign)
    .subscribe(data =>{
      console.log(data)
      this.createdRunnableCampaigns = data;
      this.PostCreateFunctionalTaps(campaignID,this.createdRunnableCampaigns.id)
      this.location.go( '/campaign-setup/id/'+campaignID+'/campaign-code/'+this.campaignsData.campaignType+'/setupid/'+this.createdRunnableCampaigns.id);
      this.createButtonCampaign = false;
      this.updateButtonCampaign = true;
      this.showCreateTemplate = false;
      if(this.processSms == true)
      {
        this.showSmsTemplate = true;
        this.eventSmsCampaign ='PROCESS CAMPAIGN';
      } else if(this.processEmail== true){
        this.showSmsTemplate = false;
        this.showEmailTemplate = true;
        this.eventEmailCampaign = 'PROCESS CAMPAIGN';
      }else{
        this.showCompleteTemplate = true;
      }
          
    },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

  PostCreateFunctionalTaps(campaignID:number, setUpId:number){

    this.createFunctionalTaps.active = true;
    this.createFunctionalTaps.campaignId = campaignID;
    this.createFunctionalTaps.eventTaps = EventTaps.CreateCampaign;
    this.createFunctionalTaps.setUpId = setUpId;

    this.restService.createFuncatonalTapsRest(this.createFunctionalTaps)
    .subscribe(data =>{
      console.log(data);
      this.eventTapsCampaign = data;
      this.eventCreateCampaign = this.eventTapsCampaign.eventTaps;
  },
    (error)=>{
      console.log(error.error.message)
    }
  );

  }

  onClickSubmitTestSms(){

    console.log("=====testDataSms==="+this.createCampaignData.value.testSmsMessage)
    console.log("=====testNumber==="+this.createCampaignData.value.testSmsNumber)

    this.sendMockSmsModel.cellNumber = this.createCampaignData.value.testSmsNumber;
    this.sendMockSmsModel.message = this.createCampaignData.value.testSmsMessage;
    this.sendMockSmsModel.firstName = this.keycloak.getKeycloakInstance().profile.firstName;
    this.sendMockSmsModel.lastName = this.keycloak.getKeycloakInstance().profile.lastName;
    this.sendMockSmsModel.userId = this.keycloak.getKeycloakInstance().profile.username;
    this.restService.sendMockTestSms(this.sendMockSmsModel)
    .subscribe(data =>{
      console.log(data)
    },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

  FileUploader(file: FileList){
    console.log("uploading button for a single file");
    console.log(file.item(0).name);
    console.log(file.item(0).size);
    
  this.addfile.push(file[0]);

    this.uploader.addToQueue(this.addfile)
  }

  onClickSmsProceed(){
    this.createFunctionalTaps.active = true;
    this.createFunctionalTaps.campaignId = this.CampId;
    this.createFunctionalTaps.eventTaps = EventTaps.SmsOnly;
    this.createFunctionalTaps.setUpId = this.createdRunnableCampaigns.id;

    this.restService.createFuncatonalTapsRest(this.createFunctionalTaps)
    .subscribe(data =>{
      console.log(data);
      this.eventTapsCampaign = data;
      this.eventCreateCampaign = this.eventTapsCampaign.eventTaps;
      this.populateCompleteModel();
      this.updateSmsMessage(this.createdRunnableCampaigns.id,this.createCampaignData.value.testSmsMessage);

      if(this.processEmail== true){
        this.showSmsTemplate = false;
        this.showEmailTemplate = true;
        this.eventEmailCampaign = 'PROCESS CAMPAIGN';
      }else{
        this.showCompleteTemplate = true;
        this.showSmsTemplate = false;
        this.showEmailTemplate = false;
      }
  },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  onClickEmailProceed(){
    this.createFunctionalTaps.active = true;
    this.createFunctionalTaps.campaignId = this.CampId;
    this.createFunctionalTaps.eventTaps = EventTaps.EmailOnly;
    this.createFunctionalTaps.setUpId = this.createdRunnableCampaigns.id;

    this.restService.createFuncatonalTapsRest(this.createFunctionalTaps)
    .subscribe(data =>{
      console.log(data);
      this.eventTapsCampaign = data;
      this.eventCreateCampaign = this.eventTapsCampaign.eventTaps;
      this.showSmsTemplate = false;
      this.showEmailTemplate = false;
      this.showCompleteTemplate = true;
      this.populateCompleteModel();
  },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  onClickCompleteProceed(){
    this.createFunctionalTaps.active = true;
    this.createFunctionalTaps.campaignId = this.CampId;
    this.createFunctionalTaps.eventTaps = EventTaps.Complete;
    this.createFunctionalTaps.setUpId = this.createdRunnableCampaigns.id;

    this.restService.createFuncatonalTapsRest(this.createFunctionalTaps)
    .subscribe(data =>{
      console.log(data);
      this.eventTapsCampaign = data;
      this.eventCreateCampaign = this.eventTapsCampaign.eventTaps;
      this.showSmsTemplate = false;
      this.showEmailTemplate = false;
      this.showCompleteTemplate = true;
      this.completeCampaign(this.createdRunnableCampaigns.id);
      this.router.navigate(['campaign-manager'])
  },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  populateCompleteModel(){
    this.completeModel.firstName = this.keycloak.getKeycloakInstance().profile.firstName;
    this.completeModel.lastName = this.keycloak.getKeycloakInstance().profile.lastName;
    this.completeModel.campaignDesc = this.createCampaignData.value.campaignDesc;
    this.completeModel.smsMessage = this.createCampaignData.value.testSmsMessage;
    this.completeModel.emailSubject = this.createCampaignData.value.emailSubjectMessage;
  }

  completeCampaign(setUpId:number){
    this.restService.completeCampaingRest(setUpId)
    .subscribe(data =>{
      console.log(data);
  },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  scheduleCampaignById(campaignID:number, templateId:number){
    this.restService.scheduleCampaignById(campaignID, templateId)
    .subscribe(data =>{
      console.log(data);
      this.scheduleCampaign = data;
  },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  onClickMockEmail(){
    this.mockSendCampaignModel.campaignId = this.CampId;
    this.mockSendCampaignModel.scheduleCampaignId = this.scheduleCampaign.id
    this.mockSendCampaignModel.email = this.keycloak.getKeycloakInstance().profile.email;
    this.mockSendCampaignModel.initials = this.keycloak.getKeycloakInstance().profile.firstName;
    this.mockSendCampaignModel.surname = this.keycloak.getKeycloakInstance().profile.lastName;

    this.restService.mockSendCampaignTest(this.mockSendCampaignModel)
    .subscribe(data =>{
      console.log(data);
      this.scheduleCampaign = data;
  },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  updateSmsMessage(setUpId:number, message: string){
    this.sendSmsModel.message = message;
  this.restService.updateSmsMessage(setUpId,this.sendSmsModel)
    .subscribe(data =>{
      console.log(data);
      this.scheduleCampaign = data;
  },
    (error)=>{
      console.log(error.error.message)
    }
  );
  }

  updateCampaignSetup(setUpId:number, campaignID:number){
    this.updateButtonCampaign = true;
    this.getCampaignsData(campaignID);
    this.showCreateTemplate = true;
    this.restService.pagRunnableSetupCampaign(setUpId)
      .subscribe(data =>{
      console.log(data);
      this.createRunnableCampaign = data;
      console.log(this.createRunnableCampaign);
  
      this.createCampaignData.controls['campaignDesc'].setValue(this.createRunnableCampaign.campaignDesc);
      if(this.createRunnableCampaign.audienceId > 0){
        this.createCampaignData.controls['campaignAudience'].setValue(this.createRunnableCampaign.audienceId, {onlySelf: true})
      }
      
      if(this.createRunnableCampaign.platformId > 0){
        this.createCampaignData.controls['campaignPlatforms'].setValue(this.createRunnableCampaign.platformId, {onlySelf: true})
      }
    
    },
      (error)=>{
      console.log(error.error.message)
      }
    
    );
  }
}
