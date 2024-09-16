import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' };
  errorMsg: Array<string> = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.toastrService.info('Vous pouvez activer votre compte', 'Allez y!')
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.toastrService.error(err.error.validationErrors, 'Oups!')
      }
    });
  }

}
