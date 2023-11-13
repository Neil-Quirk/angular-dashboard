import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy{

  todos: Todo[] = []
  storageListenSub: Subscription

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
    .subscribe((event: Event) => {
      const storageEvent = event as StorageEvent;
      if(storageEvent.key === 'todos') this.loadState()
  })
  }
  
  ngOnDestroy(){
    if(this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    this.saveSate()
  }

  updateTodo(id: string, updateTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    if (todo) {
      Object.assign(todo, updateTodoFields);
      this.saveSate()
      console.log('Todo updated:', todo);
    } else {
      console.log('ToDo not found');
    }
  }
  
  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id)
    if (index == -1) return

    this.todos.splice(index, 1)
    this.saveSate()
  }

  saveSate() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() { 
    try {
      const item = localStorage.getItem('todos');
      let todosInStorage;
      if (item === null) {
        todosInStorage = null;
      } else {
        todosInStorage = JSON.parse(item);
        this.todos.length = 0
        this.todos.push(...todosInStorage)
      }
    } catch (e) {
      console.log('There was an error retriving the notes from local storage');
      console.log(e);
    }
  }

} 
