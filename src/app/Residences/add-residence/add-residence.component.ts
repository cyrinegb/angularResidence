import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/services/residence.service';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  listResidences: Residence[] = [];
  isUpdateMode = false; // Indique si c'est une mise à jour
  residenceId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  addResidenceForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', Validators.required],
    image: ['', Validators.required],
    status: ['', Validators.required],
    Apartments: this.fb.array([])
  });

  get name() { return this.addResidenceForm.get('name'); }
  get address() { return this.addResidenceForm.get('address'); }
  get image() { return this.addResidenceForm.get('image'); }
  get status() { return this.addResidenceForm.get('status'); }
  get Apartments() { return this.addResidenceForm.get('Apartments') as FormArray; }

  ngOnInit(): void {
    // Vérifiez si un ID est fourni dans l'URL
    this.residenceId = +this.route.snapshot.paramMap.get('id')!;
    if (this.residenceId) {
      this.isUpdateMode = true;
      this.loadResidenceDetails();
    }
  }

  loadResidenceDetails(): void {
    this.residenceService.getResidenceById(this.residenceId).subscribe(
      (residence: Residence) => {
        // Remplissez le formulaire avec les données existantes
        this.addResidenceForm.patchValue({
          name: residence.name,
          address: residence.address,
          image: residence.image,
          status: residence.status
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des détails de la résidence :', error);
      }
    );
  }

  addR(): void {
    let newResidence: Residence = {
      id: this.isUpdateMode ? this.residenceId : 0, // Utilisez l'ID existant pour une mise à jour
      name: this.addResidenceForm.value.name || '',
      address: this.addResidenceForm.value.address || '',
      image: this.addResidenceForm.value.image || '',
      status: this.addResidenceForm.value.status || ''
    };

    if (this.isUpdateMode) {
      // Appel pour mettre à jour la résidence
      this.residenceService.updateResidence(newResidence).subscribe(
        () => {
          alert('Residence updated successfully');
          this.router.navigate(['/residence']); // Retour à la liste ou à un autre écran
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la résidence :', error);
        }
      );
    } else {
      // Appel pour ajouter une nouvelle résidence
      this.residenceService.addResidence(newResidence).subscribe(
        () => {
          alert('Residence added successfully');
          this.router.navigate(['/residence']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la résidence :', error);
        }
      );
    }
  }
}
