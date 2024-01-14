import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {DashboardComponent} from './dashboard/dashboard.component'
import {RouterModule} from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, NavComponent, FooterComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sell-course';
}
