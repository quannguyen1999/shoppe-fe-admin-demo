import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private messageService: MessageService) { }

  getPopUpError(error: any){
    error.error.details.forEach((element: any) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: element});
    });
  }

  getPopUpSuccess(message: string){
    this.messageService.add({severity:'success', summary: 'success', detail: message});
  }

}
