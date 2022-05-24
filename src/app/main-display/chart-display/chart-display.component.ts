import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

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
  current = [];
  dataPresent = false;

  faBar = faChartBar;
  faGraph = faChartLine;
  graphClicked = true;
  candleClicked = false;

  public graph;
  public status;
  private searchesSub: Subscription;
  private savedSub: Subscription;
  private currentSub: Subscription;

  constructor(public searchService: SearchService, private router: ActivatedRoute) { }

  // TODO: Create observable for which graph icon is clicked maybe?
  //  then follow that observable around when the 3 graph buttons are clicked

  ngOnInit() {
    console.log("OnInit - data present?\n", this.dataPresent)
    this.searchList = this.searchService.getSearches()
    this.savedList = this.searchService.getSaved()
    this.current = this.searchService.getCurrentSearch()
    if (this.searchList.length > 0) {
      this.getChart(this.searchList)
    }
    else if (this.savedList.length > 0) {
      this.getChart(this.savedList)
    }
    this.searchesSub = this.searchService.getSearchUpdateListener() //actively listening for new searches
      .subscribe((searches: Search[]) => {
        this.searchList = searches;
        this.current = searches;
        this.setLines();
        this.checkGraph();
      });
    this.savedSub = this.searchService.getSavedUpdateListener() //actively listening for new searches
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
      this.getChart(this.savedList)
    });
    this.currentSub = this.searchService.getCurrentUpdateListener()
    .subscribe((current: Search[]) => {
      this.current = current;
      this.getChart(this.current)
    })
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
      if (list.length > 0 && this.graphClicked == true) {
        this.data = list[list.length-1];
        this.graph = this.searchService.setGraphValues(this.data, 'lines')
        // console.log(this.graph)
      }
      else if (list.length > 0 && this.candleClicked == true) {
        // this.data = list[list.length-1];
        this.graph = this.searchService.setGraphValues(this.current, 'candle')
        // console.log(this.graph)
      }
      else return;
    }
    else return;
  }

  getLines() {
    if (this.searchList.length > 0) {
      var list = this.searchList
    }
    else {
      var list = this.savedList
    }

    if (list) {
      if (list.length > 0 && this.graphClicked == true) {
        this.graph = this.searchService.setGraphValues(this.current, 'lines')
      }
    }
    else return;
  }

  setLines() {
    if (this.graphClicked == false) {
      this.graphClicked = true;
      this.candleClicked = false;
      var graph = document.getElementById("graphIcon")
      var candle = document.getElementById("candleIcon")
      graph.classList.add("active")
      candle.classList.remove("active")
    }
  }

  graphLines() {
    // console.log("graph clicked!")
    this.graphClicked = true;
    this.candleClicked = false;
    if (this.graphClicked) {
      var graph = document.getElementById("graphIcon")
      var candle = document.getElementById("candleIcon")
      graph.classList.add("active")
      candle.classList.remove("active")
    }
    this.getLines()
  }

  graphCandles() {
    // console.log("candle clicked!")
    this.candleClicked = true;
    this.graphClicked = false;
    if (this.candleClicked) {
      var candle = document.getElementById("candleIcon")
      var graph = document.getElementById("graphIcon")
      candle.classList.add("active")
      graph.classList.remove("active")
    }
    this.checkGraph()
  }

  ngOnDestroy() {
    // this.searches = []
    this.searchesSub.unsubscribe();
  }
}
