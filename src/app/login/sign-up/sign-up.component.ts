import { UsersService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hide = true;
  firstFormGroup!: FormGroup;

  constructor(
    public UsersService: UsersService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      NameFormCtrl: ['', Validators.required],
      EmailFormCtrl: ['', Validators.email],
      PasswordFormCtrl: ['', Validators.required],
    });
  }

  onSignup(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.UsersService.addUser(
      form.value.NameFormCtrl,
      form.value.EmailFormCtrl,
      form.value.PasswordFormCtrl
    );
  }
}
