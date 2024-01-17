import { Injectable } from '@angular/core';
import { getProductDetail } from '../constants/graphql-query-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Product, ProductRequestModel } from '../models/product.model';
import { PRODUCT_CREATE, PRODUCT_EXPORT } from '../constants/api-value';
import { Observable, map } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  queryRequest: string = getProductDetail;

  constructor(private http: HttpClient,
              private apollo: Apollo
  ) {
  }

  createProduct(product: Product){
    return this.http.post(PRODUCT_CREATE, product);
  }

  getListProduct(page: number, 
                size: number, 
                fields?: string[], 
                productRequestModel?: ProductRequestModel
  ): Observable<CommonPageInfo<any>>{
    let query = this.queryRequest;
    const filterField = fields?.filter(field => field !== 'function');
    const dynamicFields = filterField ? filterField.join(",") : "";
    query = query.replaceAll('$fields', dynamicFields);
    return this.apollo
    .query<{ listProduct: CommonPageInfo<Product> }>({
      query: gql`${query}`, 
      variables: { 
        page: page, 
        size: size, 
        id: productRequestModel?.id,
        name: productRequestModel?.name,
        image: productRequestModel?.image,
        quantity: productRequestModel?.image,
        price: productRequestModel?.price,
        discount: productRequestModel?.discount,
        createFromDate: this.formatDateToYYYYMMDD(productRequestModel?.createFromDate),
        createToDate: this.formatDateToYYYYMMDD(productRequestModel?.createToDate),
        listSorted: productRequestModel?.listSorted
      },
      fetchPolicy: "network-only"
    })
    .pipe(
      map((response) => response.data.listProduct)
    );
  }

  exportExcel(productRequestModel: ProductRequestModel): Observable<Blob> {
    let filterFields = productRequestModel.listFields?.filter(field => field !== 'function');
    productRequestModel.listFields = filterFields;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(PRODUCT_EXPORT, productRequestModel, { headers, responseType: 'blob' });
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