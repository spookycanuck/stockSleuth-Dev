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
  searches = [];
  data = [];
  dataPresent = false;

  public graph;
  private searchesSub: Subscription;

  constructor(public searchService: SearchService, private router: ActivatedRoute) { }

  ngOnInit() {
  /*
    TODO: There is a bug where "Recent Searches" and "Chart Display"
      data gets dumped when navigating away from the page. If you add the
      same ticker ID back to the chart, it allows a duplicate.

      Suspected error is with priceData being passed as a variable instead
      of updating an array. ngOnDestroy() won't dump the variable or something.
      HTML's ngIf statement seems to not be working/updating after navigating
      away from the page.

      Press on, for now. I think adding persistent data and running onDestroy()
      on user logout would be better and potentially this issue
  */
    console.log("OnInit - data present?\n", this.dataPresent)
    this.searches = this.searchService.getSearches();
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
      .subscribe((searches: Search[]) => {
        this.searches = searches;
        if (this.searches.length > 0) {
          this.data = this.searches[this.searches.length-1];
          this.graph = this.searchService.setGraphValues(this.data)
        }
        else {
          return;
        }
        if (this.searches[0].id = true) {
          this.toggleData(this.dataPresent, searches);
          this.dataPresent = this.searches[0].id;
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
      isSubmitted = this.searches[0].id;
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

  ngOnDestroy() {
    // this.searches = []
    this.searchesSub.unsubscribe();
  }
}
