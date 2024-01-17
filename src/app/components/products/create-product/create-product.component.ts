import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AVATAR_IMAGE } from '../../../constants/constant-value-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastServiceService } from '../../../services/toast-service.service';
import { DEFAULT_PRODUCT_COLUMNS } from '../../../constants/column-value';
import { ProductServiceService } from '../../../services/product-service.service';
import { DISCOUNT, IMAGE, NAME, PRICE, Product, QUANTITY } from '../../../models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{

  selectedImage: any | null;

  imageFake: string = AVATAR_IMAGE;

  productForm!: FormGroup;

  isEdit: boolean = false;

  @Output() dialogProductNotification: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    @Inject(ProductServiceService) private productService: ProductServiceService,
    private toastrService: ToastServiceService,
    private fb: FormBuilder
  ){
    this.initForm();
    if(this.data !== null){
      this.isEdit = true;
      productService.getListProduct(0, 1, DEFAULT_PRODUCT_COLUMNS).subscribe((data) => {
        const result = data.data[0];
        this.productForm.setValue({
          id: result.id,
          name: result.name,
          image: result.image,
          quantity: result.quantity,
          price: result.price,
          discount: result.discount
        })
      })
    } 
  }

  initForm(): void {
    this.productForm = this.fb.group({
      id: [null],
      name:  ['', Validators.required],
      image:  [''],
      quantity: [0],
      price: [0],
      discount: [0]
    })
  }

  ngOnInit(): void {
  
  }
  

  getErrorMessage(nameField: string) {
    //Check User name
    if (this.productForm.get(nameField)!.hasError('required')) {
      return 'You must enter a ' + nameField + ' value';
    }

    return this.productForm.get(NAME)!.hasError(NAME) ? 'Not a valid name' : '';
  }

  onClear(){
    this.productForm.get(NAME)!.setValue('');
    this.productForm.get(IMAGE)!.setValue('');
    this.productForm.get(QUANTITY)!.setValue(0);
    this.productForm.get(PRICE)!.setValue(0);
    this.productForm.get(DISCOUNT)!.setValue(0);
  } 

  onSubmit(){
    if(this.productForm.invalid){
      return;
    }
    const formData: Product = this.productForm.value;
    this.productService.createProduct(formData).subscribe(
      (response) => {
        this.dialogProductNotification.emit();
        this.toastrService.getPopUpSuccess('Product Create Success');
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

