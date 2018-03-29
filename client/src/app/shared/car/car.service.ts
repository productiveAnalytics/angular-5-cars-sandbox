import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CarService {
  public API = '//localhost:8080';
  public CARS_API = this.API + '/cars';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
	  return this.http.get(this.API + '/cool-cars');
  }
  
  get(id: string) {
	  console.log('GET request');
	  return this.http.get(this.CARS_API + '/' + id);
  }
  
  save(car: any): Observable<any> {
	  let result: Observable<Object>;
	  if (car['href']) {
		  console.log('PUT request');
		  result = this.http.put(car.href, car);
	  } else {
		  console.log('POST request');
		  result = this.http.post(this.CARS_API, car);
	  }
	  return result;
  }
  
  remove(href: string) {
	  console.log('DELETE request');
	  return this.http.delete(href);
  }
}
