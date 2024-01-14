import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart Details',
      },

      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'Wishlist',
      },

      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
      },
];

export default routeConfig;