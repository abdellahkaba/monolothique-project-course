import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.findAllBooks()
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
        },
        error: (err) => {  // Correction : Ajout de la gestion des erreurs
          console.error('Error fetching books:', err);
        }
      });
  }

}
