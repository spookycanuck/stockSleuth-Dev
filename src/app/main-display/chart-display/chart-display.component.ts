import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Search } from '../search.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class ChartDisplayComponent implements OnInit {
  searchList = [];
  savedList = [];
  data = [];
  dataPresent = false;

  public graph;
  public status;
  private searchesSub: Subscription;
  private savedSub: Subscription;

  constructor(public searchService: SearchService, private router: ActivatedRoute) { }

  ngOnInit() {
    console.log("OnInit - data present?\n", this.dataPresent)
    this.searchList = this.searchService.getSearches()
    this.savedList = this.searchService.getSaved()
    if (this.searchList.length > 0) {
      this.getChart(this.searchList)
    }
    else if (this.savedList.length > 0) {
      this.getChart(this.savedList)
    }
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
      .subscribe((searches: Search[]) => {
        this.searchList = searches;
        this.checkGraph();
        // can remove this if/else statement below. All it really
        //  does is log shit to the console via a function. Lul
        // if ((this.searchList.length > 0) && (this.searchList[0].id == true)) {
        //   this.toggleData(this.dataPresent, searches);
        //   this.dataPresent = this.searchList[0].id;
        // }
        // else {
        //   console.log("is not submitted")
        // }
      });
    this.savedSub = this.searchService.getSavedUpdateListener() //actively listening for new searches
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
      this.getChart(this.savedList)
    });
  }

  toggleData(isSubmitted, searchData) {
    console.log("-----\nToggleData Function.\n Updated on New Search!\n-----")
    if (isSubmitted == true) {
      this.logData(searchData);
    }
    else {
      isSubmitted = this.searchList[0].id;
      console.log("isSubmitted Status: ", isSubmitted);
      this.logData(searchData);
    }
  }

  logData(searchData) {
    console.log("Searches Array: ");
    console.log(searchData)
    console.log("Latest Search Data: ")
    console.log(searchData[searchData.length-1]);
    console.log("==========")
  }

  checkGraph() {
    if (this.searchList.length > 0) {
      this.getChart(this.searchList)
    }
    else {
      this.getChart(this.savedList)
    }
  }

  getChart(list) {
    if (list) {
      if (list.length > 0) {
        this.data = list[list.length-1];
        this.graph = this.searchService.setGraphValues(this.data)
      }
      else return;
    }
    else return;
  }

  ngOnDestroy() {
    // this.searches = []
    this.searchesSub.unsubscribe();
  }
}
