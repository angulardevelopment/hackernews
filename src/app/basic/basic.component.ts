import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent  {

  news;
  constructor(    private _api: CommonService,) {
    this._api.getNews().subscribe(data =>


    {
      console.log(data)
      this.news = data}

    );
  }
}
