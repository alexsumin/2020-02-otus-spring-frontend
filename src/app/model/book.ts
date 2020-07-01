import { Author } from './author';
import { Genre } from './genre';

export class Book {
    id: number;
    title: string;
    published: string;
    author: Author;
    genre: Genre;
}