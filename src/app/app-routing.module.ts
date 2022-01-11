import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainDisplayComponent } from "./main-display/main-display.component";
import { ProfileComponent } from "./text-components/profile/profile.component";
import { AboutComponent } from "./text-components/about/about.component";
import { HelpComponent } from "./text-components/help/help.component";
import { TosComponent } from "./text-components/tos/tos.component";
import { PrivacyPolicyComponent } from "./text-components/privacy-policy/privacy-policy.component";
import { DisclaimerComponent } from "./text-components/disclaimer/disclaimer.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

const routes: Routes = [
  { path: '', component: MainDisplayComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'help', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'terms', component: TosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard] --> use later for route guarding
})
export class AppRoutingModule {}
