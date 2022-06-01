import { Component, OnInit } from '@angular/core';
import { UsersService } from './login/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Genefyt';

  constructor(private UsersService: UsersService) {}
  ngOnInit() {
    this.UsersService.autoAuthUser();
  }
}
