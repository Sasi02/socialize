import { FacebookAuthModel } from './../../models/facebook-auth.model';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserConfigService {
  private facebookUser: FacebookAuthModel;


  constructor(
  ) { }

  set FacebookUser(params: FacebookAuthModel) {
    localStorage.setItem('facebook-user', JSON.stringify(params));
    this.facebookUser = params;
  }

  get FacebookUser(): FacebookAuthModel {
    if (this.facebookUser) {
      return this.facebookUser;
    }
    const objString: string = localStorage.getItem('facebook-user');
    if (objString) {
      return JSON.parse(objString);
    }
    return null;
  }

  logout() {
    this.FacebookUser = null;
  }
}
