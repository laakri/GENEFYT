import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Shop {
  private gigs: [] = [];
  private gigUpdate = new Subject<[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getGigs(filter: string) {
    this.http
      .get<{ message: string; result: any }>(
        'http://localhost:4401/api/Gigs/GetAllGigs' + filter
      )
      .pipe(
        map((gigData) => {
          return gigData.result.map(
            (gig: {
              _id: any;
              userId: any;
              gigCategorie: any;
              gigObject: any;
              gigdescription: any;
              filePath: any;
              StandarPrice: any;
            }) => {
              return {
                id: gig._id,
                userId: gig.userId,
                gigCategorie: gig.gigCategorie,
                gigObject: gig.gigObject,
                gigdescription: gig.gigdescription,
                filePath: gig.filePath,
                StandarPrice: gig.StandarPrice,
              };
            }
          );
        })
      )
      .subscribe((transformedGig) => {
        this.gigs = transformedGig;
        this.gigUpdate.next([...this.gigs]);
      });
  }
  getGigUpdateListener() {
    return this.gigUpdate.asObservable();
  }
}

/*************************************************/
