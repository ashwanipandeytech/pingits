import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Globals } from './globals';
import { AuthGuard } from '../guards/auth-guard.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import{MatButtonModule}from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
//import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';

//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GroupByPipe } from '../shared/pipes/group-by-pipe';




@NgModule({
  declarations: [GroupByPipe],
  imports: [
    ModalModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    TabsModule.forRoot(),
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDividerModule,
   // MatMomentDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatButtonModule,    
    ScrollingModule,

    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
   // NgMultiSelectDropDownModule.forRoot(),

  ],
  exports: [
    HttpClientModule,
    ModalModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ToastrModule,
    TabsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDividerModule,
   // MatMomentDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatButtonModule,
    ScrollingModule,
    TooltipModule,
    PopoverModule,
    GroupByPipe,



   // NgMultiSelectDropDownModule,


  ],

  providers: [Globals, AuthGuard],
})
export class SharedModule { }
