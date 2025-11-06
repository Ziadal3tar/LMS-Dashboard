import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  searchTerm = '';
  isEditing = false;
  selectedStudentIndex: number | null = null;

  students = [
    { name: 'Omar Ali', email: 'omar@example.com', courses: 3, status: 'Active', joined: '2025-09-18' },
    { name: 'Sara Ahmed', email: 'sara@example.com', courses: 5, status: 'Active', joined: '2025-10-05' },
    { name: 'Mona Zaki', email: 'mona@example.com', courses: 2, status: 'Suspended', joined: '2025-10-12' },
  ];

  newStudent = { name: '', email: '', courses: 0, status: 'Active', joined: '' };

  get filteredStudents() {
    return this.students.filter(s =>
      s.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddModal() {
    this.isEditing = false;
    this.newStudent = { name: '', email: '', courses: 0, status: 'Active', joined: '' };
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.selectedStudentIndex = index;
    this.newStudent = { ...this.students[index] };
  }

  saveStudent() {
    if (this.isEditing && this.selectedStudentIndex !== null) {
      this.students[this.selectedStudentIndex] = { ...this.newStudent };
    } else {
      this.students.push({ ...this.newStudent });
    }
    const modal = document.getElementById('studentModal')!;
    (window as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  deleteStudent(index: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.students.splice(index, 1);
    }
  }
}
