import { Injectable } from '@angular/core';
import { Order, OrderRequestModel } from '../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { ORDER_CREATE, ORDER_EXPORT } from '../constants/api-value';
import { CommonPageInfo } from '../models/common-page.model';
import { Observable, map } from 'rxjs';
import { getOrderDetail } from '../constants/graphql-query-model';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  queryRequest: string = getOrderDetail;

  constructor(private http: HttpClient,
    private apollo: Apollo
) {
}

  createOrder(order: Order){
    return this.http.post(ORDER_CREATE, order);
  }

  getListOrder(page: number, 
                size: number, 
                fields?: string[], 
                orderRequestModel?: OrderRequestModel
  ): Observable<CommonPageInfo<any>>{
    let query = this.queryRequest;
    const filterField = fields?.filter(field => field !== 'function');
    const dynamicFields = filterField ? filterField.join(",") : "";
    query = query.replaceAll('$fields', dynamicFields);
    return this.apollo
    .query<{ listOrder: CommonPageInfo<Order> }>({
      query: gql`${query}`, 
      variables: { 
        page: page, 
        size: size, 
        id: orderRequestModel?.id,
        shipCity: orderRequestModel?.shipCity,
        shipRegion: orderRequestModel?.shipRegion,
        username: orderRequestModel?.username,
        createFromDate: this.formatDateToYYYYMMDD(orderRequestModel?.createFromDate),
        createToDate: this.formatDateToYYYYMMDD(orderRequestModel?.createToDate),
        orderFromDate: this.formatDateToYYYYMMDD(orderRequestModel?.orderFromDate),
        orderToDate: this.formatDateToYYYYMMDD(orderRequestModel?.orderToDate),
        shippedFromDate: this.formatDateToYYYYMMDD(orderRequestModel?.shippedFromDate),
        shippedToDate: this.formatDateToYYYYMMDD(orderRequestModel?.shippedToDate),
        listSorted: orderRequestModel?.listSorted
      },
      fetchPolicy: "network-only"
    })
    .pipe(
      map((response) => response.data.listOrder)
    );
  }

  exportExcel(orderRequestModel: OrderRequestModel): Observable<Blob> {
    let filterFields = orderRequestModel.listFields?.filter(field => field !== 'function');
    orderRequestModel.listFields = filterFields;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(ORDER_EXPORT, orderRequestModel, { headers, responseType: 'blob' });
  }

  formatDateToYYYYMMDD(date: Date | null | undefined): string | undefined | null{
    if(date === null){
      return null;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  
    return date?.toLocaleDateString('en-US', options).replace(/\//g, '');
  }
}
