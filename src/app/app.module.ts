import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HackerComponent } from './hacker/hacker.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoryFeedComponent } from './components/story-feed/story-feed.component';
import { StoryFeedItemComponent } from './components/story-feed-item/story-feed-item.component';
import { StoryFeedItemDetailComponent } from './components/story-feed-item-detail/story-feed-item-detail.component';
import { UserComponent } from './components/user/user.component';
import { CollapsibleListComponent } from './components/collapsible-list/collapsible-list.component';

import {Routes,RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: 'topstories', data: { feed: 'topstories' }, component: StoryFeedComponent },
  { path: '', redirectTo: 'topstories', pathMatch: 'full' },
  { path: 'newstories', data: { feed: 'newstories' }, component: StoryFeedComponent, 	redirectTo: '', },
  { path: 'beststories', data: { feed: 'beststories' }, component: StoryFeedComponent },
  { path: 'askstories', data: { feed: 'askstories' }, component: StoryFeedComponent },
  { path: 'showstories', data: { feed: 'showstories' }, component: StoryFeedComponent },
  { path: 'jobstories', data: { feed: 'jobstories' }, component: StoryFeedComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'item/:itemId', component: StoryFeedItemDetailComponent },
  { path: 'simple', component: HackerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HackerComponent,
    HeaderComponent,
    FooterComponent,
    StoryFeedComponent,
    StoryFeedItemComponent,
    StoryFeedItemDetailComponent,
    UserComponent,
    CollapsibleListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
   
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
