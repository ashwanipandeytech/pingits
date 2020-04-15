import { Component, OnInit, ChangeDetectorRef,ViewRef } from '@angular/core';
import { Globals } from '../../../shared/globals';
import { CommonService } from '../../../shared/service/common.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../shared/service/theme.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  moduleData = [];
  groupData = [];
  oemData = [];
  languageData = [];
  selectedGroup: string;
  selectedOem: string;
  selectedLanguage: string;
  disablefilter: boolean;
  dataToEmit: object;
  displayGroupDropdown:boolean;
  displayOemDropdown:boolean;
  displayLanguageDropdown: boolean;
  leftSideNoDropdown: object;
  selectedTheme: string;
  subPanelNavigationSubscription: Subscription;
  constructor(private router: Router,
    public globals: Globals,
    private commonservice: CommonService,
    public cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    public  ThemeService:ThemeService

  ) {
    if (this.router.url === '/dashboard') {
      localStorage.setItem('showGroup', JSON.stringify(false));
      localStorage.setItem('showOem', JSON.stringify(false));
      localStorage.setItem('showLanguage', JSON.stringify(false));
    }


  }

  ngOnInit() {
    this.selectedTheme = 'LightTheme';

    this.leftSideNoDropdown = {
      showGroup: 'No',
      showOem: 'No',
      showLanguage:'No'
    }


    this.disablefilter = true;
    this.moduleData = JSON.parse(localStorage.getItem('user'))['moduleData'];
    this.groupData = JSON.parse(localStorage.getItem('user'))['groupData'];
    this.selectedGroup = JSON.parse(localStorage.getItem('user'))['defaultGroup'];
    this.selectedOem = JSON.parse(localStorage.getItem('user'))['defaultoem'];
    this.selectedLanguage = JSON.parse(localStorage.getItem('user'))['defaultlang'];
    this.displayGroupDropdown = JSON.parse(localStorage.getItem('showGroup'));
    this.displayOemDropdown = JSON.parse(localStorage.getItem('showOem'));
    this.displayLanguageDropdown = JSON.parse(localStorage.getItem('showLanguage'));
    this.dataToEmit = {
      groupCode: this.selectedGroup,
      oemCode: this.selectedOem,
      langCode: this.selectedLanguage,
    }
    localStorage.setItem('commonDropDownvalues', JSON.stringify(this.dataToEmit));
    this.getGroupOems();
    this.getOemLanguages();
   // this.loadData();
  }
  ngAfterViewInit() {
    this.subPanelNavigationSubscription = this.commonservice.navLinkClicked.subscribe(response => {
      this.displayGroupDropdown = (response.showGroup=='Yes') ?true:false;
      this.displayOemDropdown = (response.showOem =='Yes')?true:false;
      this.displayLanguageDropdown = (response.showLanguage == 'Yes') ? true : false;
    //  this.cdRef.detectChanges();
    if (!(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges()
      // do other tasks
    }
    }).add(() => console.log('Unsubscribed navlink click'));
   }
  addClassToUl(index, module) {
    module.sideBarCollapse = !module.sideBarCollapse;
    console.info(module.sideBarCollapse)
     if (!module.sideBarCollapse) {
       $('#showhide'+index).addClass('show-submenu');
       $('#showhide'+index).parents('.list-item').children('.link').children('span').children('i').addClass('rotate-icon');
     } else {
      $('#showhide'+index).removeClass('show-submenu');
      $('#showhide'+index).parents('.list-item').children('.link').children('span').children('i').removeClass('rotate-icon');
     }
  }
  getGroupOems() {
    for (let i = 0; i < this.groupData.length; i++){
      if (this.groupData[i].groupCode == this.selectedGroup) {
        this.oemData = this.groupData[i].oemData;
        this.selectedOem = this.groupData[i].groupDefaultOem;
      }
    }
  }
  getOemLanguages() {
    for (let i = 0; i < this.oemData.length; i++){
      if (this.oemData[i].oemCode == this.selectedOem) {
        this.languageData = this.oemData[i].languageData;
        this.selectedLanguage = this.oemData[i].defaultLanguage;
      }
    }
  }
  loadData() {

   // event.preventDefault();
    this.dataToEmit = {
      groupCode: this.selectedGroup,
      oemCode: this.selectedOem,
      langCode: this.selectedLanguage,
    }
    localStorage.setItem('commonDropDownvalues', JSON.stringify(this.dataToEmit));
    this.commonservice.emitFilterisClicked(this.dataToEmit);
  }
  setPanelsDropdowns(values) {
    this.displayGroupDropdown = (values.showGroup=='Yes') ?true:false;
    this.displayOemDropdown = (values.showOem =='Yes')?true:false;
    this.displayLanguageDropdown = (values.showLanguage == 'Yes') ? true : false;
    localStorage.setItem('showGroup', JSON.stringify(this.displayGroupDropdown));
    localStorage.setItem('showOem', JSON.stringify(this.displayOemDropdown));
    localStorage.setItem('showLanguage', JSON.stringify(this.displayLanguageDropdown));
   // this.loadData();
  }

	ngOnDestroy() {
  //	Prevention of memory leaks

  this.cdRef.detach();
		if(this.subPanelNavigationSubscription)
		{
			this.subPanelNavigationSubscription.unsubscribe();
    }



	}


}

