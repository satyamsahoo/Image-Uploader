import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  public uploadImage(image: File): Observable<any> {
    console.log('image service called')
    console.log(image);
    const formData = new FormData();
    formData.append('file', image, image.name);
    console.log(formData);
    return this.http.post(`${this.baseUrl}/`,formData);
  }

  public getAllImage(): Observable<any>{
    console.log('get all images');
    return this.http.get(`${this.baseUrl}/all`);
  }
}
