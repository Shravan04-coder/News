import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  api_key="931e2e83d39d41e682aa692051ecb2c5"
  constructor(private http: HttpClient) { }

  initSources(){
    return this.http.get<any>('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
  }
  getArticlesByid(source: string){
    return this.http.get<any>('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }
  initArticles(){
    return this.http.get<any>('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
  }
}
