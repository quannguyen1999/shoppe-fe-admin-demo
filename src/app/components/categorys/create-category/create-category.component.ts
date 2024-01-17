import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AVATAR_IMAGE } from '../../../constants/constant-value-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryServiceService } from '../../../services/category-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastServiceService } from '../../../services/toast-service.service';
import { DEFAULT_CATEGORY_COLUMNS } from '../../../constants/column-value';
import { Category, IMAGE, NAME } from '../../../models/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent  implements OnInit{

  selectedImage: any | null;

  imageFake: string = AVATAR_IMAGE;

  categoryForm!: FormGroup;

  isEdit: boolean = false;

  @Output() dialogCategoryNotification: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    @Inject(CategoryServiceService) private categoryService: CategoryServiceService,
    private toastrService: ToastServiceService,
    private fb: FormBuilder
  ){
    this.initForm();
    if(this.data !== null){
      this.isEdit = true;
      categoryService.getListCategory(0, 1, DEFAULT_CATEGORY_COLUMNS).subscribe((data) => {
        const result = data.data[0];
        this.categoryForm.setValue({
          id: result.id,
          name: result.name,
          image: result.image
        })
      })
    } 
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      id: [null],
      name:  ['', Validators.required],
      image:  ['']
    })
  }

  ngOnInit(): void {
  
  }
  

  getErrorMessage(nameField: string) {
    //Check User name
    if (this.categoryForm.get(nameField)!.hasError('required')) {
      return 'You must enter a ' + nameField + ' value';
    }

    return this.categoryForm.get(NAME)!.hasError(NAME) ? 'Not a valid username' : '';
  }

  onClear(){
    this.categoryForm.get(NAME)!.setValue('');
    this.categoryForm.get(IMAGE)!.setValue('');
  } 

  onSubmit(){
    if(this.categoryForm.invalid){
      return;
    }
    const formData: Category = this.categoryForm.value;
    this.categoryService.createCategory(formData).subscribe(
      (response) => {
        this.dialogCategoryNotification.emit();
        this.toastrService.getPopUpSuccess('Category Create Success');
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
