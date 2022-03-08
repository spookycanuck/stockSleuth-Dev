import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Search } from "./search.model";
import { Graph } from "./chart-display/graph";

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searches: Search[] = [];
  private searchUpdated = new Subject<Search[]>();
  private savedUpdated = new Subject<Search[]>();
  private graph = Graph;

  constructor(private http: HttpClient, private router: Router) {}

  async getStockList() {
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
    this.searches = JSON.parse(sessionStorage.getItem('searches'));
    return this.searches
  }

  getSaved() {
    var searchList: Search[] = [];
    searchList = JSON.parse(localStorage.getItem('saved'));
    return searchList
  }

  addSearch(ticker, apiData, userSearch, isSubmitted) {
    const search: Search = {
      id: isSubmitted, //change this at some point to an auto-generated ID
      description: userSearch,
      ticker: ticker,
      low: apiData.lows[apiData.lows.length-1].toFixed(2),
      high: apiData.highs[apiData.highs.length-1].toFixed(2),
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
    let searches = this.getSearches()
    searches = searches.filter(item => item.ticker !== tickerId);
    this.searchUpdated.next([...searches]);
    sessionStorage.setItem('searches', JSON.stringify(searches))
    this.getSearchUpdateListener();
  }

  addSaved() {
    let savedList = [];
    let searchList = this.getSearches();
    savedList.push(...searchList)
    this.savedUpdated.next([...savedList]);
    localStorage.setItem('saved', JSON.stringify(savedList));
    this.getSavedUpdateListener();
  }

  deleteSaved(tickerId) {
    let saved = this.getSaved()
    saved = saved.filter(item => item.ticker !== tickerId);
    this.savedUpdated.next([...saved]);
    localStorage.setItem('saved', JSON.stringify(saved))
    this.getSavedUpdateListener();
  }

  graphSearch(apiData) {
    let searches = this.getSearches()
    for(var i = 0; i < searches.length; i++) {
      if(searches[i].ticker == apiData) {
        var doody = searches[i]
     }
   }
    this.setGraphValues(doody)
  }

  graphSaved(apiData) {
    let saved = this.getSaved()
    for(var i = 0; i < saved.length; i++) {
      if(saved[i].ticker == apiData) {
        var doody = saved[i]
     }
   }
    this.setGraphValues(doody)
  }

  getSearchUpdateListener() {
    return this.searchUpdated.asObservable();
  }

  getSavedUpdateListener() {
    return this.savedUpdated.asObservable();
  }

  setGraphValues(apiData) {
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

}
