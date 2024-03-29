import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Search } from "./search.model";
import { Lines, Candlestick, Layout } from "./chart-display/graph";

@Injectable({ providedIn: 'root' })
export class SearchService {

  //variable collection
  private searches: Search[] = [];
  private searchUpdated = new Subject<Search[]>();
  private savedUpdated = new Subject<Search[]>();
  private currentUpdated = new Subject<Search[]>();
  private graph = Lines;
  private candle = Candlestick;
  private chartType;
  private layout = Layout;

  constructor(private http: HttpClient, private router: Router) {}

  async getStockList() {
  /*
  Grabs the list of stock names & ticker symbols from the API.
  Saves to session storage.
  */
    const stockName = `http://localhost:5000/getStockList`
    if (!sessionStorage.getItem('stockList')) {
      const response = await fetch(stockName);
      const stockList = await response.json();
      sessionStorage.setItem('stockList', JSON.stringify(stockList));
    }
  }

  async searchAPI(userInput) {
    /*
    This searches the user input against a list of endpoints in the API
    and then returns the data for that ticker to onAddSearch().
    */
    var priceData;
    const pythonURL = `http://localhost:5000/getPriceData?symbol=${userInput}`
    const response = await fetch(pythonURL);
    const responseData = await response.json();
    priceData = responseData;
    return priceData
  }

  async getOverview(userInput) {
    /*
    This searches the user input against a list of endpoints in the API
    and then returns the data for that ticker to XXXXX.
    */
    var overviewData;
    const pythonURL = `http://localhost:5000/getOverview?symbol=${userInput}`
    const response = await fetch(pythonURL);
    const responseData = await response.json();
    overviewData = responseData;
    return overviewData
  }

  async getRatings(userInput) {
    /*
    This searches the user input against a list of endpoints in the API
    and then returns the data for that ticker to XXXXX.
    */
    var ratingData;
    const pythonURL = `http://localhost:5000/getRatings?symbol=${userInput}`
    const response = await fetch(pythonURL);
    const responseData = await response.json();
    ratingData = responseData;
    return ratingData
  }

  getSearches() {
  // Returns current list from sessionStorage to variable
    this.searches = JSON.parse(sessionStorage.getItem('searches'));
    return this.searches
  }

  getSaved() {
  // Returns current list from sessionStorage to variable
    var searchList: Search[] = [];
    searchList = JSON.parse(localStorage.getItem('saved'));
    return searchList
  }

  getCurrentSearch() {
  // Returns currentSearch item from sessionStorage
    return JSON.parse(sessionStorage.getItem('currentSearch'));
  }

  getSearchUpdateListener() {
  // Returns updated Observable
    return this.searchUpdated.asObservable();
  }

  getSavedUpdateListener() {
  // Returns updated Observable
    return this.savedUpdated.asObservable();
  }

  getCurrentUpdateListener() {
    // Returns updated Observable
      return this.currentUpdated.asObservable();
    }

  addSearch(ticker, apiData, userSearch, isSubmitted, overviewData, ratingData) {
  /*
  Takes inputs from the onAddSearch() function in side-search.component.ts file.
  Posts inputs to the search model, then pushes them to the observable in the
  sessionStorage. Dynamically updates lists on submit.
  */
    const search: Search = {
      id: isSubmitted, //change this at some point to an auto-generated ID
      description: userSearch,
      ticker: ticker,
      low: apiData.lows[0].toFixed(2),
      high: apiData.highs[0].toFixed(2),
      data: apiData,
      overview: overviewData,
      rating: ratingData
    };
    let localSearch = [];
    if (sessionStorage.searches) {
      localSearch = JSON.parse(sessionStorage.getItem('searches'));
    }
    localSearch.push(search)
    this.searchUpdated.next([...localSearch]);
    sessionStorage.setItem('searches', JSON.stringify(localSearch));
    this.setCurrentSearch(search);
  }

  setCurrentSearch(x) {
  /*
  Creates object "currentSearch" in session when a user adds a search
  or clicks the graph button.
  */
    let newCurrent = x
    this.currentUpdated.next(newCurrent)
    sessionStorage.setItem('currentSearch', JSON.stringify(x));
    this.getCurrentUpdateListener();
  }

