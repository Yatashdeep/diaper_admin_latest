import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';

import { ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import{FormBuilder,FormGroup,Validator, Validators,AbstractControl }from'@angular/forms'
import{SecurityService}from'../../security.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ChartsService]
})
export class IndexComponent implements OnInit {
	
	 @ViewChild('epltable') epltable: ElementRef;
  clubs = [
    {
      position: 1,
      name: "Liverpool",
      played: 20,
      won: 19,
      drawn: 1,
      lost: 0,
      points: 58
    },
    {
      position: 2,
      name: "Leicester City",
      played: 21,
      won: 14,
      drawn: 3,
      lost: 4,
      points: 45
    },
    {
      position: 3,
      name: "Manchester City",
      played: 21,
      won: 14,
      drawn: 2,
      lost: 5,
      points: 44
    },
    {
      position: 4,
      name: "Chelsea",
      played: 21,
      won: 11,
      drawn: 3,
      lost: 7,
      points: 36
    },
    {
      position: 5,
      name: "Manchester United",
      played: 21,
      won: 8,
      drawn: 7,
      lost: 6,
      points: 31
    }
   ];
   
  showloading: boolean = false;

  public AnimationBarOption;

  TitleMsg:any="Title";
  MessageMsg:any="Message Body";
  LocationMsg:any="Location";
  signupform
  constructor(public formBuilder:FormBuilder,private _chartsService: ChartsService,public security:SecurityService) { 
    this.signupform=formBuilder.group({
     
      title: ['', Validators.required],
      message: ['', Validators.required],
    })
   
  }  

  ngOnInit() {
    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    this.loadData(); 
  }
  
  loadData() {
    this.security.GetFetchAll().subscribe(data=>{ 
      console.log("default_data==",data); 
        this.clubs=data["message"]; 
    })
}

    exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }

  onKeyTitle(event){
    if(event.target.value == ""){
      this.TitleMsg="Title";
    }
    else {
      this.TitleMsg=event.target.value;
      
    }
  console.log(event.target.value);
  }
   onKeyMessage(event){
       if(event.target.value == ""){
      this.MessageMsg="Message Body";
    }
    else {
      this.MessageMsg=event.target.value;
    }
    console.log(event.target.value);
  }

  onKeyLocation(event){
       if(event.target.value == ""){
      this.LocationMsg="Location";
    }
    else {
      this.LocationMsg=event.target.value;
    }
    console.log(event.target.value);
  }
  sendbutton()
  {

    this.security.sendnotifications(this.signupform.get('title').value,this.signupform.get('message').value).subscribe(data=>{ 
      console.log("default_data==",data); 
        console.log(data["status"])
        if(data["status"]=="success")
        {
          alert(data["message"])
          this.signupform.get('title').value=""
          this.signupform.get('message').value=""
          this.signupform.reset()
        }
    })
  }

}
