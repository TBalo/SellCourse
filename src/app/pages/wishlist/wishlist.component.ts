import { Component } from "@angular/core";
import { CourseComponent } from "../../components/course/course.component";
import { CourseService } from "../../service/course.service";
import { Course } from "../../types/course";
import { Wishlistitem } from "../../types/wishlistitem";
import { WishlistItemComponent } from "../../components/wishlist-item/wishlist-item.component";
import { CommonModule } from "@angular/common";
import { NavComponent } from "../../components/nav/nav.component";

@Component({
  selector: "app-wishlist",
  standalone: true,
  template: `
    <app-nav></app-nav>
    <section class="results grid grid-cols-4 gap-4">
      <app-wishlist-item
        *ngFor="let wishListItem of wishList"
        [wishListItem]="wishListItem"
      ></app-wishlist-item>
    </section>
  `,
  styleUrl: "./wishlist.component.css",
  providers: [WishlistItemComponent],
  imports: [WishlistItemComponent, CommonModule, CourseComponent, NavComponent],
})
export class WishlistComponent {
  wishList: Wishlistitem[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCoursesInWishList().subscribe(
      (wishListItems) => {
        this.wishList = wishListItems;
      },
      (error) => {
        console.error("Error fetching courses in WishList:", error);
      }
    );
  }
}
