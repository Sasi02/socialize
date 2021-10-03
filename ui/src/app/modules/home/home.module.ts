import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FacebookHomeComponent } from './facebook-home/facebook-home.component';


@NgModule({
  declarations: [HomeComponent, FacebookHomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MDBBootstrapModule
  ]
})
export class HomeModule { }
