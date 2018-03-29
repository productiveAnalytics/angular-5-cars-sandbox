import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';

import { CarService } from './shared/car/car.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/car-list',
	pathMatch: 'full'
  },
  {
	path: 'car-list',
	component: CarListComponent
  },
  {
	path: 'car-add',
	component: CarEditComponent
  },
  {
	path: 'car-edit/:id',
	component: CarEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarEditComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	FormsModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
