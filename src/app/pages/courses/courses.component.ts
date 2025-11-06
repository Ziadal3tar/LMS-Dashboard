import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
 searchTerm = '';
  isEditing = false;
  selectedCourseIndex: number | null = null;

  courses = [
    { title: 'Intro to Programming', category: 'Development', lessons: 12, status: 'Published', date: '2025-10-01' },
    { title: 'UI/UX Basics', category: 'Design', lessons: 8, status: 'Draft', date: '2025-09-21' },
    { title: 'Data Science 101', category: 'AI & Data', lessons: 14, status: 'Published', date: '2025-08-30' },
  ];

  newCourse = { title: '', category: '', lessons: 0, status: 'Draft', date: '' };

  get filteredCourses() {
    return this.courses.filter(c =>
      c.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddModal() {
    this.isEditing = false;
    this.newCourse = { title: '', category: '', lessons: 0, status: 'Draft', date: '' };
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.selectedCourseIndex = index;
    this.newCourse = { ...this.courses[index] };
  }

  saveCourse() {
    if (this.isEditing && this.selectedCourseIndex !== null) {
      this.courses[this.selectedCourseIndex] = { ...this.newCourse };
    } else {
      this.courses.push({ ...this.newCourse });
    }
    const modal = document.getElementById('courseModal')!;
    (window as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  deleteCourse(index: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courses.splice(index, 1);
    }
  }
}
