import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

import {KeycloakService} from "../../services/keycloak/keycloak.service";

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
export class LoginComponent implements OnInit{

  // authRequest: AuthenticationRequest = {email: '', password: ''};
  // errorMsg: Array<string> = [];

  constructor(
    private ss: KeycloakService

  ) { }

  async ngOnInit(): Promise<void> {
    await this.ss.init()
    await this.ss.login()
  }

  // login() {
  //   this.errorMsg = [];
  //   this.authService.authenticate({
  //     body: this.authRequest
  //   }).subscribe({
  //     next: (res: AuthenticationResponse) => {
  //       this.tokenService.token = res.token as string;
  //       this.toastrService.success('Connexion reussi', 'Bien!')
  //        this.router.navigate(['books']);
  //     },
  //       error: (err) => {
  //         if (err.error.validationErrors) {
  //           this.toastrService.error(err.error.validationErrors, 'Oups!')
  //         } else {
  //           this.toastrService.error(err.error.error, 'Oups!')
  //         }
  //       }
  //   });
  // }
  //
  // register (){
  //   this.router.navigate(['register']);
  // }


}
