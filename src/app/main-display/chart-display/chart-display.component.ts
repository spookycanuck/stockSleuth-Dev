import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Search } from '../search.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: []
})
export class ChartDisplayComponent implements OnInit {
  searchList = [];
  data = [];
  dataPresent = false;

  public graph;
  private searchesSub: Subscription;

  constructor(public searchService: SearchService, private router: ActivatedRoute) { }

  ngOnInit() {
    console.log("OnInit - data present?\n", this.dataPresent)
    this.searchList = this.searchService.getSearches()
    this.getChart(this.searchList)
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
      .subscribe((searches: Search[]) => {
        this.searchList = searches;
        this.getChart(this.searchList)
        if ((this.searchList.length > 0) && (this.searchList[0].id == true)) {
          this.toggleData(this.dataPresent, searches);
          this.dataPresent = this.searchList[0].id;
        }
        else {
          console.log("is not submitted")
        }
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

  getChart(searchList) {
    if (searchList){
    if (searchList.length > 0) {
      this.data = searchList[searchList.length-1];
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
