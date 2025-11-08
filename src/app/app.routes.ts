import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { QuizQuestionsComponent } from './pages/quiz-questions/quiz-questions.component';
import { InstructorsComponent } from './pages/instructors/instructors.component';
import { InstructorProfileComponent } from './pages/instructor-profile/instructor-profile.component';
import { ResultsComponent } from './pages/results/results.component';
import { SettingComponent } from './pages/setting/setting.component';
export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'lessons', component: LessonsComponent },
      { path: 'quizzes', component: QuizzesComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'students/:id', component: StudentProfileComponent },
      { path: 'quizzes/:id/questions', component: QuizQuestionsComponent },
      { path: 'instructors', component: InstructorsComponent },
      { path: 'instructors/:name', component: InstructorProfileComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'settings', component: SettingComponent },

    ]
  }
];
