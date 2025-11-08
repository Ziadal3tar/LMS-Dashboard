import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  statCards = [
    {
      title: 'Courses',
      value: 12,
      icon: 'bi-collection',
      badge: '+3 this week',
    },
    { title: 'Students', value: 1245, icon: 'bi-people', badge: '+57' },
    { title: 'Lessons', value: 84, icon: 'bi-play-btn', badge: '+9' },
    { title: 'Quizzes', value: 32, icon: 'bi-question-circle', badge: '+2' },
  ];

  recentCourses = [
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
    { name: 'Intro to Programming', lessons: 10, status: 'Published' },
    { name: 'Data Science Fundamentals', lessons: 8, status: 'Published' },
    { name: 'Web Design Basics', lessons: 15, status: 'Draft' },
  ];

  topInstructors = [
    { name: 'Alice Johnson', courses: 8, students: 320 },
    { name: 'David Smith', courses: 6, students: 280 },
    { name: 'Sara Ahmed', courses: 5, students: 210 },
  ];

  latestResults = [
    { student: 'Omar Ali', quiz: 'JS Basics', score: 92 },
    { student: 'Mona Zaki', quiz: 'Python Intro', score: 88 },
    { student: 'Heba Adel', quiz: 'CSS Quiz', score: 79 },
  ];

  private lineChart?: Chart;
  private barChart?: Chart;
  private observer?: MutationObserver;

  ngAfterViewInit(): void {
    this.renderCharts();

    // ✅ راقب تغيّر الكلاس (dark-mode) على <body> لتحديث الألوان فورًا
    this.observer = new MutationObserver(() => {
      this.updateChartsTheme();
    });

    this.observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.lineChart?.destroy();
    this.barChart?.destroy();
  }

  private renderCharts(): void {
    const isDark = document.body.classList.contains('dark-mode');

    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb';
    const textColor = isDark ? '#cbd5e1' : '#1e293b';

    const lineCanvas = document.getElementById(
      'studentsChart'
    ) as HTMLCanvasElement;
    const barCanvas = document.getElementById(
      'coursesBar'
    ) as HTMLCanvasElement;

    // ✅ Line Chart
    this.lineChart = new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
        datasets: [
          {
            data: [150, 185, 190, 220, 230, 270],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59,130,246,0.1)',
            fill: true,
            tension: 0.25,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor },
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor },
          },
        },
      },
    });

    // ✅ Bar Chart
    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: ['Dev', 'Design', 'Data', 'Math', 'History'],
        datasets: [
          {
            data: [12, 9, 6, 4, 3],
            backgroundColor: isDark ? '#10B981' : '#22C55E',
            borderRadius: 6,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor },
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor },
          },
        },
      },
    });
  }

  private updateChartsTheme(): void {
    const isDark = document.body.classList.contains('dark-mode');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb';
    const textColor = isDark ? '#cbd5e1' : '#1e293b';
console.log(isDark);

    // ✅ تحديث ألوان الخطوط والنصوص في الرسوم عند تبديل الوضع
    [this.lineChart, this.barChart].forEach((chart:any) => {
      if (chart) {
        chart.options.scales!['x'].grid!.color = gridColor;
        chart.options.scales!['y'].grid!.color = gridColor;
        chart.options.scales!['x'].ticks!.color = textColor;
        chart.options.scales!['y'].ticks!.color = textColor;

        if (chart.config.type === 'bar') {
          chart.data.datasets[0].backgroundColor = isDark
            ? '#10B981'
            : '#22C55E';
        }

        chart.update();
      }
    });
  }
}
