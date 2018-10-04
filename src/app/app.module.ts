import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';

import { BookService } from './book.service';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'books', component: BookListComponent },
      { path: 'books/add', component: BookComponent },
      { path: 'books/edit/:id', component: BookComponent }
    ])
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
