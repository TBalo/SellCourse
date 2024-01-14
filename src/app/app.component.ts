import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { CartComponent } from "./pages/cart/cart.component";
import { WishlistComponent } from "./pages/wishlist/wishlist.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    HomeComponent,
    NavComponent,
    FooterComponent,
    DashboardComponent,
    CartComponent,
    WishlistComponent,
  ],
})
export class AppComponent {
  title = "sell-course";
}
