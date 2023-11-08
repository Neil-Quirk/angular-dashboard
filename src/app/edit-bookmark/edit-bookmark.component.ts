import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Bookmark } from '../shared/bookmark.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  showValidationErrors: boolean = false;

  bookmark: Bookmark | undefined 
  // router: any;

  constructor (
    private BookmarkService: BookmarkService, 
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkID = paramMap.get('id') || '' //the || '' is the logical OR operator. it is used to return the value on the left hand side (in this case an empty string) if the vlaue on its right hand side is falsy (paramMap.get('id')) this ensures bookmarkID wont be a null value when we pass it to the next code section.
      this.bookmark = this.BookmarkService.getBookmark(bookmarkID)
    } )
  }

  onFormSubmit(form: NgForm) {
    const{ name, url } = form.value


    if(!this.bookmark) return
      this.BookmarkService.updateBookmark(this.bookmark.id, {
        name,
        url: new URL(url)
      })
      // this.router.navigateByUrl("/bookmarks")
      this.notificationService.show('Bookmark Updated', 1000)
    }

    delete() {
      if (this.bookmark?.id) {
        this.BookmarkService.deleteBookmark(this.bookmark.id)
      } else {
        return
      }
      this.router.navigate(['../'], { relativeTo: this.route})
      this.notificationService.show('Bookmark Deleted!', 1000)
    }
  
    
  

}
