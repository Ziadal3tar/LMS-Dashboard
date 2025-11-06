import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent {
  searchTerm = '';
  isEditing = false;
  selectedLessonIndex: number | null = null;

  lessons = [
    {
      title: 'Introduction to HTML',
      course: 'Web Development',
      duration: '15 min',
      status: 'Published',
      date: '2025-10-20',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      title: 'CSS Selectors',
      course: 'Web Development',
      duration: '22 min',
      status: 'Draft',
      date: '2025-10-22',
      videoUrl: ''
    }
  ];

  newLesson = { title: '', course: '', duration: '', status: 'Draft', date: '', videoUrl: '' };
  videoPreview: string | null = null;

  get filteredLessons() {
    return this.lessons.filter(l =>
      l.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      l.course.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddModal() {
    this.isEditing = false;
    this.newLesson = { title: '', course: '', duration: '', status: 'Draft', date: '', videoUrl: '' };
    this.videoPreview = null;
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.selectedLessonIndex = index;
    this.newLesson = { ...this.lessons[index] };
    this.videoPreview = this.newLesson.videoUrl || null;
  }

  saveLesson() {
    if (this.videoPreview) {
      this.newLesson.videoUrl = this.videoPreview; // ✅ simulate upload result
    }

    if (this.isEditing && this.selectedLessonIndex !== null) {
      this.lessons[this.selectedLessonIndex] = { ...this.newLesson };
    } else {
      this.lessons.push({ ...this.newLesson });
    }

    const modal = document.getElementById('lessonModal')!;
    (window as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  deleteLesson(index: number) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.lessons.splice(index, 1);
    }
  }

  // ✅ دالة اختيار الفيديو
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // معاينة محلية للفيديو
    const reader = new FileReader();
    reader.onload = () => {
      this.videoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    // ⚙️ في المرحلة القادمة:
    // هنستبدل الجزء ده برفع فعلي إلى Cloudinary أو السيرفر.
  }
}
