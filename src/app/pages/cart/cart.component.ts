import { Component } from "@angular/core";
import { CourseComponent } from "../../components/course/course.component";
import { CourseService } from "../../service/course.service";
import { CartItem } from "../../types/cartitem";
import { NavComponent } from "../../components/nav/nav.component";
import { CommonModule } from "@angular/common";
import { CartItemComponent } from "../../components/cart-item/cart-item.component";

@Component({
  selector: "app-cart",
  standalone: true,
  template: `
    <app-nav></app-nav>
    <section class="results grid grid-cols-4 gap-4">
      <app-cart-item
        *ngFor="let cartItem of cartList"
        [cartItem]="cartItem"
      ></app-cart-item>
    </section>
  `,
  styleUrl: "./cart.component.css",
  providers: [CartItemComponent],
  imports: [CartItemComponent, CommonModule, CourseComponent, NavComponent],
})
export class CartComponent {
  cartList: CartItem[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCoursesInCart().subscribe(
      (cartItems) => {
        this.cartList = cartItems;
      },
      (error) => {
        console.error("Error fetching courses in cart:", error);
      }
    );
  }
}
