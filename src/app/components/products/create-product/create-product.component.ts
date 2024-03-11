import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { AVATAR_IMAGE } from '../../../constants/constant-value-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastServiceService } from '../../../services/toast-service.service';
import { DEFAULT_PRODUCT_COLUMNS } from '../../../constants/column-value';
import { ProductServiceService } from '../../../services/product-service.service';
import { CATEGORY, DISCOUNT, IMAGE, NAME, PRICE, Product, QUANTITY } from '../../../models/product.model';
import { Observable, map, startWith } from 'rxjs';
import { CagegoryRequestModel, Category } from '../../../models/category.model';
import { CategoryServiceService } from '../../../services/category-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{


  @ViewChild('fileInput') fileInput: ElementRef | any;


  selectedImage: any | null;

  imageFake: string = AVATAR_IMAGE;

  productForm!: FormGroup;

  isEdit: boolean = false;

  // Search filter
  dataCategory: Category[] = [];
  filteredSearchInput!: Observable<Category[]>;

  categoryRequestModel: CagegoryRequestModel = {
    id: '',
    name: '',
    image: '',
    createFromDate: null,
    createToDate: null,
    listSorted: null,
    listFields: ['id', 'name']
  };

  @Output() dialogProductNotification: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    @Inject(ProductServiceService) private productService: ProductServiceService,
    @Inject(CategoryServiceService) private categoryService: CategoryServiceService,
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
          discount: result.discount,
          category: result.category
        })
      })
    } 
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      id: [''],
      name:  ['', Validators.required],
      image:  [''],
      quantity: [0],
      price: [0],
      discount: [0],
      category: []
    })
  }

  ngOnInit(): void {
    this.filteredSearchInput = this.productForm.get(CATEGORY)!.valueChanges.pipe(
      startWith(''),
      map(value => this.searchValue(value || '')),
    )
  }

  enterSearchCategory(value: string){
      this.categoryService.getListCategory(0, 100, ['id', 'name'],this.categoryRequestModel).subscribe((data) => {
        this.dataCategory = data.data
      });
  }

  getOptionText(option: any) {
    return option.name;
  }

  private searchValue(value: string): Category[] {
    const filterValue = this.convertText(value);
    return this.dataCategory.filter(dataFakeSearch => this.convertText(dataFakeSearch.name).includes(filterValue));
  }

  private convertText(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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
    this.productForm.get(CATEGORY)!.setValue('');
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

