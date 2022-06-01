import { Injectable } from '@angular/core';
import { Gig } from './gig.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccesComponent } from 'src/app/succes/succes.component';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GigService {
  private gigs: Gig[] = [];

  private gigUpdated = new Subject<Gig[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  addGig(
    userId: string,
    gigCategorie: string,
    gigObject: string,
    gigdescription: string,
    file: File,

    StandarPrice: string,
    Standardescription: string,
    StandarDeleveryTime: string,
    StandarRevisions: string,
    StandarBaseArtwork: string,
    StandarTraitAccessory: string,
    StandarVariation: string,
    StandarMetadata: string,
    StandarGeneration: string,
    StandarBackground: string,

    PremiumPrice: string,
    Premiumdescription: string,
    PremiumDeleveryTime: string,
    PremiumRevisions: string,
    PremiumBaseArtwork: string,
    PremiumTraitAccessory: string,
    PremiumVariation: string,
    PremiumMetadata: string,
    PremiumGeneration: string,
    PremiumBackground: string
  ) {
    const resultData = new FormData();
    resultData.append('userId', userId);
    resultData.append('gigCategorie', gigCategorie);
    resultData.append('gigObject', gigObject);
    resultData.append('gigdescription', gigdescription);
    resultData.append('file', file);

    resultData.append('StandarPrice', StandarPrice);
    resultData.append('Standardescription', Standardescription);
    resultData.append('StandarDeleveryTime', StandarDeleveryTime);
    resultData.append('StandarRevisions', StandarRevisions);
    resultData.append('StandarBaseArtwork', StandarBaseArtwork);
    resultData.append('StandarTraitAccessory', StandarTraitAccessory);
    resultData.append('StandarVariation', StandarVariation);
    resultData.append('StandarMetadata', StandarMetadata);
    resultData.append('StandarGeneration', StandarGeneration);
    resultData.append('StandarBackground', StandarBackground);

    resultData.append('PremiumPrice', PremiumPrice);
    resultData.append('Premiumdescription', Premiumdescription);
    resultData.append('PremiumDeleveryTime', PremiumDeleveryTime);
    resultData.append('PremiumRevisions', PremiumRevisions);
    resultData.append('PremiumBaseArtwork', PremiumBaseArtwork);
    resultData.append('PremiumTraitAccessory', PremiumTraitAccessory);
    resultData.append('PremiumVariation', PremiumVariation);
    resultData.append('PremiumMetadata', PremiumMetadata);
    resultData.append('PremiumGeneration', PremiumGeneration);
    resultData.append('PremiumBackground', PremiumBackground);

    this.http
      .post<{ message: string; result: Gig }>(
        'http://localhost:4401/api/Gigs/AddGig/',
        resultData
      )
      .subscribe((responseData) => {
        console.log('Gig added successfully');
        const successMessage = 'Gig Added Successfuly !';
        this._snackBar.openFromComponent(SuccesComponent, {
          data: { message: successMessage },
          duration: 2500,
          panelClass: ['green-snackbar'],
        });
      });
  }

  getGigUpdateListener() {
    return this.gigUpdated.asObservable();
  }

  getResults(UserId: string) {
    this.http
      .get<{ message: string; results: any }>(
        'http://localhost:4401/api/Gigs/GetGigs/' + UserId
      )
      .pipe(
        map((gigData) => {
          return gigData.results.map(
            (gig: {
              _id: any;
              userId: any;
              gigCategorie: any;
              gigObject: any;
              gigdescription: any;
              filePath: any;

              StandarPrice: any;
              Standardescription: any;
              StandarDeleveryTime: any;
              StandarRevisions: any;
              StandarBaseArtwork: any;
              StandarTraitAccessory: any;
              StandarVariation: any;
              StandarMetadata: any;
              StandarGeneration: any;
              StandarBackground: any;

              PremiumPrice: any;
              Premiumdescription: any;
              PremiumDeleveryTime: any;
              PremiumRevisions: any;
              PremiumBaseArtwork: any;
              PremiumTraitAccessory: any;
              PremiumVariation: any;
              PremiumMetadata: any;
              PremiumGeneration: any;
              PremiumBackground: any;

              createdAt: any;
              updatedAt: any;
            }) => {
              return {
                id: gig._id,
                userId: gig.userId,
                gigCategorie: gig.gigCategorie,
                gigObject: gig.gigObject,
                gigdescription: gig.gigdescription,
                file: gig.filePath,

                StandarPrice: gig.StandarPrice,
                Standardescription: gig.Standardescription,
                StandarDeleveryTime: gig.StandarDeleveryTime,
                StandarRevisions: gig.StandarRevisions,
                StandarBaseArtwork: gig.StandarBaseArtwork,
                StandarTraitAccessory: gig.StandarTraitAccessory,
                StandarVariation: gig.StandarVariation,
                StandarMetadata: gig.StandarMetadata,
                StandarGeneration: gig.StandarGeneration,
                StandarBackground: gig.StandarBackground,

                PremiumPrice: gig.PremiumPrice,
                Premiumdescription: gig.Premiumdescription,
                PremiumDeleveryTime: gig.PremiumDeleveryTime,
                PremiumRevisions: gig.PremiumRevisions,
                PremiumBaseArtwork: gig.PremiumBaseArtwork,
                PremiumTraitAccessory: gig.PremiumTraitAccessory,
                PremiumVariation: gig.PremiumVariation,
                PremiumMetadata: gig.PremiumMetadata,
                PremiumGeneration: gig.PremiumGeneration,
                PremiumBackground: gig.PremiumBackground,

                createdAt: gig.createdAt,
                updatedAt: gig.updatedAt,
              };
            }
          );
        })
      )
      .subscribe((transformedResult) => {
        this.gigs = transformedResult;
        this.gigUpdated.next([...this.gigs]);
      });
  }

  getResult(gigId: string) {
    return this.http.get<{ message: string; result: any }>(
      'http://localhost:4401/api/Gigs/GetGig/' + gigId
    );
  }
  deletGig(gigId: string) {
    return this.http
      .delete('http://localhost:4401/api/Gigs/delete/' + gigId)
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
