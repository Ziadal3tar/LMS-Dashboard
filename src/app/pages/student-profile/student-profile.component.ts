import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent {
  studentId: number = 0;
  activityFilter: string = 'All'; // ✅ نوع الفلتر

  students = [
    {
      name: 'Omar Ali',
      email: 'omar@example.com',
      joined: '2025-09-18',
      status: 'Active',
      courses: [
        { title: 'Web Development', progress: 80, grade: 90 },
        { title: 'JavaScript Basics', progress: 65, grade: 85 },
      ],
      activityLog: [
        { action: 'Completed lesson "CSS Selectors"', date: '2025-11-01', type: 'lesson' },
        { action: 'Passed quiz "HTML Basics Quiz"', date: '2025-10-29', type: 'quiz' },
        { action: 'Joined course "Web Development"', date: '2025-10-15', type: 'course' },
      ]
    },
    {
      name: 'Sara Ahmed',
      email: 'sara@example.com',
      joined: '2025-10-05',
      status: 'Active',
      courses: [
        { title: 'Data Science 101', progress: 90, grade: 94 },
        { title: 'Python for Beginners', progress: 75, grade: 88 },
      ],
      activityLog: [
        { action: 'Completed lesson "Data Cleaning"', date: '2025-11-02', type: 'lesson' },
        { action: 'Attempted quiz "Python Loops"', date: '2025-10-30', type: 'quiz' },
        { action: 'Joined course "Data Science 101"', date: '2025-10-20', type: 'course' },
      ]
    },
    {
      name: 'Mona Zaki',
      email: 'mona@example.com',
      joined: '2025-10-12',
      status: 'Suspended',
      courses: [
        { title: 'UI/UX Design', progress: 40, grade: 60 },
      ],
      activityLog: [
        { action: 'Viewed lesson "Design Principles"', date: '2025-10-27', type: 'lesson' },
        { action: 'Joined course "UI/UX Design"', date: '2025-10-15', type: 'course' },
      ]
    }
  ];

  student: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.student = this.students[this.studentId];
  }

  // ✅ دالة الفلترة
  get filteredActivity() {
    if (this.activityFilter === 'All') return this.student.activityLog;
    return this.student.activityLog.filter((a: any) => a.type === this.activityFilter.toLowerCase());
  }
}
