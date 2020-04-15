import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CsmcallsComponent } from '../admin/csmcalls/component/csmcalls.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [CsmcallsComponent],
  imports: [SharedModule,
    NgxIntlTelInputModule,
    PaginationModule.forRoot()],
  exports: [
    SharedModule,
    CsmcallsComponent,
    NgxIntlTelInputModule,
    PaginationModule
  ],

  providers: [],
})
export class SharedcsmModule { }
