import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of } from "rxjs";
import { Course } from "../types/course";
import { CartItem } from "../types/cartitem";
import { Wishlistitem } from "../types/wishlistitem";
import  data from "../data.json";

@Injectable({
  providedIn: "root",
})
export class CourseService {

  constructor() {}

  getCourses(): Observable<Course[]> {
    return of(data.course);
  }

  getCoursesInCart(): Observable<CartItem[]> {
    return of(data.cart);
  }

  getCoursesInWishList(): Observable<Wishlistitem[]> {
    return of(data.wishlist);
  }

  postToCart(cartitem: CartItem): Observable<CartItem[]> {
    // Update the local data for testing, in a real scenario make an HTTP request
    data.cart.push(cartitem);
    return of(data.cart);
  }

  postToWishList(wishlistitem: CartItem): Observable<any> {
    // Update the local data for testing, in a real scenario make an HTTP request
    data.wishlist.push(wishlistitem);
    return of(data.wishlist);
  }
  isCourseInCart(courseId: string): Observable<boolean> {
    return this.getCoursesInCart().pipe(
      map((cartItems) => cartItems.some((item) => item.id === courseId))
    );
  }

  isCourseInWishList(courseId: string): Observable<boolean> {
    return this.getCoursesInWishList().pipe(
      map((wishlistItems) => wishlistItems.some((item) => item.id === courseId))
    );
  }
}
