import { ErrorHandler, Injectable } from '@angular/core';
import { ToastServiceService } from './toast-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(private toastrService: ToastServiceService) { }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse && (error.status === 500)) {
      this.toastrService.getPopUpErrorTypeString("Internal Server Error");
    }

    if (error instanceof HttpErrorResponse && (error.status === 401)) {
      this.toastrService.getPopUpErrorTypeString("Internal Server Error");
    }
  }
}
