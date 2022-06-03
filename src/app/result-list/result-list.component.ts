import { Shop } from './shop.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
  gigs: any;
  constructor(private shop: Shop) {}
  gigSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.shop.getGigs();
    this.gigSub = this.shop.getGigUpdateListener().subscribe((gigs: []) => {
      this.gigs = gigs;
      console.log(this.gigs);
    });
  }
}
