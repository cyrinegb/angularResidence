import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Residence } from '../models/residence';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
residenceUrl ='http://localhost:3000/residences'
  constructor(private http: HttpClient ) { }

  getResidences(){
    return this.http.get<Residence[]>(this.residenceUrl)
  }
  addResidence(r: Residence){
    return this.http.post(this.residenceUrl, r)
  }
  updateResidence(r: Residence){
    return this.http.put(`${this.residenceUrl}/${r.id}`, r)
  }
  deleteResidence(id: number){
    return this.http.delete(`${this.residenceUrl}/${id}`)
  }
  getResidenceById(id: number){
    return this.http.get<Residence>(`${this.residenceUrl}/${id}`)
  }
}
