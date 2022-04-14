import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Search } from '../../search.model';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-sentiment-tab',
  templateUrl: './sentiment-tab.component.html',
  styleUrls: ['./sentiment-tab.component.css']
})
export class SentimentTabComponent implements OnInit {
  searchList = []
  savedList = []

  private searchesSub: Subscription;
  private savedSub: Subscription;

  constructor(public searchService: SearchService) {}

  ngOnInit() {
    this.searchList = this.searchService.getSearches()
    this.savedList = this.searchService.getSaved()
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
    .subscribe((searches: Search[]) => {
      this.searchList = searches;
    });
    this.savedSub = this.searchService.getSavedUpdateListener() //actively listening for new searches
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
    });
  }

}