  deleteSearch(tickerId) {
  // Deletes a search from Recent Searches in sessionStorage, updates side-search list.
    let searches = this.getSearches()
    searches = searches.filter(item => item.ticker !== tickerId);
    this.searchUpdated.next([...searches]);
    sessionStorage.setItem('searches', JSON.stringify(searches))
    this.getSearchUpdateListener();
  }

  clearSearches() {
  // Clears searches from Recent Searches in sessionStorage, updates side-search list.
    let searchList = [];
    sessionStorage.setItem('searches', JSON.stringify(searchList));
    sessionStorage.setItem('currentSearch', JSON.stringify(searchList));
    this.searchUpdated.next([...searchList]);
    this.getSearchUpdateListener();
  }

  addSaved() {
  // Saves the current list of Recent Searches to Saved Searches, updates side-search list.
    let savedList = [];
    let searchList = this.getSearches();
    savedList.push(...searchList)
    this.savedUpdated.next([...savedList]);
    localStorage.setItem('saved', JSON.stringify(savedList));
    this.clearSearches();
    this.getSavedUpdateListener();
  }

  deleteSaved(tickerId) {
  // Deletes a search from Saved Searches in sessionStorage, updates side-search list.
    let saved = this.getSaved()
    saved = saved.filter(item => item.ticker !== tickerId);
    this.savedUpdated.next([...saved]);
    localStorage.setItem('saved', JSON.stringify(saved))
    this.getSavedUpdateListener();
  }

  clearSavedSearches() {
  // Clears searches from Saved Searches in sessionStorage, updates side-search list.
    let savedList = [];
    localStorage.setItem('saved', JSON.stringify(savedList));
    sessionStorage.setItem('currentSearch', JSON.stringify(savedList));
    this.savedUpdated.next([...savedList]);
    this.getSavedUpdateListener();
  }

  graphSearch(apiData, id) {
  // Builds apiData input for setGraphValues() function
    let searches = this.getSearches()
    for(var i = 0; i < searches.length; i++) {
      if(searches[i].ticker == apiData) {
        var doody = searches[i]
     }
    }
    console.log(apiData, id)
    this.setGraphValues(doody, id)
    this.setCurrentSearch(doody)
  }

  graphSaved(apiData, id) {
    // Builds apiData input for setGraphValues() function
    let saved = this.getSaved()
    for(var i = 0; i < saved.length; i++) {
      if(saved[i].ticker == apiData) {
        var doody = saved[i]
     }
    }
    this.setGraphValues(doody, id)
    this.setCurrentSearch(doody)
  }

  setGraphValues(apiData, id) {
  /*
  Sets plotly graph values. Takes inputs in the form of apiData. Can be touched
  from anywhere in the app that allows a user to graph an object.
  */
    const priceData = apiData.data;
    const layout = this.layout;
    let trace;
    let graphArray = []

    if (id == 'lines') {
      trace = this.graph

      //Building unique line values
      trace.data[0].y = priceData.adjCloses;
      layout.layout.title = apiData.description + " Adjusted Close";
    }
    else if (id == 'candle') {
      trace = this.candle

      // Building unique candle values
      trace.data[0].open = priceData.opens;
      trace.data[0].close = priceData.adjCloses;
      trace.data[0].low = priceData.lows;
      trace.data[0].high = priceData.highs;
      layout.layout.title = apiData.description + " Candlestick Chart";
    }

    // Building graph window
    trace.data[0].name = apiData.ticker;
    trace.data[0].x = priceData.dates;

    // Building graph volume
    trace.data[1].name = apiData.ticker;
    trace.data[1].x = priceData.dates;
    trace.data[1].y = priceData.volumes;
    trace.data[1].marker.color = priceData.colors;

    // Building graph layout
    layout.layout.yaxis2.range = [0, (Math.max(...priceData.volumes) * 10)];

    graphArray = [trace, layout]

    return graphArray;
  }

} //end Search Service class.
