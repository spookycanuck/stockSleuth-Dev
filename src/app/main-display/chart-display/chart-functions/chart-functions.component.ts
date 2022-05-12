import { Component, OnInit } from '@angular/core';

import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chart-functions',
  templateUrl: './chart-functions.component.html',
  styleUrls: ['./chart-functions.component.css']
})
export class ChartFunctionsComponent implements OnInit {
  faBar = faChartBar;
  faGraph = faChartLine;
  graphClicked = true;
  candleClicked = false;

  constructor() { }

  ngOnInit() {
  }

  graphLines() {
    console.log("graph clicked!")
    this.graphClicked = true;
    this.candleClicked = false;
    if (this.graphClicked) {
      var graph = document.getElementById("graphIcon")
      var candle = document.getElementById("candleIcon")
      graph.classList.add("active")
      candle.classList.remove("active")
    }
  }

  graphCandles() {
    console.log("candle clicked!")
    this.candleClicked = true;
    this.graphClicked = false;
    if (this.candleClicked) {
      var candle = document.getElementById("candleIcon")
      var graph = document.getElementById("graphIcon")
      candle.classList.add("active")
      graph.classList.remove("active")
    }
  }

}
