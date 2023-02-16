import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { SingOutComponent } from './sing-out/sing-out.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { LoginRouteModule } from './login-route.module';
import { SignupGoogleComponent } from './signup-google/signup-google.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SinginComponent,
    SingupComponent,
    SingOutComponent,
    SignupGoogleComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    SinginComponent,
    SingupComponent,
    LoginRouteModule,
    SignupGoogleComponent,
  ],
  providers: []
})
export class LoginModule { }
