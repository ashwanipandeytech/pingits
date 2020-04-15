import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { CommonService } from '../../../shared/service/common.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
	title = 'admin';
	username: any;
	password: any;
	showloader: boolean;
	modalRef: BsModalRef;
	otp: string;
	otpboxopen: boolean;
	loggedindetail: any;
	alreadyAccount:boolean;
	priviledgeState: object = {};
	loginOrRegisterformdata={
		firstname:'',
		lastname:'',
		username:'',
		email:'',
		password:'',
		gender:'test',
		
	}
  modalconfig = {
		animated: true,
		keyboard: false,
		backdrop: 'static',
		ignoreBackdropClick: false
	};
	loginDataSubscription: Subscription;
	loginOtpverifySubscription: Subscription;
	adminPrivilegeDataSubscription: Subscription;
	fileValidatorSubscription: Subscription;

  constructor(private router: Router, private loginservice: LoginService, private modalService: BsModalService, private commonservice: CommonService, private translate: TranslateService, private toastr: ToastrService) { }

	ngOnInit() {
		this.alreadyAccount=true;
		localStorage.clear();
  }
  reegisterUser(data) {
		this.showloader = true;
		this.loginDataSubscription = this.loginservice.getRegistered(this.loginOrRegisterformdata).subscribe(data => {
		this.showloader = false;
			if (data.success) {
				this.loggedindetail = data;
				localStorage.setItem('user', JSON.stringify(data.data));		
			
			} else {

				this.toastr.error(this.translate.instant('INVALID_USERNAME_OR_PASSWORD'));
      }
		}, error => {
			console.info('internal error');

		});
	}

 

	resetUserForm(form: NgForm) {
		form.resetForm();
		console.info('test')
	}
	ngOnDestroy() {
		// Prevention of memory leaks

		if (this.loginDataSubscription) {
			this.loginDataSubscription.unsubscribe();
		}
		if (this.loginOtpverifySubscription) {
			this.loginOtpverifySubscription.unsubscribe();
		}
		if (this.adminPrivilegeDataSubscription) {
			this.adminPrivilegeDataSubscription.unsubscribe();
		}

	}
}
