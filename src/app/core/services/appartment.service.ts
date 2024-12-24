import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/appartement';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartmentUrl = 'http://localhost:3000/apartments'; // URL de base pour les appartements

  constructor(private http: HttpClient) {}

  // Obtenir tous les appartements
  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apartmentUrl);
  }

  // Supprimer un appartement par ID
  deleteApartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apartmentUrl}/${id}`);
  }

  // Supprimer les appartements liés à une résidence
  deleteApartmentsByResidence(residenceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apartmentUrl}?ResidenceId=${residenceId}`);
  }

  // Ajouter un nouvel appartement
  addApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(this.apartmentUrl, apartment);
  }

  // Mettre à jour un appartement existant
  updateApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.put<Apartment>(`${this.apartmentUrl}/${apartment.id}`, apartment);
  }

  // Obtenir un appartement par ID
  getApartmentById(id: number): Observable<Apartment> {
    return this.http.get<Apartment>(`${this.apartmentUrl}/${id}`);
  }
}
