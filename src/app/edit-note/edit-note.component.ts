import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note: Note | undefined;

  constructor (
    private noteService: NoteService, 
    private router: Router, 
    private route: ActivatedRoute,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) =>{
      const idParam = paraMap.get('id') || '';
      this.note = this.noteService.getNote(idParam);
    })
  }

  onFormSubmit(form: NgForm) {

    if (this.note?.id) {
    this.noteService.updateNote(this.note.id, form.value);
    } else {
      return
    }
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Note Updated!', 1000)
  }

  deleteNote() {
    if (this.note?.id) {
      this.noteService.deleteNote(this.note.id)
    } else {
      return
    }
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Note Deleted!',1000)
  }


}