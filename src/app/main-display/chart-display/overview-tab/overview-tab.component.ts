import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Search } from '../../search.model';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.css']
})
export class OverviewTabComponent implements OnInit {
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
