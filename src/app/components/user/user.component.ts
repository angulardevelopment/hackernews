import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userData: any;

  constructor(
    private _api: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._api.getUser(params.username).subscribe(
        data => {
          this.userData = {
            id: data.id,
            karma: data.karma,
            about: data.about,
            created: moment.unix(parseInt(data.created)).fromNow()
          };
        },
        error => console.log(error)
      );
    });
  }

  openExternalUrl(type) {
    window.open(`https://news.ycombinator.com/${type}?id=${this.userData.id}`);
  }
}
