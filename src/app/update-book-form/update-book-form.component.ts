import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BookService} from "../shared/book/book.service"
import { Book } from '../model/book';
import {Comment} from '../model/comment'
import { CommentService } from '../shared/comment/comment.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-book-form',
  templateUrl: './update-book-form.component.html',
  styleUrls: ['./update-book-form.component.css']
})
export class UpdateBookFormComponent implements OnInit {
 
  id: number;
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

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

        this.bookService.getBook(this.id)
            .subscribe((res: Book) => {
                this.bookForm.patchValue(res);
            });
  }

  submit(){
    this.bookService.updateBook(this. id, this.bookForm.value)
      .subscribe(data => console.log(data), 
      error => {
        console.log(error);
        this.showErrorNotification();
      });
      this.gotoList();
  }

  gotoList(){
    this.router.navigate(['books']);
  }

  showErrorNotification(){
    this.snackBar.open('Something went wrong, try later', 'ok', {
      duration: 5000,
    });
  }

}
