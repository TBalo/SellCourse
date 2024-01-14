import { Component, Input } from "@angular/core";
import { CourseComponent } from "../course/course.component";
import { CartItem } from "../../types/cartitem";
import { CommonModule, NgIf } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-cart-item",
  standalone: true,
  imports: [NgIf, CommonModule, CourseComponent],
  template: `
    <div class="listing" (click)="toggleInfo()">
      <img class="listing-photo" [src]="cartItem.photo" />
      <h2 class="listing-name">{{ cartItem.courseName }}</h2>
      <span class="listing-author">{{ cartItem.author }}</span>
      <span class="listing-price"
        >₹{{ cartItem.price | number : "1.0-0" }}</span
      >
      <span class="listing-tag">{{ cartItem.tags }}</span>
    </div>
    <div *ngIf="showDetails" class="course-details">
      <p class="mb-5 text-bold">{{ cartItem.courseName }}</p>
      <div class="flex grid grid-cols-2 pr-4 gap-1">
        <button
          class="course-btn btn btn-md btn-primary text-center bg-blue-500 mb-0"
          (click)="delete()"
        >
          Delete
        </button>
        <button
          class="course-btn btn btn-md btn-primary text-center bg-blue-500 mb-0"
          (click)="addToWishlist()"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  `,
  styleUrl: "./cart-item.component.css",
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;

  showDetails = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleInfo() {
    console.log("it should show");
    this.showDetails = !this.showDetails;
    this.cdr.detectChanges();
  }

  delete() {}

  addToWishlist() {}
}
