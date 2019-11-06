import { Component, OnDestroy } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  courses: any[];
  course$;
  course;
  author$;
  subscription: Subscription;
  constructor(db: AngularFireDatabase) {
    db.list("/courses")
      .valueChanges()
      .subscribe(courses => {
        this.courses = courses;
        console.log(this.courses);
      });
    // this.course$ = db.object("/courses/1");
    // this.author$ = db.object("/author/1");
    db.object("/author/1")
      .valueChanges()
      .subscribe(p => {
        this.author$ = p;
      });
  }
  add(course: HTMLInputElement) {
    this.courses.push(course.value);
    console.log(this.courses);
    course.value = "";
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
