import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Commonresponseobject } from '../../shared/models';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   httpOptions = {
    headers: new HttpHeaders({
      'Authorization': environment.Auth_Key,
      'Content-Type': 'application/json'

    })
  };
  $filterbuttonclicked = new EventEmitter();
  $addUpdateTicketclicked = new EventEmitter();
  navLinkClicked = new BehaviorSubject({ showGroup: 'No', showOem: 'No', showLanguage: 'No' });
  currentDropDownVisibility = this.navLinkClicked.asObservable();
  $emitusername = new EventEmitter();
  private sidbarcollapsed = new BehaviorSubject(false);
  currentsidebarstate = this.sidbarcollapsed.asObservable();
 // userid = (JSON.parse(localStorage.getItem('user')) == undefined) ? '0' : JSON.parse(localStorage.getItem('user'))['ID'];
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService, ) {
  }


  changedmode(value) {
    this.sidbarcollapsed.next(value);
  }
  emitusername(data) {
    this.$emitusername.emit(data.userName);
  }

  emitFilterisClicked(data) {
    console.info(data);
    this.$filterbuttonclicked.next(data);

  }
  emitaddUpdateTicketsClicked(data) {
    console.info(data);
    this.$addUpdateTicketclicked.next(data);
  }
  emitNavLinkClicked(data) {
    console.info('called');
    const showGroup = (data.showGroup == 'Yes') ? true : false;
    const showOem = (data.showGroup == 'Yes') ? true : false;
    const showLanguage = (data.showGroup == 'Yes') ? true : false;
    localStorage.setItem('showGroup', JSON.stringify(showGroup));
    localStorage.setItem('showOem', JSON.stringify(showOem));
    localStorage.setItem('showLanguage', JSON.stringify(showLanguage));
    this.navLinkClicked.next(data);
  }
  

 
  applyFilter(filterValue: string, data) {
    console.info(filterValue);
    data.filter = filterValue.trim().toLowerCase();
  }
 
  
  

}



