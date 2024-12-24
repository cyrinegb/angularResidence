import { Component, } from '@angular/core';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/services/residence.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})
export class ResidenceComponent {
  searchItem="";
  listResidences:Residence[]=[];
  listFavoris: Residence[] = [];
  visiblity=false;
  vv! :string;
  filteredResidences: Residence[] = [];
  similarAddressCount: number = 0;

  constructor(private residenceService : ResidenceService,private commonService: CommonService) { }

ngOnInit(){
  this.residenceService.getResidences().subscribe(
    (data)=>{
      this.listResidences=data;
      this.filterResidences();
      this.similarAddressCount = this.commonService.getSameValueOf(this.listResidences, 'address', 'Tunis');

    }
  )
}


filterResidences(): void {
  const query = this.searchItem.toLowerCase();
  this.filteredResidences = this.listResidences.filter(residence =>
    residence.name.toLowerCase().includes(query) || 
    residence.address.toLowerCase().includes(query)
  );
}


showLocation(r:Residence ){
      if (r.address=== "inconnu"){
        alert('adresse inconnu')
      }
else{
  this.visiblity=true;
this.vv= r.name
}
    }


addFavoris(r:Residence){
  console.log(this.listFavoris);

if (this.listFavoris.includes(r)){
alert('already liked')
}
else{this.listFavoris.push(r);
console.log('tab', this.listFavoris);
}
}
}
