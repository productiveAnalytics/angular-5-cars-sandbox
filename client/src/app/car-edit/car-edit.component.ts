import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription }  from 'rxjs/Subscription';

import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  sub: Subscription;  

  constructor(private activeRoute: ActivatedRoute,
			  private router: Router,
			  private carService: CarService) {
  }

  ngOnInit() {
	this.sub = this.activeRoute.params.subscribe(params => {  
				 const id = params['id'];
				 console.log(`Received Car id: '${id}'...`);
				 if (id) {
				   this.carService.get(id).subscribe((car: any) => {
						  this.car = car;
						  this.car.href = car._links.self.href;
						}
				   );
				 } else {
				   if (id > 0) {					   
					console.error(`Car with id: '${id}' not found, returning to list`);
					this.gotoList();
				   }
				 }
			   }
    );
  }
  
  ngOnDestroy() {
	this.sub.unsubscribe();
  }
  
  gotoList() {
	this.router.navigate(['/car-list']);
  }

  saveCar(form: NgForm) {
    this.carService.save(form).subscribe(result => {
			console.log('Car saved to list');
			this.gotoList();
		}, 
		error => console.error(error)
	);
  }

  removeCar(href) {
    this.carService.remove(href).subscribe(result => {
			console.log('Car removed from list');
			this.gotoList();
		},
		error => console.error(error)
	);
  }
}
