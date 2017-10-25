import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  //Configure Auth0
  lock = new Auth0Lock('F2bfGMQQb350bKVo0qnxT9Cm5U9Z7ytl','cbuggyauth.eu.auth0.com', {});
  constructor() {
    this.lock.on("authenticated", (authResult: any) => {
      this.lock.getProfile(authResult.idToken, function(error:any, profile: any){
        if(error){
          throw new Error(error);
        }

        //Set Profile
        localStorage.setItem('profile', JSON.stringify(profile));

        //Set token
        localStorage.setItem('id_token', authResult.idToken);
      })
    })
   }
   public login() {
     // Call the show method to display the widget
     this.lock.show();
   }

   public authenticated(){
     return tokenNotExpired();
   }

   public logout() {
     //Remove info from localStorage
     localStorage.removeItem('id_token');
     localStorage.removeItem('profile');
   }

}
