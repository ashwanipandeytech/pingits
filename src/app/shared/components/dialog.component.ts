import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  template: `
    <h6 mat-dialog-title>{{data.title}}</h6>
    <div class="col-md-12 text-center " >
      <button  class="btn " (click)="closeDialog('cancel')">{{data.cancel}}</button>
      <button  class="btn ml-2" (click)="closeDialog('ok')">{{data.ok}}</button>
</div>
  `
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
    closeDialog(type): void {
        (type == 'ok') ? this.dialogRef.close(true) : this.dialogRef.close(false);
      }
}