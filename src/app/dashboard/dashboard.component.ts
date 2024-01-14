import { Component } from "@angular/core";
import { Course } from "../types/course";
import { CourseComponent } from "../components/course/course.component";
import { CommonModule } from "@angular/common";
import { CourseService } from "../service/course.service";
@Component({
  selector: "app-dashboard",
  standalone: true,
  template: `
    <div
      class="relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10"
    >
      <img
        src="https://readymadeui.com/cardImg.webp"
        alt="Banner Image"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="min-h-[300px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6"
      >
        <h2 class="sm:text-4xl text-2xl text-white font-bold mb-6">
          Discover Latest Courses on Angular
        </h2>
        <!-- <p class="text-lg text-center text-gray-200">Embark on unforgettable journeys. Book your dream vacation today!</p> -->
        <!-- <section>
        <form>
          <input class="w-full" type="text" placeholder="Filter by city" />
          <button class="primary" type="button">Search</button>
        </form>
      </section> -->
        <a
          href="javascript:void(0)"
          class="bg-transparent text-white text-base font-semibold py-2.5 px-6 border-2 border-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out"
        >
          Search Now
        </a>
      </div>
    </div>

    <section class="results grid grid-cols-4 gap-4">
      <app-course
        *ngFor="let course of courseList"
        [course]="course"
      ></app-course>
    </section>
  `,
  styleUrl: "./dashboard.component.css",
  imports: [CommonModule, CourseComponent],
})
export class DashboardComponent {
  courseList: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (courses) => {
        this.courseList = courses;
      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
  }
}
