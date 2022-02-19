import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Search } from '../search.model';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: []
})
export class ChartDisplayComponent implements OnInit {
  @Input() searches = [];
  isLoading = false;

//   public graph = {
//     data: [
//         { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
//         { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
//     ],
//     layout: {width: 320, height: 240, title: 'A Fancy Plot'}
// };


  constructor(private router: ActivatedRoute) { }

  ngOnInit() { }

  chartGraph() {
    var graph = {
      data: {
          x: this.searches[0].dates,
          y: this.searches[0].adjCloses,
          mode: 'lines',
          marker: {
              color: "black",
              opacity: 1,
          }
      },

      layout: {
          title: `Adjusted Close`,
          showlegend: true,
          hovermode: 'x',
          autosize: true,
          legend: {"orientation": "h"},
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
          }
      },

      config: {
          responsive: true,
          displayModeBar: false
      }
    }
  }

}
