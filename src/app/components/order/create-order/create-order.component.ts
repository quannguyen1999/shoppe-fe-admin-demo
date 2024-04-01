import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { AVATAR_IMAGE } from '../../../constants/constant-value-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderServiceService } from '../../../services/order-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastServiceService } from '../../../services/toast-service.service';
import { DEFAULT_ORDER_COLUMNS } from '../../../constants/column-value';
import { NAME } from '../../../models/category.model';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent {

  selectedImage: any | null;

  imageFake: string = AVATAR_IMAGE;

  orderForm!: FormGroup;

  isEdit: boolean = false;

  @Output() dialogOrderNotification: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    @Inject(OrderServiceService) private orderService: OrderServiceService,
    private toastrService: ToastServiceService,
    private fb: FormBuilder
  ){
    this.initForm();
    if(this.data !== null){
      this.isEdit = true;
      orderService.getListOrder(0, 1, DEFAULT_ORDER_COLUMNS).subscribe((data) => {
        const result = data.data[0];
        this.orderForm.setValue({
          id: result.id,
          // name: result.name,
          // image: result.image
        })
      })
    } 
  }

  initForm(): void {
    this.orderForm = this.fb.group({
      id: [null],
      // name:  ['', Validators.required],
      // image:  ['']
    })
  }

  ngOnInit(): void {
  
  }
  

  getErrorMessage(nameField: string) {
    //Check User name
    if (this.orderForm.get(nameField)!.hasError('required')) {
      return 'You must enter a ' + nameField + ' value';
    }

    return this.orderForm.get(NAME)!.hasError(NAME) ? 'Not a valid name' : '';
  }

  onClear(){
    this.orderForm.get(NAME)!.setValue('');
  
  } 

  onSubmit(){
    if(this.orderForm.invalid){
      return;
    }
    const formData: Order = this.orderForm.value;
    this.orderService.createOrder(formData).subscribe(
      (response) => {
        this.dialogOrderNotification.emit();
        this.toastrService.getPopUpSuccess('Order Create Success');
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
