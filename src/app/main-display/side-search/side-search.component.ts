import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, startWith } from 'rxjs';
import { map } from 'rxjs/operators'
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

import { Search } from '../search.model';
import { SearchService } from '../search.service';

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
  localStock = false;
  isSubmitted = false;
  isLoading = false;
  isInvalid = false;
  priceData = null;

  faRemove = faRemove;
  faGraph = faChartLine;

  //reactive form stuff
  searchControl = new FormControl('', [Validators.required, Validators.maxLength(5)])
  filteredOptions: Observable<string[]>
  searchForm: FormGroup;


  // variable collection from API for Search feature
  userSearch = '';

  searchList: Search[] = [];
  savedList: Search[] = [];
  private searchesSub: Subscription;
  private savedSub: Subscription;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder, public searchService: SearchService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.searchService.getStockList(); //save Stock List from API to session storage on init
    this.checkSession();
    this.searchForm = this.fb.group({
      search: this.searchControl
    });
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.searchList = this.searchService.getSearches();
    this.savedList = this.searchService.getSaved();
    this.searchesSub = this.searchService.getSearchUpdateListener()
      .subscribe((searches: Search[]) => {
        this.searchList = searches;
      });
    this.savedSub = this.searchService.getSavedUpdateListener()
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
    });
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
    await this.searchService.getStockList();
  }
}


  searchExists(userInput) {
    /*
    Checks if userInput is already in the list of "Recent Searches". Returns
    bool to onAddSearch().
    */
    var x = this.searchList
    var target = x.find(temp => temp.ticker == userInput)
    if (target) {
      this.result = true;
    }
    else {
      this.result = false;
    }
    return(this.result)
  }

  async onAddSearch(form: FormGroup) {
    this.isSubmitted = true;
    this.isInvalid = false;
    if (form.invalid) {
      return;
    }

    this.newSearch = form.value.search.toUpperCase(); //new variable name
    this.isLoading = true;

    this.searchExists(this.newSearch);
    if (this.result == true) {
      this.isLoading = false;
      this.isInvalid = true; //TO DO: change this to a different error readout
      return;
    }

    await this.stockList(this.newSearch); //checks if ticker is valid against stock list
    if (this.tickerExists == true) {
      this.priceData = await this.searchService.searchAPI(this.newSearch); //if valid ticker, search API for data
      this.isLoading = false;
    }
    else {
      console.log("ERROR: Invalid Ticker Entered\nTicker Status: " + this.tickerExists)
      this.isInvalid = true;
      this.isLoading = false;
      return;
    }

    this.searchService.addSearch(this.newSearch, this.priceData, this.userSearch, this.isSubmitted)
  }

  onSaveSearch() {
    this.searchService.addSaved();
  }

  onClearSearch() {
    this.searchService.clearSearches();
  }

  onClearSaved() {
    this.searchService.clearSavedSearches();
  }

  checkSession() {
    let emptySearch = [];
    if (sessionStorage.stockList) {
      this.localStock = true;
    }
    if (!sessionStorage.searches) {
      sessionStorage.setItem('searches', JSON.stringify(emptySearch));
    }
    if (localStorage.saved) {
      return;
    }
    else {
      localStorage.setItem('saved', JSON.stringify(emptySearch));
    }
  }

  deleteSaved(ticker: string) {
    this.searchService.deleteSaved(ticker)
  }

  deleteSearch(ticker: string) {
    this.searchService.deleteSearch(ticker)
  }

  graphSearch(tickerId) {
    this.searchService.graphSearch(tickerId)
  }

  graphSaved(tickerID) {
    this.searchService.graphSaved(tickerID)
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();
    let options = JSON.parse(sessionStorage.getItem('stockList'));
    return options.filter(option => option.symbol.toLowerCase().includes(filterValue) || option.name.toLowerCase().includes(filterValue)).slice(0,25)
  }

  ngOnDestroy() {
    this.searchesSub.unsubscribe();
  }

}
