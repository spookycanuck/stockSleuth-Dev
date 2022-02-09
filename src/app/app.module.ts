import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatPaginatorModule } from "@angular/material/paginator";

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
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
