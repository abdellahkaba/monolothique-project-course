import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {NgIf} from "@angular/common";
import {CodeInputModule} from "angular-code-input";
import {skipUntil} from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    NgIf,
    CodeInputModule
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message = '';
  isOkay = true;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) {}

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.toastrService.success('Votre compte a été activé avec succès.\n' +
          'Vous pouvez maintenant procéder à la connexion', 'Bien!')
        this.submitted = true;
      },
      error: () => {
        this.toastrService.warning('Le jeton a expiré ou n\'est pas valide','Attention!')
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  protected readonly skipUntil = skipUntil;
}
