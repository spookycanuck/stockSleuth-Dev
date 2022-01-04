import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
