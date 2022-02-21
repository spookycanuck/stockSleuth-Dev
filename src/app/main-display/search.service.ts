import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Search } from "./search.model";


@Injectable({ providedIn: 'root' })
export class SearchService {
  private searches: Search[] = [];
  private searchUpdated = new Subject<{searches: Search[], searchCount: number }>();
  @Output() searchCreated = new EventEmitter<any>();

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
    var tickerLow, tickerHigh, priceData;
    const pythonURL = `http://localhost:5000/getPriceData?symbol=${userInput}`
    const response = await fetch(pythonURL);
    const responseData = await response.json();
    tickerLow = responseData.lows[responseData.lows.length-1].toFixed(2);
    tickerHigh = responseData.highs[responseData.highs.length-1].toFixed(2);
    priceData = responseData;
    return priceData
  }

  getSearches() {
    this.http
      .get<{}
  }

  sendData(search, priceData, isSubmitted) {
    this.searchCreated.emit({search, priceData, isSubmitted})
    // console.log(search, priceData, isSubmitted)
  }

  getSearchUpdateListener() {
    return this.searchUpdated.asObservable();
  }

}
