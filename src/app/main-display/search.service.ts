import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Search } from "./search.model";


@Injectable({ providedIn: 'root' })
export class SearchService {
  private searches: Search[] = [];
  private searchUpdated = new Subject<Search[]>();
  private priceData = new Subject();

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
    return [...this.searches];
  }

  addSearch(ticker, apiData, userSearch, isSubmitted) {
    const search: Search = {
      id: isSubmitted, //change this at some point to an auto-generated ID
      description: userSearch,
      ticker: ticker,
      low: apiData.lows[apiData.lows.length-1].toFixed(2),
      high: apiData.highs[apiData.highs.length-1].toFixed(2)
    };
    this.searches.push(search)
    this.searchUpdated.next([...this.searches]);
    this.priceData.next([apiData]);
  }

  getMainDisplayData() {
    return this.priceData.asObservable();
  }

  getSearchUpdateListener() {
    return this.searchUpdated.asObservable();
  }

}
