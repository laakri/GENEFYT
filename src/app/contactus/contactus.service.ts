import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contactus.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccesComponent } from '../succes/succes.component';

@Injectable({ providedIn: 'root' })
export class ContactusService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  sendMail(name: string, email: string, textA: string) {
    const cantact: Contact = { name: name, email: email, textA: textA };
    this.http
      .post<{ message: string }>('http://localhost:4401/api/email', cantact)
      .subscribe(
        () => {
          console.log('Email was send Successfuly !');
          const successMessage = 'We received your Email Thank !';
          this._snackBar.openFromComponent(SuccesComponent, {
            data: { message: successMessage },
            duration: 2500,
            panelClass: ['green-snackbar'],
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
