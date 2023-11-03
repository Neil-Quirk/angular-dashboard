import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit{

  showValidationErrors: boolean = false;

  constructor (private BookmarkService: BookmarkService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true

    const bookmark = new Bookmark(form.value.name, form.value.url)

    this.BookmarkService.addBookmark(bookmark)
    this.router.navigateByUrl("/bookmarks")

  }

}
