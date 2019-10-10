import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendSmsModel } from '../model/sendsms';
import {SendMockTestSmsModel } from '../model/SendMockTestSmsModel';
import { Http, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';
import { CreateRunnableCampaign} from '../model/CreateRunnableCampaign';
import { CreateFunctionalTaps} from '../model/CreateFunctionalTaps';
import { PersonSearch} from '../model/PersonSearch';
import { KeyCloackOauth} from '../model/KeyCloackOauth';
import { from } from 'rxjs';
import { MockSendCampaignModel} from '../model/MockSendCampaignModel';

@Injectable()
export class RestService {
    private campaignManagerService: string = environment.serviceURL;
    private pageSize: number = environment.pageSize;
    constructor(private http: HttpClient) { }

    sendSms(sendSms:SendSmsModel){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'/send/sms', sendSms);
    }

    smsHistoryListByUserID(userID:string, pageNo:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get(this.campaignManagerService+'/sms/history/userid/'+userID+'/page/'+pageNo+'/pagesize/'+this.pageSize);
    }

    listOfCampaigns(){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get(this.campaignManagerService+'/campaign/list');
    }

    campaignById(campaignId:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/campaign/id/'+campaignId);
    }

    scheduleCampaignById(campaignId:number, templateID:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/schedule/campaign/id/'+campaignId+'/templateID/'+templateID);
    }

    ConfigDashboardCampaignById(campaignId:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/campaign/configs/campaignid/'+campaignId);
    }
    
    pagingMeberByPageAndSize(getPageNo:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/member/page/'+getPageNo+'/size/'+this.pageSize);
    }

    createARunableCampaign(campaignId:number, createRunnableCampaign:CreateRunnableCampaign){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'/create/runnable/campaignid/'+campaignId, createRunnableCampaign);
    }

    createFuncatonalTapsRest(createFunctionalTaps:CreateFunctionalTaps){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'/create/functional/taps', createFunctionalTaps);
    }

    listPagingScheduleCampaignByPageAndSize(getPageNo:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/managed/scheduled/page/'+getPageNo+'/size/'+this.pageSize);
    }

    personRetrieve(getPageNo:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/managed/scheduled/page/'+getPageNo+'/size/'+this.pageSize);
    }
    personSearch(personSearch:PersonSearch){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post("http://127.0.0.1:8091/api/v1/person/search", personSearch);
    }

    getSmsHistoryStatsByUserID(userID:string){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/sms/history/stats/userid/'+userID);
    }

    resendSmsEventRest(eventID:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/sms/resend/id/'+eventID);
    }

    getSmsMetadatById(eventID:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/sms/id/'+eventID);   
    }​

    userKeycloakLogout(keyCloackOauth: KeyCloackOauth){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'/user/logout', keyCloackOauth);
    }

    sendMockTestSms(sendmockSms:SendMockTestSmsModel){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'/mock/test/send/sms', sendmockSms);
    }

    completeCampaingRest(setUpId:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/complete/setup/id/'+setUpId);
    }

    mockSendCampaignTest(mockSendCampaign:MockSendCampaignModel){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'/mock/send/mail', mockSendCampaign);
    }

    updateSmsMessage(setUpId:number, sendSmsModel: SendSmsModel){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'/update/setup/message/'+setUpId, sendSmsModel);
    }

    GetListbusinessConnect(){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/business/connect/list');
    }​

    GetSmsHistoryByConnectIDAndDateRange(id:number, startdate:string, enddate:string, pageNo:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/sms/history/business/id/'+id+'/startdate/'+startdate+'/enddate/'+enddate+'/page/'+pageNo+'/size/'+this.pageSize);
    }

    pagRunnableSetupCampaign(id:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/view/runnable/setup/id/'+id);
    }​
}