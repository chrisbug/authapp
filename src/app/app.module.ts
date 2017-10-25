import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [appRoutingProviders, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
