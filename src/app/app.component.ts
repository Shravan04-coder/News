import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {

  title = 'News';
  public sources:any = [];
  public articles:any = [];
  public selectedNewsChannel:string = "Aaj ki Taaza Khabarein...";
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(private observer : BreakpointObserver, private changeDetector: ChangeDetectorRef, private newsApi: NewsService) {

  }
  ngOnInit(): void {
    this.newsApi.initArticles()
    .subscribe((res)=>{
      this.articles = res.articles;
    });
    this.newsApi.initSources()
    .subscribe((res)=>{
      this.sources = res.sources;
    })
  }
  ngAfterViewInit(): void {
    this.sideNav.opened = false;
    this.observer.observe(['(max-width:800px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sideNav.mode = "over";
        this.sideNav.close();
      }else{
        this.sideNav.mode = "side";
        this.sideNav.open();
      }
    });
    this.changeDetector.detectChanges();
  }

  selectedSource(source:any){
    this.newsApi.getArticlesByid(source.id)
    .subscribe((res)=>{
      this.articles = res.articles;
      this.selectedNewsChannel = source.name;
    })
  }
}
