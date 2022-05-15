import { User } from './../login/user.model';
import { Component, OnInit } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users : User[]=[];
  UserID !: string;
  private routeSub: Subscription | undefined;
  userSub: Subscription = new Subscription;

  wallet="0xBc76599d5C5E469A04Bd43C25c58aA73ee3Ed7a8";
  first!: String;
  last!: String;
  reswallet!: String;
  date: Date | undefined;



  constructor(private clipboard: Clipboard,public route: ActivatedRoute,
    private ProfileService :ProfileService, ) {
      setInterval(() => {
        this.date = new Date()
      }, 1000)
     }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      this.UserID = params['id'];
    });

    this.ProfileService.getusers(this.UserID);
    this.userSub = this.ProfileService.getUserUpdateListener()
    .subscribe((users:User[]) => {
       this.users =users;
       console.log(this.users);
        
      });


    this.first = this.wallet.substring(0, 6);
    this.last = this.wallet.substring(this.wallet.length - 5);
    this.reswallet=this.first+"..."+this.last;
  }
  copyHeroName() {
    this.clipboard.copy(this.wallet);
  }
}
