import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Search } from '../search.model';

@Component({
  selector: 'app-side-search',
  templateUrl: './side-search.component.html',
  styleUrls: []
})
export class SideSearchComponent implements OnInit {
  private newSearch = '';
  private result = false;
  private tickerExists
  searches = [];
  isSubmitted = false;
  isLoading = false;
  isInvalid = false;
  stonkTicker = {};
  returnStonkData = {};

  // variable collection from API for Search feature
  searchID = null;
  userSearch = '';
  tickerLow = null;
  tickerHigh = null;
  @Output() searchCreated = new EventEmitter();

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.getStockList(); //save Stock List from API to session storage on init
   }

  async getStockList() {
    const stockName = `http://localhost:5000/getStockList`
    if (!sessionStorage.getItem('stockList')) {
      const response = await fetch(stockName);
      const stockList = await response.json();
      sessionStorage.setItem('stockList', JSON.stringify(stockList));
    }
  }

  async stockList(userInput) {
    /*
    This checks the user input against a list of tickers at the API endpoint.
    If the input is in the list, it will return the ticker to onAddSearch()
    and then use the ticker for searchAPI().

    **TO DO: If it is not a valid ticker, log an error code to the DOM.**
    */
   try {
    const stockListData = JSON.parse(sessionStorage.getItem('stockList'));
    const stockObj = stockListData.find(stock => stock.symbol == userInput);
    if (stockObj) {
      this.tickerExists = true;
      this.userSearch = stockObj.name
    }
    else {
      this.tickerExists = false;
    }
    return(this.tickerExists)
  } catch(error) {
    await this.getStockList();
  }
}

  async searchAPI(userInput) {
    /*
    This searches the user input against a list of endpoints in the API
    and then returns the data for that ticker to onAddSearch().
    */
    const pythonURL = `http://localhost:5000/getPriceData?symbol=${userInput}`
    const response = await fetch(pythonURL);
    const responseData = await response.json();
    this.tickerLow = responseData.lows[responseData.lows.length-1].toFixed(2);
    this.tickerHigh = responseData.highs[responseData.highs.length-1].toFixed(2);
  }

  searchExists(userInput) {
    /*
    Checks if userInput is already in the list of "Recent Searches". Returns
    bool to onAddSearch().
    */
    var x = this.searches
    var target = x.find(temp => temp.ticker == userInput)
    if (target) {
      this.result = true;
    }
    else {
      this.result = false;
    }
    return(this.result)
  }

  async onAddSearch(form: NgForm) {
    this.isSubmitted = true;
    this.isInvalid = false;
    if (form.invalid) {
      return;
    }

    this.newSearch = form.value.search.toUpperCase(); //new variable name
    this.isLoading = true;

    this.searchExists(this.newSearch); //checks if ticker is already is in searches[]
    if (this.result == true) {
      this.isLoading = false;
      this.isInvalid = true; //TO DO: change this to a different error readout
      return;
    }

    await this.stockList(this.newSearch); //checks if ticker is valid
    if (this.tickerExists == true) {
      console.log("Ticker: " + this.tickerExists)
      await this.searchAPI(this.newSearch); //if valid ticker, search API for data
      this.isLoading = false;
    }
    else {
      console.log("Ticker: " + this.tickerExists)
      this.isInvalid = true;
      this.isLoading = false;
      return;
    }

    const search: Search = {
      id: this.searchID,
      description: this.userSearch,
      ticker: this.newSearch,
      low: this.tickerLow,
      high: this.tickerHigh
    };

    /*
    And then push it into the array below, so I can output
    the API's most recent data to the "Recent Searches" panel.
    */
    this.searches.push(search);
    this.searchCreated.emit(search);

  }

}
