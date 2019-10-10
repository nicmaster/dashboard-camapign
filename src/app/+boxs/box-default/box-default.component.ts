import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import {IMyDpOptions} from 'mydatepicker';
import { RestService} from "../../services/rest.service";

import * as Prism from 'prismjs';

@Component({
  templateUrl: './box-default.component.html',
  styleUrls: ['./box-default.component.css']
})
export class BoxDefaultComponent implements OnInit {
  public businessConnectList: {};
  public searchResults: boolean;
  public searchDateRange: string;
  public smsPagingData: any = {};

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy',
};

 myForm: FormGroup;

constructor(private formBuilder: FormBuilder, private restService: RestService) { 

}

  ngOnInit() {
    this.getListbusinessConnect();

    this.myForm = this.formBuilder.group({
      // Empty string or null means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.

      myDate: [null, Validators.required],
      myEndate: [null, Validators.required], 
      businessUnitOptions: [null, Validators.required]
      // other controls are here...
  });

  }
  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();
    this.myForm.patchValue({myDateRange: {
        beginDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        },
        endDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }});
}

clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({myDate: null});
}

onClickSubmit(){
  this.searchResults = true;
  this.searchDateRange = this.myForm.value.myDate.formatted+' - '+this.myForm.value.myEndate.formatted;
  this.smsPaggingDataList(0);

}

getListbusinessConnect(){
  this.restService.GetListbusinessConnect()
  .subscribe(data =>{
    console.log(data);
    this.businessConnectList = data;
  },
  (error)=>{
    console.log(error.error.message)
  }
);

}

smsPaggingDataList(defaultPageNo:number){
  this.restService.GetSmsHistoryByConnectIDAndDateRange(parseInt(this.myForm.value.businessUnitOptions),
    this.myForm.value.myDate.formatted, this.myForm.value.myEndate.formatted, defaultPageNo)
  .subscribe(data =>{
      this.smsPagingData = data;
  },
  (error)=>{
    console.log(error.error.message)
  }
);
}
 
}
