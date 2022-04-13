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

  //variable collection
  private newSearch = '';
  private result = false;
  private tickerExists
  searches = [];
  localStock = false;
  isSubmitted = false;
  isLoading = false;
  isInvalid = false;
  recentSearchExists = false;
  priceData = null;

  faRemove = faRemove;
  faGraph = faChartLine;

  //reactive form stuff
  searchControl = new FormControl('', [Validators.required, Validators.maxLength(5)])
  filteredOptions: Observable<string[]>
  searchForm: FormGroup;

  // variable collection for API & Search features
  userSearch = '';
  searchList: Search[] = [];
  savedList: Search[] = [];
  private searchesSub: Subscription;
  private savedSub: Subscription;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder, public searchService: SearchService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.searchService.getStockList(); //save Stock List from API to session storage on init
    this.checkSession(); //checks if stockList is in session, if not adds it
    this.searchForm = this.fb.group({ //initialization of reactive FormGroup
      search: this.searchControl
    });
    this.filteredOptions = this.searchControl.valueChanges.pipe( //Autocomplete observable
      startWith(''),
      map(value => this._filter(value))
    );
    this.searchList = this.searchService.getSearches(); //set variable to list of searches
    this.savedList = this.searchService.getSaved(); //set variable to list of saved searches
    this.searchesSub = this.searchService.getSearchUpdateListener() //returns searches observable
      .subscribe((searches: Search[]) => {
        this.searchList = searches;
      });
    this.savedSub = this.searchService.getSavedUpdateListener() //returns saved searches observable
    .subscribe((saved: Search[]) => {
      this.savedList = saved;
    });
  }

  async stockList(userInput) {
  /*
  This checks the user input against a list of tickers at the API endpoint.
  If the input is in the list, it will return the ticker to onAddSearch()
  and then use the ticker for searchAPI().
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
    }
    catch(error) {
      await this.searchService.getStockList();
    }
  }


  searchExists(userInput) {
    /*
    Checks if userInput is already in the list of "Recent Searches".
    Returns bool to onAddSearch().
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
    /*
    Search function that reaches out to the API to find data for ticker
    based on user input. Function will verify that the ticker exists
    against the stockList variable in session storage and then posts
    the data as an object to the Search model. Then appends the searches
    array in local storage with info.
    */
    this.isSubmitted = true;
    this.isInvalid = false;
    if (form.invalid) {
      return;
    }

    var newSearch = form.value.search.toUpperCase(); //new variable name
    this.isLoading = true;

    this.searchExists(newSearch);
    if (this.result == true) {
      this.isLoading = false;
      this.recentSearchExists = true; //TO DO: change this to a different error readout if search exists!
      return;
    }

    await this.stockList(newSearch); //checks if ticker is valid against stock list
    if (this.tickerExists == true) {
      var priceData = await this.searchService.searchAPI(newSearch); //if valid ticker, search API for data
      var overviewData = await this.searchService.getOverview(newSearch)
      this.isLoading = false;
    }
    else {
      console.log("ERROR: Invalid Ticker Entered\nTicker Status: " + this.tickerExists)
      this.isInvalid = true;
      this.isLoading = false;
      return;
    }

    this.searchService.addSearch(newSearch, priceData, this.userSearch, this.isSubmitted, overviewData)
  }

  onSaveSearch() {
  // Saves the list of Recent Searches to the Saved Searches variable
    this.searchService.addSaved();
  }

  onClearSearch() {
  // Clears the list of Recent Searches
    this.searchService.clearSearches();
  }

  onClearSaved() {
  // Clears the list of Saved Searches
    this.searchService.clearSavedSearches();
  }

  checkSession() {
  /*
  Checks session storage for the stockList[] and searches[] arrays.
  If the arrays do not exist, checkSession() initializes either or
  both as empty sets.
  */
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

  deleteSearch(ticker: string) {
  // Deletes a single item from Recent Searches
    this.searchService.deleteSearch(ticker)
  }

  deleteSaved(ticker: string) {
  // Deletes a single item from Saved Searches
    this.searchService.deleteSaved(ticker)
  }

  graphSearch(tickerId) {
  // Graphs a single item from Recent Searches
    this.searchService.graphSearch(tickerId)
  }

  graphSaved(tickerID) {
  // Graphs a single item from Saved Searches
    this.searchService.graphSaved(tickerID)
  }

  private _filter(value) {
  /*
  Private function added for auto complete on search. This function
  tracks user keystrokes and matches the values to respective tickers
  or company names in the stockList variable. Due to size and runtime
  constraints, the resulting value is limited to the first 25 matches.
  */
    this.recentSearchExists = false;
    this.isInvalid = false;
    const filterValue = value.toLowerCase();
    let options = JSON.parse(sessionStorage.getItem('stockList'));
    return (options || []).filter(option => option.symbol.toLowerCase().includes(filterValue) || option.name.toLowerCase().includes(filterValue)).slice(0,25)
  }

  ngOnDestroy() {
  /*
  Gonna be honest, idk why this is here or what it does...
  but Maxajillion Schwartzenfeller told me to put it here.
  */
    this.searchesSub.unsubscribe();
  }

}
