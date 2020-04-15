import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment } from '../../../environments/environment';
import { Commonresponseobject } from '../../shared/models';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': environment.Auth_Key,
      'Content-Type': 'application/json'

    })
  };
  constructor(private http: HttpClient, protected localStorage: LocalStorage) { }
  getRegistered(data){
    return this.http.post<Commonresponseobject>(environment.API_URL + 'user/register', {
      'application': 'PINGIT_APP',
      'version': 'v1',
      'data': data
    },
      this.httpOptions

    );
  }
  getLogin(username, password) {
    return this.http.post<Commonresponseobject>(environment.API_URL + 'user/login', {
      'application': 'IPHONE_APP',
      'version': 'v1',
      'data': {
        'username': username,
        'password': password,

      }
    },
      this.httpOptions

    );
  }
  verifyotp(otp) {
    return this.http.post<Commonresponseobject>(environment.API_URL + 'user/verifyotp', {
      'application': 'IPHONE_APP',
      'version': 'v1',
      'data': {
        'ID': JSON.parse(localStorage.getItem('user'))['id'],
        'userName': JSON.parse(localStorage.getItem('user'))['Username'],
        'otp': otp,

      }
    },
    this.httpOptions

    );
  }
  getprivilege(data) {
    return this.http.post<Commonresponseobject>(environment.API_URL + 'privilege/getstatename', {
      'application': 'IPHONE_APP',
      'version': 'v1',
      'data': {
        'roleCode': (data.data.ID === '1') ? 1 : data.role,
        'loginID': data.data.userName,

      }
    },
    this.httpOptions

    );
  }

  isAuthenticated() {
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))['ID']!='') {
      return true;
    } else {
      return false;
    }
  }

}
