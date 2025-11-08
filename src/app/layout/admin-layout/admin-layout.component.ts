import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  pageTitle = 'Dashboard';
  isDarkMode = false;

  user = {
    name: 'Mustafa Ziad',
    avatar: 'https://i.pravatar.cc/150?img=68'
  };

  constructor(private router: Router) {


    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      console.log(url);
this.pageTitle = url.split('/')[1]
  ?.charAt(0).toUpperCase() + url.split('/')[1]?.slice(1);
    });
  }

ngOnInit() {
  // ✅ استرجاع آخر وضع استخدمه المستخدم
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    this.isDarkMode = true;
    document.body.classList.add('dark-mode');
  }
}
toggleTheme() {
  this.isDarkMode = !this.isDarkMode;

  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}
}
