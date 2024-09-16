import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthenticationResponse} from "../../services/models/authentication-response";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../services/token/token.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private toastrService: ToastrService

  ) { }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res: AuthenticationResponse) => {
        this.tokenService.token = res.token as string;
        this.toastrService.success('Connexion reussi', 'Bien!')
         this.router.navigate(['books']);
      },
        error: (err) => {
          if (err.error.validationErrors) {
            this.toastrService.error(err.error.validationErrors, 'Oups!')
          } else {
            this.toastrService.error(err.error.error, 'Oups!')
          }
        }
    });
  }

  register (){
    this.router.navigate(['register']);
  }
}
