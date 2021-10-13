import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideSearchComponent } from './side-search/side-search.component';
import { MainDisplayComponent } from './main-display/main-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SideSearchComponent,
    MainDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
