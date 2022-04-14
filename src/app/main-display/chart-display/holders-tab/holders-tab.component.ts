import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Search } from '../../search.model';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-holders-tab',
  templateUrl: './holders-tab.component.html',
  styleUrls: ['./holders-tab.component.css']
})
export class HoldersTabComponent implements OnInit {
  searchList = []
  savedList = []
  currentData = []
  overviewData = []

  private searchesSub: Subscription;
  private savedSub: Subscription;
  private currentSub: Subscription;

  constructor(public searchService: SearchService) {}

  ngOnInit() {
    this.searchList = this.searchService.getSearches()
    this.savedList = this.searchService.getSaved()
    this.checkCurrent();
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
    .subscribe((searches: Search[]) => {
      this.searchList = searches;
      if (this.searchList.length > 0) {
        this.getCurrentData(this.searchList)
      }    });
    this.savedSub = this.searchService.getSavedUpdateListener() //actively listening for new searches
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
      if (this.savedList.length > 0) {
        this.getCurrentData(this.savedList)
        }    });
    this.currentSub = this.searchService.getCurrentUpdateListener() //actively listening for new searches
    .subscribe((data: Search[]) => {
      this.currentData = data;
      this.getCurrentData(this.currentData)
    });
  }

  checkCurrent() {
    var x = JSON.parse(sessionStorage.getItem('currentSearch'))
    if (x.overview) {
      this.overviewData = x.overview.profile
    }
    else if (this.savedList) {
      var y = this.savedList[this.savedList.length-1]
      this.overviewData = y.overview.profile
    }
  }

  getCurrentData(data) {
    if (data.length > 0) {
      var x = data[data.length-1];
      this.overviewData = x.overview.profile
    }
    else if (data) {
      var y = data;
      this.overviewData = y.overview.profile
    }
    else return;
  }

}
