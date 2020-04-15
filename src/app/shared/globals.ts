import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class Globals {
  constructor( private translate: TranslateService, ) {}
  priviledgeState = JSON.parse(localStorage.getItem('assigned-privileges'));
  modalConfig = {
		animated: true,
		keyboard: false,
		backdrop: 'static',
		ignoreBackdropClick: false
	};




}
