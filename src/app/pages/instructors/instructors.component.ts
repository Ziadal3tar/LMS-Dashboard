import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

declare const bootstrap: any;
@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent {
  searchTerm = '';
  isEditing = false;
  editIndex = -1;
  avatarPreview: string | null = null;

  instructors = [
    { name: 'Ahmed Samir', email: 'ahmed@edu.com', courses: 5, students: 230, status: 'Active', joined: '2023-08-15', avatar: 'https://i.pravatar.cc/80?img=12' },
    { name: 'Laila Mohamed', email: 'laila@edu.com', courses: 3, students: 180, status: 'Active', joined: '2023-06-22', avatar: 'https://i.pravatar.cc/80?img=32' },
    { name: 'Omar Khaled', email: 'omar@edu.com', courses: 2, students: 95, status: 'Inactive', joined: '2023-03-10', avatar: 'https://i.pravatar.cc/80?img=45' },
  ];

  get filteredInstructors() {
    return this.instructors.filter(i =>
      i.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      i.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  newInstructor = { name: '', email: '', courses: 0, students: 0, status: 'Active', joined: '', avatar: '' };

  openAddModal() {
    this.isEditing = false;
    this.avatarPreview = null;
    this.newInstructor = { name: '', email: '', courses: 0, students: 0, status: 'Active', joined: '', avatar: '' };
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.editIndex = index;
    this.newInstructor = { ...this.instructors[index] };
    this.avatarPreview = this.newInstructor.avatar;
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.avatarPreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  saveInstructor() {
    if (this.avatarPreview) {
      this.newInstructor.avatar = this.avatarPreview;
    }

    if (this.isEditing) {
      this.instructors[this.editIndex] = { ...this.newInstructor };
    } else {
      this.instructors.push({ ...this.newInstructor });
    }

    const modal = document.getElementById('instructorModal');
    if (modal) {
      const instance = bootstrap.Modal.getInstance(modal);
      instance?.hide();
    }
  }

  deleteInstructor(index: number) {
    this.instructors.splice(index, 1);
  }
}
