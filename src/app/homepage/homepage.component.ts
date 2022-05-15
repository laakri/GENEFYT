import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  slides = [
    {img: "../../assets/nftpic.png"},
    {img: "../../assets/nftpic2.png"},
    {img: "../../assets/nftpic3.png"},
    {img: "../../assets/nftpic4.png"},
    {img: "../../assets/nftpic5.png"},
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  
}
