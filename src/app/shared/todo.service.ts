import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    new Todo('This is a test'),
    new Todo("Hey! It's working"),
    new Todo("Let's see this one")
  ]; 

  constructor() { }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  updateTodo(id: string, updateTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    if (todo) {
      Object.assign(todo, updateTodoFields);
      console.log('Todo updated:', todo);
    } else {
      console.log('ToDo not found');
    }
  }
  
  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id)
    if (index == -1) return

    this.todos.splice(index, 1)
  }

} 
