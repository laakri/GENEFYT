import { User } from './../login/user.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccesComponent } from '../succes/succes.component';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private users: User[] = [];
  private userUpdated = new Subject<User[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  getusers() {
    this.http
      .get<{ message: string; users: any }>(
        'http://localhost:4401/api/users/data'
      )
      .pipe(
        map((usertData) => {
          return usertData.users.map(
            (user: {
              _id: any;
              name: any;
              email: any;
              createdAt: any;
              updatedAt: any;
            }) => {
              return {
                userId: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              };
            }
          );
        })
      )
      .subscribe((transformedUser) => {
        this.users = transformedUser;
        this.userUpdated.next([...this.users]);
      });
  }
  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  deletUser(userId: string) {
    return this.http
      .delete('http://localhost:4401/api/Users/delete/' + userId)
      .subscribe((responseData) => {
        console.log('Gig Deleted successfully');
        const successMessage = 'Gig Deleted Successfuly !';
        this._snackBar.openFromComponent(SuccesComponent, {
          data: { message: successMessage },
          duration: 2500,
          panelClass: ['green-snackbar'],
        });
      });
  }
}
