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

  wallet2!: string;
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
      this.wallet2 = this.users[0].Wallet;
      this.first = this.wallet2.substring(0, 6);
      this.last = this.wallet2.substring(this.wallet2.length - 5);
      this.reswallet = this.first + "..." + this.last;
      });



  }
  copyHeroName() {
    this.clipboard.copy(this.users[0].Wallet);
  }


  slides = [
    {img: "../../assets/postpage.png",
  },
    {img: "../../assets/nftpic2.png"},
    {img: "../../assets/nftpic3.png"},
    {img: "../../assets/nftpic4.png"},
    {img: "../../assets/nftpic5.png"},
  ];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};
  









}
