import { Component, Input } from "@angular/core";
import { CourseComponent } from "../course/course.component";
import { CommonModule } from "@angular/common";
import { Wishlistitem } from "../../types/wishlistitem";

@Component({
  selector: "app-wishlist-item",
  standalone: true,
  imports: [CommonModule, CourseComponent],
  template: `
    <div class="listing">
      <img class="listing-photo" [src]="wishListItem.photo" />
      <h2 class="listing-name">{{ wishListItem.courseName }}</h2>
      <span class="listing-author">{{ wishListItem.author }}</span>
      <span class="listing-price"
        >₹{{ wishListItem.price | number : "1.0-0" }}</span
      >
      <span class="listing-tag">{{ wishListItem.tags }}</span>
    </div>
  `,
  styleUrl: "./wishlist-item.component.css",
})
export class WishlistItemComponent {
  @Input() wishListItem!: Wishlistitem;
}
