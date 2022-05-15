import { Component } from '@angular/core';
import { MatDialog,MatDialogRef  } from '@angular/material/dialog';

import {LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})


export class ToolbarComponent  {


  constructor(public dialog: MatDialog) {

   }
 
   login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '530px',
      minHeight:'550px',
      backdropClass: 'backdropBackground'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}





















/*
export class ToolbarComponent implements OnInit {
  
  routeQueryParams: Subscription;

  constructor(public dialog: MatDialog , private route: ActivatedRoute) { 
    
    this.routeQueryParams = route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.Login();
      }
    });
  }
  

  ngOnInit(): void {}
  
  
  ngOnDestroy() {
    this.routeQueryParams.unsubscribe();
  }


  Login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '530px',
      minHeight:'600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }



  

}

*/
