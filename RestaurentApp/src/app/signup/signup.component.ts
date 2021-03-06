import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signpForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private _http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signpForm=this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:['']
    })
  }
  //make method to create user
  signUp(){
    this._http.post<any>("http://localhost:3000/signup",this.signpForm.value).subscribe(res=>{
      alert("Signup Successfull..");
      this.signpForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("Somthing went wrong..!")
    })
  }

}
