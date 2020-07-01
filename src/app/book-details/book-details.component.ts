import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BookService} from "../shared/book/book.service"
import { Book } from '../model/book';
import {Comment} from '../model/comment'
import { CommentService } from '../shared/comment/comment.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id: number;
  book: Book;
  comments: Observable<Comment>; 

  comment: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private bookService: BookService, 
    private commentService: CommentService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.book = new Book();

    this.id = this.route.snapshot.params['id'];
    
    this.bookService.getBook(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => {
        console.log(error);
        this.showErrorNotification();
      });
      this.comments =  this.commentService.getCommentList(this.id);
    }

  gotoList(){
    this.router.navigate(['books']);
  }

  createComment(commentForm: NgForm): void {
    this.commentService.addComment(this.id, commentForm)
      .subscribe(() => {    
        this.comment = {} 
        this.comments =  null;
        this.comments = this.commentService.getCommentList(this.id);
      }, error => {
        console.log(error);
        this.showErrorNotification();
      });
  }

  showErrorNotification(){
    this.snackBar.open('Something went wrong, try later', 'ok', {
      duration: 5000,
    });
  }

}
