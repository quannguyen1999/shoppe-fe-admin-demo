import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService } from '../../services/account-service.service';
import { ToastServiceService } from '../../services/toast-service.service';
import { AVATAR_IMAGE } from '../../constants/constant-value-model';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{

  avatar: string = AVATAR_IMAGE;
  
  accountForm!: FormGroup;

  selectedImage: any | null;

  @ViewChild('fileInput') fileInput: ElementRef | any;

  constructor(  @Inject(AccountServiceService) private accountService: AccountServiceService,
  private toastrService: ToastServiceService,
  private fb: FormBuilder){
    // this.initFormAccount();
    
    this.accountService.getInfo().subscribe((data) => {
      this.accountForm = this.fb.group({
        id: [data.id],
        username:  {value: data.username, disabled: true},
        birthday:  [data.birthday, Validators.required],
        email:  [data.email, Validators.required],
        gender:  [data.gender.toString()],
        mfaEnabled: {value: data.mfaEnabled, disabled: true},
        mfaRegistered: {value: data.mfaRegistered, disabled: true}
      });
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getErrorMessage(nameField: string) {
    return this.accountForm.get(nameField)!.hasError('required') ? 'You must enter a ' + nameField + ' value' : '';
  }

  onSubmit(){
    const formData: Account = this.accountForm.value;
    this.handleResponseSubscription(this.accountService.updateAccount(formData), 'Account Update Success');
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

  selectFile() {
    this.fileInput.nativeElement.click();
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
