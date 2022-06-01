import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/login/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css'],
})
export class UserslistComponent implements OnInit {
  dataSource: any;
  users: User[] = [];
  userSub: Subscription = new Subscription();
  displayedColumns: string[] = [
    'CreatedAt',
    'name',
    'weight',
    'Brows',
    'Delete',
  ];
  getlength = 0;

  constructor(private AdminService: AdminService) {}
  ngOnInit(): void {
    this.AdminService.getusers();
    this.userSub = this.AdminService.getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;
        this.getlength = this.users.length;
      }
    );
  }

  onDelete(id: string) {
    this.AdminService.deletUser(id);
    this.AdminService.getusers();
    this.userSub = this.AdminService.getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;
        this.getlength = this.users.length;
      }
    );
  }
}
