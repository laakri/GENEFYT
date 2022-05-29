import { Injectable } from '@angular/core';
import { Com } from './comment.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccesComponent } from 'src/app/succes/succes.component';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class commentService {
  private comments: Comment[] = [];
  private commentUpdated = new Subject<Comment[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  addComment(clientId: any, sellerId: any, comment: any) {
    const resultData: Com = {
      clientId: clientId,
      sellerId: sellerId,
      comment: comment,
      id: '',
      createdAt: '',
      updatedAt: '',
    };
    this.http
      .post<{ message: string; result: Comment }>(
        'http://localhost:4401/api/Comments/AddComment/',
        resultData
      )
      .subscribe((responseData) => {
        console.log('Gig added successfully');
        const successMessage = 'Comment Added Successfuly !';
        this._snackBar.openFromComponent(SuccesComponent, {
          data: { message: successMessage },
          duration: 2500,
          panelClass: ['green-snackbar'],
        });
      });
  }
  /************************************************* */

  getCommentUpdateListener() {
    return this.commentUpdated.asObservable();
  }

  getResults(userId: string) {
    this.http
      .get<{ message: string; results: any }>(
        'http://localhost:4401/api/Comments/GetComments/' + userId
      )
      .pipe(
        map((gigData) => {
          return gigData.results.map(
            (comm: {
              _id: string;
              clientId: string;
              sellerId: string;
              comment: string;
              createdAt: string;
              updatedAt: string;
            }) => {
              return {
                id: comm._id,
                clientId: comm.clientId,
                sellerId: comm.sellerId,
                comment: comm.comment,
                createdAt: comm.createdAt,
                updatedAt: comm.updatedAt,
              };
            }
          );
        })
      )
      .subscribe((transformedResult) => {
        this.comments = transformedResult;
        this.commentUpdated.next([...this.comments]);
      });
  }
  deletComment(commentId: string) {
    return this.http
      .delete('http://localhost:4401/api/Comments/delete/' + commentId)
      .subscribe((responseData) => {
        console.log('Gig Deleted successfully');
        const successMessage = 'Comment Deleted Successfuly !';
        this._snackBar.openFromComponent(SuccesComponent, {
          data: { message: successMessage },
          duration: 2500,
          panelClass: ['green-snackbar'],
        });
      });
  }
}
