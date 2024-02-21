import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountServiceService } from '../../../services/account-service.service';
import { ToastServiceService } from '../../../services/toast-service.service';
import { Account, BIRTHDAY, EMAIL, USERNAME, AccountRequestModel } from '../../../models/account.model';
import { AVATAR_IMAGE } from '../../../constants/constant-value-model';
import { DEFAULT_ACCOUNT_COLUMNS } from '../../../constants/column-value';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit{

  @ViewChild('fileInput') fileInput: ElementRef | any;

  selectedImage: any | null;

  avatar: string = AVATAR_IMAGE;

  accountForm!: FormGroup;

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
        const result = data.data[0];
        const parseDate = new Date(result.birthday);

        this.accountForm.setValue({
          id: result.id,
          username: result.username,
          birthday: parseDate,
          email: result.email,
          gender: result.gender ? 'true' : 'false',
          mfaEnabled: result.mfaEnabled,
          mfaRegistered: result.mfaRegistered
        })

        if(result.username == 'admin'){
          this.isAccountAdmin = true;
        }

        //Disable User name account
        this.accountForm.get(USERNAME)?.disable();
      })
    } 
  }

  initForm(): void {
    this.accountForm = this.fb.group({
      id: [null],
      username:  ['', Validators.required],
      birthday:  ['', Validators.required],
      email:  ['', Validators.required],
      gender:  ['true'],
      mfaEnabled: [true],
      mfaRegistered: [true]
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
    if(this.isAccountAdmin){
      this.toastrService.getPopUpErrorTypeString("Admin Can't edit");
      return;
    }
    if(this.accountForm.invalid){
      return;
    }
    const formData: Account = this.accountForm.value;
    if(this.isEdit){
      this.accountService.updateAccount(formData).subscribe(
        (response) => {
          this.dialogAccountNotification.emit();
          this.toastrService.getPopUpSuccess('Account Update Success');
        }, 
        (error) => {
          this.toastrService.getPopUpError(error);
        }
      )
    }else{
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
