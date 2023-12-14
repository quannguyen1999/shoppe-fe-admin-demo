import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { listAccounts } from '../../../constants/account-value-model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit{

  isEdit: boolean = false;

  @Input() username = new FormControl('', [Validators.required, Validators.email]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string}){
    if(this.data !== null){
      let username = listAccounts.find(t => t.id.toString() == data.id)?.username; 
      if(data && data.id){
        this.isEdit = true;
        this.username.setValue(username || '');
      }
    }
   
  }

  ngOnInit(): void {
  
  }
  

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.username.hasError('username') ? 'Not a valid username' : '';
  }

  onClear(){
    this.username.setValue('');
  } 

  onSubmit(){
    console.log(this.username.value)
  }
}
