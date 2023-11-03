import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = [
    new Note('Test title', 'Test Content'),
    new Note('Hey!!', 'Testing 123')
  ]


  constructor() { }

  getNotes () {
    return this.notes
  }

  //return true when n.id equals the id passed into this method
  getNote(id: string) {
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)
  }

  // updateNote(id: string, updatedFields: Partial<Note>) {
  //   const note =  this.getNote(id)
  //   Object.assign(note, updatedFields)
  // } 
  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    if (note) {
      Object.assign(note, updatedFields);
      console.log('Note updated:', note);
    } else {
      console.log('Note not found');
    }
  } 

  deleteNote(id:string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return

    this.notes.splice(noteIndex, 1)
  }
}
