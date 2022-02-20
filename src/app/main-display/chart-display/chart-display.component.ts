import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


import { Search } from '../search.model';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: []
})
export class ChartDisplayComponent implements OnInit {
  @Input() searches = [];
  isLoading = false;
  isSubmitted = false;

//   public graph = {
//     data: [
//         { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
//         { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
//     ],
//     layout: {width: 320, height: 240, title: 'A Fancy Plot'}
// };


  constructor(private router: ActivatedRoute) { }

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
    if (this.isSubmitted) {
      this.toggleData(); //will be replaced with "build a chart"
    }
    else {
      console.log("nothing here yet")
    }
  }

  toggleData() {
    console.log("Chart-display")
    console.log(this.searches)
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

}
