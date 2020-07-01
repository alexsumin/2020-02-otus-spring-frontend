import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getCommentList(id: number): Observable<any> {
    return this.http.get('v1/book/'+id+ '/comment');
  }

  addComment(id: number, comment: Object): Observable<Object> {
    console.log(comment);
    return this.http.post('v1/book/'+id +'/comment', comment, this.httpOptions);
  }
}
