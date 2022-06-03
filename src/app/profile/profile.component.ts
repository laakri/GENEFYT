import { commentService } from './comment.service';
import { Gig } from './../create-gig/gig.model';
import { GigService } from './../create-gig/gig.service';
import { User } from './../login/user.model';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from './profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../login/user.service';
import { Com } from './comment.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './Email-Popup/Email-Popup.component';

export interface DialogData {
  email: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  users: User[] = [];
  UserID!: string;
  private routeSub: Subscription | undefined;
  userSub: Subscription = new Subscription();

  wallet2!: string;
  first!: String;
  last!: String;
  reswallet!: String;
  date: Date | undefined;
  gigs: Gig[] = [];
  comments: Com[] = [];

  gigSub: Subscription = new Subscription();
  skills!: string[];
  commentVisibility = false;
  firstFormGroup!: FormGroup;
  clientId!: any;
  clientRole!: any;

  CanComment = true;
  CanGig = false;
  AdminDelete = false;
  constructor(
    private clipboard: Clipboard,
    public route: ActivatedRoute,
    private ProfileService: ProfileService,
    private GigService: GigService,
    private _formBuilder: FormBuilder,
    private commentService: commentService,
    private UsersService: UsersService,
    public dialog: MatDialog
  ) {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
  /******************************************************/

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.UserID = params['userId'];
    });

    this.clientId = localStorage.getItem('userId');
    this.clientRole = localStorage.getItem('userRole');
    if (this.clientRole == 'admin') {
      this.AdminDelete = true;
    } else {
      if (this.clientId == this.UserID) {
        this.CanComment = false;
        this.CanGig = true;
      } else if (this.clientId == null) {
        this.CanComment = false;
        this.CanGig = false;
      } else if (this.clientId !== this.UserID) {
        this.CanComment = true;
        this.CanGig = false;
      }
    }
    this.ProfileService.getusers(this.UserID);

    this.userSub = this.ProfileService.getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;
        this.wallet2 = this.users[0].Wallet;
        this.first = this.wallet2.substring(0, 6);
        this.last = this.wallet2.substring(this.wallet2.length - 5);
        this.reswallet = this.first + '...' + this.last;
        this.skills = this.users[0].skills.split(',');
      }
    );

    this.GigService.getResults(this.UserID);
    this.gigSub = this.GigService.getGigUpdateListener().subscribe(
      (results: Gig[]) => {
        this.gigs = results.reverse();
      }
    );

    this.commentService.getResults(this.UserID);
    this.gigSub = this.commentService
      .getCommentUpdateListener()
      .subscribe((results: any) => {
        this.comments = results.reverse();
      });

    this.firstFormGroup = this._formBuilder.group({
      CommentFormCtrl: ['', Validators.required],
    });
  }
  /******************************************************/

  copyHeroName() {
    this.clipboard.copy(this.users[0].Wallet);
  }
  /******************************************************/
  openDialogEmail(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      height: '150px',
      data: { email: this.users[0].email },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  /******************************************************/

  addComment() {
    this.commentVisibility = !this.commentVisibility;
  }

  /******************************************************/

  addimfo(form: FormGroup) {
    if (form.invalid) {
      console.log('form invalid !');
      return;
    } else if (this.clientId !== null) {
      this.commentService.addComment(
        localStorage.getItem('userId'),
        this.UserID,
        form.value.CommentFormCtrl
      );
      this.commentService.getResults(this.UserID);
      this.gigSub = this.commentService
        .getCommentUpdateListener()
        .subscribe((results: any) => {
          this.comments = results;
        });
    } else {
      console.log('You Are not loged In !');
      return;
    }
  }

  /******************************************************/

  onDeleteGig(id: any) {
    this.GigService.deletGig(id);

    this.GigService.getResults(this.UserID);
    this.gigSub = this.GigService.getGigUpdateListener().subscribe(
      (results: Gig[]) => {
        this.gigs = results;
      }
    );
  }

  /******************************************************/

  ondelete(id: any) {
    this.commentService.deletComment(id);

    this.commentService.getResults(this.UserID);
    this.gigSub = this.commentService
      .getCommentUpdateListener()
      .subscribe((results: any) => {
        this.comments = results;
      });
  }
  slideConfig = { slidesToShow: 3, slidesToScroll: 1 };
}
