import { AfterViewInit, Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
   imports: [NgFor, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 statCards = [
    { title: 'Courses', value: 12, icon: 'bi-collection', badge: '+3 this week' },
    { title: 'Students', value: 1245, icon: 'bi-people', badge: '+57' },
    { title: 'Lessons', value: 84, icon: 'bi-play-btn', badge: '+9' },
    { title: 'Quizzes', value: 32, icon: 'bi-question-circle', badge: '+2' },
  ];

  recentCourses = [
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
  ];

  topInstructors = [
    { name: 'Alice Johnson', courses: 8, students: 320 },
    { name: 'David Smith', courses: 6, students: 280 },
    { name: 'Sara Ahmed', courses: 5, students: 210 },
  ];

  latestResults = [
    { student: 'Omar Ali', quiz: 'JS Basics', score: 92 },
    { student: 'Mona Zaki', quiz: 'Python Intro', score: 88 },
    { student: 'Heba Adel', quiz: 'CSS Quiz', score: 79 },
  ];

  ngAfterViewInit(): void {
    const line = document.getElementById('studentsChart') as HTMLCanvasElement;
    new Chart(line, {
      type: 'line',
      data: {
        labels: ['W1','W2','W3','W4','W5','W6'],
        datasets: [{ data: [150, 185, 190, 220, 230, 270], borderColor: '#3B82F6', fill: false, tension: .25 }]
      },
      options: { plugins: { legend: { display: false } }, maintainAspectRatio: false }
    });

    const bar = document.getElementById('coursesBar') as HTMLCanvasElement;
    new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Dev','Design','Data','Math','History'],
        datasets: [{ data: [12, 9, 6, 4, 3], backgroundColor: '#10B981' }]
      },
      options: { plugins: { legend: { display: false } }, maintainAspectRatio: false }
    });
  }
}
