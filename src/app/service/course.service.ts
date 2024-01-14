import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Course } from "../types/course";
import { CartItem } from "../types/cartitem";
import { Wishlistitem } from "../types/wishlistitem";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl + `/course`);
  }

  getCoursesInCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl + `/cart`);
  }

  getCoursesInWishList(): Observable<Wishlistitem[]> {
    return this.http.get<Wishlistitem[]>(this.apiUrl + `/wishlist`);
  }

  postToCart(cartitem: CartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, cartitem);
  }

  postToWishList(wishlistitem: CartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, wishlistitem);
  }

  isCourseInCart(courseId: number): Observable<boolean> {
    return this.getCoursesInCart().pipe(
      map((cartItems) => cartItems.some((item) => item.id === courseId))
    );
  }

  isCourseInWishList(courseId: number): Observable<boolean> {
    return this.getCoursesInWishList().pipe(
      map((wishlistItems) => wishlistItems.some((item) => item.id === courseId))
    );
  }
}
