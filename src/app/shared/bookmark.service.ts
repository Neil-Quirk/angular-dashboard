import { Injectable, OnDestroy } from '@angular/core';
import { Bookmark } from './bookmark.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = [ ]
  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
    .subscribe((event: Event) => {
      const storageEvent = event as StorageEvent;
      if(storageEvent.key === 'bookmarks') this.loadState()
  })
   }

   ngOnDestroy(){
    if(this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getBookmarks() {
    return this.bookmarks
  }

  getBookmark(id:string) {
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
    this.saveSate()
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id)
    if(bookmark) {
    Object.assign(bookmark, updatedFields)
    this.saveSate()
    } else {
      return
    }
    
  }

  deleteBookmark(id: string) {
  const bookmarkIndex = this.bookmarks.findIndex( b => b.id === id)
  if (bookmarkIndex == -1) return
  this.bookmarks.splice(bookmarkIndex, 1)
  this.saveSate()
  }

  saveSate() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() { 
    try {
      const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmarks')!, (key,value) => {
        if (key == 'url') return new URL(value)
        return value
      })
        this.bookmarks.length = 0
        this.bookmarks.push(...bookmarksInStorage)
    
    } catch (e) {
      console.log('There was an error retriving the bookmarks from local storage');
      console.log(e);
    }
  }

}
