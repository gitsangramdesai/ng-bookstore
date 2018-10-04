import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  books: Array<any> = [];
  errorMessage: any;

  constructor(private _bookService: BookService) {
  }


  getBooks() {
    this._bookService.getBooks().subscribe(
      data => this.books = data,
      error => this.errorMessage = error
    );
  }

  searchBooks(title) {
    if (title === '') {
      this.getBooks()
    } else {
      this._bookService.searchBooks(title).subscribe(
        data => this.books = data,
        error => this.errorMessage = error
      );
    }

  }

  ngOnInit() {
    this.getBooks();
  }

}
