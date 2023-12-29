import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { listAccounts } from '../../../constants/account-value-model';
import { AccountServiceService } from '../../../services/account-service.service';
import { MessageService } from 'primeng/api';
import { ToastServiceService } from '../../../services/toast-service.service';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit{

  accountForm!: FormGroup;

  isEdit: boolean = false;

  // @Input() username = new FormControl('', [Validators.required, Validators.email]);

  @Output() dialogAccountNotification: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    @Inject(AccountServiceService) private accountService: AccountServiceService,
    private toastrService: ToastServiceService,
    private fb: FormBuilder
  ){
  
    this.initForm();
    // if(this.data !== null){
    //   let username = listAccounts.find(t => t.id.toString() == data.id)?.username; 
    //   if(data && data.id){
    //     this.isEdit = true;
    //     this.username.setValue(username || '');
    //   }
    // }
   
  }

  initForm(): void {
    this.accountForm = this.fb.group({
      id: [null],
      username:  ['', Validators.required]
    })
  }

  ngOnInit(): void {
  
  }
  

  getErrorMessage() {
    if (this.accountForm.get('username')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.accountForm.get('username')!.hasError('username') ? 'Not a valid username' : '';
  }

  onClear(){
    this.accountForm.get('username')!.setValue('');
  } 

  onSubmit(){
    const formData: Account = this.accountForm.value;
    this.accountService.createAccount(formData).subscribe(
      (response) => {
        this.dialogAccountNotification.emit();
        this.toastrService.getPopUpSuccess('Account Create Success');
      }, 
      (error) => {
        this.toastrService.getPopUpError(error);
      }
    )

    

    
  }
}
