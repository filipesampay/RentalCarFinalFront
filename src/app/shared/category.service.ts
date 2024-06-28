import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "./category";
import {ChecklistItem} from "./checklistItem";
import {Card} from "./Card";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = `http://localhost:8080/v1/api/categories`

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Category[]>(`${this.baseUrl}/getall`);
  }

  getByGuid(guid: string) {
    return this.http.get<Category>(`${this.baseUrl}/getbyguid/${guid}`);
  }

  save(category: Category) {
    if (category.guid) {
      return this.http.put<string>(`${this.baseUrl}/update`, category)
    } else {
      return this.http.post<string>(`${this.baseUrl}/register`, category)
    }
  }

  delete(guid: string) {
    return this.http.delete<Category>(`${this.baseUrl}/${guid}`)
  }

  getAmountLateByCategory(){
    return this.http.get<Card[]>(`${this.baseUrl}/getAmountLateByCategory`);
  }
}
