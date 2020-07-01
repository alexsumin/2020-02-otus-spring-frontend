import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BookService} from "../shared/book/book.service"
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-book-form',
  templateUrl: './new-book-form.component.html',
  styleUrls: ['./new-book-form.component.css']
})
export class NewBookFormComponent {

  bookForm : FormGroup;
  
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private bookService: BookService, 
    private snackBar: MatSnackBar) {

      this.bookForm = new FormGroup({
             
        "title": new FormControl(""),
        "published": new FormControl(""),
        "author": new FormGroup({
          name: new FormControl('')
        }),
        "genre": new FormGroup({
          name: new FormControl('')
        })

    });
  }

  submit(){
    this.bookService.createBook(this.bookForm.value)
      .subscribe(data => console.log(data), 
      error => {
        console.log(error);
      });
      this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/books']);
  }

  refreshPage() {
    window.location.reload();
  }

  showErrorNotification(){
    this.snackBar.open('Something went wrong, try later', 'ok', {
      duration: 5000,
    });
  }

}
