import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../types/course';
import { CartItem } from '../types/cartitem';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl+`/course`);
  }

  getCoursesInCart(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl+`/cart`);
  }

  getCoursesInWishList(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl+`/wishlist`);
  }

  postToCart(cartitem: CartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, cartitem);
  }

  postToWishList(wishlistitem: CartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, wishlistitem);
  }

  
}
