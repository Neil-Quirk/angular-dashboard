import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService  implements OnDestroy{
  notes: Note[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
    .subscribe((event: Event) => {
      const storageEvent = event as StorageEvent;
      if(storageEvent.key === 'notes') this.loadState()
  })
  }

  ngOnDestroy(){
    if(this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes;
  }

  //return true when n.id equals the id passed into this method
  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveSate();
  }

  // updateNote(id: string, updatedFields: Partial<Note>) {
  //   const note =  this.getNote(id)
  //   Object.assign(note, updatedFields)
  // }
  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    if (note) {
      Object.assign(note, updatedFields);
      this.saveSate();
      console.log('Note updated:', note);
    } else {
      console.log('Note not found');
    }
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex == -1) return;

    this.notes.splice(noteIndex, 1);
    this.saveSate();
  }
  //convert notes array into Json string so that it can be saved into local storage
  saveSate() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() { 
    try {
      const item = localStorage.getItem('notes');
      let notesInStorage;
      if (item === null) {
        notesInStorage = null;
      } else {
        notesInStorage = JSON.parse(item);
        this.notes.length = 0
        this.notes.push(...notesInStorage)
      }
    } catch (e) {
      console.log('There was an error retriving the notes from local storage');
      console.log(e);
    }
  }
}
