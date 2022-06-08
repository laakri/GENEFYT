import { ContactusService } from './contactus.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  constructor(public ContactusService: ContactusService) {}

  ngOnInit(): void {}
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.ContactusService.sendMail(
      form.value.nom,
      form.value.email,
      form.value.textA
    );
    form.value.nom = ' ';
  }
}
