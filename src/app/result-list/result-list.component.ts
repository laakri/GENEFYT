import { Shop } from './shop.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
  gigs: any;
  filter = '';
  filterToSend = '';
  constructor(
    private shop: Shop,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  gigSub: Subscription = new Subscription();
  options = [
    { value: '', viewValue: '- -' },
    { value: 'Graphics | Design', viewValue: 'Graphics & Design' },
    { value: 'Digital Marketing', viewValue: 'Digital Marketing' },
    { value: 'Video | Animation', viewValue: 'Video & Animation' },
    { value: 'Music | Audio', viewValue: 'Music & Audio' },
    { value: 'Programming | Tech', viewValue: 'Programming & Tech' },
    { value: 'Trading', viewValue: 'Trading' },
  ];
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(map(({ filter }) => filter || this.filter))
      .subscribe((filter) => (this.filter = filter));
    this.filterToSend = '?gigCategorie=' + this.filter;

    this.shop.getGigs(this.filterToSend);
    this.gigSub = this.shop.getGigUpdateListener().subscribe((gigs: []) => {
      this.gigs = gigs;
    });
  }
  onChange(filter: string) {
    this.router.navigate([], { queryParams: { filter } });
    this.filterToSend = '?gigCategorie=' + filter;
    this.shop.getGigs(this.filterToSend);
    this.gigSub = this.shop.getGigUpdateListener().subscribe((gigs: []) => {
      this.gigs = gigs;
    });
  }
}
