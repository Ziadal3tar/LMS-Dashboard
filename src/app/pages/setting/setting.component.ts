import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  user = {
    name: 'Mustafa Ahmed',
    email: 'mustafa@example.com',
    password: '',
    notifications: true
  };

  theme = localStorage.getItem('theme') || 'light';
  accentColor = localStorage.getItem('accent') || '#3B82F6';

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark-mode', this.theme === 'dark');
    localStorage.setItem('theme', this.theme);
  }

  changeAccentColor(color: string) {
    this.accentColor = color;
    document.documentElement.style.setProperty('--icon-bg', color);
    localStorage.setItem('accent', color);
  }

  saveSettings() {
    alert('✅ Settings saved successfully!');
  }
}
