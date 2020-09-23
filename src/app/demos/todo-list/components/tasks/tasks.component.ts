import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { TasksService } from '../../todo.service';
import { Store } from '../../todo.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnDestroy {
  
  todolist$: Observable<any[]>
  subscription: Subscription

  constructor(private taskService: TasksService, private store: Store) {}

  ngOnInit() {  
    // isso me retorna 
    this.todolist$ = this.store.getTodoList()
      .pipe(
        map(todolist => todolist.filter(task => !task.iniciado && !task.finalizado)))

        this.subscription = this.taskService.getToDoList$.subscribe()// ativando o fluxo de dado
  }

  onToggle(event) {
    this.taskService.toggle(event)
  }
  onAdd() {

  }
  ngOnDestroy() { //metodo quer dizer estou fechando a subscription que eu tinha ACIMA
    this.subscription.unsubscribe()
  }  

}