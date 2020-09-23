import { Store } from './../../todo.store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TasksService } from '../../todo.service';

@Component({
  selector: 'tasks-finalizadas',
  templateUrl: './tasks-finalizadas.component.html'
})
export class TasksFinalizadasComponent implements OnInit {

  finalizados$: Observable<any[]>

  constructor(private taskService: TasksService, private store: Store) {}

  ngOnInit() {  
    // isso me retorna as tarefas iniciadas
    this.finalizados$ = this.store.getTodoList() // obtendo a lista de tarefas e filtrando no pipe, atraves do map
      .pipe(
        map(todolist => todolist.filter(task => task.finalizado)))// das quais ela ta finalizado true       
  }

  onToggle(event) { // metodo do evento do click
    this.taskService.toggle(event)
  }

}