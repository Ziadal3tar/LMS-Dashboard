import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule,NgClass],
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.scss']
})
export class InstructorProfileComponent implements AfterViewInit {
  instructor: any;
  courses: any[] = [];
  activities: any[] = [];
  feedbacks: any[] = [];
  stats: any[] = [];
  messageSubject = '';
  messageBody = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.instructor = {
      name,
      email: `${name?.toLowerCase().replace(/\s+/g, '.')}@edu.com`,
      avatar: `https://i.pravatar.cc/150?u=${name}`,
      status: 'Active',
      courses: 6,
      students: 320,
      rating: 4.8,
      joined: '2023-07-10'
    };

    this.stats = [
      { label: 'Courses', value: 6, icon: 'bi bi-journal-text', iconClass: 'icon bg-primary bg-opacity-10 text-primary' },
      { label: 'Students', value: 320, icon: 'bi bi-people', iconClass: 'icon bg-success bg-opacity-10 text-success' },
      { label: 'Rating', value: '4.8', icon: 'bi bi-star-fill', iconClass: 'icon bg-warning bg-opacity-10 text-warning' },
    ];

    this.courses = [
      { title: 'Advanced Angular', students: 120, date: '2024-01-10' },
      { title: 'UI Design Principles', students: 85, date: '2024-03-02' },
      { title: 'JavaScript Essentials', students: 95, date: '2024-04-18' }
    ];

    this.activities = [
      { icon: 'bi-journal-check', text: 'Updated “Advanced Angular” course', time: '2 days ago' },
      { icon: 'bi-play-btn', text: 'Uploaded new lesson: “Dependency Injection”', time: '5 days ago' },
      { icon: 'bi-clipboard-check', text: 'Reviewed 30 student quizzes', time: '1 week ago' }
    ];

    this.feedbacks = [
      { name: 'Omar Ali', text: 'Very clear explanations and well-structured lessons!' },
      { name: 'Sara Ahmed', text: 'One of the best instructors I’ve learned from.' },
      { name: 'Mona Khaled', text: 'Friendly and patient, always answers questions clearly.' }
    ];
  }

  ngAfterViewInit() {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [4, 3, 5, 2, 4, 6, 3],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderRadius: 6
        }]
      },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
  }

  sendMessage() {
    if (!this.messageSubject.trim() || !this.messageBody.trim()) {
      alert('Please fill in both fields before sending.');
      return;
    }
    alert(`✅ Message sent to ${this.instructor.name}!`);
    this.messageSubject = '';
    this.messageBody = '';
  }
}
