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
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
    .subscribe((searches: Search[]) => {
      this.searchList = searches;
      this.getCurrentData(this.searchList)
    });
    this.savedSub = this.searchService.getSavedUpdateListener() //actively listening for new searches
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
      this.getCurrentData(this.savedList)
    });
    this.currentSub = this.searchService.getCurrentUpdateListener() //actively listening for new searches
    .subscribe((data: Search[]) => {
      this.currentData = data;
      this.getCurrentData(this.currentData)
    });
    this.testList()
  }

  testList() {
    var doody = JSON.parse(sessionStorage.getItem('currentSearch'))
    this.overviewData = doody.overview.profile
    // console.log(this.overviewData[0].value)
  }

  getCurrentData(data) {
    // console.log(this.currentData)
    if (data.length > 0) {
      console.log(data[data.length-1])
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
