import { ProfileService } from './../profile/profile.service';
import { Gig } from './../create-gig/gig.model';
import { GigService } from './../create-gig/gig.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../login/user.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
})
export class PostPageComponent implements OnInit {
  private routeSub: Subscription | undefined;
  private gigId: any;
  isStandar = true;
  public gigData: any;
  users: User[] = [];
  userSub: Subscription = new Subscription();
  test!: any;

  constructor(
    public route: ActivatedRoute,
    private ProfileService: ProfileService,
    public GigService: GigService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.gigId = params['postId'];
    });

    this.GigService.getResult(this.gigId).subscribe((results) => {
      const gig = {
        id: results.result._id,
        userId: results.result.userId,
        gigCategorie: results.result.gigCategorie,
        gigObject: results.result.gigObject,
        gigdescription: results.result.gigdescription,
        file: results.result.filePath,

        StandarPrice: results.result.StandarPrice,
        Standardescription: results.result.Standardescription,
        StandarDeleveryTime: results.result.StandarDeleveryTime,
        StandarRevisions: results.result.StandarRevisions,
        StandarBaseArtwork: results.result.StandarBaseArtwork,
        StandarTraitAccessory: results.result.StandarTraitAccessory,
        StandarVariation: results.result.StandarVariation,
        StandarMetadata: results.result.StandarMetadata,
        StandarGeneration: results.result.StandarGeneration,
        StandarBackground: results.result.StandarBackground,

        PremiumPrice: results.result.PremiumPrice,
        Premiumdescription: results.result.Premiumdescription,
        PremiumDeleveryTime: results.result.PremiumDeleveryTime,
        PremiumRevisions: results.result.PremiumRevisions,
        PremiumBaseArtwork: results.result.PremiumBaseArtwork,
        PremiumTraitAccessory: results.result.PremiumTraitAccessory,
        PremiumVariation: results.result.PremiumVariation,
        PremiumMetadata: results.result.PremiumMetadata,
        PremiumGeneration: results.result.PremiumGeneration,
        PremiumBackground: results.result.PremiumBackground,

        createdAt: results.result.createdAt,
      };
      this.gigData = gig;
      console.log(this.gigData);

      this.ProfileService.getusers(this.gigData.userId);
      this.userSub = this.ProfileService.getUserUpdateListener().subscribe(
        (users: User[]) => {
          this.users = users;
          console.log(this.users[0]);
        }
      );
    });
  }

  Type(variable: String): void {
    if (variable == 'Premium') {
      this.isStandar = false;
    } else {
      this.isStandar = true;
    }
  }

  slides = [
    { img: '../../assets/postpage.png' },
    { img: '../../assets/nftpic2.png' },
    { img: '../../assets/nftpic3.png' },
    { img: '../../assets/nftpic4.png' },
    { img: '../../assets/nftpic5.png' },
  ];
  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
}
