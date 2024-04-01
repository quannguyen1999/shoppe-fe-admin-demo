import { Injectable } from '@angular/core';
import { getCategoryDetail } from '../constants/graphql-query-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { CagegoryRequestModel, Category } from '../models/category.model';
import { CATEGORY_CREATE, CATEGORY_EXPORT } from '../constants/api-value';
import { CommonPageInfo } from '../models/common-page.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  queryRequest: string = getCategoryDetail;

  constructor(private http: HttpClient,
              private apollo: Apollo
  ) {
  }

  createCategory(category: Category){
    return this.http.post(CATEGORY_CREATE, category);
  }

  getListCategory(page: number, 
                size: number, 
                fields?: string[], 
                categoryRequestDto?: CagegoryRequestModel
  ): Observable<CommonPageInfo<any>>{
    let query = this.queryRequest;
    const filterField = fields?.filter(field => field !== 'function');
    const dynamicFields = filterField ? filterField.join(",") : "";
    query = query.replaceAll('$fields', dynamicFields);
    console.log("working")
    return this.apollo
    .query<{ listCategory: CommonPageInfo<Category> }>({
      query: gql`${query}`, 
      variables: { 
        page: page, 
        size: size, 
        id: categoryRequestDto?.id,
        name: categoryRequestDto?.name,
        image: categoryRequestDto?.image,
        createFromDate: this.formatDateToYYYYMMDD(categoryRequestDto?.createFromDate),
        createToDate: this.formatDateToYYYYMMDD(categoryRequestDto?.createToDate),
        listSorted: categoryRequestDto?.listSorted
      },
      fetchPolicy: "network-only"
    })
    .pipe(
      map((response) => response.data.listCategory)
    );
  }

  exportExcel(categoryRequestModel: CagegoryRequestModel): Observable<Blob> {
    let filterFields = categoryRequestModel.listFields?.filter(field => field !== 'function');
    categoryRequestModel.listFields = filterFields;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(CATEGORY_EXPORT, categoryRequestModel, { headers, responseType: 'blob' });
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
