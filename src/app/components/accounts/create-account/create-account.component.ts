import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountServiceService } from '../../../services/account-service.service';
import { ToastServiceService } from '../../../services/toast-service.service';
import { Account, BIRTHDAY, EMAIL, USERNAME } from '../../../models/account.model';
import { AVATAR_IMAGE } from '../../../constants/constant-value-model';
import { DEFAULT_ACCOUNT_COLUMNS } from '../../../constants/column-value';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent{

  @ViewChild('fileInput') fileInput: ElementRef | any;

  selectedImage: any | null;

  avatar: string = AVATAR_IMAGE;

  accountForm!: FormGroup;

  accountFormSave!: FormGroup;

  isEdit: boolean = false;

  isAccountAdmin: boolean = false;

  @Output() dialogAccountNotification: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    @Inject(AccountServiceService) private accountService: AccountServiceService,
    private toastrService: ToastServiceService,
    private fb: FormBuilder
  ){

    this.initForm();
    if(this.data !== null){
      this.isEdit = true;
      accountService.getListAccount(0, 1, DEFAULT_ACCOUNT_COLUMNS, {id: data.id}).subscribe((data) => {
        const value = this.setCommonFormValues(data.data[0])
        this.accountForm.setValue(value);
        this.accountFormSave.setValue(value);

        //checking if adminn, not allow edit
        if(value.username == 'admin'){
          this.isAccountAdmin = true;
        }
        //Disable User name account
        this.accountForm.get(USERNAME)?.disable();
      })
    } 
  }

  // Define a function to set common values
  setCommonFormValues(result: any) {
    const parseDate = new Date(result.birthday);
    return {
      id: result.id,
      username: result.username,
      birthday: parseDate,
      email: result.email,
      gender: result.gender ? 'true' : 'false',
      mfaEnabled: result.mfaEnabled,
      mfaRegistered: result.mfaRegistered
    };
  }

  initForm(): void {
    this.accountForm = this.initFormAccount();
    this.accountFormSave = this.initFormAccount();
  }

  initFormAccount(){
    return this.fb.group({
      id: [null],
      username:  ['', Validators.required],
      birthday:  ['', Validators.required],
      email:  ['', Validators.required],
      gender:  ['true'],
      mfaEnabled: [true],
      mfaRegistered: [true]
    });
  }

  getErrorMessage(nameField: string) {
    return this.accountForm.get(nameField)!.hasError('required') ? 'You must enter a ' + nameField + ' value' : '';
  }

  onClear(){
    if(this.isEdit){
      this.accountForm.patchValue(this.accountFormSave.value)
    }else{
      this.accountForm.get(USERNAME)!.setValue('');
      this.accountForm.get(BIRTHDAY)!.setValue('');
      this.accountForm.get(EMAIL)!.setValue('');
    }
  } 

  onSubmit(){
    if(this.isAccountAdmin){
      this.toastrService.getPopUpErrorTypeString("Admin Can't edit");
      return;
    }
    if(this.accountForm.invalid){
      return;
    }
    const formData: Account = this.accountForm.value;
    if(this.isEdit){
      this.handleResponseSubscription(this.accountService.updateAccount(formData), 'Account Update Success');
    }else{
      this.handleResponseSubscription(this.accountService.createAccount(formData), 'Account Create Success');
    }
  }

  // Define a common function to handle subscription
  handleResponseSubscription(subscriptionObservable: Observable<any>, successMessage: string) {
    subscriptionObservable.subscribe({
      next:() => {
        this.toastrService.getPopUpSuccess(successMessage);
      },
      error:(error) =>{
        this.toastrService.getPopUpError(error);
      }
    })
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

  selectFile() {
    this.fileInput.nativeElement.click();
  }
}
