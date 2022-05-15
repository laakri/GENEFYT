import { UsersService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;

  constructor( public UsersService: UsersService ) { }

  ngOnInit(): void {
  }

  onSignup(form : NgForm){
    if (form.invalid){
      return;
    }
    this.UsersService.addUser(form.value.nom, form.value.tel  , form.value.password);
  }



}
