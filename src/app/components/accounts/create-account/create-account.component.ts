import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { listAccounts } from '../../../constants/account-value';
import { AccountServiceService } from '../../../services/account-service.service';
import { MessageService } from 'primeng/api';
import { ToastServiceService } from '../../../services/toast-service.service';
import { Account, BIRTHDAY, EMAIL, USERNAME } from '../../../models/account.model';
import { AVATAR_IMAGE } from '../../../constants/constant-value-model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit{

  selectedImage: any | null;

  avatar: string = AVATAR_IMAGE;

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
      username:  ['', Validators.required],
      birthday:  ['', Validators.required],
      email:  ['', Validators.required],
      gender:  ['true']
    })
  }

  ngOnInit(): void {
  
  }
  

  getErrorMessage(nameField: string) {
    //Check User name
    if (this.accountForm.get(nameField)!.hasError('required')) {
      return 'You must enter a ' + nameField + ' value';
    }

    return this.accountForm.get(USERNAME)!.hasError(USERNAME) ? 'Not a valid username' : '';
  }

  onClear(){
    this.accountForm.get(USERNAME)!.setValue('');
    this.accountForm.get(BIRTHDAY)!.setValue('');
    this.accountForm.get(EMAIL)!.setValue('');
  } 

  onSubmit(){
    if(this.accountForm.invalid){
      return;
    }
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

  onFileSelected(event: any){
    const file = event.target.files[0];

    if (file) {
      // Read the selected image file and convert it to a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
