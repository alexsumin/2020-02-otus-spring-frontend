import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookListComponent} from "./book-list/book-list.component"
import { BookDetailsComponent } from './book-details/book-details.component';
import { NewBookFormComponent } from './new-book-form/new-book-form.component';
import { UpdateBookFormComponent } from './update-book-form/update-book-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
   { path: 'newbook', component: NewBookFormComponent },
  { path: 'update/:id', component: UpdateBookFormComponent },
  { path: 'details/:id', component: BookDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
