import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChecklistItem} from "./checklistItem";

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  private baseUrl = `http://localhost:8080/v1/api/checklist-items`

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ChecklistItem[]>(`${this.baseUrl}/getall`);
  }

  getByGuid(guid: string) {
    return this.http.get<ChecklistItem>(`${this.baseUrl}/getbyguid/${guid}`);
  }

  save(checklistItem: ChecklistItem) {
    if (checklistItem.guid) {
      return this.http.put<ChecklistItem>(`${this.baseUrl}/update`, checklistItem)
    } else {
      return this.http.post<ChecklistItem>(`${this.baseUrl}/register`, checklistItem)
    }
  }

  delete(guid: string) {
    return this.http.delete<ChecklistItem>(`${this.baseUrl}/${guid}`)
  }

  getProgress() {
    return this.http.get<number>(`${this.baseUrl}/getProgress`)
  }
}
