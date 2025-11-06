import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss']
})
export class QuizQuestionsComponent {
  quizId!: number;
  quizTitle = '';
  isEditing = false;
  selectedQuestionIndex: number | null = null;
  searchTerm = '';
  filterType = 'All';

  quizzes = [
    {
      title: 'HTML Basics Quiz',
      questions: [
        {
          text: 'What does HTML stand for?',
          type: 'multiple',
          options: [
            'Hyperlinks and Text Markup Language',
            'Hyper Text Markup Language',
            'Home Tool Markup Language'
          ],
          correctAnswer: 'Hyper Text Markup Language'
        },
        {
          text: 'HTML elements are represented by?',
          type: 'multiple',
          options: ['Tags', 'Attributes', 'IDs'],
          correctAnswer: 'Tags'
        },
        {
          text: 'HTML comments start with <!-- and end with -->',
          type: 'truefalse',
          options: ['True', 'False'],
          correctAnswer: 'True'
        }
      ]
    }
  ];

  newQuestion = {
    text: '',
    type: 'multiple',
    options: ['', '', '', ''],
    correctAnswer: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.quizTitle = this.quizzes[this.quizId]?.title || 'Quiz';
  }

  get questions() {
    return this.quizzes[this.quizId].questions;
  }

  get filteredQuestions() {
    return this.questions.filter((q) => {
      const matchesSearch = q.text.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFilter =
        this.filterType === 'All' || q.type === this.filterType.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }

  openAddModal() {
    this.isEditing = false;
    this.newQuestion = {
      text: '',
      type: 'multiple',
      options: ['', '', '', ''],
      correctAnswer: ''
    };
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.selectedQuestionIndex = index;
    this.newQuestion = JSON.parse(JSON.stringify(this.questions[index]));
  }

  saveQuestion() {
    if (this.isEditing && this.selectedQuestionIndex !== null) {
      this.questions[this.selectedQuestionIndex] = { ...this.newQuestion };
    } else {
      this.questions.push({ ...this.newQuestion });
    }

    const modal = document.getElementById('questionModal')!;
    (window as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  deleteQuestion(index: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questions.splice(index, 1);
    }
  }

  addOption() {
    if (this.newQuestion.options.length < 6) {
      this.newQuestion.options.push('');
    }
  }

  removeOption(index: number) {
    this.newQuestion.options.splice(index, 1);
    if (this.newQuestion.correctAnswer === this.newQuestion.options[index]) {
      this.newQuestion.correctAnswer = '';
    }
  }

  selectCorrectAnswer(option: string) {
    this.newQuestion.correctAnswer = option;
  }

  onTypeChange() {
    if (this.newQuestion.type === 'truefalse') {
      this.newQuestion.options = ['True', 'False'];
      this.newQuestion.correctAnswer = '';
    } else {
      this.newQuestion.options = ['', '', '', ''];
      this.newQuestion.correctAnswer = '';
    }
  }
  exportToExcel() {
    const data = this.filteredQuestions.map((q, i) => ({
      '#': i + 1,
      Question: q.text,
      Type: q.type.toUpperCase(),
      Options: q.options.join(' | '),
      'Correct Answer': q.correctAnswer
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questions');

    const fileName = `${this.quizTitle.replace(/\s+/g, '_')}_Questions.xlsx`;
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }
}
