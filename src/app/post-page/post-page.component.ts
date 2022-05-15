import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  isStandar = true ;

  constructor() { }

  ngOnInit(): void {
  }

  Type( variable :String ): void{

    if ( variable == 'Premium'){
      this.isStandar= false;
      console.log(this.isStandar)
    }
    else{
      this.isStandar=true
      console.log(this.isStandar)
    
    }

  }



  slides = [
    {img: "../../assets/postpage.png"},
    {img: "../../assets/nftpic2.png"},
    {img: "../../assets/nftpic3.png"},
    {img: "../../assets/nftpic4.png"},
    {img: "../../assets/nftpic5.png"},
  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
  
}
