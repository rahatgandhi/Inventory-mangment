import { Component, OnInit } from '@angular/core';
import { Itemtype} from "./itemtype.model";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
public addItemForm: FormGroup;
 public model= new Itemtype('');
 public displayItemarray = [];
 public submitted:boolean = false;
 public isloading = false;

  
  constructor(private formBuilder: FormBuilder,
            private commonService:CommonService,
            private router: Router,
            private _snackBar: MatSnackBar
           ) {
            
  // this.displayItemarray =[{name: 'Test', price: 5, description: 'test'},{name: 'Test', price: 4, description: 'test'}]
   }

  ngOnInit() {
    this.getdata();
    this.addItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
  });
}
get f() { return this.addItemForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.addItemForm.invalid) {
      return;
  }
    this.saveData(this.addItemForm.value);
    this.displayItemarray.push(this.addItemForm.value);
    this.addItemForm.reset();
    this.submitted = false;
    console.log(this.addItemForm.value);
    
  }
  deleterow(index){
    console.log(index);
    let x =confirm("Are you sure To delete ?");
    console.log(x);
    if(x){
    this.commonService.deleteData('/'+index)
    .subscribe(response => {
      this.getdata()
     //this.displayItemarray = response;
     }, (err) => {
     });
    }
  }
  getdata(){
    this.isloading = true;
    this.commonService.getData('')
     .subscribe(response => {
       this.isloading =false;
      this.displayItemarray = response;
      }, (err) => {
      });
  }
  showbyId(id){
    this.router.navigate(['/view-item/'+id]);
  }

  saveData(data){
    this.commonService.postData('',data).
    subscribe(res=>{
      this.openSnackBar();
      this.getdata();
     
    })
  }
  openSnackBar() {
    let message ="Successfully Created ";
    let action ="Sucess";
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
