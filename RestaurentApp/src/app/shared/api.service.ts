import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  // here i will deine the POST,GET,PUT,DELETE
  //create restaurent using post
  postRestaurent(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
    return res;
    }))
  }
  //GET restaurent data
  getRestaurent(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  //Update Restaurent using PUT
  updateResturent(data:any,id:number){
    return this._http.put<any>("http://localhost:3000/posts"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  //Delete Restaurent datausing Delete Method
  deleteRestaurent(id:number){
    return this._http.delete<any>("http://localhost:3000/posts"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
