import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Search } from "./search.model";
import { Graph } from "./chart-display/graph";

@Injectable({ providedIn: 'root' })
export class SearchService {

  //variable collection
  private searches: Search[] = [];
  private searchUpdated = new Subject<Search[]>();
  private savedUpdated = new Subject<Search[]>();
  private graph = Graph;

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

  getSearchUpdateListener() {
  // Returns updated Observable
    return this.searchUpdated.asObservable();
  }

  getSavedUpdateListener() {
  // Returns updated Observable
    return this.savedUpdated.asObservable();
  }

  addSearch(ticker, apiData, userSearch, isSubmitted) {
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
      data: apiData
    };
    let localSearch = [];
    if (sessionStorage.searches) {
      localSearch = JSON.parse(sessionStorage.getItem('searches'));
    }
    localSearch.push(search)
    this.searchUpdated.next([...localSearch]);
    sessionStorage.setItem('searches', JSON.stringify(localSearch));
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
    this.savedUpdated.next([...savedList]);
    this.getSavedUpdateListener();
  }

  graphSearch(apiData) {
  // Builds apiData input for setGraphValues() function
    let searches = this.getSearches()
    for(var i = 0; i < searches.length; i++) {
      if(searches[i].ticker == apiData) {
        var doody = searches[i]
     }
   }
    this.setGraphValues(doody)
  }

  graphSaved(apiData) {
  // Builds apiData input for setGraphValues() function
    let saved = this.getSaved()
    for(var i = 0; i < saved.length; i++) {
      if(saved[i].ticker == apiData) {
        var doody = saved[i]
     }
   }
    this.setGraphValues(doody)
  }

  setGraphValues(apiData) {
  /*
  Sets plotly graph values. Takes inputs in the form of apiData. Can be touched
  from anywhere in the app that allows a user to graph an object.
  */
    const priceData = apiData.data;
    const graph = this.graph;

    // Building graph window
    graph.data[0].name = apiData.ticker;
    graph.data[0].x = priceData.dates;
    graph.data[0].y = priceData.adjCloses;
    graph.layout.title = apiData.description + " Adjusted Close";

    // Building graph volume
    graph.data[1].name = apiData.ticker;
    graph.data[1].x = priceData.dates;
    graph.data[1].y = priceData.volumes;
    graph.data[1].marker.color = priceData.colors;

    // Building graph layout
    graph.layout.yaxis2.range = [0, (Math.max(...priceData.volumes) * 10)];

    return graph;
  }

} //end Search Service class.
