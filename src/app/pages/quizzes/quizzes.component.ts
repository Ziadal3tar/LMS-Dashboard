import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule,RouterLink],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent {
 searchTerm = '';
  isEditing = false;
  selectedQuizIndex: number | null = null;

  quizzes = [
    { title: 'HTML Basics Quiz', course: 'Web Development', questions: 10, duration: '15 min', status: 'Published', date: '2025-10-20' },
    { title: 'JavaScript Logic Quiz', course: 'JavaScript Basics', questions: 8, duration: '10 min', status: 'Draft', date: '2025-10-25' },
    { title: 'CSS Layout Quiz', course: 'Web Design', questions: 12, duration: '20 min', status: 'Published', date: '2025-11-01' },
  ];

  newQuiz = { title: '', course: '', questions: 0, duration: '', status: 'Draft', date: '' };

  get filteredQuizzes() {
    return this.quizzes.filter(q =>
      q.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      q.course.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddModal() {
    this.isEditing = false;
    this.newQuiz = { title: '', course: '', questions: 0, duration: '', status: 'Draft', date: '' };
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.selectedQuizIndex = index;
    this.newQuiz = { ...this.quizzes[index] };
  }

  saveQuiz() {
    if (this.isEditing && this.selectedQuizIndex !== null) {
      this.quizzes[this.selectedQuizIndex] = { ...this.newQuiz };
    } else {
      this.quizzes.push({ ...this.newQuiz });
    }
    const modal = document.getElementById('quizModal')!;
    (window as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  deleteQuiz(index: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizzes.splice(index, 1);
    }
  }
}
