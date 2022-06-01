import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../login/user.service';

import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs';
import { User } from '../login/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  userIsAuthenticated = false;
  adminIsAuthenticated = false;
  userIdLocal: any;
  private authListenerSubs!: Subscription;
  private authAdminListenerSubs!: Subscription;

  userSub!: Subscription;
  users!: User[];

  constructor(public dialog: MatDialog, public UsersService: UsersService) {}

  ngOnInit(): void {
    this.userIdLocal = localStorage.getItem('userId');

    this.userIsAuthenticated = this.UsersService.getIsAuth();
    this.authListenerSubs = this.UsersService.getAuthStatusListener().subscribe(
      (isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );

    this.adminIsAuthenticated = this.UsersService.getAdminIsAuth();
    this.authAdminListenerSubs =
      this.UsersService.getAuthAdminStatusListener().subscribe(
        (isAuthenticated) => {
          this.adminIsAuthenticated = isAuthenticated;
        }
      );

    if (this.userIdLocal != null) {
      this.userIsAuthenticated = this.UsersService.getIsAuth();

      this.UsersService.getuserimgPath(this.userIdLocal);

      this.userSub = this.UsersService.getUserimgPathListener().subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
    }
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '530px',
      minHeight: '550px',
      backdropClass: 'backdropBackground',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  onLogout() {
    this.UsersService.logout();
  }
}
