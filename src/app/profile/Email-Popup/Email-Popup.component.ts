import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../profile.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'Email-Popup',
  templateUrl: 'Email-Popup.component.html',
  styleUrls: ['Email-Popup.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    private clipboard: Clipboard,

    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  copyHeroName() {
    this.clipboard.copy(this.data.email);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
