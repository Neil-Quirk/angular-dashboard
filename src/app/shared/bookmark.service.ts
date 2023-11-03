import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [
    new Bookmark('Wikipedia', 'https://wikipedia.org'),
    new Bookmark('Youtube', 'https://youtube.com'),
    new Bookmark('Google', 'https://google.com'),
    new Bookmark('Test', 'https://blahblah.com')
  ];

  constructor() { }

  getBookmarks() {
    return this.bookmarks
  }

  getBookmark(id:string) {
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id)
    if(bookmark) {
    Object.assign(bookmark, updatedFields)
    } else {
      return
    }
  }

  deleteBookmark(id: string) {
  const bookmarkIndex = this.bookmarks.findIndex( b => b.id === id)
  if (bookmarkIndex == -1) return
  this.bookmarks.splice(bookmarkIndex, 1)
  }

}
