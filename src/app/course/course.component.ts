import { Component, Input } from '@angular/core';
import {Course} from '../types/course';
import { NgIf, CommonModule } from '@angular/common';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [NgIf, CommonModule],
  // templateUrl: './course.component.html',
  template: `
<!-- course.component.html -->

<div class="listing" (click)="toggleDetails()" [class.show-details]="showDetails">
  <img class="listing-photo" [src]="course.photo">
  <h2 class="listing-name">{{course.courseName}}</h2>
  <span class="listing-author">{{course.author}}</span>
  <div class="grid grid-cols-2 text-left">
    <span *ngIf="shouldDisplayDiscount()" class="listing-price">₹{{discountedPrice | number: '1.0-0' }} </span>
    <span *ngIf="!shouldDisplayDiscount()" class="listing-price">{{course.actualPrice}}</span>
    <span *ngIf="shouldDisplayDiscount()" [class.strikethrough]="shouldDisplayDiscount()" class="listing-price">
      {{course.actualPrice}}
    </span>      
  </div>
  <span *ngIf="shouldDisplayDiscount()" class="listing-discount-percentage">
    {{course.discountPercentage}} off
  </span>
  <span class="listing-tag">{{course.tags}}</span>
  <div class="course-details">
    <p class="mb-5 text-bold">{{course.courseName}}</p>
    <!-- <p class="mb-5 text-bold">Advanced Javascript framework is very detailed</p> -->
      <div class="flex grid grid-cols-2 pr-4 gap-1">
    <button class="course-btn btn btn-md btn-primary text-center bg-blue-500 mb-0" (click)="addToCart()">Add to Cart</button>
    <button class="course-btn btn btn-md btn-primary text-center bg-blue-500 mb-0" (click)="addToWishlist()">Add to Wishlist</button>
      </div>
  </div>
</div>
`,
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() course!: Course;
  showDetails = false;

  constructor(private courseService: CourseService) {}


   getNumericValue(value: string): number {
    return parseFloat(value.replace(/[^0-9.-]/g, ''));
  }

  get calculation(): number {
    return 1 - this.getNumericValue(this.course.discountPercentage) / 100;
  }

  get discountedPrice(): number {
    const actualPrice = this.getNumericValue(this.course.actualPrice);
    return actualPrice * this.calculation;
  }

  shouldDisplayDiscount(): boolean {
    return this.getNumericValue(this.course.discountPercentage) > 0;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  addToCart() {
    const cartItem = {
      id: this.course.id,
      photo: this.course.photo,
      courseName: this.course.courseName,
      author: this.course.author,
      price: this.shouldDisplayDiscount() ? this.discountedPrice : this.course.actualPrice,
      discountPercentage: this.course.discountPercentage,
      tags: this.course.tags,
    };

    this.courseService.postToCart(cartItem)
      .subscribe(
        (response) => {
          console.log('Added to Cart:', response);
        },
        (error) => {
          console.error('Error adding to Cart:', error);
        }
      );    
  }

  addToWishlist() {
    const wishlistItem = {
      id: this.course.id,
      photo: this.course.photo,
      courseName: this.course.courseName,
      author: this.course.author,
      price: this.shouldDisplayDiscount() ? this.discountedPrice : this.course.actualPrice,
      discountPercentage: this.course.discountPercentage,
      tags: this.course.tags,
    };

    this.courseService.postToWishList(wishlistItem)
      .subscribe(
        (response) => {
          console.log('Added to Wishlist:', response);
        },
        (error) => {
          console.error('Error adding to Wishlist:', error);
        }
      );    
  }

}
