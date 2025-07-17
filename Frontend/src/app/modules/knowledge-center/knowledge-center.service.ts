import { Injectable } from '@angular/core';
import { Article } from './knowledge-center.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeCenterService {
  private articles: Article[] = [];
  private articlesSubject = new BehaviorSubject<Article[]>([]);

  getArticles(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

  addArticle(article: Article) {
    article.id = this.articles.length + 1;
    article.createdAt = new Date();
    this.articles.push(article);
    this.articlesSubject.next(this.articles);
  }

  searchArticles(term: string): Article[] {
    term = term.toLowerCase();
    return this.articles.filter(a =>
      a.title.toLowerCase().includes(term) ||
      a.category.toLowerCase().includes(term) ||
      a.description.toLowerCase().includes(term) ||
      a.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }
}
