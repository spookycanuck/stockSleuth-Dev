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
  currentData = []
  overviewData = []
  ratings = []
  date

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
      }
    });
    this.savedSub = this.searchService.getSavedUpdateListener() //actively listening for new searches
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
      if (this.savedList.length > 0) {
      this.getCurrentData(this.savedList)
      }
    });
    this.currentSub = this.searchService.getCurrentUpdateListener() //actively listening for new searches
    .subscribe((data: Search[]) => {
      this.currentData = data;
      this.getCurrentData(this.currentData)
    });
  }

  checkCurrent() {
    /*
    Runs checkSession(), then determines whether there is a value in the
    currentSearch[] list in session. If there is not, it will check local for
    the saved[] list. If there is an item there, it will populate overview data
    with that information.
    */
    this.checkSession()
    var x = JSON.parse(sessionStorage.getItem('currentSearch'))
    if (x.overview) {
      this.overviewData = x.overview.profile
      this.ratings = x.rating.ratings
      this.date = x.rating.date
    }
    else if (this.savedList) {
      var y = this.savedList[this.savedList.length-1]
      this.overviewData = y.overview.profile
      this.ratings = y.rating.ratings
      this.date = y.rating.date
    }
  }

  checkSession() {
    /*
    Checks session storage for the currentSearch[]array. If the array does
    not exist, checkSession() initializes as an empty set. This avoids
    errors OnInit.
    */
      let emptySearch = [];
      if (sessionStorage.currentSearch) {
        // console.log("current search exists")
        return
      }
      if (!sessionStorage.currentSearch) {
        // console.log("no current search")
        sessionStorage.setItem('currentSearch', JSON.stringify(emptySearch))
      }
    }

  getCurrentData(data) {
    if (data.length > 0) {
      var x = data[data.length-1];
      this.overviewData = x.overview.profile
      this.ratings = x.rating.ratings
      this.date = x.rating.date
    }
    else if (data) {
      var y = data;
      this.overviewData = y.overview.profile
      this.ratings = y.rating.ratings
      this.date = y.rating.date
    }
    else return;
  }
}
