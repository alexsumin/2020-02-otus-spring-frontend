import { Component, OnInit } from '@angular/core';
import { Book } from "../model/book";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {BookService} from "../shared/book/book.service";
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'title', 'published', 'author', 'genre', 'view', 'update', 'delete'];
  public dataSource;

  books: Observable<Book[]>;

  constructor(private bookService: BookService,
    private router: Router, 
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.bookService.getBookList().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id)
      .subscribe(
        data => {
          this.dataSource.data = this.dataSource.data.filter(book => book.id !== id)
        },
        error => { 
          console.log(error);
          this.showErrorNotification();
        });
  }

  bookDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateBook(id: number){
    this.router.navigate(['update', id]);
  }

  showErrorNotification(){
    this.snackBar.open('Something went wrong, try later', 'ok', {
      duration: 5000,
    });
  }
}
