import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TasksService } from '../../todo.service';
import { Store } from '../../todo.store';


@Component({
  selector: 'tasks-iniciadas',
  templateUrl: './tasks-iniciadas.component.html'
})
export class TasksIniciadasComponent implements OnInit {

  iniciados$: Observable<any[]>

  constructor(private taskService: TasksService, private store: Store) {}

  ngOnInit() {  
    // isso me retorna as tarefas iniciadas
    this.iniciados$ = this.store.getTodoList() // obtendo a lista de tarefas e filtrando no pipe, atraves do map
      .pipe(
        map(todolist => todolist.filter(task => task.iniciado && !task.finalizado)))// das quais ela ta com iniciado true e finalizado false       
  } 

  onToggle(event) {
    this.taskService.toggle(event)
  }
  
}