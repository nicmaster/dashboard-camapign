import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendSmsModel } from '../model/sendsms';
import { Http, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class RestService {
    private campaignManagerService: string = environment.serviceURL;
    private localService: string = environment.localServiceURL;
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
        return this.http.get(this.localService+'/campaigns');
    }

    campaignById(campaignId:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.localService+'/campaign/'+campaignId);
    }

    ConfigDashboardCampaignById(campaignId:number){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.get<any>(this.localService+'/configs/campaign/'+campaignId);
    }
}