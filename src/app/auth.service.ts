import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'F2bfGMQQb350bKVo0qnxT9Cm5U9Z7ytl',
    domain: 'cbuggyauth.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://cbuggyauth.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  userProfile: any;
  constructor(public router: Router){}

  public login(): void {
    this.auth0.authorize();
  }


  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['']);
      } else if (err) {
        this.router.navigate(['']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(cb): void {
   const accessToken = localStorage.getItem('access_token');
   if (!accessToken) {
     throw new Error('Access token must exist to fetch profile');
   }

   const self = this;
   this.auth0.client.userInfo(accessToken, (err, profile) => {
     if (profile) {
       self.userProfile = profile;
     }
     cb(err, profile);
   });
 }


  private setSession(authResult):void {
    //Set the time that the access token will expire.
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log(authResult.profile);

  }

  public logout(): void {
    // Removes tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    //nagivate back to home
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    //Check wherater the current time is past the access_token
    //expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
