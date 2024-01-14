import { Component, Input } from "@angular/core";
import { Course } from "../../types/course";
import { NgIf, CommonModule } from "@angular/common";
import { CourseService } from "../../service/course.service";
import { ToastrService } from "ngx-toastr";
import { EMPTY, catchError, switchMap, tap } from "rxjs";

@Component({
  selector: "app-course",
  standalone: true,
  imports: [NgIf, CommonModule],
  template: `
    <div
      class="listing"
      (click)="toggleDetails()"
      [class.show-details]="showDetails"
    >
      <img class="listing-photo" [src]="course.photo" />
      <h2 class="listing-name">{{ course.courseName }}</h2>
      <span class="listing-author">{{ course.author }}</span>
      <div class="grid grid-cols-2 text-left">
        <span *ngIf="shouldDisplayDiscount()" class="listing-price"
          >₹{{ discountedPrice | number : "1.0-0" }}
        </span>
        <span *ngIf="!shouldDisplayDiscount()" class="listing-price">{{
          course.actualPrice
        }}</span>
        <span
          *ngIf="shouldDisplayDiscount()"
          [class.strikethrough]="shouldDisplayDiscount()"
          class="listing-price"
        >
          {{ course.actualPrice }}
        </span>
      </div>
      <span *ngIf="shouldDisplayDiscount()" class="listing-discount-percentage">
        {{ course.discountPercentage }} off
      </span>
      <span class="listing-tag">{{ course.tags }}</span>
      <div class="course-details">
        <p class="mb-5 text-bold">{{ course.courseName }}</p>
        <div class="flex grid grid-cols-2 pr-4 gap-1">
          <button
            class="course-btn btn btn-md btn-primary text-center bg-blue-500 mb-0"
            (click)="addToCart()"
          >
            Add to Cart
          </button>
          <button
            class="course-btn btn btn-md btn-primary text-center bg-blue-500 mb-0"
            (click)="addToWishlist()"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./course.component.css",
})
export class CourseComponent {
  @Input() course!: Course;

  showDetails = false;

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService
  ) {}

  getNumericValue(value: string | number): number {
    if (typeof value === "string") {
      return parseFloat(value.replace(/[^0-9.-]/g, ""));
    } else if (typeof value === "number") {
      return value;
    } else {
      return 0; 
    }
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
      price: this.shouldDisplayDiscount()
        ? this.discountedPrice
        : this.course.actualPrice,
      discountPercentage: this.course.discountPercentage,
      tags: this.course.tags,
    };

    this.courseService.isCourseInCart(cartItem.id).pipe(
      switchMap((isAlreadyInCart) => {
        if (isAlreadyInCart) {
          this.toastr.error(`'${this.course.courseName}' already exists in the cart`, "Please note!");
          return EMPTY; 
        } else {
          return this.courseService.postToCart(cartItem);
        }
      }),
      tap((response) => {
        if (response) {
          this.toastr.success("Course successfully added to the cart!", 'Moved');
        }
      }),
      catchError((error) => {
        console.error("Error adding to Cart:", error);
        return EMPTY; 
      })
    ).subscribe();
  }

  addToWishlist() {
    const wishlistItem = {
      id: this.course.id,
      photo: this.course.photo,
      courseName: this.course.courseName,
      author: this.course.author,
      price: this.shouldDisplayDiscount()
        ? this.discountedPrice
        : this.course.actualPrice,
      discountPercentage: this.course.discountPercentage,
      tags: this.course.tags,
    };

    this.courseService.isCourseInWishList(wishlistItem.id).subscribe(
      (isAlreadyInWishList) => {
        if (isAlreadyInWishList) {
          this.toastr.error(
            `'${this.course.courseName}' already exists in the wishlist`,
            "Please note!"
          );
        } else {
          this.courseService.postToWishList(wishlistItem).subscribe(
            (response) => {
              this.toastr.success(
                "Course successfully added to the wishlist!",
                response.courseName
              );
            },
            (error) => {
              console.error("Error adding to wishlist:", error);
            }
          );
        }
      },
      (error) => {
        console.error("Error checking if course is in the wishlist:", error);
      }
    );
  }
}
