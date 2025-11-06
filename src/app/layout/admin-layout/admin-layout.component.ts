import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  pageTitle = 'Dashboard';
  isDarkMode = false;

  user = {
    name: 'Mustafa Ziad',
    avatar: 'https://i.pravatar.cc/150?img=68'
  };

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      if (url.includes('courses')) this.pageTitle = 'Courses';
      else if (url.includes('lessons')) this.pageTitle = 'Lessons';
      else if (url.includes('quizzes')) this.pageTitle = 'Quizzes';
      else if (url.includes('students')) this.pageTitle = 'Students';
      else if (url.includes('instructors')) this.pageTitle = 'Instructors';
      else this.pageTitle = 'Dashboard';
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
