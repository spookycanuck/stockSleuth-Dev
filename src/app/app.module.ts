import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideSearchComponent } from './main-display/side-search/side-search.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './text-components/profile/profile.component';
import { AboutComponent } from './text-components/about/about.component';
import { HelpComponent } from './text-components/help/help.component';
import { TosComponent } from './text-components/tos/tos.component';
import { PrivacyPolicyComponent } from './text-components/privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './text-components/disclaimer/disclaimer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChartDisplayComponent } from './main-display/chart-display/chart-display.component';
import { OverviewTabComponent } from './main-display/chart-display/overview-tab/overview-tab.component';
import { SentimentTabComponent } from './main-display/chart-display/sentiment-tab/sentiment-tab.component';
import { ArticlesTabComponent } from './main-display/chart-display/articles-tab/articles-tab.component';
import { HoldersTabComponent } from './main-display/chart-display/holders-tab/holders-tab.component';
import { FilingsTabComponent } from './main-display/chart-display/filings-tab/filings-tab.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    SideSearchComponent,
    MainDisplayComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    AboutComponent,
    HelpComponent,
    TosComponent,
    PrivacyPolicyComponent,
    DisclaimerComponent,
    LoginComponent,
    SignupComponent,
    ChartDisplayComponent,
    OverviewTabComponent,
    SentimentTabComponent,
    ArticlesTabComponent,
    HoldersTabComponent,
    FilingsTabComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatPaginatorModule,
    CommonModule,
    PlotlyModule,
    MatTableModule,
    MatSelectModule,
    MatPseudoCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
