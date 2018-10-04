import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookService {
  baseUrl = 'http://localhost:8080/';

  constructor(private _http: Http) { }

  getBooks() {
    return this._http.get(this.baseUrl + 'book')
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  getBook(id) {
    return this._http.get(this.baseUrl + 'book/' + id)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  searchBooks(title) {
    return this._http.get(this.baseUrl + 'book/search/' + title)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  AddBook(title, author, year, pages) {
    const req = this._http.post(this.baseUrl + 'book', {
      title: title,
      author: author,
      year: year,
      pages: pages
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
  }

  UpdateBook(_id,title, author, year, pages) {
    const req = this._http.put(this.baseUrl + 'book/' + _id, {
      title: title,
      author: author,
      year: year,
      pages: pages
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
  }

  _errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'Internal server error');
  }
}