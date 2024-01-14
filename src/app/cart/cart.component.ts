import { Component } from '@angular/core';
import { CourseComponent } from "../course/course.component";
import { Course } from '../types/course';
import { CourseService } from '../service/course.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    template: `
  <section class="results grid grid-cols-4 gap-4">
    <app-course *ngFor="let course of courseList"
    [course]="course"></app-course>
  </section>
  `, styleUrl: './cart.component.css',
    imports: [CourseComponent]
})
export class CartComponent {
  cartList: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCoursesInCart().subscribe(
      (courses) => {
        this.cartList = courses;
      },
      (error) => {
        console.error('Error fetching courses in cart:', error);
      }
    );
  }
}
