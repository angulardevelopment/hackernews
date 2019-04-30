import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-story-feed-item-detail',
  templateUrl: './story-feed-item-detail.component.html',
  styleUrls: ['./story-feed-item-detail.component.scss']
})
export class StoryFeedItemDetailComponent implements OnInit {

  public by: string;
  public id: number;
  public score: number;
  public text: string;
  public title: string;
  public time: string;
  public type: string;
  public kids: string[];
  public url: string;
  public feedItemFetched: boolean;

  constructor(
    private _api: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.feedItemFetched = false;
      this._api.getFeedItem(params.itemId).subscribe(
        data => {
          Object.assign(this, data);
          this.time = moment.unix(+this.time).fromNow();
          this.feedItemFetched = true;
        },
        error => console.log(error)
      );
    });
  }

  onDeleted(comment_id: any) {
    this.kids.splice(this.kids.indexOf(comment_id), 1);
  }
}
