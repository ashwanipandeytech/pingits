// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'admin-ag';
// }
import { Component } from '@angular/core';
import { Router,  Event as RouterEvent,NavigationEnd} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  allowaccess = false;
  title='PINGIT'
  constructor(private router: Router,
    private translate: TranslateService,

  ) {
   // ThemeService.toggleLight();
    translate.setDefaultLang('en');
    translate.use('en');
    // On route change to '/login', set the variable allowaccess to false
    router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === '/login' || this.router.url === '/') {
            this.allowaccess = false;
          } else {
            this.allowaccess = true;
          }
      }
    })


  }


}