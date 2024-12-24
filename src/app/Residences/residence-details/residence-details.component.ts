import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/services/residence.service';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residenceId!: number;
  residenceDetails!: Residence;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) { }

  ngOnInit(): void {
    this.loadResidenceDetails();
  }

  loadResidenceDetails(): void {
    this.residenceId = +this.route.snapshot.paramMap.get('id')!;
    this.residenceService.getResidenceById(this.residenceId).subscribe(
      (data: Residence) => {
        this.residenceDetails = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails :', error);
      }
    );
  }

  loadNextResidence(): void {
    this.residenceId++;
    this.router.navigate(['/residence/details', this.residenceId]).then(() => {
      this.loadResidenceDetails();
    });
  }
  navigateToAddResidence(): void {
    this.router.navigate(['/addr']);
  }
  navigateToUpdateResidence(): void {
    this.router.navigate(['/update-residence', this.residenceId]);
  }
}
