import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/service/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss'],

})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  userProfileName: string;
  constructor(private commonservice:CommonService) { }

  ngOnInit() {
    this.userProfileName = JSON.parse(localStorage.getItem('user'))['Username'];
  }

  switchCollapse(value) {
    this.isCollapsed = !value;
    this.commonservice.changedmode(!value);
    if (!value) {
      $('.left_side_content').addClass('collapsed');
      $('.sidebar-header').addClass('collapsed');
      $('#content').addClass('collapsed');
      $('.footer').addClass('collapsed');

    } else {
      $('.left_side_content').removeClass('collapsed');
      $('.sidebar-header').removeClass('collapsed');
      $('#content').removeClass('collapsed');
      $('.footer').removeClass('collapsed');
    }

  }

 }
