import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../search.service';

@Component({
  selector: 'app-holders-tab',
  templateUrl: './holders-tab.component.html',
  styleUrls: ['./holders-tab.component.css']
})
export class HoldersTabComponent implements OnInit {
  searchList = []
  savedList = []

  constructor(public searchService: SearchService) {}

  ngOnInit() {
    this.searchList = this.searchService.getSearches()
    this.savedList = this.searchService.getSaved()
  }

}
