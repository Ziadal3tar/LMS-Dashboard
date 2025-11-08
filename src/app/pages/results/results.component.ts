import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NgFor,FormsModule],
  // NgFor, NgIf, RouterLink, FormsModule,NgClass
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  searchTerm = '';
  selectedCourse = 'All';
  selectedStatus = 'All';

  stats = {
    total: 124,
    passed: 98,
    avgScore: 82
  };

  results = [
    { student: 'Omar Ali', course: 'Angular Basics', score: 88, status: 'Passed', date: '2025-10-01' },
    { student: 'Mona Zaki', course: 'TypeScript Advanced', score: 74, status: 'Passed', date: '2025-09-29' },
    { student: 'Ahmed Nour', course: 'JavaScript Intro', score: 45, status: 'Failed', date: '2025-09-25' },
    { student: 'Sara Ahmed', course: 'UI Design', score: 91, status: 'Passed', date: '2025-09-21' },
    { student: 'Heba Adel', course: 'Data Structures', score: 68, status: 'Passed', date: '2025-09-15' },
  ];

  get filteredResults() {
    return this.results.filter(r =>
      r.student.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCourse === 'All' || r.course === this.selectedCourse) &&
      (this.selectedStatus === 'All' || r.status === this.selectedStatus)
    );
  }
}
