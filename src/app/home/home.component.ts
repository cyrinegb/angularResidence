import { Component,OnInit } from '@angular/core';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/services/residence.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listResidences: Residence[] = [];

  constructor(private residenceService: ResidenceService) { }

  ngOnInit(): void {
    // Appel au service pour récupérer la liste des résidences
    this.residenceService.getResidences().subscribe(
      (data: Residence[]) => {
        this.listResidences = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des résidences :', error);
      }
    );
  }
}