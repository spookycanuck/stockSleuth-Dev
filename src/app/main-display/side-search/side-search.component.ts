import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; //Angular likes HTTP client instead of async/fetch
import { NgForm } from '@angular/forms';

import { Search } from '../search.model';

@Component({
  selector: 'app-side-search',
  templateUrl: './side-search.component.html',
  styleUrls: []
})
export class SideSearchComponent implements OnInit {
  searches = [];
  isSubmitted = false;
  isLoading = false;
  newSearch = '';
  result = false;
  stonkTicker = {};
  returnStonkData = {};

  // variable collection from Search feature
  searchID = null;
  userSearch = '';
  tickerLow = null;
  tickerHigh = null;
  @Output() searchCreated = new EventEmitter();

  constructor(private router: ActivatedRoute) { }

  ngOnInit() { }

  stockList(userInput) {
    const stockName = `http://localhost:5000/getStockList?symbol=${userInput}`
    fetch(stockName).then(
      res => res.json()
    ).then(
      data => {
        this.stonkTicker = data
        console.log(this.stonkTicker)
        //outputs API Data as the empty object stonkTicker
      }
    )
  }

  searchAPI(userInput) {
    const pythonURL = `http://localhost:5000/getPriceData?symbol=${userInput}`
    fetch(pythonURL).then(
      res => res.json()
    ).then(
      data => {
        this.returnStonkData = data
        console.log(this.returnStonkData)
        //outputs API Data as the empty object returnStonkData
      }
    )
  }

  searchExists(userInput) {
    var x = this.searches
    var target = x.find(temp => temp.ticker == userInput)
    if (target) {
      // console.log("already searched!");
      this.result = true;
    }
    else {
      // console.log("doesn't exist")
      this.result = false;
    }
    return(this.result)
  }

  onAddSearch(form: NgForm) {
    this.isSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.newSearch = form.value.search.toUpperCase(); //new variable name
    this.searchExists(this.newSearch); //checking if ticker is already is in searches[]
    if (this.result == true) {
      return;
    }
    // this.stockList(this.newSearch); //checks if ticker is a valid ticker
    // this.searchAPI(this.newSearch); //searches API for ticker data

    const search: Search = {
      //I want to pull the most recent API data into this model
      id: this.searchID,
      description: this.userSearch,
      ticker: this.newSearch,
      low: this.tickerLow,
      high: this.tickerHigh
    };

    //And then push it into the array below, so I can output
    //   the array in the "Recent Searches" panel.
    this.searches.push(search);
    this.searchCreated.emit(search);

  }

}
