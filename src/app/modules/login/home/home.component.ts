import { Component } from '@angular/core';
import { LoginService } from '../../login/services/login.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public loginService: LoginService,
    private app: AppComponent){}

}
