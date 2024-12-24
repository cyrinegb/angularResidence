import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apartment } from 'src/app/core/models/appartement';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/services/residence.service';

@Component({
  selector: 'app-add-appartment',
  templateUrl: './add-appartment.component.html',
  styleUrls: ['./add-appartment.component.css']
})
export class AddAppartmentComponent implements OnInit {
  apartForm: FormGroup;
  newApart: Apartment = {
    id:0,
    apartNum: 0,
    floorNum: 0,
    surface: 0,
    terrace: true,
    surfaceterrace: 0,
    category: '',
    ResidenceId: 0
  };
  listResidences: Residence[] = [];

  constructor(private fb: FormBuilder, private residenceService: ResidenceService) {
    // Initialiser le formulaire
    this.apartForm = this.fb.group({
      apartNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface: ['', Validators.required],
      terrace: ['yes', Validators.required],
      surfaceTerrace: [{ value: '', disabled: true }, Validators.required],
      category: ['S+1', Validators.required],
      residence: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadResidences();

    this.apartForm.get('terrace')?.valueChanges.subscribe((value) => {
      if (value === 'yes') {
        this.apartForm.get('surfaceTerrace')?.enable();
      } else {
        this.apartForm.get('surfaceTerrace')?.disable();
        this.apartForm.get('surfaceTerrace')?.reset(); // Réinitialiser le champ
      }
    });
  }

  loadResidences(): void {
    this.residenceService.getResidences().subscribe(
      (data) => {
        this.listResidences = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des résidences :', error);
      }
    );
  }

  onAdd(): void {
    if (this.apartForm.valid) {
      const formValue = this.apartForm.value;

      const newApart: Apartment = {
        id:+formValue.id,
        apartNum: +formValue.apartNum,
        floorNum: +formValue.floorNum,
        surface: +formValue.surface,
        terrace: formValue.terrace === 'yes',
        surfaceterrace: +formValue.surfaceTerrace || 0,
        category: formValue.category,
        ResidenceId: +formValue.residence
      };

      console.log('Nouvel appartement ajouté :', newApart);


    }
  }

  onReset(): void {
    this.apartForm.reset({
      terrace: 'yes',
      category: 'S+1'
    });
  }
}
