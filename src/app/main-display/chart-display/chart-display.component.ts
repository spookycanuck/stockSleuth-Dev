import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Search } from '../search.model';
import { Graph } from './graph.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: []
})
export class ChartDisplayComponent implements OnInit {
  searches = [];
  graph: Graph[];
  dataPresent = false;

  private searchesSub: Subscription;
  private dataSub: Subscription;


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
      });
    this.dataSub = this.searchService.getMainDisplayData() //actively updating priceData on search
      .subscribe((priceData) => {
        this.setGraphValues(priceData);
        if (this.searches[0].id = true) {
          this.toggleData(this.dataPresent, priceData);
          this.dataPresent = this.searches[0].id;
        }
        else {
          console.log("is not submitted")
        }
      })
  }

  toggleData(isSubmitted, priceData) {
    console.log("-----\nToggleData Function.\n Updated on New Search!\n-----")
    if (isSubmitted == true) {
      this.logData(priceData);
    }
    else {
      isSubmitted = this.searches[0].id;
      console.log("isSubmitted Status: ", isSubmitted);
      this.logData(priceData);
    }
  }

  logData(priceData) {
    console.log("Searches Array: ");
    console.log(this.searches);
    console.log("Price Data Array: ");
    console.log(priceData);
    // console.log("Graph Model")
    // console.log(this.graph)
  }

  setGraphValues(apiData) {
    const graph = this.graph;
    const mostRecentSearch = this.searches[this.searches.length-1];
    const graphWindow = this.graphDisplay.data[0];
    const graphData = this.graphDisplay.data[1];
    const graphLayout = this.graphDisplay.layout;
    const priceData = apiData[0];

    // Building graph window
    graphWindow['name'] = mostRecentSearch.ticker;
    graphWindow['x'] = priceData.dates;
    graphWindow['y'] = priceData.adjCloses;
    graphLayout['title'] = mostRecentSearch.description + " Adjusted Close";

    // Building graph volume
    graphData['name'] = mostRecentSearch.ticker;
    graphData['x'] = priceData.dates;
    graphData['y'] = priceData.volumes;
    graphData.marker['color'] = priceData.colors;

    // Building graph layout
    graphLayout.yaxis2['range'] = [0, (Math.max(...priceData.volumes) * 10)];
  }

  public graphDisplay = {
    data: [
      {
        mode: 'lines',
        marker: {
          color: "black",
          opacity: 1,
        }
      },
      {
        marker: {
            opacity: 0.5
        },
        type: 'bar',
        yaxis: "y2"
      },
  ],

    layout: {
        height: 900,
        showlegend: true,
        hovermode: 'x',
        autosize: true,
        legend: {"orientation": "v"},
        margin: { l: 5, r: 5, t: 50, b: 5 },
        xaxis: {
            type: 'category',
            categoryorder: "category ascending",
            showspikes: true,
            spikemode: 'across',
            spikesnap: 'cursor',
            showline: true,
            showgrid: false,
            showticklabels: true,
            tickangle: 45,
            autorange: true,
            nticks: 12,
            rangeslider: {visible: false},
            automargin: true,
        },
        yaxis: {
            showticklabels: false,
            showgrid: false,
            fixedrange: true,
            automargin: true
        },
        yaxis2: {
          visible: false,
          showgrid: false,
          title: 'Volume',
          type: 'linear',
          overlaying: 'y',
          side: 'right',
          marker: {
              opacity: .5
          },
          fixedrange: true
      }
    },

    config: {
        responsive: true,
        displayModeBar: false
    }
  }

  ngOnDestroy() {
    // this.searches = []
    // this.priceData = null;
    this.searchesSub.unsubscribe();
    this.dataSub.unsubscribe();
  }
}
