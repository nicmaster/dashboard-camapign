import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendSmsModel } from '../model/sendsms';
import { Http, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';
import { CreateRunnableCampaign} from '../model/CreateRunnableCampaign';

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

    ConfigDashboardCampaignById(campaignId:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'campaign/configs/campaignid/'+campaignId);
    }
    
    pagingMeberByPageAndSize(getPageNo:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.campaignManagerService+'/member/page/'+getPageNo+'/size/'+this.pageSize);
    }

    createARunableCampaign(campaignId:number, createRunnableCampaign:CreateRunnableCampaign){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post(this.campaignManagerService+'create/runnable/campaignid/'+this.pageSize, createRunnableCampaign);
    }
}