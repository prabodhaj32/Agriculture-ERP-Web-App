import { Component, OnInit } from '@angular/core';
import { KnowledgeCenterService } from './knowledge-center.service';
import { Article } from './knowledge-center.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-knowledge-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './knowledge-center.component.html',
  styleUrls: ['./knowledge-center.component.css'],
})
export class KnowledgeCenterComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];

  newArticle: Article = {
    title: '',
    category: '',
    description: '',
    tags: [],
    attachments: [],
  };

  tagInput: string = '';
  searchTerm: string = '';

  categories = ['Tea', 'Vegetable', 'Fruit', 'Pest Control', 'Irrigation', 'Harvesting'];

  constructor(private knowledgeService: KnowledgeCenterService) {}

  ngOnInit() {
    this.knowledgeService.getArticles().subscribe((data) => {
      this.articles = data;
      this.filteredArticles = data;
    });
  }

  addTag() {
    const tag = this.tagInput.trim();
    if (tag && !this.newArticle.tags.includes(tag)) {
      this.newArticle.tags.push(tag);
    }
    this.tagInput = '';
  }

  removeTag(tag: string) {
    this.newArticle.tags = this.newArticle.tags.filter((t) => t !== tag);
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.newArticle.attachments.push(files[i]);
    }
  }

  submitArticle() {
    if (!this.newArticle.title || !this.newArticle.category) {
      alert('Please fill in required fields (Title and Category).');
      return;
    }
    this.knowledgeService.addArticle({ ...this.newArticle });
    this.newArticle = {
      title: '',
      category: '',
      description: '',
      tags: [],
      attachments: [],
    };
    this.filteredArticles = this.articles;
  }

  search() {
    if (!this.searchTerm) {
      this.filteredArticles = this.articles;
    } else {
      this.filteredArticles = this.knowledgeService.searchArticles(this.searchTerm);
    }
  }
}
