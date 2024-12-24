import { Component, OnInit } from '@angular/core';
import { Apartment } from 'src/app/core/models/appartement';
import { ApartmentService } from 'src/app/core/services/appartment.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {
  listApartments: Apartment[] = [];

  constructor(private apartmentService: ApartmentService) {}

  ngOnInit(): void {
    this.apartmentService.getApartments().subscribe(
      (data: Apartment[]) => {
        this.listApartments = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des appartements:', error);
      }
    );
  }
}
