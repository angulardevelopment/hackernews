import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-hacker',
  templateUrl: './hacker.component.html',
  styleUrls: ['./hacker.component.css']
})
export class HackerComponent implements OnInit {

  news;
  constructor(private HackerNewsService: CommonService) {
    this.HackerNewsService.getNews().subscribe(data => this.news = data);
  }

  ngOnInit() {
  }

}
