import { Injectable } from '@angular/core';
import{ENV}from'./pages/env'
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { 

  }
  getuserdata()
  {
   
     return this.httpClient.get(ENV.mainApi+'/user_detail')
     .pipe(map(data=>{
      return data
     }))
    }

    
    getfetchrating()
    {
      return this.httpClient.get(ENV.mainApi+'/fetch_rating')
      .pipe(map(data=>{
        return data
      }))
    }
sendnotifications(title,message)
{
  let options={
    "heading":title,
    "content":message
  }
  return this.httpClient.post(ENV.mainApi+'/sendnotification',options).pipe(map(data=>{
    return data
  }))
}

    GetFetchAll() {
      return this.httpClient.get('https://health-application.herokuapp.com/fetch_all').pipe(map(data=>{  return data; }));
    }
  

}
