
//My Proudest moment so far. This page was done entirely by myself without help from a guided video. Leaving this comment here so one day i can look back on the small vicories and see how far i've come

import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { TodoService } from '../shared/todo.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  showValidationErrors: boolean = false;

  constructor (
    private TodoService: TodoService, 
    private router: Router,
    private NotificationService: NotificationService) {}

  ngOnInit(): void {
    
  }

  onFormSubmit(form: NgForm) {

    if (form.invalid) return this.showValidationErrors = true

    const todo = new Todo(form.value.text)

    this.TodoService.addTodo(todo)
    this.router.navigateByUrl("/todos")
    this.NotificationService.show('Task Added')
  }


}