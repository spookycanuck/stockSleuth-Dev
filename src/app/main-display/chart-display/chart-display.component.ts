import { Component, OnInit, Input } from '@angular/core';
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
  priceData;
  isLoading = false;
  isSubmitted;
  totalSearches = 0;
  searchArrSub: Search[] = [];

  private searchesSub: Subscription;

//   public graph = {
//     data: [
//         { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
//         { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
//     ],
//     layout: {width: 320, height: 240, title: 'A Fancy Plot'}
// };


  constructor(public searchService: SearchService, private router: ActivatedRoute) { }

  ngOnInit() {
    /*
      The following must implement onInit() because the user is not actively
      submitting data into the chart-display component:

      Need a .subscribe() statement here. I want to subscribe to the state of
      "isSubmitted" - a variable from side-search that turns to true when the
      user clicks the search button. If isSubmitted is true, execute toggleData().
      If not, log "nothing here yet" to console.

      Alternatively, we can also subscribe to searches[] and do something
      similar if searches[] is not null. That may me more efficient.

      ngIf will not work here because it's a conditional statement that is not
      changing state/being subscribed to.

      when the subscribed statement returns true, the app will build a chart.
    */

    // TLDR - this is what we're trying to constantly look for:
    // if (this.searches.length > 0) {
    //   console.log(this.totalSearches) //will be replaced with "build a chart"
    // }
    // else {
    //   console.log(this.totalSearches)
    //   console.log(this.searchArrSub)
    // }

    this.searches = this.searchService.getSearches();
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
      .subscribe((searches: Search[]) => {
        this.searches = searches;
        console.log("searches Subscription:")
        console.log(this.searches)
      });
    this.searchService.getMainDisplayData() //actively updating priceData on search
      .subscribe((priceData) => {
        this.priceData = priceData
        console.log("priceData Subscription:")
        console.log(this.priceData)
      })
  }

  toggleData() {
    if (this.searches.length > 0) {
    console.log("Chart-display")
    console.log(this.searches)
    }
  }

  // chartGraph() {
  //   var graph = {
  //     data: {
  //         x: this.searches[0].priceData.dates[this.searches[0].priceData.dates.length-1],
  //         y: this.searches[0].priceData.adjCloses[this.searches[0].priceData.adjCloses.length-1],
  //         mode: 'lines',
  //         marker: {
  //             color: "black",
  //             opacity: 1,
  //         }
  //     },

  //     layout: {
  //         title: `Adjusted Close`,
  //         showlegend: true,
  //         hovermode: 'x',
  //         autosize: true,
  //         legend: {"orientation": "h"},
  //         margin: { l: 5, r: 5, t: 50, b: 5 },
  //         xaxis: {
  //             type: 'category',
  //             categoryorder: "category ascending",
  //             showspikes: true,
  //             spikemode: 'across',
  //             spikesnap: 'cursor',
  //             showline: true,
  //             showgrid: false,
  //             showticklabels: true,
  //             tickangle: 45,
  //             autorange: true,
  //             nticks: 12,
  //             rangeslider: {visible: false},
  //             automargin: true,
  //         },
  //         yaxis: {
  //             showticklabels: false,
  //             showgrid: false,
  //             fixedrange: true,
  //             automargin: true
  //         }
  //     },

  //     config: {
  //         responsive: true,
  //         displayModeBar: false
  //     }
  //   }
  // }

  ngOnDestroy() {
    this.searchesSub.unsubscribe();
  }
}
