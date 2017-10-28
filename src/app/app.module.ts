import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
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
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
