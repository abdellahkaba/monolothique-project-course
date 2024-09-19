import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
// import SockJs from 'sockjs-client';
import * as Stomp from "stompjs"
import {Notification} from "./notification";
import {ToastrService} from "ngx-toastr";
import SockJS from "sockjs-client";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  socketClient: any = null
  private notificationSubscription: any
  unreadNotificationCount = 0
  notifications: Array<Notification> = []

  constructor(
    private keycloakService: KeycloakService,
    private toastr: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.navigationHandler()
    if (this.keycloakService.keycloak?.tokenParsed?.sub){
      let ws = new SockJS('http://localhost:8080/api/v1/ws')
      this.socketClient = Stomp.over(<WebSocket>ws)
      this.socketClient.connect(
        {
          'Authorization:': 'Bearer ' + this.keycloakService.keycloak.token
        },
        () => {
          this.notificationSubscription = this.socketClient.subscribe(
            `/user/${this.keycloakService.keycloak?.tokenParsed?.sub}/notifications`,
            (message: any) =>{
              const notification: Notification = JSON.parse(message.body)
              if (notification){
                this.notifications.unshift(notification)
                switch (notification.status) {
                  case 'BORROWED':
                    this.toastr.info(notification.message, notification.bookTitle)
                    break
                  case 'RETURNED':
                    this.toastr.warning(notification.message, notification.bookTitle)
                    break
                  case 'RETURN_APPROVED':
                    this.toastr.success(notification.message, notification.bookTitle)
                }
                this.unreadNotificationCount++
              }
          }
          )
        }
      )
    }
  }

  private navigationHandler(){
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
  async logout() {
    await this.keycloakService.logout();
  }

  get username(){
    // @ts-ignore
    return this.keycloakService.keycloak?.tokenParsed?.given_name
  }
}
