import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResidenceComponent } from './Residences/residence/residence.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResidenceDetailsComponent } from './Residences/residence-details/residence-details.component';
import { ApartmentsComponent } from './appartement/apartments/apartments.component';
import { AddAppartmentComponent } from './appartement/add-appartment/add-appartment.component';
import { UserComponent } from './user/user.component';
import { AddResidenceComponent } from './Residences/add-residence/add-residence.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  { path: "home", component: HomeComponent },
  { path: "adduser", component: UserComponent },
  { path: "addr", component: AddResidenceComponent },
  { path: 'update-residence/:id', component: AddResidenceComponent },

  { path: "residence", component: ResidenceComponent },
  { path: "residence/details/:id", component: ResidenceDetailsComponent},
  {path:"appart", component:ApartmentsComponent},
  {path:"addApp", component:AddAppartmentComponent},
  { path: "**", component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
