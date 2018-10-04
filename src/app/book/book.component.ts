import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  idfromquery: any;
  bookForm: FormGroup;
  action = 'Add';

  constructor(private _fb: FormBuilder, private _bookService: BookService, private _router: Router,
    private activatedRoute: ActivatedRoute) {

    this.bookForm = this._fb.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      author: [null, [Validators.required]],
      year: [null, [Validators.pattern('[0-9]{4}')]],
      pages: [null, [Validators.pattern('[1-9][0-9]{2}')]]
    });
  }



  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: any) => {

        this.idfromquery = param['id'];

        if (this.idfromquery !== undefined) {
          this._bookService.getBook(this.idfromquery).subscribe(
            data => {
              if (data != null) {
                this.bookForm = this._fb.group({
                  '_id': data._id,
                  'title': data.title,
                  'author': data.author,
                  'year': data.year,
                  'pages': data.pages,
                });
              }
            },
            error => { },
            () => {

            }
          );
        } else {
          this.bookForm = this._fb.group({
            id: [null],
            title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            author: [null, [Validators.required]],
            year: [null, [Validators.pattern('[0-9]{4}')]],
            pages: [null, [Validators.pattern('[1-9][0-9]{2}')]]
          });
        }
      });
  }

  saveBook(_id, title, author, year, pages) {
    if (_id !== '') {
      this._bookService.UpdateBook(_id, title, author, year, pages)
    } else {
      this._bookService.AddBook(title, author, year, pages)
    }

    window.setTimeout(() => {
      this._router.navigate(['/books']);
    }, 200);


  }

}
