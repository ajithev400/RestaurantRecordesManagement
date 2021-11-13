import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj: RestaurentData = new RestaurentData
  allRestaurentData: any;
  showAdd!: boolean
  showbtn!: boolean

  constructor(private formBulder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBulder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    })
    this.getAllData()
  }
  clickAddResto() {
    this.formValue.reset();
    this.showAdd = true
    this.showbtn = false
  }
  //Now Subscribing our data which is mapped via Serveces
  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.service = this.formValue.value.service;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Recodes Added Sucessffull");
      //clear fill forn data
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();//for instant update
    },
      err => {
        alert("Somthing went wrong..!")
      }
    )

  }
  //GET all data
  getAllData() {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData = res;
    })
  }
  //Delete recodes
  deleteResto(data: any) {
    this.api.deleteRestaurent(data.id).subscribe(res => {
      alert("Restaurent Recodes Deleted.")
      this.getAllData();//for instant update
    })
  }
  onEditResto(data: any) {
    this.showAdd = true
    this.showbtn = false
    this.restaurentModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto(date: any) {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.service = this.formValue.value.service;

    this.api.updateResturent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res => {
      alert("Restaurent Records Updated");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();//for instant update
    })
  }
}
