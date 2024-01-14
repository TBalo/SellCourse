import { Component } from '@angular/core';
import { CourseComponent } from "../course/course.component";
import { CourseService } from '../service/course.service';
import { Course } from '../types/course';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    template: `
  <section class="results grid grid-cols-4 gap-4">
    <app-course *ngFor="let course of courseList"
    [course]="course"></app-course>
  </section>
  `, styleUrl: './wishlist.component.css',
    imports: [CourseComponent]
})
export class WishlistComponent {
  wishList: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCoursesInWishList().subscribe(
      (courses) => {
        this.wishList = courses;
      },
      (error) => {
        console.error('Error fetching courses in WishList:', error);
      }
    );
  }
}
