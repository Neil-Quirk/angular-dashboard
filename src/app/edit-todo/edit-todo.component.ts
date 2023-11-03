import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  showValidationErrors: boolean = false;

  todo: Todo | undefined;

  constructor (private todoService: TodoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) =>{
      const todoId = paraMap.get('id') || '';
      this.todo = this.todoService.getTodo(todoId);
    })
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) return
    else{
    if (this.todo?.id) {
    this.todoService.updateTodo(this.todo.id, form.value);
    } else {
      return
    }}
    this.router.navigateByUrl("/todos")
  }


}
